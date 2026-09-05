import Link from "next/link";
import {
    LayoutDashboard,
    Car,
    Star,
    Users,
    TrendingUp,
    MessageSquare,
    Shield,
    ArrowRight,
    CheckCircle2,
    Ban,
    Calendar,
} from "lucide-react";

const AdminRoute = ({
    user,
    services = [],
    reviews = [],
    bookings = [],
}) => {
    const safeServices = Array.isArray(services) ? services : [];
    const safeReviews = Array.isArray(reviews) ? reviews : [];
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    const activeServices = safeServices.filter((s) => !s?.isDeleted);
    const deletedServices = safeServices.filter((s) => s?.isDeleted);
    const featuredServices = safeServices.filter(
        (s) => s?.isFeatured && !s?.isDeleted
    );

    const pendingBookings = safeBookings.filter(
        (b) => (b.status || "pending") === "pending"
    );
    const completedBookings = safeBookings.filter(
        (b) => b.status === "completed"
    );

    const averageRating =
        safeReviews.length > 0
            ? (
                safeReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
                safeReviews.length
            ).toFixed(1)
            : "0.0";

    const totalRevenueEstimate = activeServices.reduce(
        (sum, s) => sum + (s?.price || 0),
        0
    );

    const bookingRevenue = safeBookings.reduce(
        (sum, b) => sum + (b?.price || 0),
        0
    );

    const stats = [
        {
            title: "Total Bookings",
            value: safeBookings.length,
            sub: `${pendingBookings.length} pending · ${completedBookings.length} done`,
            icon: Calendar,
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Total Services",
            value: safeServices.length,
            sub: `${activeServices.length} active`,
            icon: Car,
            color: "bg-emerald-50 text-emerald-600",
        },
        {
            title: "Reviews",
            value: safeReviews.length,
            sub: `${averageRating} avg rating`,
            icon: Star,
            color: "bg-amber-50 text-amber-600",
        },
        {
            title: "Booking Revenue",
            value: `৳${bookingRevenue.toLocaleString()}`,
            sub: "From all bookings",
            icon: TrendingUp,
            color: "bg-violet-50 text-violet-600",
        },
    ];

    const quickActions = [
        { title: "Manage Services", href: "/services", icon: Car },
        { title: "All Reviews", href: "/reviews", icon: MessageSquare },
        { title: "My Bookings", href: "/dashboard/my-bookings", icon: Users },
        { title: "Profile", href: "/dashboard/profile", icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <LayoutDashboard className="h-4 w-4" />
                            Admin Dashboard
                        </div>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                            Project Overview
                        </h1>
                        <p className="mt-1 text-slate-600">
                            Welcome, {user?.name || "Admin"} — full AutoShine control panel
                        </p>
                    </div>
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase text-amber-800">
                        <Shield className="h-3.5 w-3.5" />
                        Admin
                    </span>
                </div>

                {/* Stats — Total Bookings প্রথম card */}
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-2 text-2xl font-bold text-slate-900">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">{stat.sub}</p>
                                </div>
                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                                >
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 grid gap-6 xl:grid-cols-5">
                    {/* Services table */}
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3">
                        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                            <h2 className="font-semibold text-slate-900">All Services</h2>
                            <Link
                                href="/services"
                                className="text-sm font-medium text-slate-500 hover:text-slate-900"
                            >
                                Manage
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[520px] text-left text-sm">
                                <thead className="border-b border-slate-100 bg-slate-50/80 text-xs uppercase text-slate-500">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Service</th>
                                        <th className="px-5 py-3 font-medium">Price</th>
                                        <th className="px-5 py-3 font-medium">Duration</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {safeServices.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={4}
                                                className="px-5 py-10 text-center text-slate-500"
                                            >
                                                No services found
                                            </td>
                                        </tr>
                                    ) : (
                                        safeServices.slice(0, 8).map((s) => (
                                            <tr key={s._id} className="hover:bg-slate-50/50">
                                                <td className="px-5 py-3 font-medium text-slate-900">
                                                    {s.name}
                                                    {s.isFeatured && (
                                                        <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                                                            Featured
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-3 text-slate-600">
                                                    ৳{s.price?.toLocaleString()}
                                                </td>
                                                <td className="px-5 py-3 text-slate-500">
                                                    {s.duration} min
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${s.isDeleted
                                                                ? "bg-red-50 text-red-700"
                                                                : "bg-emerald-50 text-emerald-700"
                                                            }`}
                                                    >
                                                        {s.isDeleted ? "Unavailable" : "Active"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Recent Bookings table */}
                        <div className="border-t border-slate-100 px-5 py-4">
                            <h2 className="mb-4 font-semibold text-slate-900">
                                Recent Bookings ({safeBookings.length} total)
                            </h2>
                            {safeBookings.length === 0 ? (
                                <p className="text-sm text-slate-500">No bookings yet</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[480px] text-left text-sm">
                                        <thead className="text-xs uppercase text-slate-500">
                                            <tr>
                                                <th className="pb-2 font-medium">Customer</th>
                                                <th className="pb-2 font-medium">Service</th>
                                                <th className="pb-2 font-medium">Price</th>
                                                <th className="pb-2 font-medium">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {safeBookings.slice(0, 6).map((b) => (
                                                <tr key={b._id}>
                                                    <td className="py-2.5">
                                                        <p className="font-medium text-slate-900">
                                                            {b.userName || "—"}
                                                        </p>
                                                        <p className="text-xs text-slate-500">
                                                            {b.userEmail}
                                                        </p>
                                                    </td>
                                                    <td className="py-2.5 text-slate-600">
                                                        {b.serviceName}
                                                    </td>
                                                    <td className="py-2.5 text-slate-900">
                                                        ৳{Number(b.price || 0).toLocaleString()}
                                                    </td>
                                                    <td className="py-2.5">
                                                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium capitalize text-amber-700">
                                                            {b.status || "pending"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Side panels */}
                    <div className="space-y-6 xl:col-span-2">
                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="font-semibold text-slate-900">Quick Actions</h2>
                            <div className="mt-4 space-y-2">
                                {quickActions.map((a) => (
                                    <Link
                                        key={a.title}
                                        href={a.href}
                                        className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 hover:bg-slate-50"
                                    >
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                            <a.icon className="h-4 w-4 text-slate-700" />
                                        </div>
                                        <span className="flex-1 text-sm font-medium text-slate-900">
                                            {a.title}
                                        </span>
                                        <ArrowRight className="h-4 w-4 text-slate-400" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-900 p-5 text-white">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                <h2 className="font-semibold">System Snapshot</h2>
                            </div>
                            <p className="mt-3 text-3xl font-bold">{safeBookings.length}</p>
                            <p className="text-sm text-slate-300">Total bookings</p>
                            <div className="mt-4 space-y-1 text-sm text-slate-400">
                                <p>Pending: {pendingBookings.length}</p>
                                <p>Active services: {activeServices.length}</p>
                                <p>Reviews: {safeReviews.length}</p>
                                <p>Avg rating: {averageRating}/5</p>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="font-semibold text-slate-900">Latest Reviews</h2>
                            <div className="mt-4 space-y-3">
                                {safeReviews.length === 0 ? (
                                    <p className="text-sm text-slate-500">No reviews yet</p>
                                ) : (
                                    safeReviews.slice(0, 3).map((r) => (
                                        <div key={r._id} className="rounded-xl bg-slate-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-slate-900">
                                                    {r.name}
                                                </p>
                                                <span className="text-xs text-amber-600">
                                                    {r.rating}/5
                                                </span>
                                            </div>
                                            <p className="mt-1 line-clamp-2 text-xs text-slate-600">
                                                {r.comment}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminRoute;