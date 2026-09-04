"use client";

import ServiceCard from "@/app/(withCommonLayout)/services/_component/ServiceCard";
import { BookingContext } from "@/context/bookingContext";
import React, { use } from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    Calendar,
    ArrowRight,
    PackageOpen,
} from "lucide-react";

const MyBookings = () => {
    const { bookings } = use(BookingContext);
    const validBookings = bookings?.filter(Boolean) || [];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <Calendar className="h-4 w-4" />
                            My Bookings
                        </div>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Your Booked Services
                        </h1>
                        <p className="mt-1 text-slate-600">
                            {validBookings.length > 0
                                ? `You have ${validBookings.length} booking${validBookings.length > 1 ? "s" : ""
                                }`
                                : "No services booked yet"}
                        </p>
                    </div>

                    {/* Dashboard button */}
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Go to Dashboard
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Content */}
                {validBookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <PackageOpen className="h-8 w-8 text-slate-400" />
                        </div>
                        <h2 className="mt-5 text-xl font-semibold text-slate-900">
                            No Bookings Yet
                        </h2>
                        <p className="mt-2 max-w-sm text-sm text-slate-500">
                            You haven’t booked any service. Explore our packages and book
                            your first wash.
                        </p>
                        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                            <Link
                                href="/services"
                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                            >
                                Browse Services
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {validBookings.map((service) => (
                            <ServiceCard service={service} key={service?._id} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBookings;