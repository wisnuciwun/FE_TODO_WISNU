import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", [
    serialize("token", "", { path: "/", maxAge: 0 }),
    serialize("user_data", "", { path: "/", maxAge: 0 }),
  ]);

  return res.status(200).json({ success: true, message: "Logged out" });
}
