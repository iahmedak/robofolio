import { describe, expect, it } from "vitest";
import { tokens } from "../tokens";

describe("tokens", () => {
  it("locks single cobalt accent", () => {
    expect(tokens.colors.accent).toBe("#2B5CFF");
    expect(tokens.colors.base).toBe("#F6F7F9");
    expect(tokens.zIndex.nav).toBe(40);
  });
});
