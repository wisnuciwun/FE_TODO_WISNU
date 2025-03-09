import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/app/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "you must use POST" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "please fill email and password" });
  }

  const user = await prisma.users.findFirst({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: "invalid email" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "invalid password" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "3h",
  });

  return res.status(200).json({ message: "login successful", token });
}
