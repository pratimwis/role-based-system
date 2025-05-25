import React, { useState } from "react";
import { BsFilterRight } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { updatePriorityOrder } from "../api/AllApi";

const WorkList = ({ list, handleEdit, handleDelete, emplist, fetchWorkList }) => {
  const [showList, setShowList] = useState(false);
  const [employee, setEmployee] = useState("");
  const [draggedWork, setDraggedWork] = useState(null);

  const filterList = employee
    ? list.filter((item) => item.assignedTo === employee)
    : list;

  const handleDragStart = (item) => {
    setDraggedWork(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = async (targetItem) => {
    if (!draggedWork || draggedWork._id === targetItem._id) return;

    if (draggedWork.priority !== targetItem.priority) {
      return;
    }
    const response = await updatePriorityOrder(draggedWork._id, targetItem._id);
    fetchWorkList();

  };

  return (
    <div className="  bg-gray-50">
      <div className=" mx-auto  rounded-xl p-8">
        <div className="p-6  ">
          <div className="flex flex-col mb-6 relative">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Assigned Works</h2>
              {employee && (
                <button
                className="bg-red-600 text-white p-2 rounded-full"
                  onClick={() => {
                    setEmployee("");
                  }}
                >
                  Clear filter
                </button>
              )}
              <div className="relative">
                <button
                  onClick={() => setShowList(!showList)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-full shadow transition duration-200"
                >
                  <span>Filter by employee</span>
                  {showList ? (
                    <IoIosCloseCircle className="text-xl" />
                  ) : (
                    <BsFilterRight className="text-xl" />
                  )}
                </button>
                {showList && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {emplist.length > 0 ? (
                      emplist.map((emp) => (
                        <div
                          key={emp._id}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setEmployee(emp.username), setShowList(false);
                          }}
                        >
                          {emp.username}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        No employees
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {filterList.length > 0 ? (
            filterList.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100"
                draggable
                onDragStart={() => handleDragStart(item)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(item)}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Title: {item.title}
                </h3>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Description:</span>{" "}
                  {item.description}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Assigned To:</span>{" "}
                  {item.assignedTo}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">Priority:</span> {item.priority}
                </p>
                <p className="text-gray-700 mb-4">
                  <span className="font-medium">priorityOrder:</span>{" "}
                  {item.priorityOrder}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No assigned work found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(WorkList);
