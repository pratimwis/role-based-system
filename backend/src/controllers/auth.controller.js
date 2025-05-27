import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import e from 'express';
dotenv.config();
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

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
  const { username, password: userPass } = req.body;
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
        user:{
          username: userData.username,
          profilePicture: userData.profilePicture,
          role: userData.role,
          _id: userData._id
        }
      })
    } else {
      return res.status(401).json({ message: "Password not matched" })
    }
  } catch (error) {
    console.log(error)
  }

}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const imageUrl = `${process.env.BASE_URL}/uploads/${req.user.username}/${file.originalname}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Internal server error: ' + error });
  }


}

export const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "User not found" })
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" })
    }
    const user = await User.findById(userId);
    const isMatchpassword = await bcrypt.compare(currentPassword, user.password);
    if (!isMatchpassword) {
      return res.status(400).json({ message: "Current password not matched" })
    }
    user.password = newPassword;
    user.save();
    return res.status(200).json({ message: "Password change successfully" });

  } catch (error) {

  }
}


