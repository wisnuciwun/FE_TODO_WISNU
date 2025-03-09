import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

interface CustomNextApiRequest extends NextApiRequest {
  user?: { id: number; email: string; role: string };
}

export function middleware(
  handler: (req: CustomNextApiRequest, res: NextApiResponse) => void
) {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ error: "token not exist" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        id: number;
        email: string;
        role: string;
      };
      req.user = decoded;

      return handler(req, res);
    } catch (error) {
      return res.status(401).json({ error: "invalid token" });
    }
  };
}
