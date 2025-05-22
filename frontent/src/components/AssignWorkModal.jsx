import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

const AssignWorkModal = ({ isOpen, onClose, onSubmit, empList, initialData }) => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    assignedTo: ""

  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        assignedTo: initialData.assignedTo
      });
    }
  }, [initialData, isOpen]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      priority: "",
      assignedTo: ""
    })
    onClose();
  };
  if (!isOpen) return null;

  return (
    <>

      <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fade-in">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            onClick={onClose}
          >
            <FiX size={20} />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Assign Work</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={handleChange}
                name='title'
                value={formData?.title}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                onChange={handleChange}
                name='description'
                value={formData.description}
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name='priority'
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={handleChange}
                value={formData.priority}
                required
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
              <select
                name='assignedTo'
                id="emp_list"
                className="w-full border border-gray-300 rounded-md p-2"
                onChange={handleChange}
                value={formData.assignedTo}
                required
              >
                <option value="">Select an employee</option>
                {empList.map((list, index) => (
                  <option key={index} value={list.username}>
                    {list.username}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Assign
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AssignWorkModal;
