import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

const users = await dbConnect("users");

export async function POST(request) {
    const reqBody = await request.json();
    const isUserExist = await users.findOne({ email: reqBody.email });
    if (isUserExist) {
        return Response.json({
            status: 400,
            message: "User already exists",
        })
    }

    const passwordHash = await bcrypt.hash(reqBody.password, 10);

    const newUser = await users.insertOne({...reqBody, password: passwordHash});

    return Response.json({
        status: 201,
        message: "User created successfully",
        data: newUser,
    })
}