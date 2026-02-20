import mongoose from "mongoose"
import User from "../models/user.model";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("Email already exists");
            error.statusCode = 409;
            throw error;
        }
        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {}

export const signOut = async (req, res, next) => {}