import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import useAdminDashboard from "../../hooks/useAdminDashboard";
import AssignWorkModal from "../../components/AssignWorkModal";
import WorkList from "../../components/WorkList";
import { useSelector } from "react-redux";
const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectTab, setSelectTab] = useState("all");
  const {
    workList,
    empList,
    isModalOpen,
    editData,
    openModal,
    closeModal,
    setWorkList,
    handleAssignSubmit,
    handleEditTask,
    handleDeleteTask,
    fetchWorkList,
    users,
  } = useAdminDashboard();

  const admins = users.filter((user) => user.role === "admin");
  const employees = users.filter((user) => user.role === "employee");

  const filteredUsers =
    selectTab === "all"
      ? users
      : users.filter((user) => user.role === selectTab);


  return (
    <div className="py-12 px-4 flex flex-row-reverse justify-between">
      <AssignWorkModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleAssignSubmit}
        empList={empList}
        initialData={editData}
      />

      {/* User Filter Section */}
      <div className="mb-10">
        <div className="mb-6 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setSelectTab("all")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectTab === "all"
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-600"
              }`}
          >
            All Users ({users.length})
          </button>
          <button
            onClick={() => setSelectTab("employee")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectTab === "employee"
                ? "bg-green-600 text-white"
                : "bg-white text-green-600 border border-green-600"
              }`}
          >
            Employee ({employees.length})
          </button>
          <button
            onClick={() => setSelectTab("admin")}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${selectTab === "admin"
                ? "bg-yellow-600 text-white"
                : "bg-white text-yellow-600 border border-yellow-600"
              }`}
          >
            Admin ({admins.length})
          </button>
        </div>

        {/* Filtered User List */}
        <div className="grid sm:grid-rows-2 md:grid-rows-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-white p-5 rounded-xl shadow border border-gray-200"
            >
              <p className="text-lg font-semibold text-gray-800">
                {user.username}
              </p>
              <p className="text-sm text-gray-500 mt-1 capitalize">
                Role:{" "}
                <span className="font-medium text-indigo-600">{user.role}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Info & Work Section */}
      <div className="w-2/3 bg-white shadow-xl rounded-2xl p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Welcome, {user.username}
            </h1>
            <p className="text-sm text-gray-500">
              Manage tasks & assignments here.
            </p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow"
          >
            <FiPlus className="w-4 h-4" />
            Assign Work
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h2 className="text-base font-semibold text-blue-700">User ID</h2>
            <p className="text-gray-700 mt-1 break-all text-sm">
              {user._id}
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-xl border border-green-100">
            <h2 className="text-base font-semibold text-green-700">Role</h2>
            <p className="text-gray-700 mt-1 capitalize text-sm">
              {user.role}
            </p>
          </div>
        </div>

        {/* Work List */}
        <WorkList
          list={workList}
          handleEdit={handleEditTask}
          handleDelete={handleDeleteTask}
          emplist={empList}
          setWorkList={setWorkList}
          fetchWorkList={fetchWorkList}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
