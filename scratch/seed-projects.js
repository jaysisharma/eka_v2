const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      title: "Project Prometheus",
      description: "Next-generation liquid oxygen propulsion system designed for heavy-lift orbital insertion. This project focuses on increasing thermal efficiency by 15% through regenerative cooling cycles.",
      status: "ONGOING",
      progress: 68,
      tags: ["Propulsion", "Thermodynamics", "Phase 2"]
    },
    {
      title: "Iris Telemetry Suite",
      description: "Development of a unified, low-latency communication protocol for deep-space research probes. Iris enables real-time data visualization of orbital telemetry with sub-50ms jitter.",
      status: "ONGOING",
      progress: 42,
      tags: ["Communication", "Telemetry", "Software"]
    },
    {
      title: "Project Icarus (V1)",
      description: "Initial research into high-altitude weather balloon telemetry and low-cost atmospheric sensors. Successfully deployed three probes to the stratosphere with full data recovery.",
      status: "COMPLETED",
      progress: 100,
      tags: ["Atmospheric", "Legacy", "Success"]
    },
    {
      title: "Argus-1 Satellite Bus",
      description: "A standardized small-satellite platform designed for modular research payloads. The Argus-1 bus was the foundation for Eka's first orbital deployment in 2024.",
      status: "COMPLETED",
      progress: 100,
      tags: ["Orbital", "Hardware", "Foundation"]
    },
    {
      title: "Aegis Thermal Shield",
      description: "Research into carbon-carbon composite heat shields for high-velocity re-entry. Currently in the material stress-testing phase at our Stockholm facility.",
      status: "PLANNED",
      progress: 15,
      tags: ["Materials", "Re-entry", "R&D"]
    }
  ];

  for (const p of projects) {
    await prisma.project.create({
      data: p
    });
  }

  console.log(`Seeded ${projects.length} projects successfully.`);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
