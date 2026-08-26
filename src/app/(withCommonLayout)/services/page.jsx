import React from 'react';
import ServiceCard from './_component/ServiceCard';
import Container from '@/components/shared/Container';
import ServicesSearching from './_component/ServicesSearching';

const getAllServices = async (searchParams) => {
    const getParams = new URLSearchParams(searchParams).toString();
    console.log(getParams)
    const res = await fetch(`https://car-washing-system-cleanify-server.vercel.app/api/v1/services?${getParams}`);
    /*    await new Promise((resolve) =>
           setTimeout(() => {
               resolve();
           }, 3000)
       ) */

    const data = await res.json();
    return data;
}

export const metadata = {
  title: "services",
  description: "car washing system",
};

const servicesPage = async ({ searchParams }) => {
    const getParams = await searchParams;
    const services = await getAllServices({ ...getParams });


    return (
        <Container>
            <div>
                <h2 className='text-3xl font-bold text-purple-500 text-center mb-4'>services  Page</h2>
                <ServicesSearching></ServicesSearching>
                {services?.mata?.total === 0 ? (
                    <div className='text-4xl font-bold text-purple-500 text-center my-4'>
                        No data Found
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5'>
                        {services?.data?.map((service) => {
                            return <ServiceCard service={service} key={service?._id}></ServiceCard>;
                        })}
                    </div>
                )}
            </div>
        </Container >
    );
};

export default servicesPage;