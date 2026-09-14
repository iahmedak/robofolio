import { lazy, Suspense, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, ScrollSmoother, prefersReduced } from "./lib/gsap";
import { AmbientGradient } from "./components/AmbientGradient";
import { TrailField } from "./components/TrailField";
import { PillNav } from "./components/PillNav";
import { Hero } from "./components/Hero";
import { WorkIndex } from "./components/WorkIndex";
import { LabBento } from "./components/LabBento";
import { ProcessStack } from "./components/ProcessStack";
import { ContactFooter } from "./components/ContactFooter";

const RobotStage = lazy(() =>
  import("./components/RobotStage").then((m) => ({ default: m.RobotStage }))
);

export default function App() {
  const [progress, setProgress] = useState(0);
  const glitchRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReduced()) return;

    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: false,
    });

    const trigger = ScrollTrigger.create({
      trigger: "#smooth-content",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self: { progress: number; getVelocity: () => number }) => {
        setProgress(self.progress);

        // Trigger a subtle glitch effect based on velocity
        const vel = Math.abs(self.getVelocity());
        if (vel > 1000) {
          gsap.to(glitchRef.current, {
            opacity: Math.min(vel / 5000, 0.3),
            duration: 0.1,
          });
        } else {
          gsap.to(glitchRef.current, {
            opacity: 0,
            duration: 0.3,
          });
        }
      },
    });

    return () => {
      smoother.kill();
      trigger.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper" className="min-h-[100dvh] bg-base text-ink antialiased">
      <div id="smooth-content" className="relative">
        <AmbientGradient />
        <TrailField />
        <PillNav />

        {/* Global Glitch Overlay */}
        <div
          ref={glitchRef}
          className="fixed inset-0 pointer-events-none z-[100] opacity-0 mix-blend-difference bg-[url('https://grainy-grads.vercel.app/noise.svg')] contrast-150 brightness-150"
        />

        {/* 3D World - Fixed Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Suspense fallback={<div className="w-full h-full bg-base" />}>
            <RobotStage scrollProgress={progress} />
          </Suspense>
        </div>

        {/* HTML Overlays - Scrollable Content */}
        <div className="relative z-10">
          <Hero />
          <WorkIndex />
          <LabBento />
          <ProcessStack />
          <ContactFooter />
        </div>
      </div>
    </div>
  );
}
