const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const programs = await prisma.mentorshipProgram.findMany({
    include: {
      mentor: {
        select: { name: true, role: true }
      }
    }
  });
  console.log(JSON.stringify(programs, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
