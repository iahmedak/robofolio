export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-line mt-12 relative bg-surface/80 backdrop-blur"
      style={{ zIndex: 10 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row justify-between gap-8">
        <h2 className="font-display text-4xl md:text-6xl tracking-tighter leading-none">
          Have a robot<br />in mind?
        </h2>
        <div className="flex items-start gap-3">
          <a
            href="#work"
            className="rounded-full bg-accent text-white px-6 py-3 font-medium transition-transform active:scale-95"
          >
            View work
          </a>
          <a
            href="mailto:hello@robolab.example"
            className="rounded-full border border-line px-6 py-3 font-medium hover:bg-surface transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
      <p className="text-center font-mono text-xs text-muted pb-8">
        ROBO/LAB — GSAP + three.js + ShaderGradient + CULT-UI
      </p>
    </footer>
  );
}
