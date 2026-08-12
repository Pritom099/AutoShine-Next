import DashboardSidebar from '@/components/shared/DashboardSidebar';
import React from 'react';

const layout = ({children}) => {
    return (
        <div className='flex gap-4'>
            <DashboardSidebar></DashboardSidebar>
            <div className='ml-[200px]'>{children}</div>
        </div>
    );
};

export default layout;