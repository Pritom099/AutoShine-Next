import { ObjectId } from "mongodb";
import { dbConnect } from "@/lib/dbConnect";

export async function GET(request, { params }) {
    const { id } = await params;

    if(id.length != 24){
        return Response.json(
            {
                message: "invalid Review ID",
            },
            {status: 400}
        )
    }
    const reviewsRes = await dbConnect("reviews")
    const reviews = await reviewsRes.findOne({_id: new ObjectId(id)});
    return Response.json({
        reviews,
        message: "Single Review successfully!",
    });
}

export async function PATCH(request, { params }) {
    const { id } = await params;
    const data = await request.json();

    if(id.length != 24){
        return Response.json(
            {
                message: "invalid Review ID",
            },
            {status: 400}
        )
    }

    const filter = {_id: new ObjectId(id)};
    const updateDoc = {
        $set: data,
    }

    const reviewsRes = await dbConnect("reviews")
    const reviews = await reviewsRes.updateOne(filter,updateDoc);
    return Response.json({
        reviews,
        message: "Review updated successfully!",
    });
}

export async function DELETE(request, { params }) {
    const { id } = await params;
    const data = await request.json();

    if(id.length != 24){
        return Response.json(
            {
                message: "invalid Review ID",
            },
            {status: 400}
        )
    }

    const filter = {_id: new ObjectId(id)};

    const reviewsRes = await dbConnect("reviews")
    const reviews = await reviewsRes.deleteOne(filterc);
    return Response.json({
        reviews,
        message: "Review deleted successfully!",
    });
}