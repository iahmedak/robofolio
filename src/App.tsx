import { lazy, Suspense } from "react";
import { PillNav } from "./components/PillNav";
import { Hero } from "./components/Hero";
import { AmbientGradient } from "./components/AmbientGradient";

const RobotStage = lazy(() =>
  import("./components/RobotStage").then((m) => ({ default: m.RobotStage }))
);

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-base text-ink antialiased">
      <AmbientGradient />
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
    </div>
  );
}



