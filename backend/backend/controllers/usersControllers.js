import User from "../models/user.js";

// Get all users except the logged-in user
export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        // Return the list of users
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in getUsers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Update user information
export const updateUser = async (req, res) => {
    try {
        const { fullName, email, bio } = req.body;
        const userId = req.user._id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, email, bio },
            { new: true }
        );
        if (!updatedUser) {
            // If user is not found, return an error
            return res.status(404).json({ error: "User not found" });
        }
        updatedUser.save();
        // Return the updated user information
        res.status(200).json({
            _id: updatedUser._id,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            bio: updatedUser.bio,
        });
    } catch (error) {
        console.log("Error in updateUser controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};