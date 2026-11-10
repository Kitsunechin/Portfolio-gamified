"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import TwinklingStars from "@/components/twinkling-stars";
import FixedToViewport from "@/components/fixed-to-viewport";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  x: number; // position on map (pixels)
  y: number;
  link?: string; // link to project page
}

interface MapProps {
  projects: Project[];
  onAllDiscovered: () => void;
}

// Edit this drawing to change the labyrinth: "---" and "|" are walls, spaces are open passages.
const MAZE = [
  "+---+---+---+---+---+---+---+---+---+---+---+",
  "|           |       |   |                   |",
  "+   +---+---+   +   +   +   +---+   +   +   +",
  "|   |                   |           |   |   |",
  "+   +   +---+---+---+---+   +   +   +   +   +",
  "|       |           |       |   |   |   |   |",
  "+   +---+   +---+   +---+---+   +   +---+   +",
  "|   |           |                           |",
  "+   +---+---+   +   +---+---+---+---+---+   +",
  "|               |           |               |",
  "+---+---+---+---+   +   +---+   +---+   +   +",
  "|                   |               |       |",
  "+---+---+---+---+---+---+---+---+---+---+---+",
];

const CELL_SIZE = 100;
const COLS = (MAZE[0].length - 1) / 4;
const ROWS = (MAZE.length - 1) / 2;
const MAZE_WIDTH = COLS * CELL_SIZE;
const MAZE_HEIGHT = ROWS * CELL_SIZE;

const FOX_START = { x: 550, y: 50 };
const FOX_RADIUS = 26;
const FOX_SPEED = 300;

const NAV_CLEARANCE = 140;
const BOTTOM_CLEARANCE = 96;
const HUD_CLEARANCE = 250;

const CRYSTALS = [
  { col: 0, row: 0, color: '#78b6e2' },
  { col: 10, row: 0, color: '#8b5cf6' },
  { col: 3, row: 3, color: '#ec4899' },
  { col: 0, row: 5, color: '#8b5cf6' },
  { col: 10, row: 5, color: '#78b6e2' },
];

const TREE_IMAGES = [
  '/images/trees/shrine-oak.svg',
  '/images/trees/silver-pine.svg',
  '/images/trees/moon-birch.svg',
];
const TREE_COUNT = 14;
const GROVE_LAST_COL = 4;
const GROVE_LAST_ROW = 1;
const TREE_WALL_MARGIN = 4;

const KEY_DIRECTIONS: Record<string, [number, number]> = {
  arrowleft: [-1, 0],
  a: [-1, 0],
  arrowright: [1, 0],
  d: [1, 0],
  arrowup: [0, -1],
  w: [0, -1],
  arrowdown: [0, 1],
  s: [0, 1],
};

const WALLS = MAZE.flatMap((line, lineIndex) => {
  const row = lineIndex / 2;
  if (lineIndex % 2 === 0) {
    return Array.from({ length: COLS }, (_, col) => col)
      .filter((col) => line[col * 4 + 1] === '-')
      .map((col) => ({
        x1: col * CELL_SIZE,
        y1: row * CELL_SIZE,
        x2: (col + 1) * CELL_SIZE,
        y2: row * CELL_SIZE,
      }));
  }
  return Array.from({ length: COLS + 1 }, (_, col) => col)
    .filter((col) => line[col * 4] === '|')
    .map((col) => ({
      x1: col * CELL_SIZE,
      y1: Math.floor(row) * CELL_SIZE,
      x2: col * CELL_SIZE,
      y2: (Math.floor(row) + 1) * CELL_SIZE,
    }));
});

// Deterministic 0..1 "random" from a point, so the hand-drawn wobble below is stable across renders.
function seededWobble(x: number, y: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

const WOBBLE_AMPLITUDE = 7;

// Bows each straight wall segment into a gentle hand-drawn curve instead of a rigid right angle.
const WALL_PATH = WALLS.map((w) => {
  const wob1 = (seededWobble(w.x1, w.y1) - 0.5) * 2 * WOBBLE_AMPLITUDE;
  const wob2 = (seededWobble(w.x2, w.y2) - 0.5) * 2 * WOBBLE_AMPLITUDE;
  if (w.y1 === w.y2) {
    // Horizontal segment: wobble perpendicular, i.e. vertically.
    const midX1 = w.x1 + (w.x2 - w.x1) * 0.33;
    const midX2 = w.x1 + (w.x2 - w.x1) * 0.67;
    return `M${w.x1} ${w.y1}C${midX1} ${w.y1 + wob1} ${midX2} ${w.y2 + wob2} ${w.x2} ${w.y2}`;
  }
  // Vertical segment: wobble perpendicular, i.e. horizontally.
  const midY1 = w.y1 + (w.y2 - w.y1) * 0.33;
  const midY2 = w.y1 + (w.y2 - w.y1) * 0.67;
  return `M${w.x1} ${w.y1}C${w.x1 + wob1} ${midY1} ${w.x2 + wob2} ${midY2} ${w.x2} ${w.y2}`;
}).join('');

const toCell = (value: number) => Math.floor(value / CELL_SIZE);

const PROGRESS_KEY = 'fox-map-progress';

function hitsWall(x: number, y: number) {
  return WALLS.some((wall) => {
    const nearestX = Math.max(wall.x1, Math.min(wall.x2, x));
    const nearestY = Math.max(wall.y1, Math.min(wall.y2, y));
    return (x - nearestX) ** 2 + (y - nearestY) ** 2 < FOX_RADIUS ** 2;
  });
}

interface SavedProgress {
  discovered: string[];
  x: number;
  y: number;
  levelCompleteSeen: boolean;
}

// Survives leaving for a case study and coming back; storage can throw in private windows.
function loadProgress(): SavedProgress {
  const fresh = { discovered: [], x: FOX_START.x, y: FOX_START.y, levelCompleteSeen: false };
  try {
    const saved: SavedProgress | null = JSON.parse(sessionStorage.getItem(PROGRESS_KEY) ?? 'null');
    return saved && !hitsWall(saved.x, saved.y) ? saved : fresh;
  } catch {
    return fresh;
  }
}

function saveProgress(progress: SavedProgress) {
  try {
    sessionStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {
    // The game still works without saved progress.
  }
}

const cellKey = (col: number, row: number) => `${col},${row}`;

function openNeighbors(col: number, row: number) {
  const neighbors: { col: number; row: number }[] = [];
  if (col < COLS - 1 && MAZE[2 * row + 1][4 * (col + 1)] !== '|') neighbors.push({ col: col + 1, row });
  if (col > 0 && MAZE[2 * row + 1][4 * col] !== '|') neighbors.push({ col: col - 1, row });
  if (row < ROWS - 1 && MAZE[2 * row + 2][4 * col + 1] !== '-') neighbors.push({ col, row: row + 1 });
  if (row > 0 && MAZE[2 * row][4 * col + 1] !== '-') neighbors.push({ col, row: row - 1 });
  return neighbors;
}

function cellsOnOrbRoutes(projects: Project[]) {
  const startCell = { col: toCell(FOX_START.x), row: toCell(FOX_START.y) };
  const cameFrom = new Map<string, string | null>([[cellKey(startCell.col, startCell.row), null]]);
  const queue = [startCell];
  for (const cell of queue) {
    for (const next of openNeighbors(cell.col, cell.row)) {
      const key = cellKey(next.col, next.row);
      if (!cameFrom.has(key)) {
        cameFrom.set(key, cellKey(cell.col, cell.row));
        queue.push(next);
      }
    }
  }

  const route = new Set<string>();
  projects.forEach((project) => {
    let key: string | null | undefined = cellKey(toCell(project.x), toCell(project.y));
    while (key) {
      route.add(key);
      key = cameFrom.get(key);
    }
  });
  return route;
}

function computeFit() {
  const availableWidth = Math.max(window.innerWidth - HUD_CLEARANCE * 2, 320);
  const availableHeight = Math.max(window.innerHeight - NAV_CLEARANCE - BOTTOM_CLEARANCE, 240);
  const scale = Math.min(availableWidth / MAZE_WIDTH, availableHeight / MAZE_HEIGHT, 1.25);
  return { scale, top: NAV_CLEARANCE + (availableHeight - MAZE_HEIGHT * scale) / 2 };
}

export default function InteractiveMap({ projects, onAllDiscovered }: MapProps) {
  const [saved] = useState(loadProgress);
  const foxX = useMotionValue(saved.x);
  const foxY = useMotionValue(saved.y);
  const heldKeys = useRef<Set<string>>(new Set());
  const mouseTarget = useRef<{ x: number; y: number } | null>(null);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [nearbyTitle, setNearbyTitle] = useState<string | null>(null);
  const [discoveredProjects, setDiscoveredProjects] = useState<Set<string>>(
    () => new Set(saved.discovered.filter((title) => projects.some((p) => p.title === title)))
  );
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [fit, setFit] = useState({ scale: 1, top: NAV_CLEARANCE });
  const pointsPerProject = 250;
  const points = discoveredProjects.size * pointsPerProject;

  const discoverProject = (project: Project) => {
    setCurrentProject(project);
    if (!discoveredProjects.has(project.title)) {
      setDiscoveredProjects(new Set([...discoveredProjects, project.title]));
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    mouseTarget.current = {
      x: (relX - rect.width / 2) / fit.scale + MAZE_WIDTH / 2,
      y: (relY - fit.top) / fit.scale,
    };
  };

  const trees = useMemo(() => {
    const taken = new Set([
      ...cellsOnOrbRoutes(projects),
      ...CRYSTALS.map((crystal) => cellKey(crystal.col, crystal.row)),
    ]);

    const freeCells = Array.from({ length: COLS * ROWS }, (_, i) => ({
      col: i % COLS,
      row: Math.floor(i / COLS),
    })).filter((cell) => !taken.has(cellKey(cell.col, cell.row)));
    const inGrove = (cell: { col: number; row: number }) =>
      cell.col <= GROVE_LAST_COL && cell.row <= GROVE_LAST_ROW;

    const groveTrees = freeCells
      .filter(inGrove)
      .flatMap((cell) => [
        { ...cell, side: 0 },
        { ...cell, side: 1 },
      ]);
    const scatteredTrees = freeCells
      .filter((cell) => !inGrove(cell))
      .sort(() => Math.random() - 0.5)
      .slice(0, TREE_COUNT)
      .map((cell) => ({ ...cell, side: Math.random() }));

    return [...groveTrees, ...scatteredTrees].map((cell, i) => {
        const height = Math.round(64 + Math.random() * 20);
        const width = Math.round((height * 400) / 520);
        const room = CELL_SIZE - TREE_WALL_MARGIN * 2;
        return {
          src: TREE_IMAGES[i % TREE_IMAGES.length],
          width,
          height,
          left: cell.col * CELL_SIZE + TREE_WALL_MARGIN + cell.side * (room - width),
          top: cell.row * CELL_SIZE + TREE_WALL_MARGIN + Math.random() * (room - height),
        };
    });
  }, [projects]);

  useLayoutEffect(() => {
    const updateFit = () => setFit(computeFit());
    updateFit();
    window.addEventListener('resize', updateFit);
    return () => window.removeEventListener('resize', updateFit);
  }, []);

  useEffect(() => {
    if (currentProject || showLevelComplete) return;

    const held = heldKeys.current;
    // Same cell only, so an orb can't be reached through a wall.
    const projectAtFox = () =>
      projects.find(
        (project) =>
          toCell(project.x) === toCell(foxX.get()) &&
          toCell(project.y) === toCell(foxY.get())
      );
    setNearbyTitle(projectAtFox()?.title ?? null);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === 'Enter') {
        const project = projectAtFox();
        if (!project) return;
        discoverProject(project);
        return;
      }

      const key = e.key.toLowerCase();
      if (KEY_DIRECTIONS[key]) {
        e.preventDefault();
        held.add(key);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      // macOS sends no keyup for keys released while Cmd is held.
      if (e.key === 'Meta') held.clear();
      else held.delete(e.key.toLowerCase());
    };
    const releaseKeys = () => held.clear();

    let frame: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const seconds = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      let dirX = 0;
      let dirY = 0;
      held.forEach((key) => {
        dirX += KEY_DIRECTIONS[key][0];
        dirY += KEY_DIRECTIONS[key][1];
      });
      dirX = Math.sign(dirX);
      dirY = Math.sign(dirY);

      let moveX = 0;
      let moveY = 0;

      if (dirX || dirY) {
        // Keyboard takes priority over the cursor when both are active.
        const distance = FOX_SPEED * seconds * (dirX && dirY ? Math.SQRT1_2 : 1);
        moveX = dirX * distance;
        moveY = dirY * distance;
      } else if (mouseTarget.current) {
        const x = foxX.get();
        const y = foxY.get();
        const dx = mouseTarget.current.x - x;
        const dy = mouseTarget.current.y - y;
        const dist = Math.hypot(dx, dy);
        const deadzone = 6; // Stops the fox from jittering once it reaches the cursor.
        if (dist > deadzone) {
          const travel = Math.min(FOX_SPEED * seconds, dist - deadzone);
          moveX = (dx / dist) * travel;
          moveY = (dy / dist) * travel;
        }
      }

      if (moveX || moveY) {
        const x = foxX.get();
        const y = foxY.get();
        // Each axis is tested alone so the fox slides along a wall instead of sticking to it.
        const nextX = hitsWall(x + moveX, y) ? x : x + moveX;
        const nextY = hitsWall(nextX, y + moveY) ? y : y + moveY;
        foxX.set(nextX);
        foxY.set(nextY);
        if (moveX) setDirection(moveX < 0 ? 'left' : 'right');
        setNearbyTitle(projectAtFox()?.title ?? null);
      }

      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', releaseKeys);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', releaseKeys);
      releaseKeys();
    };
  }, [currentProject, showLevelComplete, projects, discoveredProjects, foxX, foxY]);

  useEffect(() => {
    saveProgress({
      discovered: [...discoveredProjects],
      x: foxX.get(),
      y: foxY.get(),
      levelCompleteSeen: saved.levelCompleteSeen,
    });
  }, [discoveredProjects, currentProject, saved, foxX, foxY]);

  // Waits for the last project to be closed so Level Complete can't cover it.
  useEffect(() => {
    const allFound = projects.length > 0 && discoveredProjects.size === projects.length;
    if (!allFound || currentProject || showLevelComplete || saved.levelCompleteSeen) return;
    const timer = setTimeout(() => setShowLevelComplete(true), 1000);
    return () => clearTimeout(timer);
  }, [discoveredProjects, projects.length, currentProject, showLevelComplete, saved]);

  return (
    <div className="relative w-full h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background is flat (from the page wrapper above, which spans the
          title + maze together) — no gradient/vignette/mist here, so the
          color stays consistent throughout the Woods screen. */}

      {/* Map container */}
      <div
        className="absolute left-1/2"
        style={{
          top: fit.top,
          width: MAZE_WIDTH,
          height: MAZE_HEIGHT,
          transform: `translateX(-50%) scale(${fit.scale})`,
          transformOrigin: 'top center',
        }}
      >
        <svg
          className="absolute inset-0 overflow-visible"
          width={MAZE_WIDTH}
          height={MAZE_HEIGHT}
          viewBox={`0 0 ${MAZE_WIDTH} ${MAZE_HEIGHT}`}
          style={{ filter: 'drop-shadow(0 0 10px rgba(120,182,226,0.6))' }}
        >
          <rect width={MAZE_WIDTH} height={MAZE_HEIGHT} fill="#12121f" opacity="0.75" />
          <path
            d={WALL_PATH}
            stroke="#78b6e2"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Glowing crystals */}
        {CRYSTALS.map((crystal, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: (crystal.col + 0.5) * CELL_SIZE - 12,
              top: (crystal.row + 0.5) * CELL_SIZE - 16,
            }}
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          >
            <svg width="24" height="32" viewBox="0 0 30 40">
              <path
                d="M 15 0 L 5 15 L 10 40 L 20 40 L 25 15 Z"
                fill={crystal.color}
                opacity="0.6"
                filter="blur(2px)"
              />
              <path
                d="M 15 5 L 10 18 L 12 35 L 18 35 L 20 18 Z"
                fill="white"
                opacity="0.8"
              />
            </svg>
          </motion.div>
        ))}

        {trees.map((tree, i) => (
          <Image
            key={i}
            src={tree.src}
            alt=""
            width={tree.width}
            height={tree.height}
            unoptimized
            className="absolute pointer-events-none"
            style={{ left: tree.left, top: tree.top }}
          />
        ))}

        {/* Project markers */}
        {projects.map((project) => {
          const isDiscovered = discoveredProjects.has(project.title);
          const isNear = nearbyTitle === project.title;

          return (
            <div
              key={project.title}
              className="absolute"
              style={{ left: project.x - 32, top: project.y - 32 }}
              onContextMenu={(e) => {
                e.preventDefault();
                if (isNear) discoverProject(project);
              }}
            >
              {/* Glow orb */}
              <motion.div
                className="relative w-16 h-16"
                animate={{
                  scale: isNear ? [1, 1.3, 1] : 1,
                }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {/* Outer glow */}
                <div className={`absolute inset-0 rounded-full blur-2xl ${
                  isDiscovered ? 'bg-purple-500/30' : 'bg-primary/55'
                } animate-pulse`} />

                {/* Middle layer */}
                <div className={`absolute inset-2 rounded-full blur-xl ${
                  isDiscovered ? 'bg-purple-400/60' : 'bg-primary/70'
                }`} />

                {/* Core */}
                <div className={`absolute inset-4 rounded-full ${
                  isDiscovered
                    ? 'bg-gradient-to-br from-purple-300 to-purple-600'
                    : 'bg-gradient-to-br from-[#bfe0f5] to-primary'
                }`} />

                {/* Center spark */}
                <motion.div
                  className="absolute inset-6 rounded-full bg-white"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Discovered mark */}
                {isDiscovered && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-white text-xs"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    ✓
                  </motion.div>
                )}
              </motion.div>

              {/* Project name hint */}
              {isNear && (
                <motion.div
                  className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 bg-card/95 border border-primary/40 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-xs text-foreground font-semibold">
                    {isDiscovered ? '✓ ' : ''}{project.title}
                  </p>
                  <p className="text-xs text-primary/70 mt-0.5">
                    Right-click or press <kbd className="px-1 py-0.5 bg-primary/20 rounded text-foreground/80">Enter</kbd> to {isDiscovered ? 'view' : 'discover'}
                  </p>
                </motion.div>
              )}
            </div>
          );
        })}

        {/* Fox character */}
        <motion.div
          className="absolute z-20"
          style={{
            x: foxX,
            y: foxY,
            left: -28,
            top: -23,
            scaleX: direction === 'right' ? -1 : 1,
          }}
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              viewBox="0 0 640 520"
              width="56"
              height="46"
              className="drop-shadow-[0_0_14px_rgba(120,182,226,0.7)]"
            >
              <defs>
                <linearGradient id="leg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#b8c6cc"/><stop offset=".45" stopColor="#7d8a90"/><stop offset="1" stopColor="#1f2427"/>
                </linearGradient>
                <linearGradient id="legBack" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#8f9ca2"/><stop offset=".5" stopColor="#565f64"/><stop offset="1" stopColor="#15191b"/>
                </linearGradient>
                <linearGradient id="t1" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#9aa4a8"/><stop offset="1" stopColor="#e3e8ea"/>
                </linearGradient>
                <linearGradient id="t2" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0" stopColor="#6f797d"/><stop offset="1" stopColor="#c3cbce"/>
                </linearGradient>
                <linearGradient id="ear" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#d9e2e6"/><stop offset="1" stopColor="#2b3236"/>
                </linearGradient>
              </defs>

              <g>
                <path d="M400 330 C420 230 470 120 560 40 C530 120 500 220 440 330Z" fill="url(#t2)"/>
                <path d="M405 330 C450 220 530 130 630 90 C570 160 520 250 450 335Z" fill="url(#t1)"/>
                <path d="M405 335 C470 260 560 200 640 190 C570 240 520 300 455 345Z" fill="url(#t2)"/>
                <path d="M400 330 C400 220 420 110 480 20 C470 110 460 220 430 330Z" fill="url(#t1)"/>
                <path d="M405 340 C480 300 570 290 635 300 C570 320 510 350 455 360Z" fill="url(#t1)"/>
                <path d="M400 345 C460 350 540 390 600 450 C530 420 470 400 420 380Z" fill="url(#t2)"/>
                <path d="M398 340 C440 380 480 440 500 500 C460 450 430 420 395 390Z" fill="url(#t1)"/>
                <g fill="#f4f7f8" opacity=".85">
                  <path d="M455 200 C480 150 510 110 545 70 C515 120 495 160 470 210Z"/>
                  <path d="M480 260 C520 210 570 170 615 120 C575 180 535 220 495 270Z"/>
                  <path d="M500 330 C550 315 590 310 625 305 C585 320 545 330 505 340Z"/>
                  <path d="M420 120 C430 90 445 60 465 40 C450 75 440 100 432 130Z"/>
                </g>
                <g fill="#4f585c" opacity=".6">
                  <path d="M430 300 C450 250 480 200 520 150 C495 205 470 250 445 305Z"/>
                  <path d="M470 380 C510 395 545 420 575 445 C540 430 505 415 465 395Z"/>
                </g>
                <path d="M600 450 C580 420 560 400 540 395 L600 450Z M500 500 C495 470 485 450 470 440Z" fill="#f4f7f8"/>
              </g>

              <path d="M190 330 L178 470 L170 498 L196 498 L204 470 L222 340Z" fill="url(#legBack)"/>
              <path d="M370 340 L392 420 L378 498 L402 498 L418 420 L405 335Z" fill="url(#legBack)"/>

              <path d="M150 230 C175 215 210 260 260 270 C320 280 380 270 410 300 C432 325 425 370 400 385 C350 395 280 385 240 380 C210 377 190 370 175 350 C150 320 140 270 150 230Z" fill="#c4d1d6"/>
              <path d="M190 360 C240 372 320 380 400 382 C380 392 300 392 240 386 C215 383 198 375 190 360Z" fill="#a3b1b7"/>

              <path d="M205 345 L200 470 L190 505 L220 505 L228 470 L245 360Z" fill="url(#leg)"/>
              <path d="M340 360 L355 420 L342 505 L370 505 L384 420 L390 360Z" fill="url(#leg)"/>
              <path d="M190 505 L196 496 L202 505Z M342 505 L348 496 L354 505Z" fill="#0f1214"/>

              <path d="M120 160 C160 150 200 170 215 210 L210 260 C185 250 160 245 140 250Z" fill="#2a3134"/>

              <path d="M120 170 L150 175 L135 200 L165 205 L140 228 L172 240 L148 262 L180 275 L158 300 L190 310 L170 335 L150 300 L140 330 L130 290 L118 305 L118 260 L105 270 L112 220 L98 225Z" fill="#eef3f5"/>

              <path d="M40 140 L60 132 C90 120 120 112 150 110 C175 110 195 125 200 150 C202 175 185 195 160 205 L140 215 L118 210 L120 196 L100 192 C80 178 60 160 40 150Z" fill="#c4d1d6"/>
              <path d="M42 147 C70 152 100 160 130 168 L120 182 C95 178 70 166 42 150Z" fill="#eef3f5"/>
              <path d="M120 196 L150 200 L138 214 L165 210 L150 228 L125 218Z" fill="#eef3f5"/>
              <path d="M30 140 L44 136 L46 148 L34 150Z" fill="#0f1214"/>
              <path d="M100 140 C110 136 122 136 132 142" fill="none" stroke="#1a1f22" strokeWidth="5" strokeLinecap="round"/>
              <path d="M104 132 C112 128 122 128 128 131" fill="none" stroke="#8e9ba1" strokeWidth="3" strokeLinecap="round"/>

              <path d="M175 120 L215 70 L210 150 L190 155Z" fill="#2a3134"/>
              <path d="M140 115 C140 80 155 45 178 20 C192 50 196 90 186 128 Z" fill="url(#ear)"/>
              <path d="M152 112 C153 85 163 60 176 40 C184 65 184 95 178 120Z" fill="#3a4246"/>
              <path d="M148 100 L160 104 L150 112 L165 116 L150 120Z" fill="#eef3f5"/>

              <g fill="#78b6e2">
                <circle cx="300" cy="320" r="5"/><circle cx="250" cy="300" r="3"/>
                <circle cx="470" cy="180" r="4"/><circle cx="540" cy="260" r="3"/>
              </g>
            </svg>
          </motion.div>

          {/* Fox glow */}
          <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl -z-10" />
        </motion.div>
      </div>

      {/* Points and progress HUD */}
      <motion.div
        className="fixed top-36 right-8 z-30 space-y-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        {/* Points counter */}
        <div className="px-6 py-3 bg-card/95 border-2 border-primary/40 rounded-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💎</span>
            <div>
              <p className="text-xs text-primary/70 uppercase tracking-wider">Points</p>
              <motion.p
                className="text-2xl font-bold text-foreground"
                key={points}
                initial={{ scale: 1.5, color: '#78b6e2' }}
                animate={{ scale: 1, color: '#eaf4fc' }}
                transition={{ duration: 0.3 }}
              >
                {points}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Progress tracker */}
        <div className="px-6 py-3 bg-card/95 border-2 border-primary/40 rounded-xl backdrop-blur-sm">
          <p className="text-xs text-primary/70 uppercase tracking-wider mb-2">Progress</p>
          <div className="flex gap-2">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  discoveredProjects.has(project.title)
                    ? 'bg-primary border-primary'
                    : 'bg-gray-700/50 border-gray-600'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                {discoveredProjects.has(project.title) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-white text-sm"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Controls hint */}
      <FixedToViewport>
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 px-6 py-3 bg-card/90 border-2 border-primary/40 rounded-full backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-foreground text-sm font-semibold text-center">
            Move with your cursor, arrow keys or WASD • Right-click or <kbd className="px-1.5 py-0.5 bg-primary/20 rounded text-foreground/80 text-xs">Enter</kbd> near orbs to explore
          </p>
        </motion.div>
      </FixedToViewport>

      {/* Project discovery modal */}
      <AnimatePresence>
        {currentProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCurrentProject(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/40 overflow-hidden shadow-2xl bloom-soft"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <TwinklingStars />

              {/* Magical particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 4,
                    height: 4,
                    background: "#f6c177",
                    boxShadow: "0 0 10px 5px rgba(246,193,119,0.45)",
                  }}
                  animate={{
                    y: [-20, -60, -20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              {/* Close button */}
              <motion.button
                onClick={() => setCurrentProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 border-2 border-primary/40 hover:border-primary/60 transition-all group"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-foreground/80 group-hover:text-foreground" />
              </motion.button>

              <div className="p-8 max-h-[calc(100dvh-2rem)] overflow-y-auto">
                <motion.div
                  className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/40 rounded-full mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-xs uppercase tracking-widest text-foreground/80 font-bold">
                    ✨ Discovery
                  </span>
                </motion.div>

                <motion.h2
                  className="font-display uppercase tracking-[0.04em] text-3xl text-foreground mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {currentProject.title}
                </motion.h2>

                <motion.p
                  className="text-muted-foreground mb-6 leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentProject.description}
                </motion.p>

                {currentProject.image && (
                  <motion.div
                    className="relative aspect-video rounded-xl overflow-hidden border border-primary/30 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                )}

                <motion.div
                  className="flex flex-wrap gap-2 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentProject.tags.map((tag, i) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-foreground/80"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>

                {currentProject.link ? (
                  <Link href={currentProject.link}>
                    <motion.button
                      className="w-full px-6 py-3 bg-primary rounded-full text-primary-foreground font-semibold hover:bloom-soft transition-all inline-flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Full Project
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                    onClick={() => setCurrentProject(null)}
                    className="w-full px-6 py-3 bg-primary rounded-full text-primary-foreground font-semibold hover:bloom-soft transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Continue Exploring
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Complete Modal */}
      <AnimatePresence>
        {showLevelComplete && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-lg w-full bg-gradient-to-br from-card to-background rounded-2xl border-2 border-primary/40 overflow-hidden bloom-soft"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
            >
              <TwinklingStars />

              {/* Celebration particles */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: 8,
                    height: 8,
                    background: "#f6c177",
                    boxShadow: "0 0 16px 8px rgba(246,193,119,0.45)",
                  }}
                  animate={{
                    y: [-100, 100],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}

              <div className="relative z-10 p-8 text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  ⭐
                </motion.div>

                <h2 className="font-display uppercase tracking-[0.1em] text-4xl text-foreground mb-3 text-bloom-soft">
                  Level Complete!
                </h2>

                <div className="mb-6">
                  <motion.p
                    className="font-display text-5xl text-primary mb-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.3 }}
                  >
                    {points}
                  </motion.p>
                  <p className="text-muted-foreground text-sm uppercase tracking-wider">Points Earned</p>
                </div>

                <p className="text-muted-foreground mb-8">
                  All projects discovered! Ready for the next level?
                </p>

                <button
                  onClick={() => {
                    saveProgress({
                      discovered: [...discoveredProjects],
                      x: foxX.get(),
                      y: foxY.get(),
                      levelCompleteSeen: true,
                    });
                    onAllDiscovered();
                  }}
                  className="w-full px-6 py-4 bg-primary rounded-full text-primary-foreground font-bold text-lg hover:bloom-soft transition-all inline-flex items-center justify-center gap-2"
                >
                  Next Level: Adventure Archive
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
