// Redirecting the user after handling the POST request
import { NextResponse } from "next/server";

import envConfig from "@/src/config/envConfig";

export const POST = async () => {
  //   const paymentDetails = await request.json();

  makePremumUser();

  // Process the payment data (e.g., validate and store in the database)

  // After handling, redirect the user to a success page
  return NextResponse.redirect("/paymentStatus");
  // return NextResponse.json({ message: "Payment processed successfully!" });
};

const makePremumUser = async () => {
  const token = getCookie("token"); // Get token from cookies
  const commentData = {
    isPremium: "true",
  };
  const res = await fetch(`${envConfig.baseApi}/auth/updateUser`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Optionally add token if needed for auth
    },
    body: JSON.stringify(commentData),
  });

  // eslint-disable-next-line no-console
  console.log(res);
};

// This is Vanilla JavaScript style to extract the token from document.cookie..
const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
};
