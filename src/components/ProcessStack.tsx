import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "../lib/gsap";

const steps = [
  "Probe — site visit, light test.",
  "Prototype — pose it in browser.",
  "Harden — 60fps, focus, contrast.",
  "Hand off — docs, models, site.",
];

export function ProcessStack() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });

        gsap.to(card, {
          scale: 0.92,
          opacity: 0.55,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={ref} className="relative" style={{ zIndex: 10 }}>
      {steps.map((s, i) => (
        <div
          key={s}
          className="stack-card sticky top-0 min-h-[100dvh] flex items-center justify-center px-6"
        >
          <div className="max-w-2xl w-full rounded-2xl bg-surface border border-line p-10">
            <p className="font-mono text-xs text-muted">0{i + 1}</p>
            <p className="font-display text-3xl mt-2">{s}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
