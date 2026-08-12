import React from 'react';

const ServiceDetailsPage = async ({params}) => {
    const {slug} = await params;

    return (
        <div>
            Service Details Page {slug}
        </div>
    );
};

export default ServiceDetailsPage;