export function velocityToScale(v: number): number {
  const clamped = Math.min(Math.abs(v), 4000) / 4000;
  return 1 - clamped * 0.06;
}
