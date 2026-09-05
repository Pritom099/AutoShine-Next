import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET — logged-in user-এর সব booking
    export async function GET() {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const bookingsCollection = await dbConnect("bookings");

        // Admin → সব booking | User → শুধু নিজের
        const query =
            session.user.role === "admin"
                ? {}
                : { userEmail: session.user.email };

        const userBookings = await bookingsCollection
            .find(query)
            .sort({ createdAt: -1 })
            .toArray();

        return Response.json({
            message: "Bookings retrieved successfully",
            bookings: userBookings,
        });
    }

    // POST — নতুন booking save
    export async function POST(request) {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        // body = service object (name, price, duration, img, _id, ...)

        const bookings = await dbConnect("bookings");

        const newBooking = {
            userEmail: session.user.email,
            userName: session.user.name || "",
            userId: session.user.id || null,
            serviceId: body._id,
            serviceName: body.name,
            price: body.price,
            duration: body.duration,
            img: body.img,
            description: body.description || "",
            status: "pending", // pending | completed | cancelled
            createdAt: new Date(),
        };

        const result = await bookings.insertOne(newBooking);

        return Response.json({
            message: "Booking saved successfully",
            booking: { ...newBooking, _id: result.insertedId },
        });
    }


    export async function DELETE(request) {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const serviceId = searchParams.get("serviceId");

        if (!serviceId) {
            return Response.json({ message: "serviceId required" }, { status: 400 });
        }

        const bookings = await dbConnect("bookings");
        await bookings.deleteOne({
            userEmail: session.user.email,
            serviceId: serviceId,
        });

        return Response.json({ message: "Booking removed" });
    }