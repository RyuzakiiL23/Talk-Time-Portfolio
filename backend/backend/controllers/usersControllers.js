import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const allUsers = await User.find().select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in getUsers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};