import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    default: "employee",
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;