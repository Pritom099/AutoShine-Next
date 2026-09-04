import React from "react";
import Link from "next/link";
import {
    LayoutDashboard,
    Car,
    Star,
    Calendar,
    TrendingUp,
    CheckCircle2,
    ArrowRight,
    Droplets,
    MessageSquare,
    Settings,
    Plus,
} from "lucide-react";
import Container from "@/components/shared/Container";

const DashboardPage = () => {
    const stats = [
        {
            title: "Total Services",
            value: "12",
            change: "+2 this month",
            icon: Car,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Total Bookings",
            value: "148",
            change: "+18% from last month",
            icon: Calendar,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Reviews",
            value: "86",
            change: "4.9 average rating",
            icon: Star,
            color: "bg-amber-50 text-amber-600",
        },
        {
            title: "Revenue",
            value: "৳2.4L",
            change: "+12% this month",
            icon: TrendingUp,
            color: "bg-violet-50 text-violet-600",
        },
    ];

    const recentBookings = [
        {
            id: 1,
            customer: "Rahim Khan",
            service: "Elite Shine Auto Spa",
            date: "4 Sep 2026",
            status: "Completed",
            amount: "৳4,200",
        },
        {
            id: 2,
            customer: "Sara Ahmed",
            service: "Express Wash",
            date: "3 Sep 2026",
            status: "Pending",
            amount: "৳1,500",
        },
        {
            id: 3,
            customer: "Utsho",
            service: "Premium Wax and Polish",
            date: "3 Sep 2026",
            status: "Completed",
            amount: "৳2,000",
        },
        {
            id: 4,
            customer: "Nusrat Jahan",
            service: "Underbody Wash",
            date: "2 Sep 2026",
            status: "Cancelled",
            amount: "৳1,200",
        },
    ];

    const quickActions = [
        {
            title: "All Services",
            desc: "Manage service packages",
            href: "/services",
            icon: Droplets,
        },
        {
            title: "Reviews",
            desc: "View customer feedback",
            href: "/reviews",
            icon: MessageSquare,
        },
        {
            title: "Create Review",
            desc: "Add a new review",
            href: "/reviews/create-review",
            icon: Plus,
        },
        {
            title: "About Us",
            desc: "Update company info",
            href: "/aboutUs",
            icon: Settings,
        },
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case "Completed":
                return "bg-emerald-50 text-emerald-700";
            case "Pending":
                return "bg-amber-50 text-amber-700";
            case "Cancelled":
                return "bg-red-50 text-red-700";
            default:
                return "bg-slate-50 text-slate-700";
        }
    };

    return (
        <Container>
            <div className="min-h-screen w-full bg-slate-50">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </div>
                            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Welcome back 👋
                            </h1>
                            <p className="mt-1 text-slate-600">
                                Here’s what’s happening with AutoShine today.
                            </p>
                        </div>

                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            <Plus className="h-4 w-4" />
                            View Services
                        </Link>
                    </div>

                    {/* Stats - equal width */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((stat) => (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-slate-500">
                                            {stat.title}
                                        </p>
                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            {stat.value}
                                        </p>
                                        <p className="mt-1 text-xs text-slate-500">{stat.change}</p>
                                    </div>
                                    <div
                                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
                                    >
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Main Content - balanced 2 column on large screens */}
                    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-5">
                        {/* Recent Bookings - takes more space */}
                        <div className="xl:col-span-3">
                            <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                                    <h2 className="font-semibold text-slate-900">Recent Bookings</h2>
                                    <button className="text-sm font-medium text-slate-500 hover:text-slate-900">
                                        View all
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[500px] text-left text-sm">
                                        <thead className="border-b border-slate-100 bg-slate-50/50 text-xs uppercase text-slate-500">
                                            <tr>
                                                <th className="px-5 py-3 font-medium">Customer</th>
                                                <th className="px-5 py-3 font-medium">Service</th>
                                                <th className="px-5 py-3 font-medium">Date</th>
                                                <th className="px-5 py-3 font-medium">Status</th>
                                                <th className="px-5 py-3 font-medium text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {recentBookings.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-slate-50/50">
                                                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900">
                                                        {booking.customer}
                                                    </td>
                                                    <td className="px-5 py-4 text-slate-600">
                                                        {booking.service}
                                                    </td>
                                                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                                                        {booking.date}
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <span
                                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${getStatusStyle(
                                                                booking.status
                                                            )}`}
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-5 py-4 text-right font-semibold text-slate-900">
                                                        {booking.amount}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="space-y-6 xl:col-span-2">
                            {/* Quick Actions */}
                            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                                <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                                <div className="mt-4 space-y-2">
                                    {quickActions.map((action) => (
                                        <Link
                                            key={action.title}
                                            href={action.href}
                                            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-slate-200 hover:bg-slate-50"
                                        >
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                                                <action.icon className="h-4 w-4" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {action.title}
                                                </p>
                                                <p className="text-xs text-slate-500">{action.desc}</p>
                                            </div>
                                            <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Performance */}
                            <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white shadow-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                    <h2 className="font-semibold">Today’s Performance</h2>
                                </div>
                                <p className="mt-3 text-3xl font-bold">12 Bookings</p>
                                <p className="mt-1 text-sm text-slate-300">
                                    8 completed · 3 pending · 1 cancelled
                                </p>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-full w-3/4 rounded-full bg-emerald-400" />
                                </div>
                                <p className="mt-2 text-xs text-slate-400">75% completion rate</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DashboardPage;