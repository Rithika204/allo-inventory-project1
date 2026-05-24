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

  if (reservation.expiresAt < new Date()) {
    return new Response(
      JSON.stringify({
        error: "Reservation expired",
      }),
      {
        status: 410,
      }
    );
  }

  await prisma.reservation.update({
    where: {
      id: reservation.id,
    },
    data: {
      status: "CONFIRMED",
    },
  });

  return Response.json({
    success: true,
  });
}