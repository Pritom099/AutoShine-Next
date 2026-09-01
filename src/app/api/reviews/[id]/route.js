import { ObjectId } from "mongodb";
import { reviewsData } from "../route";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request, { params }) {
    const { id } = await params;
    const reviewsRes = await dbConnect("reviews")
    const reviews = await reviewsRes.findOne({_id: new ObjectId(id)});
    return Response.json({
        review,
        message: "Single Review successfully!",
    });
}