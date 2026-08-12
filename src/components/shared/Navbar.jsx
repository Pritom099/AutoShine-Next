import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import logo from "@/assets/img/logo.jpg"

const Navbar = () => {
    return (
        <div className='h-[150px] bg-purple-200 text-black  font-bold text-5xl flex justify-center items-center'>

            <Link href={"/"}>
                <Image src={logo} alt="logo" height="60" width="60"></Image>
            </Link>
            
            <ul>
                <Link href={"/"}>Home</Link>
                <Link href={"/services"}>Services</Link>
                <Link href={"/reviews"}>Reviews</Link>
                <Link href={"/aboutUs"}>About Us</Link>
            </ul>

            <Link href={"/login"}>
            <button>Login</button>
            </Link>
        </div>
    );
};

export default Navbar;