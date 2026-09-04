
"use client";

import ServiceCard from "@/app/(withCommonLayout)/services/_component/ServiceCard";
import { BookingContext } from "@/context/bookingContext";
import React, { use } from "react";

const MyBookings = () => {
    const { bookings } = use(BookingContext);

    return (
        <div className="min-h-screen">
            {bookings?.filter(Boolean).length === 0 ? (
                <div className="min-h-screen flex justify-center items-center">
                    <h2 className="font-bold text-6xl text-purple-500 text-center">
                        No Bookings
                    </h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
                    {bookings?.filter(Boolean).map((service) => (
                        <ServiceCard
                            service={service}
                            key={service?._id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;

