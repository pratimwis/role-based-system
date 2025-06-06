import express from "express";
const adminRouter = express.Router();
import {
  deleteEmployee,
  deleteTask,
  editAssignedTask,
  employeeList,
  getTasksAssignedByAdmin,
  postAssignWork,
  getAllUsers,
  updatePriorityOrder,
} from "../controllers/admin.controller.js";
import { verifyAdmin, verifyToken } from "../middleware/auth.middleware.js";


//admin routes
adminRouter.get("/employee-list", verifyToken, verifyAdmin, employeeList);
adminRouter.post("/assign-work", verifyToken, verifyAdmin, postAssignWork);
adminRouter.get(
  "/get-assigned-tasks",
  verifyToken,
  verifyAdmin,
  getTasksAssignedByAdmin
);
adminRouter.put(
  "/update-assigned-task/:id",
  verifyToken,
  verifyAdmin,
  editAssignedTask
);
adminRouter.delete(
  "/delete-assigned-task/:id",
  verifyToken,
  verifyAdmin,
  deleteTask
);
adminRouter.delete(
  "/delete-employee/:id",
  verifyToken,
  verifyAdmin,
  deleteEmployee
);
adminRouter.get("/get-all-users", verifyToken, verifyAdmin, getAllUsers);

adminRouter.put(
  "/update-priority-order",
  verifyToken,
  verifyAdmin,
  updatePriorityOrder
);

export default adminRouter;
