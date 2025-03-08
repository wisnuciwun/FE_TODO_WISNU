import { TodoCardsProps } from "../types";

const TodoCards = ({ todo, onCompleteTodo, onDeleteTodo }: TodoCardsProps) => {
  return (
    <div
      key={todo.id}
      className={`flex justify-between items-center p-4 rounded-lg shadow ${
        todo.completed ? "bg-green-100" : "bg-white"
      }`}
    >
      <span
        className={`text-lg ${
          todo.completed ? "line-through text-gray-500" : ""
        }`}
      >
        {todo.description}
      </span>
      <div className="flex gap-2">
        <button
          className="text-sm px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => onCompleteTodo(todo.id)}
        >
          {todo.completed ? "Undo" : "Done"}
        </button>
        <button
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => onDeleteTodo(todo.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCards;
