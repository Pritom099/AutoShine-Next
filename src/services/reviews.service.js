"use server";

import { revalidateTag } from "next/cache";

function getBaseUrl() {
  // 1) Production / local — env থেকে
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.replace(/\/$/, "");
  }
  // 2) Vercel auto URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // 3) Local
  return "https://autoshine-next.vercel.app";
}

export const createReview = async (data) => {
  const res = await fetch(`${getBaseUrl()}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create review");
  }

  revalidateTag("reviews");
  return res.json();
};

export const getAllReviews = async (searchParams) => {
  try {
    const getParams = new URLSearchParams(searchParams || {}).toString();
    const url = `${getBaseUrl()}/api/reviews${getParams ? `?${getParams}` : ""}`;

    const res = await fetch(url, {
      next: {
        tags: ["reviews"],
        revalidate: 60,
      },
    });

    const contentType = res.headers.get("content-type") || "";

    // HTML এলে crash না — খালি data return
    if (!res.ok || !contentType.includes("application/json")) {
      console.error("getAllReviews: non-JSON response", res.status, url);
      return { reviews: [], message: "Failed to load reviews" };
    }

    return await res.json();
  } catch (error) {
    console.error("getAllReviews error:", error);
    return { reviews: [], message: "Failed to load reviews" };
  }
};