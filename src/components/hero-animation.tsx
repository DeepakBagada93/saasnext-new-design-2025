
'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const GRID_SIZE = 20; // Reduced for performance
const PARTICLE_COUNT = 25; // Reduced for performance

export function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const ctx = gsap.context(() => {
      // Grid line animation
      gsap.to('.grid-line', {
        opacity: () => gsap.utils.random(0.05, 0.2),
        duration: 2.5,
        stagger: {
          each: 0.2,
          from: 'random',
        },
        repeat: -1,
        yoyo: true,
      });

      // Particle animation
      gsap.utils.toArray<SVGElement>('.particle').forEach((particle) => {
        gsap.to(particle, {
          x: `random(-50, 50)vw`,
          y: `random(-50, 50)vh`,
          opacity: () => gsap.utils.random(0, 0.15),
          duration: () => gsap.utils.random(15, 35),
          ease: 'power1.inOut',
          repeat: -1,
          yoyo: true,
        });
      });

      let mm: gsap.MatchMedia;
      let mouseMoveHandler: (e: MouseEvent) => void;

      // Only add mousemove listener on non-touch devices
      mm = gsap.matchMedia();
      mm.add("(hover: hover)", () => {
        mouseMoveHandler = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const xPercent = (clientX / window.innerWidth - 0.5);
          const yPercent = (clientY / window.innerHeight - 0.5);
          
          gsap.to(containerRef.current, {
            x: -xPercent * 25, // Reduced intensity
            y: -yPercent * 25, // Reduced intensity
            duration: 1.5,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        };

        window.addEventListener('mousemove', mouseMoveHandler);
      });

      return () => {
        if (mouseMoveHandler) {
          window.removeEventListener('mousemove', mouseMoveHandler);
        }
        mm?.revert();
        gsap.killTweensOf('.grid-line, .particle');
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-[-20px] z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10"></div>
      
      {/* Grid */}
      <div className="absolute inset-0">
        <div className="grid-background absolute inset-0">
          {[...Array(GRID_SIZE)].map((_, i) => (
            <div key={`h-${i}`} className="grid-line absolute h-full w-px bg-primary/5 opacity-10" style={{ left: `${(i / GRID_SIZE) * 100}%` }} />
          ))}
          {[...Array(GRID_SIZE)].map((_, i) => (
            <div key={`v-${i}`} className="grid-line absolute w-full h-px bg-primary/5 opacity-10" style={{ top: `${(i / GRID_SIZE) * 100}%` }} />
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
            r={Math.random() * 1.5 + 0.5}
            fill="hsl(var(--primary))"
            opacity="0"
          />
        ))}
      </svg>
    </div>
  );
}
