import { Reveal } from "./Reveal";

const cells = [
  {
    t: "Daylight-first 3D",
    d: "High-key studio lighting, soft shadows. Built to survive office glare.",
  },
  {
    t: "Calm motion",
    d: "One entrance, scroll reveals, pointer field. Nothing loops without reason.",
  },
  {
    t: "Honest specs",
    d: "Cards with why-it-matters, not 20-row tables.",
  },
  {
    t: "Real images",
    d: "TODO: hero rig photo 1600x1200, lab bench 1200x900.",
  },
  {
    t: "Accessible",
    d: "AA contrast, keyboard focus, reduced-motion static.",
  },
];

export function LabBento() {
  return (
    <section id="lab" className="max-w-7xl mx-auto px-6 py-24 relative" style={{ zIndex: 10 }}>
      <h2 className="font-display text-3xl md:text-5xl tracking-tighter">
        The lab
      </h2>
      <Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="rounded-2xl bg-ink text-white p-8 md:col-span-2 min-h-[280px]">
            <h3 className="font-display text-2xl">{cells[0].t}</h3>
            <p className="text-white/70 mt-2">{cells[0].d}</p>
          </div>
          {cells.slice(1).map((c) => (
            <div
              key={c.t}
              className="rounded-2xl bg-surface border border-line p-6 min-h-[180px]"
            >
              <h3 className="font-display text-xl">{c.t}</h3>
              <p className="text-sm text-muted mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
