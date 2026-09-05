"use client";

import Link from "next/link";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import { BookingContext } from "@/context/bookingContext";
import {
  LayoutDashboard,
  Calendar,
  Star,
  User,
  ArrowRight,
  Car,
  MessageSquare,
  Shield,
  PackageOpen,
} from "lucide-react";

const UserRoute = ({ user, services = [], reviews = [] }) => {
  const { bookings, setBookings } = use(BookingContext);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Dashboard-এ ঢুকলেই Mongo থেকে fresh bookings নাও
  useEffect(() => {
    const loadBookings = async () => {
      setLoadingBookings(true);
      try {
        const res = await fetch("/api/bookings");
        if (!res.ok) return;

        const data = await res.json();
        if (data?.bookings) {
          setBookings(
            data.bookings.map((b) => ({
              _id: b.serviceId,
              name: b.serviceName,
              price: b.price,
              duration: b.duration,
              img: b.img,
              description: b.description,
              status: b.status,
            }))
          );
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBookings(false);
      }
    };

    loadBookings();
  }, [setBookings]);

  const validBookings = bookings?.filter(Boolean) || [];
  const safeServices = Array.isArray(services) ? services : [];
  const safeReviews = Array.isArray(reviews) ? reviews : [];

  const averageRating =
    safeReviews.length > 0
      ? (
          safeReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          safeReviews.length
        ).toFixed(1)
      : "0.0";

  const stats = [
    {
      title: "My Bookings",
      value: validBookings.length,
      icon: Calendar,
      color: "bg-blue-50 text-blue-600",
      href: "/dashboard/my-bookings",
    },
    {
      title: "Available Services",
      value: safeServices.filter((s) => !s?.isDeleted).length,
      icon: Car,
      color: "bg-emerald-50 text-emerald-600",
      href: "/services",
    },
    {
      title: "Reviews",
      value: safeReviews.length,
      icon: Star,
      color: "bg-amber-50 text-amber-600",
      href: "/reviews",
    },
    {
      title: "Avg Rating",
      value: averageRating,
      icon: Shield,
      color: "bg-violet-50 text-violet-600",
      href: "/reviews",
    },
  ];

  const quickLinks = [
    { title: "Browse Services", href: "/services", icon: Car },
    { title: "My Bookings", href: "/dashboard/my-bookings", icon: Calendar },
    {
      title: "Write a Review",
      href: "/reviews/create-review",
      icon: MessageSquare,
    },
    { title: "My Profile", href: "/dashboard/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-200">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user?.name || "User"}
                  fill
                  priority
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-6 w-6 text-slate-500" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <LayoutDashboard className="h-4 w-4" />
                User Dashboard
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                Hi, {user?.name || "User"} 👋
              </h1>
              <p className="text-sm text-slate-600">{user?.email}</p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-700">
            <Shield className="h-3.5 w-3.5" />
            {user?.role || "user"}
          </span>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <Link
              key={stat.title}
              href={stat.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Bookings */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h2 className="font-semibold text-slate-900">My Bookings</h2>
              <Link
                href="/dashboard/my-bookings"
                className="text-sm font-medium text-slate-500 hover:text-slate-900"
              >
                View all
              </Link>
            </div>
            <div className="p-5">
              {loadingBookings ? (
                <p className="py-8 text-center text-sm text-slate-500">
                  Loading bookings...
                </p>
              ) : validBookings.length === 0 ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <PackageOpen className="h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">No bookings yet</p>
                  <Link
                    href="/services"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
                  >
                    Browse services <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {validBookings.slice(0, 4).map((service) => (
                    <div
                      key={service._id}
                      className="flex items-center justify-between rounded-xl border border-slate-100 p-3"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {service.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          ৳{service.price?.toLocaleString()} · {service.duration}{" "}
                          min
                        </p>
                      </div>
                      <Link
                        href={`/services/${service._id}`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                      >
                        View
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="font-semibold text-slate-900">Quick Actions</h2>
              <div className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:bg-slate-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                      <link.icon className="h-4 w-4" />
                    </div>
                    <span className="flex-1 text-sm font-medium text-slate-900">
                      {link.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
              <p className="text-sm text-slate-300">Account</p>
              <p className="mt-1 font-semibold">{user?.name}</p>
              <p className="text-sm text-slate-400">{user?.email}</p>
              <p className="mt-2 text-sm text-slate-400">
                Phone: {user?.phone || "Not provided"}
              </p>
              <Link
                href="/dashboard/profile"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-amber-400 hover:text-amber-300"
              >
                View full profile <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRoute;