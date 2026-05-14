const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding mission data...");

  // Clear existing data (Optional, but good for clean seed)
  // await prisma.galleryMedia.deleteMany();
  // await prisma.newsArticle.deleteMany();
  // await prisma.opportunity.deleteMany();

  // 1. Seed Gallery Media
  const galleryData = [
    {
      url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
      caption: "Earth observation from orbital altitude",
      type: "IMAGE",
      category: "Space",
    },
    {
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      caption: "Deep space telemetry array in Norway",
      type: "IMAGE",
      category: "Research",
    },
    {
      url: "https://images.unsplash.com/photo-1517976487492-5750f3195933",
      caption: "Propulsion systems testing laboratory",
      type: "IMAGE",
      category: "Project",
    },
    {
      url: "https://images.unsplash.com/photo-1461742302867-8b3fe7a9c390",
      caption: "Mission control during Orbital-01 launch",
      type: "IMAGE",
      category: "Events",
    },
    {
      url: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2",
      caption: "Satellite deployment sequence",
      type: "IMAGE",
      category: "Space",
    },
  ];

  for (const media of galleryData) {
    await prisma.galleryMedia.create({ data: media });
  }

  // 2. Seed News Articles
  const newsData = [
    {
      title: "Eka Aerospace Secures New Orbital License",
      content: "We are proud to announce that the European Space Agency has granted Eka a multi-year license for low-earth orbit research missions. This milestone allows us to expand our sustainable orbital initiatives through 2030.",
      category: "Mission",
      isFeatured: true,
      imageUrl: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7",
    },
    {
      title: "Breakthrough in Bio-Signature Detection",
      content: "Our Stockholm-based research team has developed a new method for detecting organic compounds in extreme environments, a critical step for future missions to Europa and Enceladus.",
      category: "Research",
      imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d",
    },
    {
      title: "Upcoming Aerospace Innovation Summit 2026",
      content: "Join us this September in Oslo for the third annual Eka Aerospace Innovation Summit. We will be hosting over 50 speakers from around the world to discuss the future of orbital sustainability.",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1475721027187-402ad2989a38",
    },
  ];

  for (const news of newsData) {
    await prisma.newsArticle.create({ data: news });
  }

  // 3. Seed Research Papers
  const researchers = [
    {
      email: "research@eka.org",
      name: "Dr. Aris Thorne",
      role: "RESEARCHER",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      bio: "Lead scientist at Eka Aerospace, specializing in orbital mechanics and sustainable propulsion.",
    },
    {
      email: "elara@eka.org",
      name: "Prof. Elara Vance",
      role: "RESEARCHER",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      bio: "Astrobiologist focusing on extreme environment habitability and bio-signature detection in the Jovian system.",
    },
    {
      email: "marcus@eka.org",
      name: "Marcus Thorne",
      role: "RESEARCHER",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Chief Orbital Architect. Pioneer in satellite swarm coordination and autonomous constellation management.",
    },
    {
      email: "sara@eka.org",
      name: "Dr. Sara Rossi",
      role: "RESEARCHER",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
      bio: "Senior Physicist specializing in high-energy plasma interactions and magnetospheric shielding.",
    },
  ];

  for (const res of researchers) {
    await prisma.user.upsert({
      where: { email: res.email },
      update: res,
      create: res,
    });
  }

  // Get the main researcher for paper relation
  const systemResearcher = await prisma.user.findUnique({ where: { email: "research@eka.org" } });

  const paperData = [
    {
      title: "Sustainable Orbital Decay Mitigation via Hall-Effect Propulsion",
      abstract: "This paper presents a novel approach to managing low-earth orbit debris through the integration of small-scale Hall-effect thrusters on commercial satellite platforms. We demonstrate a 30% increase in de-orbit efficiency over passive methods.",
      content: "Full technical documentation regarding plasma thrust vectors and fuel consumption efficiency...",
      status: "PUBLISHED",
      visibility: "PUBLIC",
      authorId: systemResearcher.id,
      category: "Propulsion",
      tags: ["Orbital", "Plasma", "Sustainability"],
      publishedAt: new Date(),
    },
    {
      title: "Bio-Signature Analysis in High-Radiation Jovian Environments",
      abstract: "Our findings suggest that specialized extremophiles could survive in the subsurface oceans of Europa. This study details the chemical markers necessary for identification during fly-by missions.",
      content: "Analysis of radioactive flux and organic preservation mechanisms...",
      status: "PUBLISHED",
      visibility: "PREMIUM",
      authorId: systemResearcher.id,
      category: "Astrobiology",
      tags: ["Jupiter", "Europa", "Life-Search"],
      publishedAt: new Date(),
    },
    {
      title: "Decentralized Satellite Swarm Communication Protocols",
      abstract: "A framework for autonomous coordination between nanosatellites without centralized ground control. Utilizing mesh-network topology to ensure mission redundancy.",
      content: "Network latency benchmarks and orbital synchronization algorithms...",
      status: "PUBLISHED",
      visibility: "PUBLIC",
      authorId: systemResearcher.id,
      category: "Communication",
      tags: ["Nanosats", "Mesh-Network", "Autonomous"],
      publishedAt: new Date(),
    },
  ];

  for (const paper of paperData) {
    await prisma.researchPaper.create({ data: paper });
  }

  // 4. Seed Opportunities (Vacancies)
  const vacancyData = [
    {
      title: "Senior Propulsion Engineer",
      description: "We are looking for a veteran engineer to lead our next-generation Hall-effect thruster project. You will be responsible for end-to-end development and orbital testing.",
      type: "VACANCY",
      location: "Oslo, Norway",
      salary: "$120k - $160k",
      requirements: "- 10+ years in aerospace engineering\n- Expertise in plasma propulsion\n- PhD in Physics or Aerospace Engineering preferred",
      deadline: new Date("2026-07-15"),
    },
    {
      title: "Orbital Mechanics Intern",
      description: "Join our mission planning team to assist in trajectory optimization for upcoming satellite constellations. Ideal for students specializing in celestial mechanics.",
      type: "INTERNSHIP",
      location: "Remote / Stockholm",
      salary: "$4k / month",
      requirements: "- Current enrollment in Master's program\n- Strong background in Python and GMAT\n- Passion for space exploration",
      deadline: new Date("2026-06-20"),
    },
    {
      title: "Astrobiology Research Lead",
      description: "Lead our Stockholm laboratory in the search for biosignatures. You will coordinate with international partners and oversee extreme environment sample analysis.",
      type: "VACANCY",
      location: "Stockholm, Sweden",
      salary: "$110k - $140k",
      requirements: "- PhD in Astrobiology or Microbiology\n- Proven track record of high-impact research\n- Experience with planetary protection protocols",
      deadline: new Date("2026-08-01"),
    },
  ];

  for (const job of vacancyData) {
    await prisma.opportunity.create({ data: job });
  }

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
