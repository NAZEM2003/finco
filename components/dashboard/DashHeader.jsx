import { UserButton } from '@clerk/nextjs';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search } from 'lucide-react';

const DashHeader = () => {
    return (
        <div className='p-3 shadow-md shadow-zinc-400 flex justify-between items-center w-full gap-10'>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Search..." />
                <Button className="" type="submit"> <Search/> </Button>
            </div>
            <div>
                <UserButton />
            </div>
        </div>
    );
}

export default DashHeader;
