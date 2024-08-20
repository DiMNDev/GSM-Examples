"use server";
import User from "@/app/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { BadRequest, NotFound } from "@/app/errors";
import dbErrorHandler from "@/app/db/middleware/dbErrors";
import connectDB from "@/app/db/connectDB";
// Sign Up Logic
export async function POST(req: NextRequest) {
  const newUser = await req.json();
  try {
    if (
      !newUser.username ||
      !newUser.password ||
      !newUser.email ||
      !newUser.confirm
    ) {
      throw new BadRequest("Oopsie Daisy: Missing Credentials");
    }
    if (newUser.password !== newUser.confirm) {
      throw new BadRequest("Your passwords don't match.");
    }
    await connectDB();
    const user = await User.create(newUser);
    if (!user) {
      throw new NotFound("Oopsie Daisy: You don't exist!");
    }
    const token = user.createJWT();
    console.log(`Welcome ${newUser.username}`);
    return NextResponse.json({ user: { name: user.username }, token });
  } catch (error) {
    return dbErrorHandler(error, req);
  }
}
