import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);

// Create new user
const user = await User.create({
  fullName,
  email,
  password: hashedPassword,
  role: "user",
});

    res.status(201).json({
      message: "User registered successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD THIS BELOW registerUser
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

const user = await User.findOne({ email });

console.log("Logged in user:");
console.log(user);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

   const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({
    message: "Invalid password",
  });
}

   console.log(process.env.JWT_SECRET);

const token = jwt.sign(
  {
    id: user._id,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

const { password: _, ...userData } = user.toObject();
console.log(userData);

res.status(200).json({
  message: "Login successful",
  token,
  user: userData,
});

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};