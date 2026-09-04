"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "@/assets/img/logo.jpg"
import Container from './Container';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session, status } = useSession();
    const isLoggedIn = !!session?.user?.email;
    const role = session?.user?.role || "user";

    // role অনুযায়ী dashboard path
    const dashboardHref =
        role === "admin"
            ? "/dashboard/adminRoute"
            : "/dashboard/userRoute";
    return (
        <div className='bg-purple-500/20 text-white'>
            <Container>
                <div className='py-4 text-black font-bold text-5xl flex justify-between items-center'>

                    <Link href={"/"}>
                        <Image src={logo} alt="logo" height="60" width="60"></Image>
                    </Link>

                    <ul className='font-semibold text-[18px] flex gap-3 items-center text-white'>
                        <Link href={"/"}>Home</Link>
                        <Link href={"/services"}>Services</Link>
                        <Link href={"/reviews"}>Reviews</Link>
                        <Link href={"/aboutUs"}>About Us</Link>

                    </ul>

                    {
                        status === "loading" ? (<button disabled>Loading....</button>) : isLoggedIn ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={dashboardHref}
                                    className="secondary-button"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="secondary-button"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) :
                            <div className='flex items-center gap-4'>
                                <Link href={'/login'} className='secondary-button'>Login</Link>
                                <Link href={"/signup"} className='secondary-button'>
                                    <button >Register</button>
                                </Link>
                            </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default Navbar;