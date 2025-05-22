import express from 'express'
import { verifyEmployee, verifyToken } from '../middleware/auth.middleware.js';
import { employeeDashboard, getWorkListByEmployee, updateWorkStatus } from '../controllers/employee.controller.js';
const employeeRouter = express.Router();

employeeRouter.get('/assigned-work', verifyToken, verifyEmployee, getWorkListByEmployee)
employeeRouter.get('/dashboard', verifyToken, verifyEmployee, employeeDashboard)
employeeRouter.post('/submit-work/:id', verifyToken, verifyEmployee, updateWorkStatus)

export default employeeRouter;