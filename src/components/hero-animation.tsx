
'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

const GRID_SIZE = 30;
const PARTICLE_COUNT = 50;

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true });

      // Grid line animation
      tl.to('.grid-line', {
        opacity: () => gsap.utils.random(0.1, 0.4),
        duration: 2,
        stagger: {
          each: 0.1,
          from: 'random',
          grid: 'auto',
        },
      });

      // Particle animation
      gsap.utils.toArray<SVGElement>('.particle').forEach((particle) => {
        gsap.to(particle, {
          x: `random(-100, 100)vw`,
          y: `random(-100, 100)vh`,
          opacity: () => gsap.utils.random(0, 0.3),
          duration: () => gsap.utils.random(10, 30),
          ease: 'power2.out',
          repeat: -1,
          yoyo: true,
        });
      });

      // Parallax effect on mouse move
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPercent = (clientX / window.innerWidth - 0.5) * 2;
        const yPercent = (clientY / window.innerHeight - 0.5) * 2;
        
        gsap.to(containerRef.current, {
          x: -xPercent * 50,
          y: -yPercent * 50,
          duration: 1,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        gsap.killTweensOf('.grid-line');
        gsap.killTweensOf('.particle');
        gsap.killTweensOf(containerRef.current);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-[-50px] z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
      
      {/* Grid */}
      <div className="absolute inset-0">
        <div className="grid-background absolute inset-0">
          {[...Array(GRID_SIZE)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line absolute h-full w-px bg-primary/10 opacity-20" style={{ left: `${(i / GRID_SIZE) * 100}%` }} />
          ))}
          {[...Array(GRID_SIZE)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line absolute w-full h-px bg-primary/10 opacity-20" style={{ top: `${(i / GRID_SIZE) * 100}%` }} />
          ))}
        </div>
      </div>

      {/* Particles */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[...Array(PARTICLE_COUNT)].map((_, i) => (
          <circle
            key={i}
            className="particle"
            cx={Math.random() * 100 + '%'}
            cy={Math.random() * 100 + '%'}
            r={Math.random() * 2 + 1}
            fill="hsl(var(--primary))"
            opacity="0"
          />
        ))}
      </svg>
    </div>
  );
}
