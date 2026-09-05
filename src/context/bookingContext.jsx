"use client";

import React, { createContext, useState, useEffect } from "react";

export const BookingContext = createContext(null);

const BookingsContextProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  // Page load / refresh → MongoDB থেকে user-এর booking আনো
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) return;

        const data = await res.json();
        if (data?.bookings) {
          setBookings(
            data.bookings.map((b) => ({
              _id: b.serviceId,
              name: b.serviceName,
              price: b.price,
              duration: b.duration,
              img: b.img,
              description: b.description,
              status: b.status,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load bookings", err);
      }
    };

    loadBookings();
  }, []);

  const addBooking = (booking) => {
    setBookings((prev) => {
      // already booked থাকলে আবার add করবে না
      if (prev.find((b) => b._id === booking._id)) return prev;
      return [...prev, booking];
    });
  };

  const removeBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  const value = {
    bookings,
    setBookings,
    addBooking,
    removeBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingsContextProvider;