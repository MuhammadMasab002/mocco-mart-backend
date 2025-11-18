import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
        return res.status(409).json({ message: "User already exist!!" });
    }

    // Hash the password before saving 
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        email,
        password: hashPassword
    });
    await newUser.save();

    const userResponse = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
    };

    return res.status(201).json({
        message: "User registered successfully!",
        user: userResponse,
    });


};

export { registerUser };