import { useEffect, useState } from 'react';
import { assignWork, deleteAssignedWork, editAssignedWork, employeeList, getAllUsers, workListApi } from '../api/AllApi';
import { toast } from 'react-toastify';
//import { socket } from '../socket';
//import useAuthGuard from '../utils/UseAuthGuard';

const useAdminDashboard = () => {
  //const userData = useAuthGuard();
  const [users, setUsers] = useState([]);
  const [empList, setEmpList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchWorkList = async () => {
    try {
      const response = await workListApi();
      if (response.status === 200) {
        setWorkList(response.data.data);
      } else if (response.status === 404) {
        setWorkList([]);
        toast.error("No work assigned yet.")
      }
      else {
        toast.error("Error fetching work list.")
      }

    } catch (error) {
      const { message } = error.response?.data || {};
      toast.error(message)
    }
  }
  const fetchEmployeeList = async () => {
    try {
      const response = await employeeList();
      if (response.status === 200) {
        setEmpList(response.data?.employees || []);
      } else {
        toast.error("Failed to fetch employee list.");
      }
    } catch (error) {
      console.log(error)
      const { message } = error.response?.data || "";
      toast.error(message)
    }
  }

  const handleAssignSubmit = async (modalData) => {
    try {
      let response;
      if (editData) {
        console.log(editData)
        response = await editAssignedWork(editData._id, modalData);
        if (response.status === 200) {
          toast.success("Task updated successfully");
          fetchWorkList();
          setEditData(null);
        } else {
          toast.error("Failed to update task");
        }
      } else {
        response = await assignWork(modalData);
        if (response.status === 201) {
          toast.success("Task assigned successfully");
          fetchWorkList();
        } else {
          toast.error("Failed to assign task");
        }
      }

    } catch (error) {
      const { message } = error.response.data;
      toast.error(message);
    }
    setEditData(null);

  };

  const handleEditTask = async (task) => {
    setEditData(task);
    setIsModalOpen(true);
  }

  const handleDeleteTask = async (id) => {
    try {
      console.log(id)
      const response = await deleteAssignedWork(id);
      if (response.status === 200) {
        toast.success("Task deleted successfully");
        fetchWorkList();
      } else {
        toast.error("Failed to delete task");
      }
    } catch (error) {
      console.log(error)
      const { message } = error.response.data;
      toast.error(message);
    }
  }

  const fetchAllusers = async () => {
    try {
      const response =await getAllUsers();
      if (response.status === 200) {
        setUsers(response.data.data || []);
      } else {
        toast.error("Failed to fetch employee list.");
      }
    } catch (error) {
      console.log(error)
      const { message } = error.response?.data || "";
      toast.error(message)
    }

  }

  useEffect(() => {
    fetchWorkList();
    fetchEmployeeList();
    fetchAllusers();
  }, [])

  return {
    workList,
    users,
    empList,
    editData,
    isModalOpen,
    openModal,
    closeModal,
    handleAssignSubmit,
    handleEditTask,
    handleDeleteTask,
    

  };
};

export default useAdminDashboard;
