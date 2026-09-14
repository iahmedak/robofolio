import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { tokens } from "../tokens";

export function PillNav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const v = Math.min(Math.abs(self.getVelocity()), 4000) / 4000;
        gsap.to(ref.current, {
          scale: 1 - v * 0.06,
          duration: 0.3,
          ease: "expo.out",
          overwrite: "auto",
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <header
      ref={ref}
      style={{ zIndex: tokens.zIndex.nav }}
      className="fixed top-4 left-1/2 -translate-x-1/2 rounded-full border border-line bg-white/60 backdrop-blur-xl shadow-sm"
    >
      <nav
        className="flex items-center gap-6 px-6 h-12 text-sm"
        aria-label="Main navigation"
      >
        <span className="font-display font-bold tracking-tight">ROBO/LAB</span>
        <a href="#work" className="hover:text-accent transition-colors" aria-label="Go to Work section">Work</a>
        <a href="#lab" className="hover:text-accent transition-colors" aria-label="Go to Lab section">Lab</a>
        <a href="#process" className="hover:text-accent transition-colors" aria-label="Go to Process section">Process</a>
        <a
          href="#work"
          className="rounded-full bg-accent text-white px-4 py-1.5 font-medium transition-transform active:scale-95"
          aria-label="Quick view work"
        >
          View work
        </a>
      </nav>
    </header>
  );
}
