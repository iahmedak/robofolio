import { PillNav } from "./components/PillNav";
import { Hero } from "./components/Hero";
import { AmbientGradient } from "./components/AmbientGradient";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-base text-ink antialiased">
      <AmbientGradient />
      <PillNav />
      <Hero />
    </div>
  );
}


