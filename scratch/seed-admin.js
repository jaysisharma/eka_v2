const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new PrismaClient();

async function main() {
  const email = "admin@eka.org";
  const password = "adminpassword123";
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "ADMIN"
    },
    create: {
      email,
      name: "System Administrator",
      password: hashedPassword,
      role: "ADMIN"
    }
  });

  console.log("Admin user created/updated:", admin.email);
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
