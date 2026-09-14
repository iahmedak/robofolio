// Adapted from CULT-UI Shift Card (MIT, cult-ui.com) — restyled to robo tokens.
import { motion } from "motion/react";

export function ShiftCard({
  title,
  meta,
  blurb,
  visual,
}: {
  title: string;
  meta: string;
  blurb: string;
  visual: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-[78vw] md:w-[34rem] shrink-0 rounded-2xl bg-surface border border-line overflow-hidden transition-shadow hover:shadow-xl"
    >
      <div className="aspect-[16/10] bg-base grid place-items-center font-mono text-xs text-muted">
        {visual}
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl tracking-tight">{title}</h3>
        <p className="font-mono text-xs text-muted mt-1">{meta}</p>
        <p className="text-sm text-muted mt-3 max-w-[55ch] opacity-80 group-hover:opacity-100 transition-opacity">
          {blurb}
        </p>
      </div>
    </motion.article>
  );
}
