import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "./middleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  middleware(async (req, res: NextApiResponse) => {
    if (req.method !== "PUT") {
      return res.status(405).json({ message: "you must use PUT" });
    }

    try {
      const {
        id,
        title,
        description,
        assign_to_id,
        status,
        deadline,
        storytime,
      } = req.body;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid ID" });
      }

      const updatedTodo = await prisma.todos.update({
        where: { id: Number(id) },
        data: {
          title,
          description,
          assign_to_id: assign_to_id,
          status: status,
          deadline: deadline,
          storytime: storytime,
          updated_at: new Date(),
        },
      });

      const serializedTodo = {
        ...updatedTodo,
        id: updatedTodo.id.toString(),
        author_id: updatedTodo.author_id.toString(),
        assign_to_id: updatedTodo.assign_to_id?.toString() || null,
        status: updatedTodo.status!.toString(),
        storytime: updatedTodo.storytime!.toString(),
      };

      res.status(200).json({
        message: "todo updated successfully",
        todo: serializedTodo,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
}
