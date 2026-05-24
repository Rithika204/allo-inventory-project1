import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const warehouse = await prisma.warehouse.create({
    data: {
      name: "Chennai Warehouse",
      location: "Chennai",
    },
  });

  const product = await prisma.product.create({
    data: {
      name: "iPhone 15",
    },
  });

  await prisma.stock.create({
    data: {
      productId: product.id,
      warehouseId: warehouse.id,
      totalUnits: 10,
      reservedUnits: 0,
    },
  });

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });