import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await prisma.todos.findMany();
  const serializedData = data.map((item) => ({
    ...item,
    id: item.id?.toString(),
    author_id: item.author_id?.toString(),
    assign_to_id: item.assign_to_id?.toString(),
    status: item.status?.toString(),
    storytime: item.storytime?.toString(),
  }));
  res.json(serializedData);
}
