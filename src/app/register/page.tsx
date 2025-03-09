import React from "react";
import { useForm } from "react-hook-form";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Register Account</h2>
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
            {/* {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )} */}
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
            {/* {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )} */}
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
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {/* {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )} */}
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
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            {/* {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )} */}
          </div>

          {/* Nickname */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nickname
            </label>
            <input
              type="text"
              {...register("nickname", { required: "Nickname is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {/* {errors.nickname && (
              <p className="text-red-500 text-sm">{errors.nickname.message}</p>
            )} */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
            {/* {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )} */}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              //     onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
