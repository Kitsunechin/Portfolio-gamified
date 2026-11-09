"use client";

import React, { useRef, useEffect, useState } from "react";

interface SmokeyCursorEffectProps {
  /** When true, renders only the canvas overlay without demo content - for embedding in pages */
  asOverlay?: boolean;
  /** Hide the default cursor when effect is active */
  hideCursor?: boolean;
}

const SmokeyCursorEffect = ({
  asOverlay = false,
  hideCursor = false,
}: SmokeyCursorEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const config = {
    SIM_RESOLUTION: 128,
    DYE_RESOLUTION: 1440,
    CAPTURE_RESOLUTION: 512,
    DENSITY_DISSIPATION: 3.5,
    VELOCITY_DISSIPATION: 2,
    PRESSURE: 0.1,
    PRESSURE_ITERATIONS: 20,
    CURL: 3,
    SPLAT_RADIUS: 0.2,
    SPLAT_FORCE: 6000,
    SHADING: true,
    COLOR_UPDATE_SPEED: 10,
    PAUSED: false,
    BACK_COLOR: { r: 0.5, g: 0, b: 0 },
    TRANSPARENT: true,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
    let ext: Record<string, unknown>;
    const pointers = [
      {
        id: -1,
        texcoordX: 0,
        texcoordY: 0,
        prevTexcoordX: 0,
        prevTexcoordY: 0,
        deltaX: 0,
        deltaY: 0,
        down: false,
        moved: false,
        color: { r: 0, g: 0, b: 0 },
      },
    ];
    let dye: { read: { attach: (id: number) => number }; write: { attach: (id: number) => number }; texelSizeX: number; texelSizeY: number; swap: () => void } | null = null;
    let velocity: { read: { attach: (id: number) => number }; write: { attach: (id: number) => number }; texelSizeX: number; texelSizeY: number; swap: () => void } | null = null;
    let divergence: { attach: (id: number) => number } | null = null;
    let curlFBO: { attach: (id: number) => number } | null = null;
    let pressureFBO: { read: { attach: (id: number) => number }; write: { attach: (id: number) => number }; swap: () => void } | null = null;
    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0.0;

    let copyProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let clearProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let splatProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let advectionProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let divergenceProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let curlProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let vorticityProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let pressureProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let gradienSubtractProgram: { bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let displayMaterial: { bind: () => void; setKeywords: (kw: string[]) => void; uniforms: Record<string, WebGLUniformLocation | null> };
    let blit: (target: { width: number; height: number; fbo: WebGLFramebuffer } | null, doClear?: boolean) => void;

    const supportRenderTextureFormat = (
      glContext: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number
    ) => {
      const texture = glContext.createTexture();
      if (!texture) return false;
      glContext.bindTexture(glContext.TEXTURE_2D, texture);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MIN_FILTER, glContext.NEAREST);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_MAG_FILTER, glContext.NEAREST);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_S, glContext.CLAMP_TO_EDGE);
      glContext.texParameteri(glContext.TEXTURE_2D, glContext.TEXTURE_WRAP_T, glContext.CLAMP_TO_EDGE);
      glContext.texImage2D(glContext.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      const fbo = glContext.createFramebuffer();
      if (!fbo) return false;
      glContext.bindFramebuffer(glContext.FRAMEBUFFER, fbo);
      glContext.framebufferTexture2D(
        glContext.FRAMEBUFFER,
        glContext.COLOR_ATTACHMENT0,
        glContext.TEXTURE_2D,
        texture,
        0
      );
      const status = glContext.checkFramebufferStatus(glContext.FRAMEBUFFER);
      return status === glContext.FRAMEBUFFER_COMPLETE;
    };

    const getSupportedFormat = (
      glContext: WebGLRenderingContext | WebGL2RenderingContext,
      internalFormat: number,
      format: number,
      type: number
    ): { internalFormat: number; format: number } | null => {
      if (!supportRenderTextureFormat(glContext, internalFormat, format, type)) {
        if ("drawBuffers" in glContext) {
          const gl2 = glContext as WebGL2RenderingContext;
          switch (internalFormat) {
            case gl2.R16F:
              return getSupportedFormat(gl2, gl2.RG16F, gl2.RG, type);
            case gl2.RG16F:
              return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
            default:
              return null;
          }
        }
        return null;
      }
      return { internalFormat, format };
    };

    const initializeWebGL = () => {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      };

      gl =
        canvas.getContext("webgl2", params) ||
        canvas.getContext("webgl", params) ||
        (canvas.getContext("experimental-webgl", params) as WebGLRenderingContext);

      if (!gl) throw new Error("Unable to initialize WebGL.");

      const isWebGL2 = "drawBuffers" in gl;
      let supportLinearFiltering = false;
      let halfFloat: { HALF_FLOAT_OES?: number } | null = null;

      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = !!gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
      }

      gl.clearColor(0, 0, 0, 1);

      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : (halfFloat?.HALF_FLOAT_OES as number) || 0;

      let formatRGBA: { internalFormat: number; format: number } | null;
      let formatRG: { internalFormat: number; format: number } | null;
      let formatR: { internalFormat: number; format: number } | null;

      if (isWebGL2) {
        const gl2 = gl as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatTexType);
      } else {
        const gl1 = gl as WebGLRenderingContext;
        formatRGBA = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl1, gl1.RGBA, gl1.RGBA, halfFloatTexType);
      }

      if (!formatRGBA || !formatRG || !formatR) {
        throw new Error("WebGL format not supported");
      }

      ext = {
        formatRGBA,
        formatRG,
        formatR,
        halfFloatTexType,
        supportLinearFiltering,
      };

      if (!ext.supportLinearFiltering) {
        config.DYE_RESOLUTION = 256;
        config.SHADING = false;
      }

      return true;
    };

    const compileShader = (
      type: number,
      source: string,
      keywords: string[] | null = null
    ): WebGLShader | null => {
      let shaderSource = source;
      if (keywords) {
        shaderSource = keywords.map((k) => `#define ${k}\n`).join("") + source;
      }
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, shaderSource);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        console.error(gl!.getShaderInfoLog(shader));
      }
      return shader;
    };

    const createProgram = (
      vertexShader: WebGLShader | null,
      fragmentShader: WebGLShader | null
 ): { program: WebGLProgram; bind: () => void; uniforms: Record<string, WebGLUniformLocation | null> } | null => {
      if (!vertexShader || !fragmentShader) return null;
      const program = gl!.createProgram();
      if (!program) return null;
      gl!.attachShader(program, vertexShader);
      gl!.attachShader(program, fragmentShader);
      gl!.linkProgram(program);
      if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
        console.error(gl!.getProgramInfoLog(program));
      }
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const uniformCount = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
      for (let i = 0; i < uniformCount; i++) {
        const info = gl!.getActiveUniform(program, i);
        if (info) uniforms[info.name] = gl!.getUniformLocation(program, info.name);
      }
      return {
        program,
        bind: () => gl!.useProgram(program),
        uniforms,
      };
    };

    class Material {
      vertexShader: WebGLShader | null;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram> = {};
      activeProgram: WebGLProgram | null = null;
      uniforms: Record<string, WebGLUniformLocation | null> = {};

      constructor(vertexShader: WebGLShader | null, fragmentShaderSource: string) {
        this.vertexShader = vertexShader;
        this.fragmentShaderSource = fragmentShaderSource;
      }

      hashCode(s: string) {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
          hash = (hash << 5) - hash + s.charCodeAt(i);
          hash |= 0;
        }
        return hash;
      }

      setKeywords(keywords: string[]) {
        let hash = 0;
        for (const kw of keywords) hash += this.hashCode(kw);
        let program = this.programs[hash];
        if (!program && this.vertexShader) {
          const fs = compileShader(gl!.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          program = gl!.createProgram()!;
          gl!.attachShader(program, this.vertexShader);
          gl!.attachShader(program, fs!);
          gl!.linkProgram(program);
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        this.activeProgram = program;
        if (program) {
          this.uniforms = {};
          const count = gl!.getProgramParameter(program, gl!.ACTIVE_UNIFORMS);
          for (let i = 0; i < count; i++) {
            const info = gl!.getActiveUniform(program, i);
            if (info) this.uniforms[info.name] = gl!.getUniformLocation(program, info.name);
          }
        }
      }

      bind() {
        if (this.activeProgram) gl!.useProgram(this.activeProgram);
      }
    }

    const initializeShaders = () => {
      const baseVertexShader = compileShader(
        gl!.VERTEX_SHADER,
        `precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv,vL,vR,vT,vB;
        uniform vec2 texelSize;
        void main(){
          vUv=aPosition*0.5+0.5;
          vL=vUv-vec2(texelSize.x,0.0);
          vR=vUv+vec2(texelSize.x,0.0);
          vT=vUv+vec2(0.0,texelSize.y);
          vB=vUv-vec2(0.0,texelSize.y);
          gl_Position=vec4(aPosition,0.0,1.0);
        }`
      );

      const copyShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;uniform sampler2D uTexture;void main(){gl_FragColor=texture2D(uTexture,vUv);}`
      );
      const clearShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;uniform sampler2D uTexture;uniform float value;void main(){gl_FragColor=value*texture2D(uTexture,vUv);}`
      );

      const displayShaderSource = `precision highp float;precision highp sampler2D;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uTexture;uniform vec2 texelSize;
        vec3 linearToGamma(vec3 c){c=max(c,vec3(0));return max(1.055*pow(c,vec3(0.416666667))-0.055,vec3(0));}
        void main(){
          vec3 c=texture2D(uTexture,vUv).rgb;
          #ifdef SHADING
            vec3 lc=texture2D(uTexture,vL).rgb,rc=texture2D(uTexture,vR).rgb,tc=texture2D(uTexture,vT).rgb,bc=texture2D(uTexture,vB).rgb;
            float dx=length(rc)-length(lc),dy=length(tc)-length(bc);
            vec3 n=normalize(vec3(dx,dy,length(texelSize))),l=vec3(0,0,1);
            float diffuse=clamp(dot(n,l)+0.7,0.7,1.0);c*=diffuse;
          #endif
          float a=max(c.r,max(c.g,c.b));gl_FragColor=vec4(c,a);
        }`;

      const splatShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D uTarget;uniform float aspectRatio;uniform vec3 color;uniform vec2 point;uniform float radius;
        void main(){vec2 p=vUv-point.xy;p.x*=aspectRatio;vec3 splat=exp(-dot(p,p)/radius)*color;vec3 base=texture2D(uTarget,vUv).xyz;gl_FragColor=vec4(base+splat,1.0);}`
      );

      const advectionShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision highp float;precision mediump sampler2D;varying vec2 vUv;uniform sampler2D uVelocity,uSource;uniform vec2 texelSize,dyeTexelSize;uniform float dt,dissipation;
        vec4 bilerp(sampler2D s,vec2 uv,vec2 t){vec2 st=uv/t-0.5,iuv=floor(st),fuv=fract(st);
          vec4 a=texture2D(s,(iuv+vec2(0.5,0.5))*t),b=texture2D(s,(iuv+vec2(1.5,0.5))*t),c=texture2D(s,(iuv+vec2(0.5,1.5))*t),d=texture2D(s,(iuv+vec2(1.5,1.5))*t);
          return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);}
        void main(){
          #ifdef MANUAL_FILTERING
            vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
            vec4 result=bilerp(uSource,coord,dyeTexelSize);
          #else
            vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;
            vec4 result=texture2D(uSource,coord);
          #endif
          gl_FragColor=result/(1.0+dissipation*dt);
        }`,
        ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]
      );

      const divergenceShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision mediump float;precision mediump sampler2D;varying highp vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVelocity;
        void main(){float L=texture2D(uVelocity,vL).x,R=texture2D(uVelocity,vR).x,T=texture2D(uVelocity,vT).y,B=texture2D(uVelocity,vB).y;
          vec2 C=texture2D(uVelocity,vUv).xy;if(vL.x<0.)L=-C.x;if(vR.x>1.)R=-C.x;if(vT.y>1.)T=-C.y;if(vB.y<0.)B=-C.y;
          gl_FragColor=vec4(0.5*(R-L+T-B),0.,0.,1.);}`
      );

      const curlShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision mediump float;precision mediump sampler2D;varying highp vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVelocity;
        void main(){float L=texture2D(uVelocity,vL).y,R=texture2D(uVelocity,vR).y,T=texture2D(uVelocity,vT).x,B=texture2D(uVelocity,vB).x;
          gl_FragColor=vec4(0.5*(R-L-T+B),0.,0.,1.);}`
      );

      const vorticityShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision highp float;precision mediump sampler2D;varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVelocity,uCurl;uniform float curl,dt;
        void main(){float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x,T=texture2D(uCurl,vT).x,B=texture2D(uCurl,vB).x,C=texture2D(uCurl,vUv).x;
          vec2 f=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));f/=length(f)+0.0001;f*=curl*C;f.y*=-1.;
          vec2 v=texture2D(uVelocity,vUv).xy;v+=f*dt;v=min(max(v,-1000.),1000.);
          gl_FragColor=vec4(v,0.,1.);}`
      );

      const pressureShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision mediump float;precision mediump sampler2D;varying highp vec2 vUv,vL,vR,vT,vB;uniform sampler2D uPressure,uDivergence;
        void main(){float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x,C=texture2D(uPressure,vUv).x,D=texture2D(uDivergence,vUv).x;
          gl_FragColor=vec4((L+R+B+T-D)*0.25,0.,0.,1.);}`
      );

      const gradientSubtractShader = compileShader(
        gl!.FRAGMENT_SHADER,
        `precision mediump float;precision mediump sampler2D;varying highp vec2 vUv,vL,vR,vT,vB;uniform sampler2D uPressure,uVelocity;
        void main(){float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x;
          vec2 v=texture2D(uVelocity,vUv).xy;v-=vec2(R-L,T-B);gl_FragColor=vec4(v,0.,1.);}`
      );

      copyProgram = createProgram(baseVertexShader, copyShader)!;
      clearProgram = createProgram(baseVertexShader, clearShader)!;
      splatProgram = createProgram(baseVertexShader, splatShader)!;
      advectionProgram = createProgram(baseVertexShader, advectionShader)!;
      divergenceProgram = createProgram(baseVertexShader, divergenceShader)!;
      curlProgram = createProgram(baseVertexShader, curlShader)!;
      vorticityProgram = createProgram(baseVertexShader, vorticityShader)!;
      pressureProgram = createProgram(baseVertexShader, pressureShader)!;
      gradienSubtractProgram = createProgram(baseVertexShader, gradientSubtractShader)!;
      displayMaterial = new Material(baseVertexShader, displayShaderSource);
    };

    const initializeBlit = () => {
      const buffer = gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ARRAY_BUFFER, buffer);
      gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl!.STATIC_DRAW);
      const elemBuffer = gl!.createBuffer()!;
      gl!.bindBuffer(gl!.ELEMENT_ARRAY_BUFFER, elemBuffer);
      gl!.bufferData(gl!.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl!.STATIC_DRAW);
      gl!.vertexAttribPointer(0, 2, gl!.FLOAT, false, 0, 0);
      gl!.enableVertexAttribArray(0);

      blit = (target, doClear = false) => {
        if (!gl) return;
        if (!target) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
          gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        } else {
          gl.viewport(0, 0, target.width, target.height);
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        }
        if (doClear) {
          gl.clearColor(0, 0, 0, 1);
          gl.clear(gl.COLOR_BUFFER_BIT);
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    };

    const createFBO = (
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) => {
      gl!.activeTexture(gl!.TEXTURE0);
      const texture = gl!.createTexture()!;
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, param);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl!.createFramebuffer()!;
      gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
      gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
      gl!.viewport(0, 0, w, h);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX: 1 / w,
        texelSizeY: 1 / h,
        attach(id: number) {
          gl!.activeTexture(gl!.TEXTURE0 + id);
          gl!.bindTexture(gl!.TEXTURE_2D, texture);
          return id;
        },
      };
    };

    const createDoubleFBO = (
      w: number,
      h: number,
      internalFormat: number,
      format: number,
      type: number,
      param: number
    ) => {
      const fbo1 = createFBO(w, h, internalFormat, format, type, param);
      const fbo2 = createFBO(w, h, internalFormat, format, type, param);
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        read: fbo1,
        write: fbo2,
        swap() {
          const tmp = this.read;
          this.read = this.write;
          this.write = tmp;
        },
      };
    };

    const scaleByPixelRatio = (input: number) =>
      Math.floor(input * (typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1));

    const getResolution = (resolution: number) => {
      const w = gl!.drawingBufferWidth;
      const h = gl!.drawingBufferHeight;
      const aspectRatio = w / h;
      const aspect = aspectRatio < 1 ? 1 / aspectRatio : aspectRatio;
      const min = Math.round(resolution);
      const max = Math.round(resolution * aspect);
      return w > h ? { width: max, height: min } : { width: min, height: max };
    };

    const initFramebuffers = () => {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = (ext.halfFloatTexType as number);
      const rgba = ext.formatRGBA as { internalFormat: number; format: number };
      const rg = ext.formatRG as { internalFormat: number; format: number };
      const r = ext.formatR as { internalFormat: number; format: number };
      const filtering = ext.supportLinearFiltering ? gl!.LINEAR : gl!.NEAREST;
      gl!.disable(gl!.BLEND);

      if (!dye) {
        dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      }
      if (!velocity) {
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      }
      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl!.NEAREST);
      curlFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl!.NEAREST);
      pressureFBO = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl!.NEAREST);
    };

    const HSVtoRGB = (h: number, s: number, v: number) => {
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      let r = 0,
        g = 0,
        b = 0;
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r, g, b };
    };

    const generateColor = () => {
      const c = HSVtoRGB(Math.random(), 1, 1);
      c.r *= 0.15;
      c.g *= 0.15;
      c.b *= 0.15;
      return c;
    };

    const wrap = (value: number, min: number, max: number) => {
      const range = max - min;
      return range === 0 ? min : ((value - min) % range) + min;
    };

    const calcDeltaTime = () => {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    };

    const resizeCanvas = () => {
      const width = scaleByPixelRatio(canvas.clientWidth);
      const height = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        return true;
      }
      return false;
    };

    const updateColors = (dt: number) => {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => (p.color = generateColor()));
      }
    };

    const correctRadius = (radius: number) => {
      const ar = canvas.width / canvas.height;
      return ar > 1 ? radius * ar : radius;
    };

    const splat = (x: number, y: number, dx: number, dy: number, color: { r: number; g: number; b: number }) => {
      splatProgram.bind();
      gl!.uniform1i(splatProgram.uniforms.uTarget, velocity!.read.attach(0));
      gl!.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl!.uniform2f(splatProgram.uniforms.point, x, y);
      gl!.uniform3f(splatProgram.uniforms.color, dx, dy, 0);
      gl!.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100));
      blit(velocity!.write);
      velocity!.swap();
      gl!.uniform1i(splatProgram.uniforms.uTarget, dye!.read.attach(0));
      gl!.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(dye!.write);
      dye!.swap();
    };

    const splatPointer = (pointer: (typeof pointers)[0]) => {
      const dx = pointer.deltaX * config.SPLAT_FORCE;
      const dy = pointer.deltaY * config.SPLAT_FORCE;
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color);
    };

    const clickSplat = (pointer: (typeof pointers)[0]) => {
      const color = generateColor();
      color.r *= 10;
      color.g *= 10;
      color.b *= 10;
      splat(pointer.texcoordX, pointer.texcoordY, 10 * (Math.random() - 0.5), 30 * (Math.random() - 0.5), color);
    };

    const updatePointerDownData = (pointer: (typeof pointers)[0], id: number, posX: number, posY: number) => {
      pointer.id = id;
      pointer.down = true;
      pointer.moved = false;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1 - posY / canvas.height;
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.deltaX = 0;
      pointer.deltaY = 0;
      pointer.color = generateColor();
    };

    const correctDeltaX = (d: number) => (canvas.width / canvas.height < 1 ? d * (canvas.width / canvas.height) : d);
    const correctDeltaY = (d: number) => (canvas.width / canvas.height > 1 ? d / (canvas.width / canvas.height) : d);

    const updatePointerMoveData = (pointer: (typeof pointers)[0], posX: number, posY: number, color: { r: number; g: number; b: number }) => {
      pointer.prevTexcoordX = pointer.texcoordX;
      pointer.prevTexcoordY = pointer.texcoordY;
      pointer.texcoordX = posX / canvas.width;
      pointer.texcoordY = 1 - posY / canvas.height;
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX);
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY);
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0;
      pointer.color = color;
    };

    const applyInputs = () => {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false;
          splatPointer(p);
        }
      });
    };

    const step = (dt: number) => {
      gl!.disable(gl!.BLEND);
      curlProgram.bind();
      gl!.uniform2f(curlProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
      gl!.uniform1i(curlProgram.uniforms.uVelocity, velocity!.read.attach(0));
      blit(curlFBO);

      vorticityProgram.bind();
      gl!.uniform2f(vorticityProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
      gl!.uniform1i(vorticityProgram.uniforms.uVelocity, velocity!.read.attach(0));
      gl!.uniform1i(vorticityProgram.uniforms.uCurl, curlFBO!.attach(1));
      gl!.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl!.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity!.write);
      velocity!.swap();

      divergenceProgram.bind();
      gl!.uniform2f(divergenceProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
      gl!.uniform1i(divergenceProgram.uniforms.uVelocity, velocity!.read.attach(0));
      blit(divergence);

      clearProgram.bind();
      gl!.uniform1i(clearProgram.uniforms.uTexture, pressureFBO!.read.attach(0));
      gl!.uniform1f(clearProgram.uniforms.value, config.PRESSURE);
      blit(pressureFBO!.write);
      pressureFBO!.swap();

      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        pressureProgram.bind();
        gl!.uniform2f(pressureProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
        gl!.uniform1i(pressureProgram.uniforms.uDivergence, divergence!.attach(0));
        gl!.uniform1i(pressureProgram.uniforms.uPressure, pressureFBO!.read.attach(1));
        blit(pressureFBO!.write);
        pressureFBO!.swap();
      }

      gradienSubtractProgram.bind();
      gl!.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
      gl!.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressureFBO!.read.attach(0));
      gl!.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity!.read.attach(1));
      blit(velocity!.write);
      velocity!.swap();

      advectionProgram.bind();
      gl!.uniform2f(advectionProgram.uniforms.texelSize, velocity!.texelSizeX, velocity!.texelSizeY);
      if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {
        gl!.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity!.texelSizeX, velocity!.texelSizeY);
      }
      gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocity!.read.attach(0));
      gl!.uniform1i(advectionProgram.uniforms.uSource, velocity!.read.attach(0));
      gl!.uniform1f(advectionProgram.uniforms.dt, dt);
      gl!.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity!.write);
      velocity!.swap();

      if (!ext.supportLinearFiltering && advectionProgram.uniforms.dyeTexelSize) {
        gl!.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye!.texelSizeX, dye!.texelSizeY);
      }
      gl!.uniform1i(advectionProgram.uniforms.uVelocity, velocity!.read.attach(0));
      gl!.uniform1i(advectionProgram.uniforms.uSource, dye!.read.attach(1));
      gl!.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye!.write);
      dye!.swap();
    };

    const drawDisplay = (target: { width: number; height: number; fbo: WebGLFramebuffer } | null) => {
      const width = target ? target.width : gl!.drawingBufferWidth;
      const height = target ? target.height : gl!.drawingBufferHeight;
      displayMaterial.bind();
      if (config.SHADING && displayMaterial.uniforms.texelSize) {
        gl!.uniform2f(displayMaterial.uniforms.texelSize!, 1 / width, 1 / height);
      }
      gl!.uniform1i(displayMaterial.uniforms.uTexture, dye!.read.attach(0));
      blit(target, false);
    };

    const render = (target: { width: number; height: number; fbo: WebGLFramebuffer } | null) => {
      gl!.blendFunc(gl!.ONE, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.enable(gl!.BLEND);
      drawDisplay(target);
    };

    const updateFrame = () => {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      updateColors(dt);
      applyInputs();
      step(dt);
      render(null);
      animationIdRef.current = requestAnimationFrame(updateFrame);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      updatePointerDownData(pointers[0], -1, posX, posY);
      clickSplat(pointers[0]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const posX = scaleByPixelRatio(e.clientX);
      const posY = scaleByPixelRatio(e.clientY);
      updatePointerMoveData(pointers[0], posX, posY, pointers[0].color);
    };

    const handleTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.targetTouches.length; i++) {
        const posX = scaleByPixelRatio(e.targetTouches[i].clientX);
        const posY = scaleByPixelRatio(e.targetTouches[i].clientY);
        updatePointerDownData(pointers[0], e.targetTouches[i].identifier, posX, posY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.targetTouches.length; i++) {
        const posX = scaleByPixelRatio(e.targetTouches[i].clientX);
        const posY = scaleByPixelRatio(e.targetTouches[i].clientY);
        updatePointerMoveData(pointers[0], posX, posY, pointers[0].color);
      }
    };

    const handleTouchEnd = () => {
      pointers[0].down = false;
    };

    const init = () => {
      try {
        initializeWebGL();
        initializeShaders();
        displayMaterial.setKeywords(config.SHADING ? ["SHADING"] : []);
        initializeBlit();
        initFramebuffers();
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("touchstart", handleTouchStart, false);
        window.addEventListener("touchmove", handleTouchMove, false);
        window.addEventListener("touchend", handleTouchEnd);
        updateFrame();
        setIsInitialized(true);
        return () => {
          window.removeEventListener("mousedown", handleMouseDown);
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("touchstart", handleTouchStart);
          window.removeEventListener("touchmove", handleTouchMove);
          window.removeEventListener("touchend", handleTouchEnd);
        };
      } catch (err) {
        console.error("Fluid simulation init error:", err);
        setError(err instanceof Error ? err.message : "WebGL failed");
        return null;
      }
    };

    const cleanup = init();
    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
      cleanup?.();
    };
  }, []);

  if (error) return null;

  if (asOverlay) {
    return (
      <div
        className={`fixed inset-0 -z-[5] pointer-events-none ${hideCursor ? "cursor-none" : ""}`}
        aria-hidden
      >
        <canvas ref={canvasRef} className="w-full h-full block" style={{ opacity: 0.85 }} />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full min-h-screen overflow-hidden bg-background ${hideCursor ? "cursor-none" : ""}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="fixed inset-0 z-50 pointer-events-none">
        <canvas ref={canvasRef} id="fluid" className="w-full h-full block" />
      </div>
      <div className="relative z-10 p-6 sm:p-12 lg:p-20 text-foreground font-sans pointer-events-auto w-full">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 lg:mb-8">
            Smokey Cursor Effect
          </h1>
          <p className="text-base sm:text-lg lg:text-xl leading-relaxed mb-8 lg:mb-12 text-muted-foreground max-w-3xl mx-auto">
            Move your mouse around to create beautiful fluid smoke effects.
          </p>
          {!isInitialized && (
            <p className="text-sm text-muted-foreground">Initializing WebGL...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmokeyCursorEffect;
