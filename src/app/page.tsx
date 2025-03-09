// src/app/welcome/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Welcome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken"); // Check auth cookie
    if (token) {
      router.push("/todos"); // Redirect if logged in
    } else {
      setIsLoading(false); // Show welcome screen if not logged in
    }
  }, [router]);

  if (isLoading) return null; // Prevent flickering during redirect

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-2">
      <img
        src="/bg_welcome.png"
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
      />

      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-4xl flex relative z-10">
        <Image src="/20944172.jpg" width={500} height={100} alt="doing_task" />
        <div className="border-l-1 p-3 flex items-center">
          <div>
            <h4 className="text-3xl font-bold text-gray-800">
              Welcome to Trelloy
            </h4>
            <p className="text-gray-600 mt-3">
              A website for managing daily tasks. You can create, complete, and
              delete your tasks here. With Trelloy, we help you accomplish your
              daily target.
            </p>
            <button
              onClick={() => router.push("/auth")}
              className="mt-6 px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
