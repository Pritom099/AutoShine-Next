const reviewsData =[
    {id:1,name: "Joe hoe", rating: 5, comment: "Ki obostha sobar"},
    {id:2,name: "Jane smithy", rating: 4, comment: "lets go"},
    {id:3,name: "Mike jhonson", rating: 3, comment: "kotao vajcvdopfgr"},
];

export async function POST(request) {
    const newReview = await request.json();
    console.log(newReview);
    reviewsData.push({...newReview, id:reviewsData?.length+1});
    return Response.json({
        message: "Review added successfully",
        review: newReview,
    });
}

export async function GET(request) {
    return Response.json({reviewsData,message: "Api is workingg!"})
}