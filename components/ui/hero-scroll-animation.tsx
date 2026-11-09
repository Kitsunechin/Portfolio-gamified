'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import React, { useRef, forwardRef, useState, useEffect } from 'react';
import GameAtmosphere from '@/components/game-atmosphere';

interface SectionProps {
  scrollYProgress: MotionValue<number>;
  videoSrc?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  isImage?: boolean;
  isDesktop?: boolean;
}

const Section1: React.FC<SectionProps> = ({ scrollYProgress, videoSrc, titleLine1, titleLine2, subtitle, isImage, isDesktop }) => {
  const [isClient, setIsClient] = useState(false);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className='sticky top-0 h-screen pt-32 pb-8 bg-gradient-to-b from-background to-background/95 flex items-center justify-center text-foreground overflow-hidden'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
        <div className='container mx-auto px-6 md:px-16 lg:px-24 relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='flex flex-col gap-6 order-2 lg:order-1'>
              <p className='text-xs md:text-sm uppercase tracking-[0.35em] text-primary font-sans font-medium'>
                {titleLine1 || 'Case Study'}
              </p>
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-[0.06em] text-foreground leading-[110%]'>
                {titleLine2 || 'Guided Tour Onboarding'}
              </h1>
              <p className='text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl'>
                {subtitle || 'Scroll to explore the design process and impact of this project'}
              </p>
            </div>
            <div className='flex justify-center lg:justify-end order-1 lg:order-2'>
              <div className='relative'>
                {isDesktop ? (
                  /* Desktop frame */
                  <div
                    className='relative rounded-[1rem] md:rounded-[1.5rem] bg-card p-[4px] md:p-[6px] shadow-2xl'
                    style={{
                      width: 'var(--hero-desktop-width)',
                      aspectRatio: '16 / 9',
                      boxShadow: `
                        0 0 0 1px rgba(255,255,255,0.08),
                        0 25px 60px -12px rgba(0,0,0,0.5),
                        0 0 60px 10px rgba(147, 197, 253, 0.22)
                      `,
                    }}
                  >
                    <div className='relative w-full h-full rounded-[0.75rem] md:rounded-[1.25rem] overflow-hidden bg-background'>
                      {videoSrc && (
                        isImage ? (
                          <img
                            src={videoSrc}
                            alt="Project preview"
                            className='absolute inset-0 w-full h-full object-cover object-top'
                          />
                        ) : (
                          <video
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload='metadata'
                            className='absolute inset-0 w-full h-full object-cover object-top'
                          />
                        )
                      )}
                      <div className='absolute inset-0 rounded-[0.75rem] md:rounded-[1.25rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10' />
                    </div>
                    <div className='absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-[60%] h-[8px] bg-muted rounded-b-lg' />
                    <div className='absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[80%] h-[4px] bg-card rounded-full' />
                  </div>
                ) : (
                  /* Phone frame */
                  <div
                    className='relative rounded-[2.5rem] md:rounded-[3rem] bg-card p-[3px] md:p-1 shadow-2xl'
                    style={{
                      width: 'var(--hero-phone-width)',
                      aspectRatio: '375 / 812',
                      boxShadow: `
                        0 0 0 1px rgba(255,255,255,0.08),
                        0 25px 60px -12px rgba(0,0,0,0.5),
                        0 0 60px 10px rgba(147, 197, 253, 0.22)
                      `,
                    }}
                  >
                    <div className='relative w-full h-full rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-background'>
                      {videoSrc && (
                        isImage ? (
                          <img
                            src={videoSrc}
                            alt="Project preview"
                            className='absolute inset-0 w-full h-full object-cover object-top'
                          />
                        ) : (
                          <video
                            src={videoSrc}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload='metadata'
                            className='absolute inset-0 w-full h-full object-cover object-top'
                          />
                        )
                      )}
                      <div className='absolute inset-0 rounded-[2.25rem] md:rounded-[2.75rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10' />
                    </div>
                    <div className='absolute -right-[2px] top-[28%] w-[3px] h-[8%] bg-muted rounded-l-sm' />
                    <div className='absolute -left-[2px] top-[22%] w-[3px] h-[5%] bg-muted rounded-r-sm' />
                    <div className='absolute -left-[2px] top-[30%] w-[3px] h-[8%] bg-muted rounded-r-sm' />
                    <div className='absolute -left-[2px] top-[40%] w-[3px] h-[8%] bg-muted rounded-r-sm' />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-20'>
          <p className='text-muted-foreground font-sans text-xs tracking-widest uppercase'>
            Scroll to explore
          </p>
          <div className='w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5'>
            <div className='w-1 h-1.5 rounded-full bg-primary' />
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      style={{ scale, rotate }}
      className='sticky top-0 h-screen pt-32 pb-8 bg-gradient-to-b from-background to-background/95 flex items-center justify-center text-foreground overflow-hidden'
    >
      <GameAtmosphere count={20} />
      {/* Background Pattern */}
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <div className='container mx-auto px-6 md:px-16 lg:px-24 relative z-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          {/* Left side - Title (Prominent) */}
          <div className='flex flex-col gap-6 order-2 lg:order-1'>
            <p className='text-xs md:text-sm uppercase tracking-[0.35em] text-primary font-sans font-medium'>
              {titleLine1 || 'Case Study'}
            </p>
            <h1 className='text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-[0.06em] text-foreground leading-[110%]'>
              {titleLine2 || 'Guided Tour Onboarding'}
            </h1>
            <p className='text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl'>
              {subtitle || 'Scroll to explore the design process and impact of this project'}
            </p>
          </div>

          {/* Right side - Device Frame */}
          <div className='flex justify-center lg:justify-end order-1 lg:order-2'>
            <div className='relative'>
              {isDesktop ? (
                /* Desktop frame */
                <div
                  className='relative rounded-[1rem] md:rounded-[1.5rem] bg-card p-[4px] md:p-[6px] shadow-2xl'
                  style={{
                    width: 'var(--hero-desktop-width)',
                    aspectRatio: '16 / 9',
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.08),
                      0 25px 60px -12px rgba(0,0,0,0.5),
                      0 0 60px 10px rgba(147, 197, 253, 0.22)
                    `,
                  }}
                >
                  {/* Desktop inner bezel */}
                  <div className='relative w-full h-full rounded-[0.75rem] md:rounded-[1.25rem] overflow-hidden bg-background'>
                    {/* Video or Image */}
                    {videoSrc && (
                      isImage ? (
                        <img
                          src={videoSrc}
                          alt="Project preview"
                          className='absolute inset-0 w-full h-full object-cover object-center'
                        />
                      ) : (
                        <video
                          src={videoSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload='metadata'
                          className='absolute inset-0 w-full h-full object-cover object-center'
                        />
                      )
                    )}

                    {/* Subtle inner shadow for depth */}
                    <div className='absolute inset-0 rounded-[0.75rem] md:rounded-[1.25rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10' />
                  </div>

                  {/* Desktop stand */}
                  <div className='absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-[60%] h-[8px] bg-muted rounded-b-lg' />
                  <div className='absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[80%] h-[4px] bg-card rounded-full' />
                </div>
              ) : (
                /* Phone frame */
                <div
                  className='relative rounded-[2.5rem] md:rounded-[3rem] bg-card p-[3px] md:p-1 shadow-2xl'
                  style={{
                    width: 'var(--hero-phone-width)',
                    aspectRatio: '375 / 812',
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.08),
                      0 25px 60px -12px rgba(0,0,0,0.5),
                      0 0 60px 10px rgba(147, 197, 253, 0.22)
                    `,
                  }}
                >
                  {/* Phone inner bezel */}
                  <div className='relative w-full h-full rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-background'>
                    {/* Video or Image */}
                    {videoSrc && (
                      isImage ? (
                        <img
                          src={videoSrc}
                          alt="Project preview"
                          className='absolute inset-0 w-full h-full object-cover object-center'
                        />
                      ) : (
                        <video
                          src={videoSrc}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload='metadata'
                          className='absolute inset-0 w-full h-full object-cover object-center'
                        />
                      )
                    )}

                    {/* Subtle inner shadow for depth */}
                    <div className='absolute inset-0 rounded-[2.25rem] md:rounded-[2.75rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10' />
                  </div>

                  {/* Side button accents */}
                  <div className='absolute -right-[2px] top-[28%] w-[3px] h-[8%] bg-muted rounded-l-sm' />
                  <div className='absolute -left-[2px] top-[22%] w-[3px] h-[5%] bg-muted rounded-r-sm' />
                  <div className='absolute -left-[2px] top-[30%] w-[3px] h-[8%] bg-muted rounded-r-sm' />
                  <div className='absolute -left-[2px] top-[40%] w-[3px] h-[8%] bg-muted rounded-r-sm' />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator at bottom */}
      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-20'>
        <p className='text-muted-foreground font-sans text-xs tracking-widest uppercase'>
          Scroll to explore
        </p>
        <motion.div
          className='w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5'
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className='w-1 h-1.5 rounded-full bg-primary'
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

const Section2: React.FC<SectionProps & { children?: React.ReactNode }> = ({
  scrollYProgress,
  children
}) => {
  const [isClient, setIsClient] = useState(false);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <section className='relative min-h-screen bg-background'>
        <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
        <div className='relative z-10'>
          {children}
        </div>
      </section>
    );
  }

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative min-h-screen bg-background'
    >
      <GameAtmosphere count={60} />
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <div className='relative z-10'>
        {children}
      </div>
    </motion.section>
  );
};

interface ComponentProps {
  videoSrc?: string;
  titleLine1?: string;
  titleLine2?: string;
  subtitle?: string;
  children?: React.ReactNode;
  isImage?: boolean;
  isDesktop?: boolean;
}

const HeroScrollAnimation = forwardRef<HTMLElement, ComponentProps>(({
  videoSrc = '/video/demo.mp4',
  titleLine1 = 'J&T Case Study',
  titleLine2 = 'Guided Tour Onboarding',
  subtitle,
  children,
  isImage = false,
  isDesktop = false
}, ref) => {
  const [isClient, setIsClient] = useState(false);
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent hydration mismatch by not rendering animations until client-side
  if (!isClient) {
    return (
      <main ref={container} className='relative h-[200vh]'>
        <section className='sticky top-0 h-screen pt-32 pb-8 bg-gradient-to-b from-background to-background/95 flex items-center justify-center text-foreground overflow-hidden'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
          <div className='container mx-auto px-6 md:px-16 lg:px-24 relative z-10'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              <div className='flex flex-col gap-6 order-2 lg:order-1'>
                <p className='text-xs md:text-sm uppercase tracking-[0.35em] text-primary font-sans font-medium'>
                  {titleLine1 || 'Case Study'}
                </p>
                <h1 className='text-4xl md:text-6xl lg:text-7xl font-display uppercase tracking-[0.06em] text-foreground leading-[110%]'>
                  {titleLine2 || 'Guided Tour Onboarding'}
                </h1>
                <p className='text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl'>
                  {subtitle || 'Scroll to explore the design process and impact of this project'}
                </p>
              </div>
              <div className='flex justify-center lg:justify-end order-1 lg:order-2'>
                <div className='relative'>
                  {isDesktop ? (
                    /* Desktop frame */
                    <div
                      className='relative rounded-[1rem] md:rounded-[1.5rem] bg-card p-[4px] md:p-[6px] shadow-2xl'
                      style={{
                        width: 'var(--hero-desktop-width)',
                        aspectRatio: '16 / 10',
                        boxShadow: `
                          0 0 0 1px rgba(255,255,255,0.08),
                          0 25px 60px -12px rgba(0,0,0,0.5),
                          0 0 60px 10px rgba(147, 197, 253, 0.22)
                        `,
                      }}
                    >
                      <div className='relative w-full h-full rounded-[0.75rem] md:rounded-[1.25rem] overflow-hidden bg-background'>
                        {videoSrc && (
                          isImage ? (
                            <img
                              src={videoSrc}
                              alt="Project preview"
                              className='absolute inset-0 w-full h-full object-cover object-top'
                            />
                          ) : (
                            <video
                              src={videoSrc}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload='metadata'
                              className='absolute inset-0 w-full h-full object-cover object-top'
                            />
                          )
                        )}
                        <div className='absolute inset-0 rounded-[0.75rem] md:rounded-[1.25rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10' />
                      </div>
                      <div className='absolute -bottom-[12px] left-1/2 -translate-x-1/2 w-[60%] h-[8px] bg-muted rounded-b-lg' />
                      <div className='absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[80%] h-[4px] bg-card rounded-full' />
                    </div>
                  ) : (
                    /* Phone frame */
                    <div
                      className='relative rounded-[2.5rem] md:rounded-[3rem] bg-card p-[3px] md:p-1 shadow-2xl'
                      style={{
                        width: 'var(--hero-phone-width)',
                        aspectRatio: '375 / 812',
                        boxShadow: `
                          0 0 0 1px rgba(255,255,255,0.08),
                          0 25px 60px -12px rgba(0,0,0,0.5),
                          0 0 60px 10px rgba(147, 197, 253, 0.22)
                        `,
                      }}
                    >
                      <div className='relative w-full h-full rounded-[2.25rem] md:rounded-[2.75rem] overflow-hidden bg-background'>
                        {videoSrc && (
                          isImage ? (
                            <img
                              src={videoSrc}
                              alt="Project preview"
                              className='absolute inset-0 w-full h-full object-cover object-top'
                            />
                          ) : (
                            <video
                              src={videoSrc}
                              autoPlay
                              muted
                              loop
                              playsInline
                              preload='metadata'
                              className='absolute inset-0 w-full h-full object-cover object-top'
                            />
                          )
                        )}
                        <div className='absolute inset-0 rounded-[2.25rem] md:rounded-[2.75rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.3)] pointer-events-none z-10' />
                      </div>
                      <div className='absolute -right-[2px] top-[28%] w-[3px] h-[8%] bg-muted rounded-l-sm' />
                      <div className='absolute -left-[2px] top-[22%] w-[3px] h-[5%] bg-muted rounded-r-sm' />
                      <div className='absolute -left-[2px] top-[30%] w-[3px] h-[8%] bg-muted rounded-r-sm' />
                      <div className='absolute -left-[2px] top-[40%] w-[3px] h-[8%] bg-muted rounded-r-sm' />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-20'>
            <p className='text-muted-foreground font-sans text-xs tracking-widest uppercase'>
              Scroll to explore
            </p>
            <div className='w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5'>
              <div className='w-1 h-1.5 rounded-full bg-primary' />
            </div>
          </div>
        </section>
        <section className='relative min-h-screen bg-background'>
          <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#60a5fa14_1px,transparent_1px),linear-gradient(to_bottom,#60a5fa14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
          <div className='relative z-10'>
            {children}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main ref={container} className='relative h-[200vh]'>
      <Section1
        scrollYProgress={scrollYProgress}
        videoSrc={videoSrc}
        titleLine1={titleLine1}
        titleLine2={titleLine2}
        subtitle={subtitle}
        isImage={isImage}
        isDesktop={isDesktop}
      />
      <Section2 scrollYProgress={scrollYProgress}>
        {children}
      </Section2>
    </main>
  );
});

HeroScrollAnimation.displayName = 'HeroScrollAnimation';

export default HeroScrollAnimation;
