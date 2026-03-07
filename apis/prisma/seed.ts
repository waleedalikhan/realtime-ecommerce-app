// Use bcryptjs in seed (pure JS) to avoid native bcrypt build issues under some Node/tsx setups
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

async function main() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const demoPassword = await bcrypt.hash("demo1234", SALT_ROUNDS);
    const adminPassword = await bcrypt.hash("admin1234", SALT_ROUNDS);

    const demoUser = await prisma.user.upsert({
      where: { email: "demo@example.com" },
      update: {},
      create: {
        email: "demo@example.com",
        password: demoPassword,
        name: "Demo User",
        role: "user",
      },
    });

    const adminUser = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        password: adminPassword,
        name: "Admin",
        role: "admin",
      },
    });

    const productCount = await prisma.product.count();
    if (productCount === 0) {
      await prisma.product.createMany({
        data: [
          { name: "Wireless Mouse", description: "Ergonomic wireless mouse", price: 29.99, category: "Electronics", stock: 100 },
          { name: "USB-C Hub", description: "7-in-1 USB-C hub", price: 49.99, category: "Electronics", stock: 50 },
          { name: "T-Shirt Blue", description: "Cotton t-shirt", price: 19.99, category: "Clothing", stock: 200 },
          { name: "Hoodie", description: "Warm hoodie", price: 59.99, category: "Clothing", stock: 80 },
          { name: "Desk Lamp", description: "LED desk lamp", price: 34.99, category: "Home", stock: 60 },
          { name: "Desk Organizer", description: "Desk organizer tray", price: 24.99, category: "Home", stock: 120 },
        ],
      });
    }

    console.log("Seeded:", { demoUser: demoUser.email, adminUser: adminUser.email });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
