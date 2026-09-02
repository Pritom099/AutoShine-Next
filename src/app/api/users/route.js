import { dbConnect } from "@/lib/dbConnect";


const users = await dbConnect("users");

export async function POST(request) {
    const reqBody = await request.json();
    const isUserExist = await users.findOne({email: reqBody.email});
    if(isUserExist){
        return Response.json({
            status: 400,
            message: "User already exists",
        })
    }

    const newUser = await users.insertOne(reqBody);

    return Response.json({
        status: 201,
        message: "User created successfully",
        data: newUser,
    })
}