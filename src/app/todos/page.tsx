"use client";

import { useState } from "react";
import { TodoProps } from "../types";
import TodoCards from "../components/TodoCard";

export default function TodoPage() {
  const [todos, setTodos] = useState<TodoProps[]>([
    {
      id: 1,
      title: "Card One",
      description: "This is the first sample card.",
      completed: false,
    },
    {
      id: 2,
      title: "Card Two",
      description: "This is the second sample card.",
      completed: false,
    },
    {
      id: 3,
      title: "Card Three",
      description: "This is the third sample card.",
      completed: true,
    },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {};

  const handleCompleteTodo = (id: number) => {};

  const handleDeleteTodo = (id: number) => {};

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">📝 My To-Do List</h1>

      {/* Add Todo Input */}
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          className="border p-2 rounded w-64"
          placeholder="Add new task..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </div>

      {/* To-Do List */}
      <div className="mt-6 w-full max-w-lg">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet!</p>
        ) : (
          <div className="space-y-3">
            {todos.map((todo) => (
              <TodoCards
                todo={todo}
                onDeleteTodo={handleCompleteTodo}
                onCompleteTodo={handleCompleteTodo}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
