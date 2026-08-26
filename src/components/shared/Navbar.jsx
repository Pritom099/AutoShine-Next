"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { use } from 'react';
import logo from "@/assets/img/logo.jpg"
import Container from './Container';
import { UserContext } from '@/context/userContext';

const Navbar = () => {
    const { user } = use(UserContext)
    return (
        <div className='bg-purple-500'>
            <Container>
                <div className='py-4 text-black font-bold text-5xl flex justify-between items-center'>

                    <Link href={"/"}>
                        <Image src={logo} alt="logo" height="60" width="60"></Image>
                    </Link>

                    <ul className='font-semibold text-[18px] flex gap-3 items-center'>
                        <Link href={"/"}>Home</Link>
                        <Link href={"/services"}>Services</Link>
                        <Link href={"/reviews"}>Reviews</Link>
                        <Link href={"/aboutUs"}>About Us</Link>
                    </ul>

                    {
                        user ? <Link href={"/dashboard"}>
                            <button>Dashboard</button>
                        </Link> : <Link href={"/login"}>
                            <button>Login</button>
                        </Link>
                    }
                </div>
            </Container>
        </div>
    );
};

export default Navbar;