import { prisma } from "../../../lib/prisma";

export async function GET() {

  try {

    const products = await prisma.product.findMany({
      include: {
        stocks: {
          include: {
            warehouse: true,
          },
        },
      },
    });

    return Response.json(
      products.map((product) => ({
        id: product.id,
        name: product.name,
        stocks: product.stocks.map((stock) => ({
          stockId: stock.id,
          warehouseName: stock.warehouse.name,
          availableStock:
            stock.totalUnits - stock.reservedUnits,
        })),
      }))
    );

  } catch (error) {

    console.log(error);

    return Response.json([]);
  }
}