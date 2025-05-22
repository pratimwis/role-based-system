import { useEffect, useState } from "react";
import { assignedWork, employeeData } from "../api/AllApi.js";
import { toast } from "react-toastify";

const useEmployeeDashboard = () => {
  const [empData, setEmpData] = useState({});
  const [workList, setWorkList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch employee data and assigned work
  const fetchEmpData = async () => {
    try {
      const [empResponse, workResponse] = await Promise.all([
        employeeData(),
        assignedWork()
      ]);
      setEmpData(empResponse.data.data);
      setWorkList(workResponse.data.workList);
    } catch (error) {
      const { message } = error.response?.data || {};
      toast.error(message);
    }
  };
  const refreshWorkList = async () => {
    try {
      const workResponse = await assignedWork();
      setWorkList(workResponse.data.workList);
    } catch {
      toast.error("Failed to update task list.");
    }
  };

  useEffect(() => {
    fetchEmpData();
    refreshWorkList();
  }, []);

//Socket connection(new task) and update work list
  // useEffect(() => {
  //   const empId = empData._id;
  //   if (empData) {
  //     socket.emit("join", empId);
  //   } else {
  //     return;
  //   }
  //   const taskName = `new-task`;
  //   const handleNewTask = async (task) => {
  //     toast.success(
  //       `📌 New Task Assigned!\nTitle: ${task.title}\nDescription: ${task.description}`
  //     );

  //     try {
  //       const workResponse = await assignedWork();
  //       setWorkList(workResponse.data.workList);
  //     } catch {
  //       toast.error("Failed to update task list.");
  //     }
  //   };
  //   socket.on(taskName, handleNewTask);

  //   return () => {
  //     socket.off(taskName, handleNewTask);
  //   };
  // }, [empData]);


  return {
    empData,
    workList,
    isModalOpen,
    setIsModalOpen,
    refreshWorkList
  }
}
export default useEmployeeDashboard;