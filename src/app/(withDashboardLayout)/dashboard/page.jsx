import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login?callbackUrl=/dashboard");
  }

  if (session.user.role === "admin") {
    redirect("/dashboard/adminRoute");
  }

  redirect("/dashboard/userRoute");
};

export default DashboardPage;