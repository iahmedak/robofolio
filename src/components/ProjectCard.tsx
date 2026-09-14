import type { RobotProject } from "../data/projects";
import { ShiftCard } from "./cult/ShiftCard";

export function ProjectCard({ p }: { p: RobotProject }) {
  return (
    <ShiftCard
      title={p.title}
      meta={`${p.role} · ${p.year}`}
      blurb={p.blurb}
      visual={`${p.slug} — visual slot`}
      specs={p.specs}
    />
  );
}
