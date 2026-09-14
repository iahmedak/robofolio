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
    slug: "croc-os",
    title: "Croc OS",
    role: "Embedded",
    year: "2026",
    blurb: "Interactive ESP32 desk companion with an animated OLED personality, live weather dashboard, and persistent usage tracking.",
    specs: [
      { label: "Stack", value: "ESP32 + C++" },
      { label: "Display", value: "SH1106 OLED" },
    ],
  },
  {
    slug: "desko",
    title: "Desko",
    role: "Software",
    year: "2026",
    blurb: "A fully interactive desktop OS portfolio with draggable windows, terminal, and embedded live apps.",
    specs: [
      { label: "Stack", value: "React + Canvas" },
      { label: "UI", value: "Yaru-dark" },
    ],
  },
  {
    slug: "meadow",
    title: "Meadow",
    role: "Software",
    year: "2025",
    blurb: "An agent-based predator-prey ecosystem simulator inspired by Lotka-Volterra population dynamics.",
    specs: [
      { label: "Stack", value: "JS + Canvas" },
      { label: "Math", value: "Lotka-Volterra" },
    ],
  },
  {
    slug: "kharcha",
    title: "Kharcha",
    role: "Software",
    year: "2025",
    blurb: "A zero-friction expense tracker for UPI, cash, and card spending with smart auto-categorization.",
    specs: [
      { label: "Stack", value: "JS + JSON" },
      { label: "Viz", value: "Donut Charts" },
    ],
  },
  {
    slug: "sports-engine",
    title: "AI Sports Tournament Engine",
    role: "Software",
    year: "2026",
    blurb: "A full-stack platform for managing sports tournaments with live scoring and AI-generated insights.",
    specs: [
      { label: "Stack", value: "Next.js + Supabase" },
      { label: "AI", value: "Gemini API" },
    ],
  },
  {
    slug: "wildlife-cards",
    title: "Wildlife Card Game",
    role: "AI",
    year: "2025",
    blurb: "A Pokémon GO-style Android game where you photograph real animals and birds, and AI turns them into collectible cards.",
    specs: [
      { label: "Stack", value: "Flutter + Firebase" },
      { label: "Vision", value: "AI Identification" },
    ],
  },
  {
    slug: "edgebot",
    title: "EdgeBot — Team VoltEdge",
    role: "Robotics",
    year: "2025",
    blurb: "Competition robot built for the National Robotics League 2025 at IIT Bombay — mechanical lead role.",
    specs: [
      { label: "Stack", value: "Custom Chassis" },
      { label: "Role", value: "Mechanical Lead" },
    ],
  },
  {
    slug: "field-shutter",
    title: "Automatic Field Shutter",
    role: "Automation",
    year: "2024",
    blurb: "An automated agricultural shutter system that responds to field conditions while harvesting rainwater.",
    specs: [
      { label: "Stack", value: "MCU + Sensors" },
      { label: "Focus", value: "Rain Harvesting" },
    ],
  },
  {
    slug: "drone",
    title: "Drone",
    role: "Robotics",
    year: "2024",
    blurb: "A functional multirotor drone build integrating propulsion, flight electronics, and radio control.",
    specs: [
      { label: "Stack", value: "Flight Controller" },
      { label: "Type", value: "Multirotor" },
    ],
  },
  {
    slug: "moon-rover",
    title: "6-Wheel Moon Rover",
    role: "Robotics",
    year: "2024",
    blurb: "A 6-wheel drive rover with an onboard OLED display, controllable via RF, WiFi, and autonomous line-following.",
    specs: [
      { label: "Stack", value: "ESP32 + RF" },
      { label: "Mode", value: "Autonomous" },
    ],
  },
  {
    slug: "iot-telemetry",
    title: "IoT Telemetry Dashboard",
    role: "Robotics",
    year: "2026",
    blurb: "Ground control station for real-time robotics — sub-millisecond MQTT telemetry and live PID graphs.",
    specs: [
      { label: "Stack", value: "MQTT + InfluxDB" },
      { label: "Viz", value: "Recharts" },
    ],
  },
  {
    slug: "field-analyzer",
    title: "Field & Sensor Log Analyzer",
    role: "Automation",
    year: "2026",
    blurb: "Agricultural IoT analytics for the Auto-Field Shutter — batched ESP32 logging and Pandas trend analysis.",
    specs: [
      { label: "Stack", value: "FastAPI + Pandas" },
      { label: "DB", value: "PostgreSQL" },
    ],
  },
  {
    slug: "projectdirec",
    title: "ProjectDirec",
    role: "Software",
    year: "2026",
    blurb: "Community-driven parts directory + price-comparison for ESP32, drivers, sensors — pinouts and compatibility.",
    specs: [
      { label: "Stack", value: "Next.js + Typesense" },
      { label: "Crawler", value: "Scrapy" },
    ],
  },
];
