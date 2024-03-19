import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

const router = express.Router();

router.post("/logout", async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ error: "Invalid username!!" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ error: "Invalid password!!" });
		}

		generateToken(user._id, res);
		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

router.post("/signup", async (req, res) => {
	try {
		const { fullName, username, email, password, verifyPassword, gender } =
			req.body;
		if (password !== verifyPassword) {
			return res.status(400).json({ error: "Passwords do not match" });
		}

		const user = await User.findOne({ username });
		if (user) {
			return res.status(400).json({ error: "Username already exists" });
		}

		// const boyProfilePic = `https://avatar.iran.liara.run/username?username=${username}&length=1&background=A0D1B4&color=518D68`;
		// const girlProfilePic = `https://avatar.iran.liara.run/username?username=${username}&length=1&background=D7A2FE&color=6d23a6`;
		const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

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
