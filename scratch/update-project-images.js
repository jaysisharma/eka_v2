const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const updates = [
    {
      title: "Project Prometheus",
      image: "/brain/b3571b66-235d-4a26-8535-852da8086778/project_prometheus_propulsion_1778641104482.png"
    },
    {
      title: "Iris Telemetry Suite",
      image: "/brain/b3571b66-235d-4a26-8535-852da8086778/project_iris_telemetry_1778641126314.png"
    },
    {
      title: "Argus-1 Satellite Bus",
      image: "/brain/b3571b66-235d-4a26-8535-852da8086778/project_argus_satellite_1778641143545.png"
    }
  ];

  for (const update of updates) {
    await prisma.project.updateMany({
      where: { title: update.title },
      data: { image: update.image }
    });
  }

  console.log("Updated project images.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
