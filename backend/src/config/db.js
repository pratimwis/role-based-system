import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUrl =process.env.MONGODB_URL;
  try {
    await mongoose.connect(`${mongoUrl}`);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};

export default connectDB;
