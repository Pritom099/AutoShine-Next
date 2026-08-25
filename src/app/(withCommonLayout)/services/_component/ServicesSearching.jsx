"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const ServicesSearching = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleSubmitFunc = (e) => {
        e.preventDefault();
        const searchTerm = e.target.search?.value;
        const params =  new URLSearchParams(searchParams);
        if(searchTerm){
            params.set("searchTerm",searchTerm);
        }else{
            params.delete("searchTerm");
        }

        router.push(`${pathname}?${params}`)
    }
    return (
        <div className='ml-6'>
            <form onSubmit={handleSubmitFunc}>
                <div className='my-4 flex items-center '>
                    <input name="search" type='text' placeholder='search here' className='py-2 px-2 bg-white text-black rounded shadow w-[200px]'></input>
                    <button className='bg-purple-500 py-2 px-5 cursor-pointer'>Search</button>
                </div>
            </form>
        </div>
    );
};

export default ServicesSearching;