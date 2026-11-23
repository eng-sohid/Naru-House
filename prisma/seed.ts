import { PrismaClient, Role, OrderStatus, PaymentStatus, PaymentMethod } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // --- Create Admin User ---
  const adminPassword = await hashPassword(process.env.ADMIN_DEFAULT_PASSWORD || "ChangeMe123!");
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@naruhouse.com" },
    update: {
      name: "Admin User",
      role: Role.ADMIN,
      isActive: true,
    },
    create: {
      name: "Admin User",
      email: process.env.ADMIN_EMAIL || "admin@naruhouse.com",
      password: adminPassword,
      role: Role.ADMIN,
      phone: process.env.ADMIN_PHONE_NUMBER || "+8801XXXXXXXXX",
      isActive: true,
    },
  });
  console.log(`✅ Admin user: ${admin.email} (${admin.role})`);

  // --- Create Categories ---
  const categories = [
    { name: "Classic", slug: "classic", description: "Traditional classic coconut naru", sortOrder: 1 },
    { name: "Gur (Jaggery)", slug: "gur", description: "Naru made with natural jaggery/gur", sortOrder: 2 },
    { name: "Special", slug: "special", description: "Special homemade naru varieties", sortOrder: 3 },
    { name: "Nolen Gur", slug: "nolen-gur", description: "Seasonal date palm jaggery naru", sortOrder: 4 },
    { name: "Combo Packs", slug: "combo-packs", description: "Assorted naru combo packs", sortOrder: 5 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✅ Categories: ${categories.length}`);

  // --- Create Products ---
  const classicCat = await prisma.category.findUnique({ where: { slug: "classic" } });
  const gurCat = await prisma.category.findUnique({ where: { slug: "gur" } });
  const specialCat = await prisma.category.findUnique({ where: { slug: "special" } });
  const nolenGurCat = await prisma.category.findUnique({ where: { slug: "nolen-gur" } });
  const comboCat = await prisma.category.findUnique({ where: { slug: "combo-packs" } });

  const products = [
    {
      name: "Classic Coconut Naru",
      slug: "classic-coconut-naru",
      categoryId: classicCat!.id,
      description:
        "Enjoy the authentic taste of traditional Bengali coconut naru. Carefully handmade with fresh coconut and quality ingredients. A perfect sweet treat for every occasion.",
      shortDescription: "Traditional coconut naru with natural ingredients.",
      price: 120,
      stock: 50,
      unit: "250g / Pack",
      isFeatured: true,
      isActive: true,
      images: [
        { url: "/images/naru-1.jpeg", alt: "Classic Coconut Naru", isPrimary: true, sortOrder: 1 },
      ],
    },
    {
      name: "Gur Coconut Naru",
      slug: "gur-coconut-naru",
      categoryId: gurCat!.id,
      description:
        "Experience the rich traditional flavor of coconut naru made with natural jaggery. A delicious homemade Bengali sweet prepared with love.",
      shortDescription: "Coconut naru made with natural jaggery.",
      price: 150,
      stock: 50,
      unit: "250g / Pack",
      isFeatured: true,
      isActive: true,
      images: [
        { url: "/images/naru-2.jpeg", alt: "Gur Coconut Naru", isPrimary: true, sortOrder: 1 },
      ],
    },
    {
      name: "Special Naru",
      slug: "special-naru",
      categoryId: specialCat!.id,
      description:
        "Our special homemade naru brings the authentic sweetness of Bengal. Made with carefully selected ingredients for a memorable taste.",
      shortDescription: "Special homemade naru with authentic Bengali flavor.",
      price: 180,
      stock: 40,
      unit: "250g / Pack",
      isFeatured: true,
      isActive: true,
      images: [
        { url: "/images/naru-3.jpeg", alt: "Special Naru", isPrimary: true, sortOrder: 1 },
      ],
    },
    {
      name: "Nolen Gur Naru",
      slug: "nolen-gur-naru",
      categoryId: nolenGurCat!.id,
      description:
        "Seasonal specialty made with date palm jaggery (nolen gur). Available only during winter months. A true Bengali delicacy.",
      shortDescription: "Seasonal date palm jaggery naru.",
      price: 220,
      stock: 30,
      unit: "250g / Pack",
      isFeatured: false,
      isActive: true,
      images: [
        { url: "/images/naru-3.jpeg", alt: "Nolen Gur Naru", isPrimary: true, sortOrder: 1 },
      ],
    },
    {
      name: "Naru Combo Pack",
      slug: "naru-combo-pack",
      categoryId: comboCat!.id,
      description:
        "A delightful assortment of our best-selling naru varieties. Perfect for gifting or family gatherings.",
      shortDescription: "Assorted naru combo pack.",
      price: 450,
      stock: 25,
      unit: "500g / Pack (3 varieties)",
      isFeatured: false,
      isActive: true,
      images: [
        { url: "/images/naru-hero.jpeg", alt: "Naru Combo Pack", isPrimary: true, sortOrder: 1 },
      ],
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        categoryId: product.categoryId,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        stock: product.stock,
        unit: product.unit,
        isFeatured: product.isFeatured,
        isActive: product.isActive,
      },
      create: {
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        description: product.description,
        shortDescription: product.shortDescription,
        price: product.price,
        stock: product.stock,
        unit: product.unit,
        isFeatured: product.isFeatured,
        isActive: product.isActive,
        images: {
          create: product.images,
        },
      },
    });
  }
  console.log(`✅ Products: ${products.length}`);

  // --- Create Admin Settings ---
  const settings = [
    { key: "sms_provider", value: "sslwireless", description: "SMS gateway provider for order notifications" },
    { key: "admin_phone", value: process.env.ADMIN_PHONE_NUMBER || "+8801XXXXXXXXX", description: "Admin phone number for order alerts" },
    { key: "admin_email", value: process.env.ADMIN_EMAIL || "admin@naruhouse.com", description: "Admin email for notifications" },
    { key: "delivery_charge_default", value: "40", description: "Default delivery charge in BDT" },
    { key: "free_shipping_threshold", value: "500", description: "Free shipping above this amount (BDT)" },
    { key: "order_notifications_enabled", value: "true", description: "Enable new order notifications" },
  ];

  for (const setting of settings) {
    await prisma.adminSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, description: setting.description },
      create: setting,
    });
  }
  console.log(`✅ Admin settings: ${settings.length}`);

  console.log("🎉 Database seed completed successfully!");
}

async function hashPassword(password: string): Promise<string> {
  const bcrypt = require("bcryptjs");
  return bcrypt.hash(password, 12);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
