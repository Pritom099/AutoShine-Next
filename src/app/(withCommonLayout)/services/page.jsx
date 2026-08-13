import React from 'react';
import ServiceCard from './_component/ServiceCard';

const getAllServices = async() => {
    const res = await fetch("https://car-washing-system-cleanify-server.vercel.app/api/v1/services");
    const data = await res.json();
    return data;
}

const servicesPage = async() => {
    const services  = await getAllServices();
    console.log(services);

    return (
        <div>
            <h2>services  Page</h2>

            {services?.data?.map((service) => {
                return <ServiceCard service={service} key={service?._id}></ServiceCard>;
            })}
        </div>
    );
};

export default servicesPage;