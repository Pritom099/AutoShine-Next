"use client";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import React, { use, useState } from "react";

const LoginPage = () => {
    const {setUser} = use(UserContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;

        if(email === "pritom34@gmail.com" && password === "1234"){
            const currentUser={
                email,
                name: email?.split("@")?.[0],
            };
            setUser(currentUser);
            alert("login successfulll");
            router.push("/dashboard");
        }else{
            alert("Credential invalid")
            setUser(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-gray-500">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Login
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Login to your account
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold cursor-pointer disabled:opacity-50"
                    >
                        {" "}
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;