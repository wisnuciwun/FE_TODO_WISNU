"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";

export default function Welcome() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/todos");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-2 relative">
      {/* Background Image */}
      <img
        src="/bg_welcome.png"
        className="absolute z-0 top-0 left-0 w-full h-full object-cover"
      />

      {/* Content Container */}
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 text-center max-w-4xl flex flex-col sm:flex-row items-center relative z-10 w-full sm:w-auto">
        {/* Image Section */}
        <Image
          src="/20944172.jpg"
          width={500}
          height={100}
          alt="doing_task"
          className="w-full sm:w-1/2 h-auto"
        />

        {/* Text Content */}
        <div className="sm:border-l border-gray-300 sm:p-5 p-3 flex items-center w-full sm:w-1/2">
          <div>
            <h4 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome to Trelloy
            </h4>
            <p className="text-gray-600 mt-3 text-sm sm:text-base">
              A website for managing daily tasks. You can create, complete, and
              delete your tasks here. With Trelloy, we help you accomplish your
              daily target.
            </p>
            <button
              onClick={() => router.push("/auth")}
              className="mt-5 px-4 sm:px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
