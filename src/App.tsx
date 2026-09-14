import { lazy, Suspense } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, prefersReduced } from "./lib/gsap";
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
  useGSAP(() => {
    if (prefersReduced()) return;

    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: false,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper" className="min-h-[100dvh] bg-base text-ink antialiased">
      <div id="smooth-content">
        <AmbientGradient />
        <TrailField />
        <PillNav />
        <div className="relative">
          <Hero />
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none flex justify-end items-center px-6">
            <div className="w-full md:w-1/2 h-[500px] pointer-events-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full animate-pulse bg-line/40 rounded-2xl" />
                }
              >
                <RobotStage />
              </Suspense>
            </div>
          </div>
        </div>
        <WorkIndex />
        <LabBento />
        <ProcessStack />
        <ContactFooter />
      </div>
    </div>
  );
}





