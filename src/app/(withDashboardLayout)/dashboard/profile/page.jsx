"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  ArrowLeft,
  LogOut,
  Edit3,
} from "lucide-react";
import { signOut } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />
      </div>
    );
  }

  if (status === "unauthenticated" || !session?.user) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center ">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <User className="h-8 w-8 text-slate-400" />
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-900">
          You’re not logged in
        </h2>
        <p className="mt-2 text-slate-600">
          Please sign in to view your profile.
        </p>
        <Link
          href="/login"
          className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const user = session.user;
  // Adjust field names if your DB uses different keys (phone / mobileNumber etc.)
  const mobile = user.phone || "Not provided";

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="h-32 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 sm:h-40" />

          {/* Avatar + Basic Info */}
          <div className="relative px-6 pb-8 sm:px-8">
            <div className="-mt-14 flex flex-col items-start gap-4 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative">
                  <div className="h-28 w-28 overflow-hidden rounded-2xl border-4 border-white bg-slate-100 shadow-md sm:h-32 sm:w-32">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        fill
                        className="object-cover"
                        sizes="128px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500">
                        <User className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white shadow">
                    <Camera className="h-3.5 w-3.5" />
                  </div>
                </div>

                <div className="mb-1">
                  <h1 className="text-2xl font-bold text-slate-900">
                    {user.name || "User"}
                  </h1>
                  <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                    <Shield className="h-3.5 w-3.5" />
                    {user.role || "user"}
                  </div>
                </div>
              </div>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>

            {/* Info Grid */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Name */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Full Name</p>
                    <p className="mt-0.5 font-semibold text-slate-900">
                      {user.name || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500">Email</p>
                    <p className="mt-0.5 truncate font-semibold text-slate-900">
                      {user.email || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Mobile</p>
                    <p className="mt-0.5 font-semibold text-slate-900">{mobile}</p>
                  </div>
                </div>
              </div>

              {/* Role */}
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500">Role</p>
                    <p className="mt-0.5 font-semibold capitalize text-slate-900">
                      {user.role || "user"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800">
                <Edit3 className="h-4 w-4" />
                Edit Profile
              </button>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;