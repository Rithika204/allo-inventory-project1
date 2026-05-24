import { prisma } from "../../../../../lib/prisma";

export async function POST(
  req: Request,
  context: any
) {
  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id: context.params.id,
      },
    });

  if (!reservation) {
    return new Response("Not found", {
      status: 404,
    });
  }

  await prisma.$transaction(async (tx) => {
    await tx.stock.update({
      where: {
        id: reservation.stockId,
      },
      data: {
        reservedUnits: {
          decrement: reservation.quantity,
        },
      },
    });

    await tx.reservation.update({
      where: {
        id: reservation.id,
      },
      data: {
        status: "RELEASED",
      },
    });
  });

  return Response.json({
    success: true,
  });
}