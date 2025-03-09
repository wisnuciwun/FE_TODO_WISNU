import { CheckCircleIcon, XCircleIcon, Undo2Icon } from "lucide-react";
import { TodoCardsProps } from "../types";

const TodoCard = ({ todo, onCompleteTodo, onDeleteTodo }: TodoCardsProps) => {
  return (
    <div
      key={todo.id}
      className={`w-70 h-70 p-4 rounded-lg shadow-lg border flex flex-col ${
        todo.completed
          ? "bg-green-50 border-green-300"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <b className="text-black">{todo.title}</b>
        <div className="flex gap-2">
          <button
            className="text-green-500 hover:text-green-600 transition"
            onClick={() => onCompleteTodo(todo.id)}
          >
            {todo.completed ? (
              <Undo2Icon size={24} />
            ) : (
              <CheckCircleIcon size={24} />
            )}
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition"
            onClick={() => onDeleteTodo(todo.id)}
          >
            <XCircleIcon size={24} />
          </button>
        </div>
      </div>
      <span
        className={`text-md font-medium break-words flex-grow ${
          todo.completed ? "line-through text-gray-500" : "text-gray-900"
        }`}
      >
        {todo.description}
      </span>
      <div className="mt-auto pt-2 border-t border-gray-200 text-gray-500 text-sm">
        <b>{todo.author}</b> | {todo.deadline}
      </div>
    </div>
  );
};

export default TodoCard;
