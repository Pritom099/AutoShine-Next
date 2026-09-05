"use client";

import { BookingContext } from "@/context/bookingContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const BookingBtn = ({ service }) => {
  const { bookings, removeBooking, addBooking } = use(BookingContext);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isUnavailable = service?.isDeleted;
  const isAlreadyBooking = bookings?.find((b) => b?._id === service?._id);

  const handleClick = async () => {
    if (isUnavailable) return;

    // Login check
    if (status !== "authenticated") {
      router.push("/login?callbackUrl=/services");
      return;
    }

    setLoading(true);

    try {
      if (isAlreadyBooking) {
        // Unbook → Mongo delete + context
        const res = await fetch(
          `/api/bookings?serviceId=${service._id}`,
          { method: "DELETE" }
        );

        if (!res.ok) {
          const data = await res.json();
          alert(data.message || "Failed to remove booking");
          return;
        }

        removeBooking(service._id);
      } else {
        // Book → Mongo save + context
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(service),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to book");
          return;
        }

        addBooking(service);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={isUnavailable || loading}
      onClick={handleClick}
      className={`w-full rounded-2xl px-6 py-4 text-base font-semibold transition-all sm:w-auto sm:min-w-[220px] ${
        isUnavailable
          ? "cursor-not-allowed bg-slate-200 text-slate-400"
          : "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98] disabled:opacity-60"
      }`}
    >
      {isUnavailable
        ? "Service Unavailable"
        : loading
        ? "Please wait..."
        : isAlreadyBooking
        ? "Unbook This Service"
        : "Book This Service"}
    </button>
  );
};

export default BookingBtn;