const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  // Find an admin or researcher to be the mentor
  const mentor = await prisma.user.findFirst({
    where: { role: { in: ["ADMIN", "RESEARCHER"] } }
  });

  if (!mentor) {
    console.error("No suitable mentor found. Please ensure an admin or researcher exists.");
    return;
  }

  const programs = [
    {
      title: "Deep Tech Entrepreneurship",
      description: "A specialized mentorship track for individuals looking to bridge the gap between complex research and market-ready aerospace startups. Covers technical validation, orbital economics, and institutional procurement strategies.",
      mentorId: mentor.id,
    },
    {
      title: "Orbital Systems Architecture",
      description: "Master the complexities of modern orbital systems. This program focuses on satellite telemetry, registry management, and high-performance communication protocols used in the Eka ecosystem.",
      mentorId: mentor.id,
    }
  ];

  for (const p of programs) {
    await prisma.mentorshipProgram.create({
      data: p
    });
  }

  console.log("Seeded 2 mentorship programs.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
