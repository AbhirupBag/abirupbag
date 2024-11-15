import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/user";
import retriveUser from "@/lib/retriveUser";

const client = jwksClient({
  jwksUri: String(process.env.JWKS_URI), // Replace with your Clerk JWKS URI
});

// Function to get the signing key from the JWKS
const getKey = (header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) => {
  client.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err, undefined);
    } else {
      const signingKey = key?.getPublicKey();
      callback(null, signingKey);
    }
  });
};
// API Route that validates JWT
export async function POST(req: NextApiRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("__session")?.value || "";

    const data = await retriveUser(token);
    
    const {
      email,
      firstName,
      lastName,
      clerkUserId,
      role,
      isEmailVerified,
      userid,
    } = data;
    
    // todo
    
    return NextResponse.json(
      { info: "Success" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while verifying the token" },
      { status: 500 }
    );
  }
}
