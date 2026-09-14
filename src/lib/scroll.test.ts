import { describe, expect, it } from "vitest";
import { velocityToScale } from "./scroll";

describe("velocityToScale", () => {
  it("shrinks pill as velocity rises", () => {
    expect(velocityToScale(0)).toBeCloseTo(1);
    expect(velocityToScale(3000)).toBeLessThan(0.97);
  });
});
