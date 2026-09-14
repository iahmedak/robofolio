export type RobotProject = {
  slug: string;
  title: string;
  role: string;
  year: string;
  blurb: string;
  specs: { label: string; value: string }[];
};

export const projects: RobotProject[] = [
  {
    slug: "unit-01-wardog",
    title: "Unit 01 Wardog",
    role: "Design + Realtime",
    year: "2026",
    blurb: "Quadruped inspection rig for warehouse aisles. Built for glare-heavy daylight.",
    specs: [
      { label: "Stack", value: "R3F + WebGL" },
      { label: "Input", value: "Gamepad + touch" },
    ],
  },
  {
    slug: "harbor-arm",
    title: "Harbor Arm",
    role: "Interaction + Motion",
    year: "2025",
    blurb: "Six-axis dock arm with drag-to-pose programming.",
    specs: [
      { label: "Stack", value: "Three.js + anime.js" },
      { label: "Loop", value: "60fps budget" },
    ],
  },
  {
    slug: "messenger-drone",
    title: "Messenger Drone",
    role: "Prototype",
    year: "2025",
    blurb: "Light parcel drone tuned for courtyard wind.",
    specs: [
      { label: "Stack", value: "R3F + drei" },
      { label: "Range", value: "Campus demo" },
    ],
  },
  {
    slug: "clinic-bot",
    title: "Clinic Bot",
    role: "Design system",
    year: "2024",
    blurb: "Calm bedside assistant with soft motion limits.",
    specs: [
      { label: "Stack", value: "React + WebGL" },
      { label: "Sound", value: "Off by default" },
    ],
  },
  {
    slug: "field-mule",
    title: "Field Mule",
    role: "Realtime + Site",
    year: "2024",
    blurb: "Outdoor carry platform with live telemetry overlay.",
    specs: [
      { label: "Stack", value: "Three.js" },
      { label: "Feed", value: "Mock telemetry" },
    ],
  },
];
