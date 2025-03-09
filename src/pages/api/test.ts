import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.roles.findMany();
  const serializedData = data.map((item) => ({
    ...item,
    id: item.id?.toString(),
  }));

  res.json(serializedData);
}
