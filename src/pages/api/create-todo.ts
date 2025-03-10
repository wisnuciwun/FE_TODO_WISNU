// import prisma from "@/app/utils/prisma";
// import type { NextApiRequest, NextApiResponse } from "next";
// import { middleware } from "./middleware";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "you must use POST" });
//   }

//   // try {
//   const {
//     title,
//     description,
//     author_id,
//     assign_to_id,
//     status,
//     deadline,
//     storytime,
//   } = req.body;

//   if (!title || !description) {
//     return res.status(400).json({
//       success: false,
//       error: "title and description are required",
//     });
//   }

//   const newTodo = await prisma.todos.create({
//     data: {
//       title,
//       description,
//       author_id: author_id,
//       assign_to_id: assign_to_id,
//       status: 1,
//       deadline: deadline,
//       storytime: storytime,
//       created_at: new Date(),
//       updated_at: new Date(),
//       deleted_at: null,
//     },
//   });

//   const serializedTodo = {
//     ...newTodo,
//     id: newTodo.id.toString(),
//     author_id: newTodo.author_id.toString(),
//     assign_to_id: newTodo.assign_to_id?.toString() || null,
//     status: newTodo.status!.toString(),
//     storytime: newTodo.storytime!.toString(),
//   };

//   return res.status(201).json({
//     success: true,
//     message: "new todo created successfully",
//     todo: serializedTodo,
//   });
// } catch (error) {
//   return res.status(500).json({ success: false, message: error });
// }
// }

import prisma from "@/app/utils/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { middleware } from "./middleware";
import { CustomNextApiRequest } from "@/app/types";
import moment from "moment";

export default middleware(
  async (req: CustomNextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "you must use POST" });
    }

    try {
      const { title, description, assign_to_id, deadline, storytime } =
        req.body;

      if (!title || !description) {
        return res.status(400).json({
          success: false,
          error: "title and description are required",
        });
      }

      let data = {
        title,
        description,
        author_id: Number(req.user!.userId),
        assign_to_id: assign_to_id || null,
        status: 1,
        deadline: moment(deadline).toISOString(),
        storytime: storytime,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      };

      console.log("zzz", data);

      const newTodo = await prisma.todos.create({
        data: {
          title,
          description,
          author_id: Number(req.user!.userId),
          assign_to_id: assign_to_id,
          status: 1,
          deadline: deadline,
          storytime: storytime,
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      });

      const serializedTodo = {
        ...newTodo,
        id: newTodo.id.toString(),
        author_id: newTodo.author_id.toString(),
        assign_to_id: newTodo.assign_to_id?.toString() || null,
        status: newTodo.status!.toString(),
        storytime: newTodo.storytime!.toString(),
      };

      return res.status(201).json({
        success: true,
        message: "new todo created successfully",
        todo: serializedTodo,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error });
    }
  }
);
