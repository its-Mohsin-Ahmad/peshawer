import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant = 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight' | 'scaleIn';

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  threshold?: number; // 0–1, default 0.15
  once?: boolean;
}

/**
 * Lightweight scroll-reveal hook using GSAP ScrollTrigger.
 * Returns a ref to attach to a container element.
 * If `stagger` is provided, animates all direct child elements in sequence.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const {
    variant = 'fadeUp',
    delay = 0,
    duration = 0.75,
    stagger = 0,
    threshold = 0.12,
    once = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const targets = stagger > 0 ? Array.from(el.children) as HTMLElement[] : [el];

    const fromVars: gsap.TweenVars = { opacity: 0 };
    const toVars: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
      stagger: stagger || 0,
    };

    switch (variant) {
      case 'fadeUp':
        fromVars.y = 24;
        toVars.y = 0;
        break;
      case 'fadeLeft':
        fromVars.x = -28;
        toVars.x = 0;
        break;
      case 'fadeRight':
        fromVars.x = 28;
        toVars.x = 0;
        break;
      case 'scaleIn':
        fromVars.scale = 0.94;
        toVars.scale = 1;
        break;
      case 'fadeIn':
      default:
        break;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: `top ${(1 - threshold) * 100}%`,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, threshold, once]);

  return ref;
}

