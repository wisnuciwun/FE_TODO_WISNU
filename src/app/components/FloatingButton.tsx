import React from "react";

function FloatingButton({
  handleAddTodo = (v: any) => {},
  children = <span></span>,
}) {
  return (
    <button
      className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition flex items-center justify-center"
      onClick={handleAddTodo}
    >
      {children}
    </button>
  );
}

export default FloatingButton;
