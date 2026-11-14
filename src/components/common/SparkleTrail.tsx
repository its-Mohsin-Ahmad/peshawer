import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
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
  { color: '#FFEFA6', glow: '#FFD700' }, // Pale bright gold
  { color: '#FFD700', glow: '#FFA500' }, // Classic golden shine
  { color: '#FFC83D', glow: '#E6AA27' }, // Rich warm amber gold
  { color: '#FFF8DB', glow: '#FFDF70' }, // Diamond white-gold
  { color: '#FADB14', glow: '#D48806' }, // Vivid imperial gold
];

export const SparkleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    // Draw a 4-point cross star / sparkle
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

      c.shadowColor = glow;
      c.shadowBlur = size * 1.5;
      c.fillStyle = color;
      c.globalAlpha = Math.max(0, Math.min(1, alpha));
      c.fill();

      // Core high-intensity white spark center
      c.beginPath();
      c.arc(0, 0, inner * 0.8, 0, Math.PI * 2);
      c.fillStyle = '#FFFFFF';
      c.shadowBlur = size * 2;
      c.shadowColor = '#FFFFFF';
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

      c.shadowColor = glow;
      c.shadowBlur = size * 2.5;
      c.fillStyle = color;
      c.globalAlpha = Math.max(0, Math.min(1, alpha));
      c.fill();

      // Subtle bright core
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

      // Composite operation for vivid radiant glow
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.rotation += p.rotationSpeed;

        // Shimmer twinkle
        const shimmer = 0.85 + 0.15 * Math.sin(timestamp * 0.015 + p.shimmerOffset);
        const currentAlpha = p.alpha * shimmer;

        if (p.alpha <= 0.02) {
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

      // Reset composite operation
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

      // Cap maximum active particles for top 60+ FPS performance
      if (particles.length > 120) {
        particles.splice(0, particles.length - 120);
      }

      for (let i = 0; i < count; i++) {
        const palette = GOLD_PALETTES[Math.floor(Math.random() * GOLD_PALETTES.length)];
        const isCross = Math.random() < 0.45; // 45% cross sparkles, 55% fairy dust

        const angle = Math.random() * Math.PI * 2;
        const speed = 0.4 + Math.random() * 1.6;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed - 0.35; // Gentle upward drift

        const maxSize = isCross ? 6 + Math.random() * 7 : 2 + Math.random() * 3.5;

        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx,
          vy,
          size: maxSize,
          maxSize,
          alpha: 0.95 + Math.random() * 0.05,
          decay: isCross ? 0.022 + Math.random() * 0.015 : 0.018 + Math.random() * 0.015,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1,
          color: palette.color,
          glowColor: palette.glow,
          isCrossSparkle: isCross,
          shimmerOffset: Math.random() * 100,
        });
      }

      startAnimation();
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (!lastPosRef.current) {
        lastPosRef.current = { x: clientX, y: clientY };
        spawnParticles(clientX, clientY, 2);
        return;
      }

      const dx = clientX - lastPosRef.current.x;
      const dy = clientY - lastPosRef.current.y;
      const dist = Math.hypot(dx, dy);

      // Interpolate if cursor moved quickly so trail is seamless
      if (dist > 6) {
        const steps = Math.min(Math.floor(dist / 8), 4);
        for (let s = 1; s <= steps; s++) {
          const ix = lastPosRef.current.x + (dx * s) / steps;
          const iy = lastPosRef.current.y + (dy * s) / steps;
          spawnParticles(ix, iy, 1);
        }
        spawnParticles(clientX, clientY, 2);
        lastPosRef.current = { x: clientX, y: clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const clientX = touch.clientX;
        const clientY = touch.clientY;

        if (!lastPosRef.current) {
          lastPosRef.current = { x: clientX, y: clientY };
          spawnParticles(clientX, clientY, 3);
          return;
        }

        const dx = clientX - lastPosRef.current.x;
        const dy = clientY - lastPosRef.current.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 5) {
          const steps = Math.min(Math.floor(dist / 7), 4);
          for (let s = 1; s <= steps; s++) {
            const ix = lastPosRef.current.x + (dx * s) / steps;
            const iy = lastPosRef.current.y + (dy * s) / steps;
            spawnParticles(ix, iy, 1);
          }
          spawnParticles(clientX, clientY, 2);
          lastPosRef.current = { x: clientX, y: clientY };
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        lastPosRef.current = { x: touch.clientX, y: touch.clientY };
        spawnParticles(touch.clientX, touch.clientY, 4);
      }
    };

    const handlePointerDown = (e: MouseEvent | PointerEvent) => {
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      spawnParticles(e.clientX, e.clientY, 5);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
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
