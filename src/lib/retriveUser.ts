import { NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/user";

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

export default async function retriveUser(token: string) {
  try {

    if (!token) {
      return {};
    }

    // Decode and verify JWT
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, getKey, { algorithms: ["RS256"] }, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });

    await connectToDatabase();
    
    const {
      sub: clerkUserId,
      em: email,
      emv: isEmailVerified,
      fn: firstName,
      ln: lastName,
      mda,
    }: any = decoded;

    let role = "user";

    if (mda?.role === "admin") role = "admin";

    if (!isEmailVerified) return {};

    let userid = null;

    let user = await User.findOne({ clerkUserId });

    // If user doesn't exist, create a new one
    if (!user) {
      const result = await User.create({
        clerkUserId,
        email,
        firstName,
        lastName,
        role,
      });
      userid = result._id;
    } else {
      userid = user._id;

      if (role !== user.role) {
        const cc = await User.findByIdAndUpdate(userid, { role });
      }
    }


    return {
      email,
      firstName,
      lastName,
      clerkUserId,
      role,
      isEmailVerified,
      userid,
    };
  } catch (error) {
    console.log(error);

    return {};
  }
}
