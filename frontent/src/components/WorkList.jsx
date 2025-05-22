import React from "react";

const WorkList = ({ list, handleEdit, handleDelete }) => {
  return (
    <div className="  bg-gray-50">
      <div className=" mx-auto  rounded-xl p-8">
        <div className="p-6  ">
          <h2 className="text-2xl font-bold mb-6">Assigned Works</h2>

          {list.length > 0 ? (
            list.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Title: {item.title}</h3>
                <p className="text-gray-700 mb-1"><span className="font-medium">Description:</span> {item.description}</p>
                <p className="text-gray-700 mb-4"><span className="font-medium">Assigned To:</span> {item.assignedTo}</p>
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
