import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const {JWT_SECRET, JWT_EXPIRES_IN} = process.env;

export const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  try {
    const exitingUser = await User.findOne({ username });
    if (exitingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role
    });
    const result = await newUser.save();
    if (result) {
      return res.status(201).json({ message: 'User created successfully' });
    } else {
      return res.status(400).json({ message: 'User not created' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });

  }
};
export const loginUser = async (req, res) => {
  const { username, password:userPass } = req.body;
  if (!username || !userPass) {
    return res.status(400).json({ message: "All field are required" })
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    const { password, ...userData } = user.toObject();
    const match = await bcrypt.compare(userPass, password);
    if (match) {
      const token = jwt.sign(
        userData,
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );
      res.status(200).json({
        message: "Login Successfully",
        token,
        userData
      })
    } else {
      return res.status(401).json({ message: "Password not matched" })
    }
  } catch (error) {
    console.log(error)
  }

}


