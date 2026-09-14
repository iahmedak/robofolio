// Adapted from CULT-UI Shift Card (MIT, cult-ui.com) — restyled to robo tokens.
import { motion } from "motion/react";
import { useRef } from "react";
import { gsap } from "gsap";

export function ShiftCard({
  title,
  meta,
  blurb,
  visual,
  specs,
}: {
  title: string;
  meta: string;
  blurb: string;
  visual: string;
  specs?: { label: string; value: string }[];
}) {
  const cardRef = useRef<any>(null);
  const scanlineRef = useRef<any>(null);
  const specsRef = useRef<any>(null);

  const handleMouseEnter = () => {
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
    });

    tl.to(scanlineRef.current, {
      top: "100%",
      opacity: 1,
      duration: 0.4,
    })
    .to(scanlineRef.current, {
      opacity: 0,
      duration: 0.2,
    })
    .to(specsRef.current?.children as any, {
      opacity: 1,
      y: 0,
      stagger: 0.04,
      duration: 0.4,
    }, "-=0.2");
  };

  return (
    <motion.article
      ref={cardRef as any}
      onMouseEnter={handleMouseEnter}
      whileHover={{ y: -12, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="group w-[85vw] md:w-[34rem] shrink-0 rounded-3xl bg-surface/60 border border-line backdrop-blur-sm overflow-hidden transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 will-change-transform"
    >
      <div className="aspect-[16/10] bg-base relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none" />
        <div className="w-full h-full grid place-items-center font-mono text-[10px] text-muted uppercase tracking-widest opacity-40">
          {visual}
        </div>
        {/* Scanline */}
        <div
          ref={scanlineRef}
          className="absolute top-0 left-0 w-full h-[2px] bg-accent shadow-[0_0_15px_rgba(43,92,255,0.8)] opacity-0 pointer-events-none z-10"
        />
        {/* Glass Overlay on Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-surface/20 backdrop-blur-md flex items-center justify-center transition-opacity"
        />
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display text-3xl tracking-tight group-hover:text-accent transition-colors duration-300">{title}</h3>
            <p className="font-mono text-xs text-muted mt-1 opacity-60">{meta}</p>
          </div>
        </div>
        <p className="text-sm text-muted mt-4 max-w-[55ch] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
          {blurb}
        </p>
        {specs && (
          <div ref={specsRef} className="flex flex-wrap gap-2 mt-6">
            {specs.map((s, i) => (
              <div key={i} className="px-2 py-1 rounded-md bg-base border border-line font-mono text-[9px] text-muted opacity-0 translate-y-2">
                <span className="text-accent font-bold">{s.label}:</span> {s.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
