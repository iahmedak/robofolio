import { PillNav } from "./components/PillNav";
import { Hero } from "./components/Hero";

export default function App() {
  return (
    <div className="min-h-[100dvh] bg-base text-ink antialiased">
      <PillNav />
      <Hero />
    </div>
  );
}

