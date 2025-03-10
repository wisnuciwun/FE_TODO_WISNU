"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { req } from "../utils/req";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { ResponseAuthProps } from "../types";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await req("/auth", "POST", formData).then((res: ResponseAuthProps) => {
        if (res.success) {
          toast(res.message);
          router.push("/todos");
        } else {
          toast(res.message);
        }
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="flex items-center justify-center">
          <Image
            width={200}
            height={200}
            src={"/company_logo_full.png"}
            alt="logo_company"
          />
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-left block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="text-left block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-1"
              required
            />
          </div>
          <span className="text-gray-500 text-sm">
            Need to create account ?{" "}
            <a className="text-blue-500" href="/register">
              Click here
            </a>
          </span>
          <Button type="submit" loading={loading} className="w-full mt-5">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
