const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const images = [
    "/projects/project_prometheus_propulsion_1778641104482.png",
    "/projects/project_iris_telemetry_1778641126314.png",
    "/projects/project_argus_satellite_1778641143545.png"
  ];

  const projects = [];

  // Generate 15 projects
  for (let i = 1; i <= 15; i++) {
    const isOngoing = i <= 8;
    projects.push({
      title: `${isOngoing ? "Ongoing" : "Past"} Mission ${i}`,
      description: `Description for mission ${i}. This is a detailed research initiative focusing on aerospace innovation and technical precision within the Eka ecosystem.`,
      status: isOngoing ? (i % 2 === 0 ? "ONGOING" : "PLANNED") : "COMPLETED",
      progress: isOngoing ? Math.floor(Math.random() * 90) + 10 : 100,
      tags: ["Aerospace", "Research", `Batch-${Math.ceil(i/5)}`],
      image: images[i % 3]
    });
  }

  // Clear existing first for clean state if needed, or just add
  // await prisma.project.deleteMany(); 

  for (const p of projects) {
    await prisma.project.create({
      data: p
    });
  }

  console.log("Seeded 15 projects successfully.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
