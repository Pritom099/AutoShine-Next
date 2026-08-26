"use client"

import ServiceCard from '@/app/(withCommonLayout)/services/_component/ServiceCard';
import { BookingContext } from '@/context/bookingContext';
import React, { use } from 'react';

const MyBookings = () => {
    const { bookings, removeBooking, addBooking } = use(BookingContext);
    console.log(bookings)

    return (
        <div>
            {bookings?.length == 0 ? (
                <h2 className='font-bold text-6xl text-purple-500'>No Bookings</h2>
            ) : (<div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
                {bookings?.filter(Boolean).map((service) => {
                    return <ServiceCard service={service} key={service?._id}></ServiceCard>;
                })}
            </div>
            )}
        </div>
    );
};

export default MyBookings;