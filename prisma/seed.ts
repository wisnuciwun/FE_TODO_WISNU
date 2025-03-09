const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  await prisma.daily_tip.createMany({
    data: [
      {
        description:
          "Stay hydrated! Drink at least 8 glasses of water daily. 💧",
        active: true,
        created_at: new Date(),
      },
      {
        description: "Break tasks into smaller chunks to stay productive. ✅",
        active: true,
        created_at: new Date(),
      },
      {
        description: "Take deep breaths and relax your mind. 🧘",
        active: true,
        created_at: new Date(),
      },
      {
        description: "Limit screen time before bed for better sleep. 😴",
        active: true,
        created_at: new Date(),
      },
      {
        description: "Always back up your important files. 💾",
        active: true,
        created_at: new Date(),
      },
    ],
  });

  await prisma.roles.createMany({
    data: [
      { name: "God Mode", created_at: new Date() },
      { name: "Leader", created_at: new Date() },
      { name: "Team Member", created_at: new Date() },
    ],
  });

  await prisma.status.createMany({
    data: [
      {
        name: "Not Started",
        created_at: new Date(),
        active: true,
        created_by_id: 1,
      },
      {
        name: "On Progress",
        created_at: new Date(),
        active: true,
        created_by_id: 1,
      },
      { name: "Done", created_at: new Date(), active: true, created_by_id: 1 },
      {
        name: "Reject",
        created_at: new Date(),
        active: true,
        created_by_id: 1,
      },
    ],
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
