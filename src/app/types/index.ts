import { NextApiRequest } from "next";

export type TodoCardsProps = {
  todo: TodoResponse;
  onRejectTodo: (id: string) => void;
  onCompleteTodo: (id: string) => void;
};

export type TodoResponse = {
  id: string;
  title: string;
  description: string;
  author_id: string;
  author_name: string;
  assign_to_id: string;
  assign_name: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  status: string;
  status_name: string;
  deadline: string;
  storytime: string;
};

export type RolesResponse = {
  id: number;
  name: string;
};

export type UserResponse = {
  id: number;
  name: string;
  nickname: string;
  email: string;
};

export type ResponseProps = {
  success: boolean;
  message: string;
  data: RolesResponse[];
};

export type ResponseTodoProps = {
  success: boolean;
  message: string;
  data: TodoResponse[];
};

export type ResponseAuthProps = {
  success: boolean;
  message: string;
};

export type ResponseUsersProps = {
  success: boolean;
  message: string;
  data: UserResponse[];
};
export interface CustomNextApiRequest extends NextApiRequest {
  user?: {
    id: number;
    userId?: number;
    email: string;
    role: string;
  };
}
