import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			// required: true, // Uncomment this line if email is required
			unique: true,
			validate: {
				validator: function(v) {
					return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
				},
				message: props => `${props.value} is not a valid email address!`
			}
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		gender: {
			type: String,
			required: true,
			enum: ["male", "female"],
		},
		profilePic: {
			type: String,
			default: "",
		},
		bio: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

// Create the User model using the user schema
const User = mongoose.model("User", userSchema);

export default User;