import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "./middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "you must use GET" });
  }

  middleware(async (req, res: NextApiResponse) => {
    const { title } = req.query;

    const data = await prisma.todos.findMany({
      where: title ? { title: { contains: title.toString() } } : {},
    });

    let newData = await Promise.all(
      data.map(async (v, idx) => {
        const status = await prisma.status.findFirst({
          where: { id: v.status! },
        });
        const author = await prisma.users.findFirst({
          where: { id: v.author_id! },
        });
        const assingned = await prisma.users.findFirst({
          where: { id: v.assign_to_id! },
        });

        return {
          ...v,
          status_name: status ? status.name : "-",
          author_name: author ? author.name : "-",
          assigned_to: author ? assingned!.name : "-",
        };
      })
    );

    const serializedData = newData.map((item) => ({
      ...item,
      id: item.id?.toString(),
      author_id: item.author_id?.toString(),
      assign_to_id: item.assign_to_id?.toString(),
      status: item.status?.toString(),
      storytime: item.storytime?.toString(),
    }));

    res.json(serializedData);
  });
}
