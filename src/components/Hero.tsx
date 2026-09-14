import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, SplitText, prefersReduced } from "../lib/gsap";

const SCRAMBLE_CHARS = "!<>-_\\/**#?@";

function scrambleText(el: HTMLElement, targetText: string) {
  const originalText = targetText;
  const letters = targetText.split("");
  let iteration = 0;

  const interval = setInterval(() => {
    el.innerText = letters
      .map((letter, index) => {
        if (index < iteration) return originalText[index];
        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      })
      .join("");

    if (iteration >= letters.length) clearInterval(interval);
    iteration += 1 / 3;
  }, 30);
}

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReduced()) return;

    const split = new SplitText(".hero-title", { type: "chars" });
    const ctx = gsap.context(() => {
      gsap.from(split.chars, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.018,
        onComplete: () => {
          split.chars.forEach((char, i) => {
            const el = char as HTMLElement;
            setTimeout(() => {
              scrambleText(el, el.innerText);
            }, i * 20);
          });
        },
      });
      gsap.from(".hero-sub", {
        y: 12,
        opacity: 0,
        duration: 0.6,
        delay: 0.35,
        ease: "expo.out",
      });
      gsap.from(".hero-cta", {
        y: 10,
        opacity: 0,
        duration: 0.5,
        delay: 0.5,
        stagger: 0.08,
        ease: "expo.out",
      });
    }, root);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      className="min-h-[100dvh] max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-6 pt-24 pb-12 relative"
      style={{ zIndex: 10 }}
    >
      <div>
        <p className="font-mono text-xs text-muted uppercase tracking-widest">
          SYS.06 — LIGHT LAB EDITION
        </p>
        <h1 className="hero-title font-display font-bold tracking-tighter leading-none text-4xl md:text-5xl lg:text-6xl mt-4">
          Robots built<br />for daylight.
        </h1>
        <p className="hero-sub text-base text-muted leading-relaxed max-w-[45ch] mt-4">
          Five machines, one lab. Realtime 3D, calm motion, honest specs.
        </p>
        <div className="flex gap-3 mt-6">
          <a
            href="#work"
            className="hero-cta rounded-full bg-accent text-white px-6 py-3 font-medium active:scale-[0.98] transition-transform"
          >
            View work
          </a>
          <a
            href="#contact"
            className="hero-cta rounded-full border border-line px-6 py-3 font-medium hover:bg-surface transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
      <div
        id="hero-stage"
        className="min-h-[420px] rounded-2xl bg-surface/80 border border-line relative overflow-hidden"
      />
    </section>
  );
}
