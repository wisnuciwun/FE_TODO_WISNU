"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { req } from "../utils/req";
import { ResponseProps, RolesResponse } from "../types";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import Button from "../components/Button";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setloading] = useState(false);
  const [roles, setroles] = useState<RolesResponse[]>([]);
  const route = useRouter();

  const onSubmit = (data: any) => {
    setloading(true);
    let payload = {
      ...data,
      gender: parseInt(data.gender),
      role: parseInt(data.role),
    };

    req("/register", "POST", payload)
      .then((res: ResponseProps) => {
        if (res.success) {
          toast(res.message);
          setTimeout(() => {
            route.push("/auth");
          }, 2000);
        } else {
          toast(res.message);
        }
      })
      .finally(() => {
        setloading(false);
      });
  };

  const onClose = () => {
    route.push("/auth");
  };

  const handleGetRoles = async () => {
    req("/roles").then((res: ResponseProps) => {
      if (res.success) {
        setroles(res.data);
      }
    });
  };

  useEffect(() => {
    handleGetRoles();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl text-black font-bold mb-4">Register Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.name?.message &&
              typeof errors.name.message === "string" && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.email?.message &&
              typeof errors.email.message === "string" && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            >
              <option value="">Select Gender</option>
              <option value={1}>Male</option>
              <option value={0}>Female</option>
            </select>
            {errors.gender?.message &&
              typeof errors.gender.message === "string" && (
                <p className="text-red-500 text-sm">{errors.gender.message}</p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            >
              <option value="">Select Role</option>
              {roles.map((v, idx) => (
                <option key={idx} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
            {errors.role?.message &&
              typeof errors.role.message === "string" && (
                <p className="text-red-500 text-sm">{errors.role.message}</p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nickname
            </label>
            <input
              type="text"
              {...register("nickname", { required: "Nickname is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.nickname?.message &&
              typeof errors.nickname.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.nickname.message}
                </p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.address?.message &&
              typeof errors.address.message === "string" && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {errors.password?.message &&
              typeof errors.password.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border-1 border-gray-600 text-black rounded hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </button>
            <Button
              type="submit"
              loading={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded transition-all hover:bg-blue-600"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
