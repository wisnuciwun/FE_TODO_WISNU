import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/app/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "you must use POST" });
  }

  const { name, email, password, gender, nickname, address, role } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "all fields are required" });
  }

  const existingUser = await prisma.users.findFirst({ where: { email } });
  if (existingUser) {
    return res
      .status(400)
      .json({ success: false, error: "email already used" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
      gender,
      nickname,
      address,
      role,
    },
  });

  return res
    .status(201)
    .json({
      success: true,
      message: "user registered successfully",
      user: newUser,
    });
}
