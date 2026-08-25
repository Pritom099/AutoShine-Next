import BookingsContextProvider from '@/context/bookingContext';
import UserContextProvider from '@/context/userContext';
import React from 'react';

const Providers = ({ children }) => {
    return (
        <UserContextProvider>
            <BookingsContextProvider>{children}</BookingsContextProvider>
        </UserContextProvider>
    );
};

export default Providers;