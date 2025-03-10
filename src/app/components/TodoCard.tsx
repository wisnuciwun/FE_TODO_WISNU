import {
  CheckCircleIcon,
  XCircleIcon,
  Undo2Icon,
  ClockIcon,
} from "lucide-react";
import { TodoCardsProps } from "../types";
import moment from "moment";

const TodoCard = ({ todo, onCompleteTodo, onRejectTodo }: TodoCardsProps) => {
  return (
    <div
      key={todo.id}
      className={`w-70 h-70 p-4 rounded-lg shadow-lg border flex flex-col ${
        todo.status_name == "Done"
          ? "bg-green-50 border-green-300"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <b className="text-black">{todo.title}</b>
        <div className="flex gap-2">
          <button
            className={`${
              todo.status_name == "On Progress"
                ? "text-green-500"
                : "text-gray-500"
            } transition`}
            onClick={() => onCompleteTodo(todo.id)}
          >
            <ClockIcon size={24} />
          </button>
          <button
            className={`${
              todo.status_name == "Done" ? "text-green-500" : "text-gray-500"
            } transition`}
            onClick={() => onCompleteTodo(todo.id)}
          >
            <CheckCircleIcon size={24} />
          </button>
          <button
            className={`${
              todo.status_name == "Reject" ? "text-red-500" : "text-gray-500"
            } transition`}
            onClick={() => onRejectTodo(todo.id)}
          >
            <XCircleIcon size={24} />
          </button>
        </div>
      </div>
      <span
        className={`text-md font-medium break-words flex-grow ${
          todo.status_name == "Done"
            ? "line-through text-gray-500"
            : "text-gray-900"
        }`}
      >
        {todo.description}
      </span>
      <div className="mt-auto pt-2 border-t border-gray-200 text-gray-500 text-sm">
        <b>{todo.author_name}</b> |{" "}
        {moment(todo.deadline).format("DD MMM YYYY")}
      </div>
    </div>
  );
};

export default TodoCard;
