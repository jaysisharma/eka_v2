const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const messages = [
    {
      name: "Dr. Elena Soros",
      email: "elena@cambridge.edu",
      subject: "Research Collaboration",
      message: "I am interested in your latest papers on sustainable propulsion. Our lab in Cambridge would like to discuss a potential joint research initiative.",
      status: "UNREAD",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    },
    {
      name: "Captain James Miller",
      email: "j.miller@spaceops.com",
      subject: "Procurement Inquiry",
      message: "We are looking to order a bulk set of Eka Official Mission Apparel for our upcoming LEO training simulation. Please provide a quote for 50 units.",
      status: "UNREAD",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
    },
    {
      name: "Sarah Chen",
      email: "sarah@techfrontier.io",
      subject: "Telemetry API Access",
      message: "Is there a public API for the live orbital telemetry feeds? We are building a tracking dashboard for educational purposes.",
      status: "READ",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48) // 2 days ago
    }
  ];

  for (const msg of messages) {
    await prisma.contactMessage.create({
      data: msg
    });
  }

  console.log("Seeded 3 contact messages.");
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
