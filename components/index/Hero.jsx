import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section className="bg-gray-50 flex flex-col items-center">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
                <div className="mx-auto max-w-xl text-center">
                    <h1 className="text-3xl font-extrabold sm:text-5xl">
                        Manage Your Expenses
                        <strong className="font-extrabold mt-5 text-primary sm:block"> Control Your Money</strong>
                    </h1>

                    <p className="mt-4 sm:text-xl/relaxed">
                        Start Creating Your Budget and Save ton of Money.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-800 transition-all focus:outline-none focus:ring active:bg-blue-900 sm:w-auto"
                            href="/dashboard"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
            <Image
                src="/images/dashboard.webp"
                alt='Dashboard'
                width={1000}
                height={800}
                className='-mt-10 mb-10 rounded-xl'
            />
        </section>
    );
}

export default Hero;
