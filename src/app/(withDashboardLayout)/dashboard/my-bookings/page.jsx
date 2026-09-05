"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  ArrowRight,
  PackageOpen,
  Clock,
} from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/bookings");
        if (res.status === 401) {
          setBookings([]);
          return;
        }
        const data = await res.json();
        setBookings(data?.bookings || []);
      } catch (err) {
        console.error(err);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
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
              {bookings.length > 0
                ? `You have ${bookings.length} booking${
                    bookings.length > 1 ? "s" : ""
                  }`
                : "No services booked yet"}
            </p>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <LayoutDashboard className="h-4 w-4" />
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {bookings.length === 0 ? (
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
            {bookings.map((b) => (
              <div
                key={b._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {b.img && (
                  <div className="relative aspect-[16/10] bg-slate-100">
                    <Image
                      src={b.img}
                      alt={b.serviceName || "Service"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {b.serviceName}
                  </h3>
                  <div className="mt-2 flex items-center justify-between text-sm text-slate-600">
                    <span className="font-semibold text-slate-900">
                      ৳{Number(b.price || 0).toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {b.duration} min
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                    <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium capitalize text-amber-700">
                      {b.status || "pending"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {b.createdAt
                        ? new Date(b.createdAt).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;