import jwt from 'jsonwebtoken';

/**
 * Generates a JWT token for the given user ID and sets it as a cookie in the response.
 * @param {string} userId - The ID of the user.
 * @param {object} res - The response object.
 */
const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_secret, {
        expiresIn: "15d",
    });
        
    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        SameSite: "strict",
    });
};

export default generateToken;
