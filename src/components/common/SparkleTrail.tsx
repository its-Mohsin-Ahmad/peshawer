import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  glowColor: string;
  isCrossSparkle: boolean;
  shimmerOffset: number;
}

const GOLD_PALETTES = [
  { color: '#FFEFA6', glow: '#FFD700' },
  { color: '#FFD700', glow: '#FFA500' },
  { color: '#FFC83D', glow: '#E6AA27' },
  { color: '#FFF8DB', glow: '#FFDF70' },
  { color: '#FADB14', glow: '#D48806' },
];

export const SparkleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastEmitTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);
  const isScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5); // 1.5x is optimal for high visual crispness & high fps

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Detect active scrolling to throttle effects during momentum scroll
    const handleScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Draw 4-point cross star
    const drawCrossSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      alpha: number,
      color: string,
      glow: string
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();

      const inner = size * 0.22;
      for (let i = 0; i < 4; i++) {
        const armAngle = (i * Math.PI) / 2;
        const armX = Math.cos(armAngle) * size;
        const armY = Math.sin(armAngle) * size;
        const innerAngle = armAngle + Math.PI / 4;
        const innerX = Math.cos(innerAngle) * inner;
        const innerY = Math.sin(innerAngle) * inner;

        if (i === 0) c.moveTo(armX, armY);
        else c.lineTo(armX, armY);
        c.lineTo(innerX, innerY);
      }
      c.closePath();

      if (alpha > 0.4) {
        c.shadowColor = glow;
        c.shadowBlur = 6;
      }
      c.fillStyle = color;
      c.globalAlpha = Math.max(0, Math.min(1, alpha));
      c.fill();

      // Core white sparkle
      c.beginPath();
      c.arc(0, 0, inner * 0.8, 0, Math.PI * 2);
      c.fillStyle = '#FFFFFF';
      c.fill();

      c.restore();
    };

    // Draw soft golden fairy dust orb
    const drawFairyDust = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      alpha: number,
      color: string,
      glow: string
    ) => {
      c.save();
      c.beginPath();
      c.arc(x, y, size, 0, Math.PI * 2);

      if (alpha > 0.4) {
        c.shadowColor = glow;
        c.shadowBlur = 5;
      }
      c.fillStyle = color;
      c.globalAlpha = Math.max(0, Math.min(1, alpha));
      c.fill();

      // Subtle center dot
      c.beginPath();
      c.arc(x, y, Math.max(0.5, size * 0.4), 0, Math.PI * 2);
      c.fillStyle = '#FFFFFF';
      c.fill();

      c.restore();
    };

    const loop = (timestamp: number) => {
      const particles = particlesRef.current;
      if (particles.length === 0) {
        ctx.clearRect(0, 0, width, height);
        isRunningRef.current = false;
        animFrameRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        const shimmer = 0.88 + 0.12 * Math.sin(timestamp * 0.015 + p.shimmerOffset);
        const currentAlpha = p.alpha * shimmer;

        if (p.alpha <= 0.03) {
          particles.splice(i, 1);
          continue;
        }

        if (p.isCrossSparkle) {
          drawCrossSparkle(
            ctx,
            p.x,
            p.y,
            p.size * shimmer,
            p.rotation,
            currentAlpha,
            p.color,
            p.glowColor
          );
        } else {
          drawFairyDust(
            ctx,
            p.x,
            p.y,
            p.size * shimmer,
            currentAlpha,
            p.color,
            p.glowColor
          );
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animFrameRef.current = requestAnimationFrame(loop);
    };

    const startAnimation = () => {
      if (!isRunningRef.current) {
        isRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    const spawnParticles = (x: number, y: number, count = 2) => {
      const particles = particlesRef.current;

      // Cap active particle count strictly for guaranteed 60+ FPS on all devices
      if (particles.length > 70) {
        particles.splice(0, particles.length - 70);
      }

      for (let i = 0; i < count; i++) {
        const palette = GOLD_PALETTES[Math.floor(Math.random() * GOLD_PALETTES.length)];
        const isCross = Math.random() < 0.45;

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 0.3;

        const size = isCross ? 5.5 + Math.random() * 5.5 : 1.8 + Math.random() * 2.8;

        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx,
          vy,
          size,
          alpha: 0.95,
          decay: isCross ? 0.026 + Math.random() * 0.015 : 0.022 + Math.random() * 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
          color: palette.color,
          glowColor: palette.glow,
          isCrossSparkle: isCross,
          shimmerOffset: Math.random() * 100,
        });
      }

      startAnimation();
    };

    // Desktop Mouse Pointer Move (Throttled to 30ms to maintain smooth scroll & cursor performance)
    const handlePointerMove = (e: PointerEvent) => {
      // Ignore touch here because touch has its own dedicated handler
      if (e.pointerType === 'touch') return;

      const now = performance.now();
      if (now - lastEmitTimeRef.current < (isScrollingRef.current ? 45 : 28)) return;
      lastEmitTimeRef.current = now;

      spawnParticles(e.clientX, e.clientY, 2);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      spawnParticles(e.clientX, e.clientY, 4);
    };

    // Mobile / Tablet Touch (lightweight, non-blocking)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const now = performance.now();
        // Light emission during swipe so momentum scrolling stays 100% butter smooth
        if (now - lastEmitTimeRef.current < 45) return;
        lastEmitTimeRef.current = now;

        const touch = e.touches[0];
        spawnParticles(touch.clientX, touch.clientY, 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        spawnParticles(touch.clientX, touch.clientY, 3);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[999999] w-full h-full select-none"
      aria-hidden="true"
    />
  );
};
