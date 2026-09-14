import { useEffect, useRef } from "react";
import { prefersReduced } from "../lib/gsap";

export function TrailField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (prefersReduced() || !ref.current) return;

    const cv = ref.current;
    const ctx = cv.getContext("2d")!;
    let pts: { x: number; y: number; life: number }[] = [];

    const move = (e: PointerEvent) => {
      pts.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (pts.length > 60) pts.shift();
    };

    let raf = 0;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.strokeStyle = "rgba(16,20,24,0.18)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      pts.forEach((p, i) => {
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        p.life -= 0.02;
      });
      ctx.stroke();
      pts = pts.filter((p) => p.life > 0);
      raf = requestAnimationFrame(tick);
    };

    const resize = () => {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };

    resize();
    window.addEventListener("pointermove", move);
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (typeof window !== "undefined" && prefersReduced()) return null;

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  );
}
