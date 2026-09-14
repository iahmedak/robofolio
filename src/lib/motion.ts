import { animate, stagger } from "animejs";

export function fadeUp(targets: string) {
  return animate(targets, {
    y: [24, 0],
    opacity: [0, 1],
    duration: 600,
    ease: "outExpo",
    delay: stagger(60),
  });
}
