import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  Droplets,
  Clock,
  Users,
  Award,
  Heart,
  Target,
  ArrowRight,
} from "lucide-react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-amber-400" />
              About AutoShine
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              We make every car{" "}
              <span className="text-amber-400">shine like new</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              AutoShine is more than just a car wash. We are a team of
              passionate professionals dedicated to delivering premium care,
              lasting protection, and a showroom-ready finish for every
              vehicle that rolls through our doors.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Our Story
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Founded with a simple vision — to bring professional-grade car
              care to everyday drivers — AutoShine started as a small detailing
              studio and has grown into a trusted name for quality washes,
              ceramic coatings, and complete vehicle rejuvenation.
            </p>
            <p className="mt-4 text-slate-600 leading-relaxed">
              We believe every car deserves more than a quick rinse. That’s why
              we combine premium products, skilled technicians, and careful
              attention to detail to deliver results that last.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                  <Award className="h-4 w-4" />
                </div>
                Premium Quality
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                  <Shield className="h-4 w-4" />
                </div>
                Trusted Care
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: "5K+", label: "Cars Washed", icon: Droplets },
              { value: "98%", label: "Happy Clients", icon: Heart },
              { value: "12+", label: "Services", icon: Sparkles },
              { value: "4.9", label: "Average Rating", icon: Award },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              What Drives Us
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600">
              Our mission and values guide every wash, polish, and coating we
              deliver.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To provide exceptional car care that protects your vehicle and restores its beauty with every visit.",
              },
              {
                icon: Heart,
                title: "Customer First",
                desc: "We treat every car as if it were our own — with honesty, care, and a commitment to satisfaction.",
              },
              {
                icon: Shield,
                title: "Quality Promise",
                desc: "We use only premium products and proven techniques to ensure long-lasting results you can trust.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300 hover:bg-white hover:shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Why Choose AutoShine?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            We’re not just another car wash. Here’s what sets us apart.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Droplets,
              title: "Premium Products",
              desc: "We use high-quality soaps, waxes, and coatings for superior results.",
            },
            {
              icon: Users,
              title: "Expert Team",
              desc: "Trained technicians who care about every detail of your vehicle.",
            },
            {
              icon: Clock,
              title: "On-Time Service",
              desc: "Efficient processes so you get your car back looking great, on schedule.",
            },
            {
              icon: Shield,
              title: "Lasting Protection",
              desc: "From ceramic coatings to wax, we help protect your paint for longer.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition group-hover:bg-slate-900 group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to give your car the shine it deserves?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Book a service today and experience the AutoShine difference.
          </p>
          <Link
            href="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            Explore Our Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;