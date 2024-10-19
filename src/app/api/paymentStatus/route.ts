// Redirecting the user after handling the POST request
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  //   const paymentDetails = await request.json();

  console.log("Limon post is called");

  // Process the payment data (e.g., validate and store in the database)

  // After handling, redirect the user to a success page
  return NextResponse.redirect("http://localhost:3000/paymentStatus");
  // return NextResponse.json({ message: "Payment processed successfully!" });
};
