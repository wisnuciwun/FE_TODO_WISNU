"use client";

import { useEffect, useState } from "react";
import {
  ResponseProps,
  ResponseTodoProps,
  ResponseUsersProps,
  TodoResponse,
  UserResponse,
} from "../types";
import TodoCards from "../components/TodoCard";
import Image from "next/image";
import FloatingButton from "../components/FloatingButton";
import Tooltip from "../components/Tooltip";
import TipOfTheDay from "../components/Tips";
import { Plus, PlusCircle } from "lucide-react";
import TodoModal from "../components/TodoModal";
import { req } from "../utils/req";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function TodoPage() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [todoModalOpen, settodoModalOpen] = useState(false);
  const [todos, setTodos] = useState<TodoResponse[]>([]);
  const [users, setusers] = useState<UserResponse[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setloading] = useState(false);
  const route = useRouter();

  const handleAddTodo = (data: any) => {
    setloading(true);
    let payload = {
      title: data.title,
      description: data.description,
      storytime: parseInt(data.storytime),
      deadline: data.deadline,
      assign_to_id: parseInt(data.assignTo),
    };

    try {
      req("/create-todo", "POST", payload).then((res: ResponseTodoProps) => {
        if (res.success) {
          handleGetTodos();
          settodoModalOpen(false);
        }
      });
    } catch (error) {
      // todo
    } finally {
      setloading(false);
    }
  };

  const handleCompleteTodo = (id: string) => {};

  const handleRejectTodo = (id: string) => {};

  const handleLogout = () => {
    req("/logout", "GET").then((res: ResponseTodoProps) => {
      if (res.success) {
        route.push("/auth");
      }
    });
  };

  const handleGetTodos = () => {
    req("/todos", "GET").then((res: ResponseTodoProps) => {
      if (res.success) {
        setTodos(res.data);
      }
    });
  };

  const handleGetUsers = () => {
    req("/users", "GET").then((res: ResponseUsersProps) => {
      if (res.success) {
        setusers(res.data);
      }
    });
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-md px-4 sm:px-6 py-3 gap-3 sm:gap-0">
        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <Image
            src="/company_logo.png"
            alt="Company Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <TipOfTheDay />
        </div>
        <div className="flex items-center gap-3 sm:gap-5 w-full sm:w-auto">
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400 transition placeholder-gray-500 text-gray-900"
            placeholder="Search for a task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <div className="relative">
            <button
              onClick={() => setIsOpenDrawer((prev) => !prev)}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-lg transition shadow-sm"
            >
              <Image
                src={"/man.png"}
                alt="Avatar"
                width={25}
                height={25}
                className="rounded-full"
              />
            </button>

            <Tooltip
              position="bottom-right"
              open={isOpenDrawer}
              setOpen={setIsOpenDrawer}
            >
              <div className="p-4">
                <div className="text-center">
                  <Image
                    src="/man.png"
                    alt="Profile"
                    width={40}
                    height={40}
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
                <div key={index} className="relative transition-transform">
                  <TodoCards
                    todo={todo}
                    onCompleteTodo={handleCompleteTodo}
                    onRejectTodo={handleRejectTodo}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <FloatingButton>
        <Plus
          onClick={() => {
            settodoModalOpen(true);
            handleGetUsers();
          }}
        />
      </FloatingButton>
      <TodoModal
        loading={loading}
        listUser={users}
        isOpen={todoModalOpen}
        onClose={() => {
          settodoModalOpen(false);
        }}
        onSave={handleAddTodo}
      />
    </div>
  );
}
