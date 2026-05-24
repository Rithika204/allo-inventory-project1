"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ReservationPage() {
  const params = useParams();

  const [reservation, setReservation] =
    useState<any>(null);

  async function loadReservation() {
    const res = await fetch(
      `/api/reservations/${params.id}`
    );

    const data = await res.json();

    setReservation(data);
  }

  useEffect(() => {
    loadReservation();
  }, []);

  async function confirmReservation() {
    const res = await fetch(
      `/api/reservations/${params.id}/confirm`,
      {
        method: "POST",
      }
    );

    if (res.status === 410) {
      alert("Reservation expired");
      return;
    }

    alert("Purchase confirmed");
    loadReservation();
  }

  async function cancelReservation() {
    await fetch(
      `/api/reservations/${params.id}/release`,
      {
        method: "POST",
      }
    );

    alert("Reservation cancelled");
    window.location.href = "/";
  }

  if (!reservation) return <div>Loading...</div>;

  return (
    <div>
      <h1>Reservation</h1>

      <p>
        Product:
        {reservation.stock.product.name}
      </p>

      <p>
        Warehouse:
        {reservation.stock.warehouse.name}
      </p>

      <p>Status: {reservation.status}</p>

      <button onClick={confirmReservation}>
        Confirm
      </button>

      <button onClick={cancelReservation}>
        Cancel
      </button>
    </div>
  );
}