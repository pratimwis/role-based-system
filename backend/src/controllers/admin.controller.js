import { io } from "../../index.js";
import Work from "../models/assignwork.model.js";
import User from "../models/user.model.js";

export const employeeList = async (req, res) => {
  const employees = await User.find({ role: "employee" });
  if (!employees) {
    res.status(400).json({ message: "Employees data not found" });
  }
  res
    .status(200)
    .json({ message: "Employees data fetched successfully", employees });
};

export const postAssignWork = async (req, res) => {
  const { title, description, priority, assignedTo } = req.body;

  try {
    const assignedBy = req.user.id;

    if (!title || !description || !assignedTo || !assignedBy || !priority) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const highestPriorityObj = await Work.findOne({ priority })
      .sort({ priorityOrder: -1 })
      .select("priorityOrder");

    const highestPriority = highestPriorityObj?.priorityOrder;
    const setPriorityOrder = highestPriority ? highestPriority + 1 : 1;

    const newWork = new Work({
      title,
      description,
      priority,
      priorityOrder: setPriorityOrder,
      assignedTo,
      assignedBy,
    });
    if (!newWork) {
      return res.status(400).json({
        message: "New work not created",
      });
    }
    const result = await newWork.save();
    const emp = await User.findOne({ username: assignedTo }).select("_id");
    if (emp) {
      const taskName = "new-task";
      io.to(emp._id.toString()).emit(taskName, {
        title: newWork.title,
        description: newWork.description,
      });
      console.log(`Notification sent to employee room: ${emp._id}`);
    }

    if (!result) {
      return res.status(400).json({
        message: "New work not created",
      });
    }

    return res.status(201).json({
      message: "Assigned work successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getTasksAssignedByAdmin = async (req, res) => {
  const { id } = req.user;
  try {
    const assignedTasks = await Work.find({
      assignedBy: id,
    });

    if (!assignedTasks || assignedTasks.length === 0) {
      return res.status(404).json({
        message: "No assigned tasks found",
      });
    }

    return res.status(200).json({
      message: "Assigned tasks fetched successfully",
      data: assignedTasks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const editAssignedTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, assignedTo } = req.body;

  try {
    const updatedTask = await Work.findByIdAndUpdate(
      id,
      { title, description, assignedTo },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Work.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const deleteEmployee = async (req, res) => {
  const empId = req.params.id;
  if (!empId) {
    return res.status(400).json({
      message: "Employee id is required",
    });
  }
  try {
    const deletedEmployee = await User.findByIdAndDelete(empId);
    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("_id username role");
    if (!users) {
      return res.status(404).json({
        message: "No users found",
      });
    }
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const updatePriorityOrder = async (req, res) => {
  const { draggedWorkId, targetWorkId } = req.body;

  if (!draggedWorkId || !targetWorkId) {
    return res.status(400).json({ message: "Both draggedWorkId and targetWorkId are required." });
  }

  try {
    const [draggedWork, targetWork] = await Promise.all([
      Work.findById(draggedWorkId),
      Work.findById(targetWorkId)
    ]);

    if (!draggedWork || !targetWork) {
      return res.status(404).json({ message: "One or both work items not found." });
    }

    // Swap the priorityOrder
    const tempPriority = draggedWork.priorityOrder;
    draggedWork.priorityOrder = targetWork.priorityOrder;
    targetWork.priorityOrder = tempPriority;

    // Save both
    await Promise.all([draggedWork.save(), targetWork.save()]);

    return res.status(200).json({ message: "Priority order updated successfully." });
  } catch (error) {
    console.error("Error updating priority order:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

