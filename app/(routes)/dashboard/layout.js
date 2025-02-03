import DashHeader from '@/components/dashboard/DashHeader';
import SideNav from '@/components/dashboard/SideNav';
import React from 'react';

export const metadata = {
    title: "FINCO | Dashboard",
    description: "financial management app , income and expenses , dashboard",
};

const DashboardLayout = ({ children }) => {
 
    return (
        <div >
            <div className='fixed top-0 md:w-64 hidden md:block'>
                <SideNav />
            </div>
            <div className='dashboard-layout'>
                <DashHeader />
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
