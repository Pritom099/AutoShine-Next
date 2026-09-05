"use server";

import { dbConnect } from "@/lib/dbConnect";
import { revalidatePath, revalidateTag } from "next/cache";

export const createReview = async (data) => {
  try {
    const reviews = await dbConnect("reviews");

    const newReview = {
      name: data.name,
      rating: Number(data.rating),
      comment: data.comment,
      email: data.email || null,
      createdAt: new Date(),
    };

    const result = await reviews.insertOne(newReview);

    revalidateTag("reviews");
    revalidatePath("/reviews");
    revalidatePath("/");

    return {
      message: "Review created successfully",
      status: 201,
      review: {
        ...newReview,
        _id: result.insertedId.toString(),
      },
    };
  } catch (error) {
    console.error("createReview error:", error);
    return {
      message: "Failed to create review",
      status: 500,
    };
  }
};

export const getAllReviews = async () => {
  try {
    const reviews = await dbConnect("reviews");
    const all = await reviews.find({}).sort({ createdAt: -1 }).toArray();

    // ObjectId → string (Next.js serialize এর জন্য)
    const plain = all.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }));

    return {
      message: "Reviews retrieved successfully!",
      reviews: plain,
    };
  } catch (error) {
    console.error("getAllReviews error:", error);
    return {
      message: "Failed to load reviews",
      reviews: [],
    };
  }
};