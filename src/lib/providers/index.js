"use client"
import BookingsContextProvider from '@/context/bookingContext';
import UserContextProvider from '@/context/userContext';
import React from 'react';
import { SessionProvider } from "next-auth/react"

const Providers = ({ children }) => {
    return (
        <SessionProvider>
            <UserContextProvider>
                <BookingsContextProvider>{children}</BookingsContextProvider>
            </UserContextProvider>
        </SessionProvider>
    );
};

export default Providers;