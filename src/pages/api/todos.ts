import prisma from "@/app/utils/prisma";
import type { NextApiResponse } from "next";
import { middleware } from "./middleware";
import { CustomNextApiRequest } from "@/app/types";

export default middleware(
  async (req: CustomNextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ success: false, message: "You must use GET" });
    }

    const { title } = req.query;

    const data = await prisma.todos.findMany({
      where: title ? { title: { contains: title.toString() } } : {},
    });

    let newData = await Promise.all(
      data.map(async (v) => {
        const status = await prisma.status.findFirst({
          where: { id: v.status! },
        });
        const author = await prisma.users.findFirst({
          where: { id: v.author_id! },
        });
        const assigned = await prisma.users.findFirstOrThrow({
          where: { id: v.assign_to_id! },
        });

        return {
          ...v,
          status_name: status ? status.name : "-",
          author_name: author ? author.name : "-",
          assigned_to: assigned ? assigned.name : "-",
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

    res.json({
      success: true,
      message: "Todo listed successfully",
      data: serializedData,
    });
  }
);
