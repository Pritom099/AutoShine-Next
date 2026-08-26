"use client"
import { BookingContext } from '@/context/bookingContext';
import React, { use } from 'react';

const BookingBtn = ({ service }) => {
    const { bookings, removeBooking, addBooking } = use(BookingContext);
    const isAlreadyBooking = bookings?.find(b => b?._id === service?._id)
    const isUnavailable = service.isDeleted;

    return (
        <button
            disabled={isUnavailable}
            className={`w-full rounded-2xl px-6 py-4 text-base font-semibold transition-all sm:w-auto sm:min-w-[220px] ${isUnavailable
                ? "cursor-not-allowed bg-slate-200 text-slate-400"
                : "bg-slate-900 text-white shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
                }`}
            onClick={() => isAlreadyBooking ? removeBooking(service?._id) : addBooking(service)}
        >
            {isUnavailable ? "Service Unavailable" : isAlreadyBooking ? "Unbook This Service" : "Book This Service"}
        </button>
    );
};

export default BookingBtn;