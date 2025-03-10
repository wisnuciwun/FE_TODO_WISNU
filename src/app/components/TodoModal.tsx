import Modal from "react-modal";
import { useState } from "react";
import Button from "./Button";
import { UserResponse } from "../types";

interface TodoModalProps {
  loading: boolean;
  listUser: UserResponse[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: {
    title: string;
    description: string;
    assignTo: string;
    deadline: string;
    storytime: string;
  }) => void;
}

export default function TodoModal({
  loading,
  isOpen,
  onClose,
  onSave,
  listUser,
}: TodoModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [storytime, setstorytime] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSave({ title, description, assignTo, deadline, storytime });
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Add Todo"
      className="fixed inset-0 flex items-center justify-center"
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Storytime
            </label>
            <input
              value={storytime}
              onChange={(e) => setstorytime(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Assign To
            </label>
            <select
              onChange={(e) => setAssignTo(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            >
              <option value="">Select Team</option>
              {listUser.map((v, idx) => (
                <option key={idx} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              required
              className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <Button loading={loading} type="submit">
              Save
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
