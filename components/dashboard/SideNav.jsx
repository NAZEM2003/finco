"use client"
import { menuList } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const SideNav = () => {
    const path = usePathname();
    return (
        <div className='h-screen p-3 shadow-xl shadow-zinc-500'>
            <Image
                src={`/images/logo.svg`}
                width={150}
                height={50}
                alt='Logo'
                className='mx-auto'
            />
            <nav className='mt-12'>
                <ul>
                    {
                        menuList.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className={`flex items-center gap-2 text-gray-600 font-medium p-3 my-3 transition-all hover:text-primary hover:bg-blue-100 ${path === item.path ?"text-primary bg-blue-100":""}`}
                                    href={item.path}
                                >
                                    <item.icon />
                                    <p>{item.title}</p>
                                </Link>
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <div className='flex gap-2 items-center fixed bottom-8 p-5'>
                <UserButton />
                <p>Profile</p>
            </div>
        </div>
    );
}

export default SideNav;
