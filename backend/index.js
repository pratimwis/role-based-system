import express from 'express';
import authRouters from './src/routes/auth.routes.js';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import adminRouter from './src/routes/admin.routes.js';
import employeeRouter from './src/routes/employee.routes.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
dotenv.config();
const PORT = 8000;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/employee', employeeRouter);
app.use('/api/v1/auth', authRouters)

// Socket.io connection
io.on('connection', (socket) => {
  console.log("A user connected:", socket.id);
  socket.on('join', (userId) => {
    socket.join(userId); 
    console.log(`User ${userId} joined room`);
  });


  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${process.env.BASE_URL}`); // Use BASE_URL from .env

});
