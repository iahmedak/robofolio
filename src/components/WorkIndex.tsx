import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";
import { projects } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

export function WorkIndex() {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced() || !wrap.current || !track.current) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      const dist = track.current!.scrollWidth - window.innerWidth;
      gsap.to(track.current, {
        x: -dist,
        ease: "none",
        scrollTrigger: {
          trigger: wrap.current,
          start: "top top",
          end: () => `+=${dist}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={wrap}
      className="relative overflow-hidden py-24"
      style={{ zIndex: 10 }}
    >
      <h2 className="font-display text-3xl md:text-5xl tracking-tighter px-6 max-w-7xl mx-auto">
        Selected builds
      </h2>
      <div
        ref={track}
        className="flex gap-6 px-6 mt-8 md:h-[100dvh] md:items-center overflow-x-auto md:overflow-visible"
      >
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}
