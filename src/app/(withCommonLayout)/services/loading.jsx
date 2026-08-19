import Container from "@/components/shared/Container";
import React from "react";

const loading = () => {
    return (
        <Container>
            <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div
                        key={item}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-gray-500 shadow-sm"
                    >
                        {/* Image Skeleton */}
                        <div className="h-52 w-full animate-pulse bg-slate-200" />

                        {/* Content */}
                        <div className="space-y-4 p-5">
                            {/* Title + Price */}
                            <div className="flex items-center justify-between gap-3">
                                <div className="h-6 w-32 animate-pulse rounded bg-slate-200" />
                                <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                                <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
                                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-200" />
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                {/* Stars */}
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <div
                                            key={star}
                                            className="h-4 w-4 animate-pulse rounded-full bg-slate-200"
                                        />
                                    ))}
                                </div>

                                {/* Button */}
                                <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default loading;