"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "@/assets/img/logo.jpg"
import Container from './Container';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {
    const { data: session, status } = useSession();
    console.log(session)
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
                        <Link href={"/adminRoute"}>Admin</Link>
                        <Link href={"/userRoute"}>User</Link>
                    </ul>

                    {
                        status === "loading" ? (<button disabled>Loading....</button>) : session?.user?.email ? (
                            <div className='flex items-center gap-4'>
                                <button className='primary-button' onClick={() => signOut()}>
                                    Sign Out
                                </button>
                                <Link href={"/dashboard"} className='primary-button'>
                                    <button>Dashboard</button>
                                </Link>
                            </div>
                        ) :
                            <div className='flex items-center gap-4'>
                                <button onClick={() => signIn()} className='primary-button'>Login</button>
                                <Link href={"/signup"} className='primary-button'>
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