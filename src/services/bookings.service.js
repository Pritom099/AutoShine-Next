"use server";

import { revalidateTag } from "next/cache";

const BASE = process.env.NEXT_AUTH_URL || "https://autoshine-next.vercel.app";

export const createBooking = async (serviceData) => {
  const res = await fetch(`${BASE}/api/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(serviceData),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  revalidateTag("bookings");
  return res.json();
};

export const getMyBookings = async () => {
  const res = await fetch(`${BASE}/api/bookings`, {
    cache: "no-store",
    next: { tags: ["bookings"] },
  });

  if (!res.ok) {
    return { bookings: [] };
  }

  return res.json();
};