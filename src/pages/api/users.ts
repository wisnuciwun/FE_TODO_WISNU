import { CustomNextApiRequest } from "@/app/types";
import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "./middleware";

export default middleware(
  async (req: CustomNextApiRequest, res: NextApiResponse) => {
    if (req.method !== "GET") {
      return res
        .status(405)
        .json({ success: false, message: "you must use GET" });
    }

    const data = await prisma.users.findMany({
      where: {
        role: Number(3),
      },
    });

    const serializedData = data.map((item) => ({
      ...item,
      id: item.id?.toString(),
    }));

    res.json({
      success: true,
      message: "users listed successfully",
      data: serializedData,
    });
  }
);
