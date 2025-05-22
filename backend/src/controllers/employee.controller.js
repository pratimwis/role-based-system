import Work from "../models/assignwork.model.js";
import User from "../models/user.model.js";

export const employeeDashboard = async (req, res) => {
  try {
    const empId = req.user.id;
    if (!empId) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }
    const empDetails = await User.findOne({ _id: empId })
    if (!empDetails) {
      return res.status(404).json({
        message: "No data found"
      });
    }
    const { _id, username, role } = empDetails;
    return res.status(200).json({
      message: "Employee data fatched successfully",
      data: {
        _id,
        username,
        role
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export const getWorkListByEmployee = async (req, res) => {
  try {
    const employeeName = req.user.username;
    if (!employeeName) {
      return res.status(401).json({
        message: "Username not found"
      });
    }

    const workList = await Work.find({ assignedTo: employeeName })
      .populate({
        path: 'assignedBy',
        select: 'username'
      });

    if (!workList) {
      return res.status(404).json({
        message: "No tasks found"
      });
    }

    res.status(200).json({ message: "Worklist fetched successfully", workList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching work list' });
  }
};

export const updateWorkStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    if (!id || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    const validTaskId = await Work.findOne({ _id: id });
    if (!validTaskId) {
      return res.status(404).json({
        message: "Task not found"
      });
    }
    const updatedTask = await Work.findByIdAndUpdate(
      id,
      { status: "completed", empComment: message },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not updated"
      });
    }
    return res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while updating work status' });

  }
}