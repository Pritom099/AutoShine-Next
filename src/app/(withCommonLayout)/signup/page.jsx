"use client";

import { signup } from "@/services/users.service";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const randomPhotos = [
  "https://media.istockphoto.com/id/1482996923/photo/portrait-of-young-indian-woman-happy-with-internship-in-human-resources-opportunity-and.jpg?s=612x612&w=0&k=20&c=RXMBNOxKH6AzTF9sWgQvUbEwvm6no698K1H8SnXKPok=",
  "https://img.freepik.com/free-photo/smiling-man_1098-15443.jpg",
  "https://img.freepik.com/free-photo/selfie-portrait-videocall_23-2149186122.jpg?semt=ais_hybrid&w=740&q=80",
  "https://www.shutterstock.com/image-photo/studio-headshot-young-adult-male-260nw-2645073621.jpg",
  "https://media.istockphoto.com/id/2063799507/photo/business-portrait-and-black-man-in-city-outdoor-for-career-or-job-of-businessman-face.jpg?s=612x612&w=0&k=20&c=DB5oXy7_aasPbpr7zfpfV92ZYsPIQfFWLyweKEz_UVs=",
  "https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=",
  "https://t3.ftcdn.net/jpg/07/12/88/34/360_F_712883459_pOEsapyzSbW2PQ5fR581kCR7a9ayZiOR.jpg",
  "https://www.shutterstock.com/image-photo/happy-handsome-young-indian-man-260nw-2315729087.jpg",
  "https://www.shutterstock.com/image-photo/creative-happy-man-portrait-confidence-260nw-2637648169.jpg",
  "https://t3.ftcdn.net/jpg/07/62/41/62/360_F_762416215_2U3mcePQAMgMLSD0LhPUEtp7Or1bmO5u.jpg",
];

const SignupPage = () => {
  const router = useRouter();

  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRandomPhoto = () => {
    const randomIndex = Math.floor(Math.random() * randomPhotos.length);
    setPhotoUrl(randomPhotos[randomIndex]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");

    // Basic validation
    if (!name || !email || !password || !phone) {
      alert("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 4) {
      alert("Password should be at least 4 characters.");
      setIsSubmitting(false);
      return;
    }

    // Mock successful signup
    const currentUser = {
      name,
      email,
      phone,
      image: photoUrl || null,
      password,
      role: "user",
    };

    console.log(currentUser);

    try {
      // 1) Account create
      const res = await signup(currentUser);

      if (res.status !== 201) {
        alert(res.message || "Failed to create account.");
        setIsSubmitting(false);
        return;
      }

      // 2) Auto login → session তৈরি
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        alert("Account created! Please login.");
        router.push("/login");
        return;
      }

      // 3) Logged in → dashboard
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
        <p className="mt-2 text-sm text-gray-600">
          Sign up to get started with us
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Profile Photo URL + Preview + Random Button */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-gray-200 bg-gray-100 overflow-hidden flex items-center justify-center">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = ""; // Clear on error
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                {!photoUrl && <span className="text-gray-400 text-5xl">+</span>}
              </div>
            </div>

            <div className="w-full space-y-2">
              <input
                type="url"
                name="photoUrl"
                placeholder="Paste profile photo URL (optional)"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
              />
              <button
                type="button"
                onClick={handleRandomPhoto}
                className="w-full rounded-xl bg-gray-800 py-2 text-sm font-medium text-white hover:bg-gray-900 transition"
              >
                Choose Random Photo
              </button>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              required
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="+880 123 456 7890"
              required
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              minLength="4"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-black hover:underline">
            Log in
          </a>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;