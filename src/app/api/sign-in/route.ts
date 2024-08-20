"use server";
import { BadRequest, NotFound, AuthorizationError } from "@/app/errors";
import User from "@/app/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import dbErrorHandler from "@/app/db/middleware/dbErrors";
import connectDB from "@/app/db/connectDB";
// Sign In Logic
export async function POST(req: NextRequest, res: NextResponse) {
  const loginInfo = await req.json();
  try {
    if (!loginInfo) {
      //Recieved incomplete request
      throw new BadRequest("Please provide credentials");
    }
    await connectDB();
    const user = await User.findOne({ username: loginInfo.username });
    if (!user) {
      //User does not exist
      throw new NotFound("Are you sure you have an account?");
    }
    const correctPassword = await user.comparePassword(loginInfo.password);
    if (!correctPassword) {
      //Incorrect password
      throw new AuthorizationError("Done did messed up sumn");
    }
    const token = user.createJWT();
    console.log(`Hello ${user.username}`);
    return NextResponse.json({ user: { name: user.username }, token });
  } catch (error) {
    return dbErrorHandler(error, req);
  }
}
