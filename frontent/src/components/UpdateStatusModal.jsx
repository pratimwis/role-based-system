import { useState } from "react";
import { updateWorkStatus } from "../api/AllApi";
import { toast } from "react-toastify";

const StatusUpdateModal = ({ isModalOpen, onClose, taskId, refreshWorkList }) => {
  const [message, setMessage] = useState("");
  if (!isModalOpen) return null;

  async function handleSubmit() {
    try {
      const response = await updateWorkStatus(taskId, message);
      if (response.status === 200) {
        refreshWorkList();
        toast.success("Task status updated successfully");
      } else {
        toast.error("Failed to update task status");
      }
    } catch (error) {
      const { message } = error.response?.data || {};
      toast.error(message);
    }
    onClose(false);
    setMessage("");
   
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100  px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Update Task Status</h2>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <input
            type="text"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter your update message..."
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => onClose(false)}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>
      </div>
    </div>

  );
}
export default StatusUpdateModal;