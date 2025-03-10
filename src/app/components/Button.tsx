import React from "react";

type ButtonProps = {
  type?: "button" | "submit";
  onClick?: () => void;
  loading?: boolean;
  children?: string;
  disabled?: boolean;
  className?: string;
};

function Button({
  disabled = false,
  type = "button",
  onClick = (v?: any) => {},
  loading = false,
  children = "",
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`px-4 py-2 rounded text-white transition ${
        loading
          ? "bg-blue-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600"
      } ${className} flex justify-center`}
    >
      {loading ? (
        <div className="flex items-center">
          <svg
            className="animate-spin h-5 w-5 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
