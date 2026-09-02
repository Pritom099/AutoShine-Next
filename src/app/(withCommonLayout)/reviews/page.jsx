import { getAllReviews } from "@/services/reviews.service";
import { Star, MessageSquare, User, Quote, Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

const ReviewsPage = async () => {
    const reviewsData = await getAllReviews();
    const reviews = reviewsData?.reviews || [];

    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
            ).toFixed(1)
            : "0.0";

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Customer Reviews
                    </h1>
                    <p className="mt-3 text-base text-slate-600">
                        Real feedback from our valued customers
                    </p>
                    <Link
                        href="/reviews/create-review"
                        className="mt-8 mr-6 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-purple-500 px-6 py-7 font-bold text-white shadow-sm transition hover:bg-purple-600"
                    >
                        <Plus />
                        Create a review
                    </Link>

                    {/* Rating Summary */}
                    {reviews.length > 0 && (
                        <div className="mt-8 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
                            <div className="flex items-center gap-1 text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-5 w-5 ${i < Math.round(Number(averageRating))
                                                ? "fill-current"
                                                : "text-slate-200"
                                            }`}
                                    />
                                ))}
                            </div>
                            <div className="h-8 w-px bg-slate-200" />
                            <div className="text-left">
                                <p className="text-2xl font-bold text-slate-900">
                                    {averageRating}
                                    <span className="text-sm font-medium text-slate-400">
                                        {" "}
                                        / 5
                                    </span>
                                </p>
                                <p className="text-xs text-slate-500">
                                    {reviews.length} review{reviews.length > 1 ? "s" : ""}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Reviews List */}
                {reviews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white py-24 text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <MessageSquare className="h-8 w-8 text-slate-400" />
                        </div>
                        <h3 className="mt-5 text-lg font-semibold text-slate-900">
                            No reviews yet
                        </h3>
                        <p className="mt-2 max-w-xs text-sm text-slate-500">
                            Be the first to share your experience with our services.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                        {reviews.map((review) => (
                            <div
                                key={review._id}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                            >
                                {/* Decorative quote */}
                                <Quote className="absolute right-5 top-5 h-10 w-10 text-slate-100 transition-colors group-hover:text-slate-200" />

                                {/* User + Rating */}
                                <div className="relative flex items-center gap-3">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
                                        <User className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate font-semibold text-slate-900">
                                            {review.name || "Anonymous"}
                                        </h3>
                                        <div className="mt-1 flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-3.5 w-3.5 ${i < (review.rating || 0)
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "text-slate-200"
                                                        }`}
                                                />
                                            ))}
                                            <span className="ml-1.5 text-xs font-medium text-slate-500">
                                                {review.rating}/5
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Comment */}
                                <p className="relative mt-5 text-[15px] leading-relaxed text-slate-600">
                                    “{review.comment || "No comment provided."}”
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewsPage;