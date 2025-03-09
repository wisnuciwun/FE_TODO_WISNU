"use client";

import { useState } from "react";
import { TodoProps } from "../types";
import TodoCards from "../components/TodoCard";
import Image from "next/image";
import FloatingButton from "../components/FloatingButton";
import Tooltip from "../components/Tooltip";
import TipOfTheDay from "../components/Tips";
import { Plus, PlusCircle } from "lucide-react";
import TodoModal from "../components/TodoModal";

export default function TodoPage() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [todoModalOpen, settodoModalOpen] = useState(false);
  const [todos, setTodos] = useState<TodoProps[]>([
    {
      id: 1,
      title: "Card One",
      description: "This is the first sample card.",
      completed: false,
      author: "Reza",
      deadline: "09/03/2025",
    },
    {
      id: 2,
      title: "Card Two",
      description: "This is the second sample card.",
      completed: false,
      author: "Ardi",
      deadline: "09/03/2025",
    },
    {
      id: 3,
      title: "Card Three",
      description: "This is the third sample card.",
      completed: true,
      author: "Reza",
      deadline: "09/03/2025",
    },
    {
      id: 1,
      title: "Card One",
      description: "This is the first sample card.",
      completed: false,
      author: "Reza",
      deadline: "09/03/2025",
    },
    {
      id: 2,
      title: "Card Two",
      description: "This is the second sample card.",
      completed: false,
      author: "Ardi",
      deadline: "09/03/2025",
    },
    {
      id: 3,
      title: "Card Three",
      description: "This is the third sample card.",
      completed: true,
      author: "Reza",
      deadline: "09/03/2025",
    },
    {
      id: 1,
      title: "Card One",
      description: "This is the first sample card.",
      completed: false,
      author: "Reza",
      deadline: "09/03/2025",
    },
    {
      id: 2,
      title: "Card Two",
      description: "This is the second sample card.",
      completed: false,
      author: "Ardi",
      deadline: "09/03/2025",
    },
    {
      id: 3,
      title: "Card Three",
      description: "This is the third sample card.",
      completed: true,
      author: "Reza",
      deadline: "09/03/2025",
    },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {};

  const handleCompleteTodo = (id: number) => {};

  const handleDeleteTodo = (id: number) => {};

  const handleLogout = () => {};

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-3 border-b">
        <div className="flex gap-5">
          <Image
            src="/company_logo.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <TipOfTheDay />
        </div>
        <div className="flex gap-5">
          <input
            type="text"
            className="border border-gray-300 px-4 py-2 rounded-lg w-85 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-500 text-gray-900"
            placeholder="Search for a task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <div className="relative">
            <button
              onClick={() => setIsOpenDrawer((prev) => !prev)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition shadow-sm"
            >
              <Image
                src={"/man.png"}
                alt="Avatar"
                width={25}
                height={25}
                className="rounded-full"
              />
              {/* <span className="text-sm font-medium">ABDUL SOMAD</span> */}
            </button>
            <Tooltip
              position="bottom-right"
              open={isOpenDrawer}
              setOpen={setIsOpenDrawer}
            >
              <div>
                <div className="text-center">
                  <Image
                    src="/man.png"
                    alt="Profile"
                    width={25}
                    height={25}
                    className="mx-auto rounded-full"
                  />
                  <h2 className="text-lg font-semibold mt-2">ABDUL SOMAD</h2>
                  <p className="text-sm text-gray-500">abds@gmail.com</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="mt-6 w-full flex justify-center">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-center">No tasks yet!</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {todos.map((todo, index) => (
                <div key={index} className="group relative">
                  <TodoCards
                    todo={todo}
                    onDeleteTodo={handleCompleteTodo}
                    onCompleteTodo={handleCompleteTodo}
                  />
                  {/* Animation for shifting other cards */}
                  {/* <style jsx>{`
                    .group:hover ~ .group {
                      transform: translateX(100px);
                      transition: transform 0.3s ease-in-out;
                    }
                  `}</style> */}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FloatingButton>
        <Plus onClick={() => settodoModalOpen(true)} />
      </FloatingButton>
      <TodoModal
        isOpen={todoModalOpen}
        onClose={() => {
          settodoModalOpen(false);
        }}
        onSave={() => {
          console.log("msk");
        }}
      />
    </div>
  );
}
