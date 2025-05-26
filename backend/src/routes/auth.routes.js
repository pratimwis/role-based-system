import express from 'express';
const authRouters = express.Router();
import { loginUser, registerUser, updateProfile } from '../controllers/auth.controller.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { verifyToken } from '../middleware/auth.middleware.js';

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.user?.username;
    const uploadPath = path.join('uploads', username);
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname );
  },
});

const upload = multer({ storage });

//register based on username and password and type
authRouters.post('/register', registerUser);
authRouters.post('/login', loginUser);
authRouters.post('/uploads', verifyToken, upload.single('image'), updateProfile)

export default authRouters;
