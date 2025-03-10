import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

interface CustomNextApiRequest extends NextApiRequest {
  user?: { id: number; email: string; role: string };
}

export function middleware(
  handler: (req: CustomNextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    try {
      const cookies = parse(req.headers.cookie || "");
      const token = cookies.token;

      if (!token) {
        return res.status(401).json({ error: "token not exist" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: number;
        email: string;
        role: string;
      };

      req.user = decoded;

      await handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "invalid token" });
    }
  };
}
