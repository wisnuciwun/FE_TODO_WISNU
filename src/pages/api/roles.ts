import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, message: "you must use GET" });
  }

  const data = await prisma.roles.findMany();
  const serializedData = data.map((item) => ({
    ...item,
    id: item.id?.toString(),
  }));

  res.json({
    success: true,
    message: "roles listed successfully",
    data: serializedData,
  });
}
