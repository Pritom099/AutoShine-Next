// app/services/[slug]/page.jsx  (or wherever your details page is)

import Image from "next/image";
import Link from "next/link";
import {
    Clock,
    Star,
    Sparkles,
    Ban,
    ArrowLeft,
    CheckCircle2,
    Shield,
    Droplets,
} from "lucide-react";
import BookingBtn from "../_component/BookingBtn";
import { getSingleService } from "@/services/services.service";

/* const getSingleService = async (id) => {
    const res = await fetch(
        `https://car-washing-system-cleanify-server.vercel.app/api/v1/services/${id}`,
        { next: { revalidate: 60 } } // optional: revalidate every 60s
    );

    const data = await res.json();
    return data;
}; */

const ServiceDetailsPage = async ({ params }) => {
    const { slug } = await params;
    const serviceRes = await getSingleService(slug);
    const service = serviceRes?.data;

    if (!service) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Service Not Found</h1>
                <p className="mt-2 text-slate-600">
                    The service you’re looking for doesn’t exist or has been removed.
                </p>
                <Link
                    href="/services"
                    className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                    Back to Services
                </Link>
            </div>
        );
    }

    const isUnavailable = service.isDeleted;

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Top Navigation */}
            <div className="border-b border-slate-200 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Services
                    </Link>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                    {/* Left: Image */}
                    <div className="relative">
                        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200 shadow-lg">
                            <Image
                                src={service.img}
                                alt={service.name}
                                fill
                                priority
                                className={`object-cover ${isUnavailable ? "grayscale" : ""}`}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />

                            {/* Badges */}
                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                {service.isFeatured && !isUnavailable && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                                        <Sparkles className="h-3.5 w-3.5" />
                                        Featured
                                    </span>
                                )}

                                {isUnavailable && (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                                        <Ban className="h-3.5 w-3.5" />
                                        Currently Unavailable
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="flex flex-col">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                {service.name}
                            </h1>

                            {/* Meta info */}
                            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4 text-slate-400" />
                                    <span>{service.duration} minutes</span>
                                </div>

                                <div className="flex items-center gap-1 text-amber-500">
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <Star className="h-4 w-4 fill-current" />
                                    <span className="ml-1 text-slate-600">(5.0)</span>
                                </div>
                            </div>

                            {/* Price */}
                            <div className="mt-6">
                                <p className="text-sm font-medium text-slate-500">Starting from</p>
                                <p className="mt-1 text-4xl font-bold text-slate-900">
                                    ৳{service.price.toLocaleString()}
                                </p>
                            </div>

                            {/* Short highlights */}
                            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                                        <Droplets className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Finish</p>
                                        <p className="text-sm font-semibold text-slate-900">Premium Gloss</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                        <Shield className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Protection</p>
                                        <p className="text-sm font-semibold text-slate-900">Long Lasting</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                                        <CheckCircle2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-slate-500">Quality</p>
                                        <p className="text-sm font-semibold text-slate-900">Professional</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Book Button */}
                        <div className="mt-10">
                            <BookingBtn service={service}></BookingBtn>

                            {!isUnavailable && (
                                <p className="mt-3 text-sm text-slate-500">
                                    Free cancellation up to 2 hours before the appointment.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Full Description */}
                <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10">
                    <h2 className="text-xl font-bold text-slate-900">About this service</h2>

                    <div
                        className="mt-5 max-w-none text-base leading-7 text-slate-800"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                </div>

                {/* Extra Info Cards */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="font-semibold text-slate-900">Duration</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Approximately {service.duration} minutes. Exact time may vary based on vehicle condition.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                        <h3 className="font-semibold text-slate-900">What to expect</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Professional technicians, premium products, and careful attention to every detail of your vehicle.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:col-span-2 lg:col-span-1">
                        <h3 className="font-semibold text-slate-900">After care tip</h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Avoid washing the car for 24–48 hours after the service for best results and longer-lasting protection.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;