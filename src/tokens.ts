export const tokens = {
  colors: {
    base: "#F6F7F9",
    surface: "#FFFFFF",
    ink: "#101418",
    muted: "#5B6472",
    line: "#E2E6EC",
    accent: "#2B5CFF",
  },
  fonts: {
    display: '"Space Grotesk", system-ui, sans-serif',
    body: '"Inter Tight", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  zIndex: {
    gradient: 0,
    trail: 1,
    stage: 10,
    nav: 40,
    overlay: 60,
  },
  spring: {
    type: "spring",
    bounce: 0,
    duration: 0.4,
  },
} as const;
