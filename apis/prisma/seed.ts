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
          {
            name: "Wireless Mouse",
            description: "Ergonomic wireless mouse",
            price: 29.99,
            category: "Electronics",
            stock: 100,
          },
          {
            name: "USB-C Hub",
            description: "7-in-1 USB-C hub",
            price: 49.99,
            category: "Electronics",
            stock: 50,
          },
          {
            name: "Mechanical Keyboard",
            description: "RGB mechanical keyboard",
            price: 89.99,
            category: "Electronics",
            stock: 45,
          },
          {
            name: "Webcam HD",
            description: "1080p streaming webcam",
            price: 64.99,
            category: "Electronics",
            stock: 70,
          },
          {
            name: "Headphones",
            description: "Noise-cancelling over-ear",
            price: 129.99,
            category: "Electronics",
            stock: 35,
          },
          {
            name: "Laptop Stand",
            description: "Adjustable aluminium stand",
            price: 44.99,
            category: "Electronics",
            stock: 90,
          },
          {
            name: "Phone Charger",
            description: "Fast 30W USB-C charger",
            price: 24.99,
            category: "Electronics",
            stock: 150,
          },
          {
            name: "Tablet Case",
            description: "Protective folio case",
            price: 32.99,
            category: "Electronics",
            stock: 60,
          },
          {
            name: "T-Shirt Blue",
            description: "Cotton t-shirt",
            price: 19.99,
            category: "Clothing",
            stock: 200,
          },
          {
            name: "Hoodie",
            description: "Warm hoodie",
            price: 59.99,
            category: "Clothing",
            stock: 80,
          },
          {
            name: "Jeans Slim",
            description: "Slim fit denim jeans",
            price: 49.99,
            category: "Clothing",
            stock: 120,
          },
          {
            name: "Running Shoes",
            description: "Lightweight running shoes",
            price: 79.99,
            category: "Clothing",
            stock: 55,
          },
          {
            name: "Winter Jacket",
            description: "Water-resistant parka",
            price: 149.99,
            category: "Clothing",
            stock: 40,
          },
          {
            name: "Baseball Cap",
            description: "Adjustable cotton cap",
            price: 22.99,
            category: "Clothing",
            stock: 180,
          },
          {
            name: "Socks Pack",
            description: "Pack of 5 athletic socks",
            price: 14.99,
            category: "Clothing",
            stock: 250,
          },
          {
            name: "Desk Lamp",
            description: "LED desk lamp",
            price: 34.99,
            category: "Home",
            stock: 60,
          },
          {
            name: "Desk Organizer",
            description: "Desk organizer tray",
            price: 24.99,
            category: "Home",
            stock: 120,
          },
          {
            name: "Throw Blanket",
            description: "Soft fleece blanket",
            price: 39.99,
            category: "Home",
            stock: 85,
          },
          {
            name: "Coffee Maker",
            description: "Drip coffee maker",
            price: 54.99,
            category: "Home",
            stock: 45,
          },
          {
            name: "Plant Pot",
            description: "Ceramic plant pot with saucer",
            price: 18.99,
            category: "Home",
            stock: 95,
          },
          {
            name: "Wall Clock",
            description: "Minimalist wall clock",
            price: 28.99,
            category: "Home",
            stock: 65,
          },
          {
            name: "Cushion Cover",
            description: "Decorative cushion cover",
            price: 16.99,
            category: "Home",
            stock: 110,
          },
          {
            name: "Storage Baskets",
            description: "Set of 3 woven baskets",
            price: 34.99,
            category: "Home",
            stock: 50,
          },
          {
            name: "Bluetooth Speaker",
            description: "Portable wireless speaker",
            price: 45.99,
            category: "Electronics",
            stock: 75,
          },
          {
            name: "Screen Cleaner Kit",
            description: "Microfiber and spray",
            price: 12.99,
            category: "Electronics",
            stock: 200,
          },
          {
            name: "Cable Organizer",
            description: "Cable management sleeve",
            price: 11.99,
            category: "Electronics",
            stock: 160,
          },
          {
            name: "Scarf",
            description: "Wool blend scarf",
            price: 29.99,
            category: "Clothing",
            stock: 90,
          },
          {
            name: "Belt Leather",
            description: "Genuine leather belt",
            price: 42.99,
            category: "Clothing",
            stock: 70,
          },
          {
            name: "Yoga Mat",
            description: "Non-slip exercise mat",
            price: 26.99,
            category: "Clothing",
            stock: 95,
          },
          {
            name: "Pillow Set",
            description: "Set of 2 memory foam pillows",
            price: 48.99,
            category: "Home",
            stock: 55,
          },
          {
            name: "Curtains",
            description: "Blackout curtains pair",
            price: 52.99,
            category: "Home",
            stock: 40,
          },
          {
            name: "Rug Small",
            description: "Area rug 5x7 ft",
            price: 89.99,
            category: "Home",
            stock: 30,
          },
          {
            name: "Bookshelf",
            description: "5-tier wooden bookshelf",
            price: 119.99,
            category: "Home",
            stock: 25,
          },
          {
            name: "Desk Mat",
            description: "Large desk pad with wrist rest",
            price: 31.99,
            category: "Electronics",
            stock: 80,
          },
          {
            name: "Monitor Arm",
            description: "Single monitor VESA mount",
            price: 69.99,
            category: "Electronics",
            stock: 42,
          },
        ],
      });
    }

    console.log("Seeded:", {
      demoUser: demoUser.email,
      adminUser: adminUser.email,
    });
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
