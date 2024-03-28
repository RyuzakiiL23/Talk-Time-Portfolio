import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

const router = express.Router();

/**
 * @route   POST /logout
 * @desc    Logout user
 * @access  Public
 */
router.post("/logout", async (req, res) => {
  try {
    // Clear the JWT cookie by setting its maxAge to 0
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route   POST /login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate and set a new JWT token for the user
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
    });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * @route   POST /signup
 * @desc    Signup user
 * @access  Public
 */
router.post("/signup", async (req, res) => {
  try {
    const { fullName, username, email, password, verifyPassword, gender } =
      req.body;
    if (password !== verifyPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Generate profile picture URL based on gender
    const girlProfilePic = `https://ui-avatars.com/api/?background=D7A2FE&color=6D23A6&name=${username}`;
    const boyProfilePic = `https://ui-avatars.com/api/?&background=A0D1B4&color=518D68&name=${username}`;
    // Other profile pictures can be generated: uncomment the lines below and comment the lines above
    // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashPass,
      gender,
      profilePic: gender === "female" ? girlProfilePic : boyProfilePic,
    });

    if (newUser) {
      // Generate and set a new JWT token for the new user
      generateToken(newUser._id, res);

      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "User data is invalid" });
    }
  } catch (error) {
    console.log("Error in Signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
