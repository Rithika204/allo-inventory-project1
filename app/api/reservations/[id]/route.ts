import { prisma } from "../../../../lib/prisma";

export async function GET(
  req: Request,
  context: any
) {
  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id: context.params.id,
      },
      include: {
        stock: {
          include: {
            product: true,
            warehouse: true,
          },
        },
      },
    });

  return Response.json(reservation);
}