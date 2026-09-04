
import DashboardSidebar from '@/components/shared/DashboardSidebar';
import React from 'react';

const layout = ({ children }) => {
    return (
        <div className='flex gap-4'>
            <DashboardSidebar></DashboardSidebar>
            <main className="ml-[200px] min-h-screen w-full">
                {children}
            </main>
        </div>
    );
};

export default layout;