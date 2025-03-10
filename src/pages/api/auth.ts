import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/utils/prisma";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "you must use POST" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "please fill email and password" });
  }

  const user = await prisma.users.findFirst({ where: { email } });
  if (!user) {
    return res.status(401).json({ success: false, error: "invalid email" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ success: false, error: "invalid password" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "3h",
  });

  res.setHeader("Set-Cookie", [
    serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60,
    }),
    serialize("user_data", JSON.stringify(user), {
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 3 * 60 * 60,
    }),
  ]);

  return res
    .status(200)
    .json({ success: true, message: "login successful", token });
}
