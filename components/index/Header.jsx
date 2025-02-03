"use client"
import Image from 'next/image';
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';

const Header = () => {
    const { user, isSignedIn } = useUser();
    return (
        <div className='p-4 flex justify-between items-center shadow-lg'>
            <Image src="./images/logo.svg" width={180} height={50} alt='Logo' />
            {
                isSignedIn ? <UserButton />
                    : <Link href='/sign-in'><Button>Get Started !</Button></Link>
            }

        </div>
    );
}

export default Header;
