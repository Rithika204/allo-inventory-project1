import { prisma } from "../../../lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const { stockId, quantity } = body;

  try {
    const reservation = await prisma.$transaction(
      async (tx) => {
        const rows = await tx.$queryRawUnsafe<any[]>(
          `
          SELECT * FROM "Stock"
          WHERE id = $1
          FOR UPDATE
          `,
          stockId
        );

        const stock = rows[0];

        const available =
          stock.totalUnits - stock.reservedUnits;

        if (available < quantity) {
          throw new Error("INSUFFICIENT");
        }

        await tx.stock.update({
          where: { id: stockId },
          data: {
            reservedUnits: {
              increment: quantity,
            },
          },
        });

        return await tx.reservation.create({
          data: {
            stockId,
            quantity,
            expiresAt: new Date(
              Date.now() + 10 * 60 * 1000
            ),
          },
        });
      }
    );

    return Response.json(reservation);
  } catch {
    return new Response(
      JSON.stringify({
        error: "Not enough stock",
      }),
      {
        status: 409,
      }
    );
  }
}