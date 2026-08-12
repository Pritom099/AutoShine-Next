import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "@/assets/img/logo.jpg"
const DashboardSidebar = () => {
    return (
        <div className='w-[200px] bg-purple-200 h-screen text-black px-3 py-4 fixed top-0 left-0'>
            
            <Link href={"/"}>
            <Image src={logo} alt="logo" height="60" width="60"></Image>
            </Link>

            <div className='flex flex-col gap-2 mt-7'>
                <Link href={"/dashboard/profile"}>Profile</Link>
                <Link href={"/dashboard/my-bookings"}>My Booking</Link>
            </div>
            
        </div>
    );
};

export default DashboardSidebar;