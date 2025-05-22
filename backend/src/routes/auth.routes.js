import express from 'express';
const authRouters = express.Router();
import { loginUser, registerUser } from '../controllers/auth.controller.js';

//register based on username and password and type
authRouters.post('/register', registerUser );
authRouters.post('/login', loginUser);

export default authRouters;
