"use server"

export const createReview = async (data) => {
    const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/reviews?${getParams}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })

    if(!res.ok){
        throw new Error("Failed to create review");
    }
    return resjson();
}


export const getAllReviews = async (searchParams) => {
    const getParams = new URLSearchParams(searchParams).toString();
    console.log(getParams)
    const res = await fetch(`${process.env.NEXT_AUTH_URL}/api/reviews?${getParams}`);
    /*    await new Promise((resolve) =>
           setTimeout(() => {
               resolve();
           }, 3000)
       ) */

    const data = await res.json();
    return data;
}