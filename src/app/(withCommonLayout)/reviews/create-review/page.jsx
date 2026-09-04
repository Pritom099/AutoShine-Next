"use client";

import { createReview } from "@/services/reviews.service";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Star,
  Send,
  User,
  MessageSquare,
  Loader2,
  ArrowLeft,
  LogIn,
} from "lucide-react";

const CreateReviewPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Login check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login?callbackUrl=/reviews/create-review");
    }
  }, [status, router]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || rating === 0 || !comment.trim()) {
      setError("Please fill all fields and select a rating.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        name: name.trim(),
        rating,
        comment: comment.trim(),
      };

      const res = await createReview(reviewData);

      if (res?.message) {
        setSuccess(true);
        setRating(0);
        setComment("");
        setName(session?.user?.name || "");
      } else {
        setError("Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading session
  if (status === "loading") {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  // Not logged in
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <LogIn className="h-10 w-10 text-slate-400" />
        <h2 className="mt-4 text-xl font-bold text-slate-900">Login required</h2>
        <p className="mt-2 text-slate-600">
          Please sign in to write a review.
        </p>
        <Link
          href="/login?callbackUrl=/reviews/create-review"
          className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  // Success screen
  if (success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Send className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-2xl font-bold text-slate-900">Thank you!</h2>
          <p className="mt-2 text-slate-600">
            Your review has been submitted successfully.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/reviews"
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
            >
              View Reviews
            </Link>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Write Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          href="/reviews"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Reviews
        </Link>

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Write a Review
          </h1>
          <p className="mt-2 text-slate-600">
            Share your experience with AutoShine
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Name */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Your Name
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                <User className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-medium text-slate-700">
              Your Rating
            </label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="rounded-lg p-1 transition hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-200"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-sm font-medium text-slate-600">
                  {rating} / 5
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Your Review
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute left-3.5 top-3.5">
                <MessageSquare className="h-4 w-4 text-slate-400" />
              </div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={5}
                required
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateReviewPage;