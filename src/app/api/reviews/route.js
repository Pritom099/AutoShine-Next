import { dbConnect } from "@/lib/dbConnect";

export const reviewsData = [
    { id: 1, name: "Joe hoe", rating: 5, comment: "Ki obostha sobar" },
    { id: 2, name: "Jane smithy", rating: 4, comment: "lets go" },
    { id: 3, name: "Mike jhonson", rating: 3, comment: "kotao vajcvdopfgr" },
];

export async function POST(request) {
    const newReview = await request.json();
    const reviewsRes = await dbConnect("reviews");
    const res = await reviewsRes.insertOne(newReview);
    return Response.json({
        message: "Review added successfully",
        review: res,
    });
}

export async function GET(request) {
    const reviewsRes = await dbConnect("reviews")
    const reviews = await reviewsRes.find({}).toArray();
    return Response.json({
        reviews,
        message: "Reviews retrived successfully!"
    })
}