// components/ServiceCard.jsx
import Image from "next/image";
import { Clock, Star, Sparkles, Ban } from "lucide-react";
import Link from "next/link";

export default function ServiceCard({ service }) {
    const isUnavailable = service?.isDeleted;

    return (
        <div
            className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 ${isUnavailable
                    ? "border-slate-200 opacity-75"
                    : "border-slate-200/80 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                }`}
        >
            {/* Image */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                    src={service.img}
                    alt={service.name}
                    fill
                    className={`object-cover transition-transform duration-500 ${isUnavailable ? "grayscale" : "group-hover:scale-105"
                        }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Featured Badge */}
                {service.isFeatured && !isUnavailable && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        <Sparkles className="h-3.5 w-3.5" />
                        Featured
                    </div>
                )}

                {/* Unavailable Badge */}
                {isUnavailable && (
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-red-500/90 px-3 py-1 text-xs font-semibold text-white shadow-lg backdrop-blur-sm">
                        <Ban className="h-3.5 w-3.5" />
                        Unavailable
                    </div>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    <Clock className="h-3.5 w-3.5" />
                    {service.duration} min
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                        {service.name}
                    </h3>
                    <div className="shrink-0 text-right">
                        <p className="text-xl font-bold text-slate-900">
                            ৳{service.price.toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <div
                    className="prose prose-sm prose-slate mb-5 line-clamp-3 flex-1 text-slate-600"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                />

                {/* Footer */}
                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                        <Star className="h-4 w-4 fill-current" />
                    </div>

                    {isUnavailable ? (
                        <button
                            disabled
                            className="cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 text-sm font-medium text-slate-400"
                        >
                            Unavailable
                        </button>
                    ) : (
                        <Link
                            href={`/services/${service?._id}`}
                            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 active:scale-[0.98]"
                        >
                            Book Now
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}