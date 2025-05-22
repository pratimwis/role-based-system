import { FiUserCheck } from 'react-icons/fi';
import { MdOutlineWork } from 'react-icons/md';
import { useState } from 'react';
import useEmployeeDashboard from '../../src/hooks/useEmployeeDashboard';
import StatusUpdateModal from '../../src/components/UpdateStatusModal';

const EmployeeDashboard = () => {
  const { empData, workList, refreshWorkList } = useEmployeeDashboard();
  const { isModalOpen, setIsModalOpen } = useEmployeeDashboard();
  const [id, setId] = useState("");

  // Sort tasks by priority(filter worklist based on status then sort by priority)
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const pendingTasks = workList
    .filter(task => task.status === 'pending')
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Filter completed tasks
  const completedTasks = workList.filter(task => task.status === 'completed');

  //set id before opening modal
  const TaskModalOpen = (id) => {
    setIsModalOpen(true);
    setId(id);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">

      {/* Modal for updating task status */}
      <StatusUpdateModal isModalOpen={isModalOpen} onClose={setIsModalOpen} taskId={id} refreshWorkList={refreshWorkList} />

      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        {/* Employee  Dashboard details */}
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {empData.username}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h2 className="text-lg font-semibold text-blue-700 flex items-center gap-2">
              <FiUserCheck className="text-blue-700" /> Username
            </h2>
            <p className="text-gray-700 mt-1 break-all">{empData.username}</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border border-green-100">
            <h2 className="text-lg font-semibold text-green-700 flex items-center gap-2">
              <MdOutlineWork className="text-green-700" /> Role
            </h2>
            <p className="text-gray-700 mt-1 capitalize">{empData.role}</p>
          </div>
        </div>

        {/*Pending task section*/}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pending Tasks</h2>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 mb-6">No pending tasks.</p>
        ) : (
          <div className="space-y-4 mb-10">
            {pendingTasks
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition duration-300"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-blue-800">Task title: {task.title}</h3>
                    <span className="text-sm font-medium px-3 py-1 rounded-full bg-yellow-100 text-yellow-800">
                      {task.status}
                    </span>
                  </div>

                  <p className="text-gray-700 mt-2">Task description: {task.description}</p>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>
                      <span className="font-medium">Assigned By:</span> {task.assignedBy.username}
                    </p>
                    <p>
                      <span className="font-medium">Assigned On:</span>{" "}
                      {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">
                    <p>
                      <span className="font-medium text-red-500">Task Priority :</span> {task.priority}
                    </p>
                  </div>
                  <div className=" text-right">
                    <button
                      onClick={() => TaskModalOpen(task._id)}
                      className="inline-block px-5 py-2 text-sm font-semibold bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                    >
                      Mark as Done
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Completed task section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Completed Tasks</h2>

        {completedTasks.length === 0 ? (
          <p className="text-gray-500">No completed tasks yet.</p>
        ) : (
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <div
                key={task._id}
                className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-semibold text-green-800">Task title: {task.title}</h3>
                  <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {task.status}
                  </span>
                </div>

                <p className="text-gray-700 mt-2">Task description: {task.description}</p>

                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    <span className="font-medium">Assigned By:</span> {task.assignedBy.username}
                  </p>
                  <p>
                    <span className="font-medium">Assigned On:</span>{" "}
                    {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

}

export default EmployeeDashboard