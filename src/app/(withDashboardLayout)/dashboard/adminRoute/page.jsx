import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getAllServices } from "@/services/services.service";
import { getAllReviews } from "@/services/reviews.service";
import AdminRoute from "./AdminRoute"; // UI component

export const dynamic = "force-dynamic";

export default async function AdminRoutePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/login?callbackUrl=/dashboard/adminRoute");
    }

    // User এখানে আসলে user dashboard-এ পাঠাও
    if (session.user.role !== "admin") {
        redirect("/dashboard/userRoute");
    }

    const [servicesRes, reviewsData] = await Promise.all([
        getAllServices({}),
        getAllReviews({}),
    ]);

    const services = servicesRes?.data || servicesRes?.services || [];
    const reviews = reviewsData?.reviews || [];

    return (
        <AdminRoute
            user={session.user}
            services={services}
            reviews={reviews}
        />
    );
}