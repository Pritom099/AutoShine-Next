import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Clock,
  Star,
  ArrowRight,
  Droplets,
  Award,
  Users,
  CheckCircle2,
  Quote,
  User,
} from "lucide-react";
import { getAllServices } from "@/services/services.service";
import { getAllReviews } from "@/services/reviews.service";
import ServiceCard from "./services/_component/ServiceCard";

const HomePage = async () => {
  // Services
  const servicesRes = await getAllServices({});
  const allServices = servicesRes?.data || servicesRes?.services || [];

  const featuredServices = allServices
    .filter((service) => service.isFeatured && !service.isDeleted)
    .slice(0, 3);

  const displayServices =
    featuredServices.length > 0
      ? featuredServices
      : allServices.filter((s) => !s.isDeleted).slice(0, 3);

  // Reviews (real data from database)
  const reviewsData = await getAllReviews({});
  const allReviews = reviewsData?.reviews || [];
  const displayReviews = allReviews.slice(0, 3); // show latest 3

  const averageRating =
    allReviews.length > 0
      ? (
          allReviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          allReviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              Premium Car Care
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Your car deserves a{" "}
              <span className="text-amber-400">perfect shine</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              From quick express washes to full ceramic coatings — AutoShine
              delivers professional results that protect and transform your
              vehicle.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/aboutUs"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4 sm:px-6">
          {[
            { icon: Droplets, value: "5,000+", label: "Cars Washed" },
            { icon: Users, value: "2,500+", label: "Happy Clients" },
            {
              icon: Award,
              value: averageRating,
              label: "Average Rating",
            },
            {
              icon: Shield,
              value: `${allServices.length || 12}+`,
              label: "Premium Services",
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED SERVICES ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Popular Services
            </h2>
            <p className="mt-2 text-slate-600">
              Our most loved packages for every kind of car care
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline"
          >
            View all services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayServices.length > 0 ? (
            displayServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
              <p className="text-slate-500">No services available right now.</p>
            </div>
          )}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Why Choose AutoShine?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              We combine premium products, skilled hands, and real care for
              every vehicle.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Droplets,
                title: "Premium Products",
                desc: "Only high-quality soaps, waxes & coatings",
              },
              {
                icon: Shield,
                title: "Paint Protection",
                desc: "Long-lasting shield against dirt & UV",
              },
              {
                icon: Clock,
                title: "On-Time Service",
                desc: "Efficient process, no unnecessary waiting",
              },
              {
                icon: CheckCircle2,
                title: "Satisfaction Guaranteed",
                desc: "We don’t stop until you’re happy",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:bg-white hover:shadow-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CUSTOMER REVIEWS (Real Data) ================= */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              What Customers Say
            </h2>
            <p className="mt-2 text-slate-600">
              Real feedback from our valued customers
            </p>
          </div>
          <Link
            href="/reviews"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:underline"
          >
            See all reviews
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {displayReviews.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <p className="text-slate-500">No reviews yet. Be the first!</p>
            <Link
              href="/reviews/create-review"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:underline"
            >
              Write a Review
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {displayReviews.map((review) => (
              <div
                key={review._id}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <Quote className="absolute right-4 top-4 h-8 w-8 text-slate-100" />

                <div className="relative flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {review.name || "Anonymous"}
                    </h3>
                    <div className="mt-0.5 flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < (review.rating || 0)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="relative mt-4 text-sm leading-relaxed text-slate-600">
                  “{review.comment || "No comment provided."}”
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready for a showroom shine?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-slate-300">
            Book your preferred service today and experience the AutoShine
            difference.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Book a Service
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/reviews/create-review"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Write a Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;