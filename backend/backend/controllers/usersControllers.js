import User from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        // const allUsers = await User.find().select("-password");
        res.status(200).json(allUsers);
    } catch (error) {
        console.log("Error in getUsers controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { fullName, email, bio } = req.body;
        const userId = req.user._id;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, email, bio },
            { new: true }
        );
        console.log("Updated user: ", updatedUser);
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        updatedUser.save();
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