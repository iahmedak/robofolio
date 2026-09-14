import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, prefersReduced } from "../lib/gsap";

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced()) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current!.children, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: "expo.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
