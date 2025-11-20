import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Workout from '../models/Workout';

// POST /api/users/signup - Create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(422).json({ message: 'User with this email already exists' });
        }

        const createdUser = new User({ email, password });
        await createdUser.save();

        // Create Day 1 Workout
        const day1Workout = new Workout({
            userId: createdUser.id,
            dayNumber: 1,
            exercises: [
                { name: 'Squat 4x8', currentWeight: 45, hasPassFail: true },
                { name: 'Bench Press 4x8', currentWeight: 45, hasPassFail: true },
                { name: 'Rows 3x12', currentWeight: 45, hasPassFail: true },
                { name: 'Pushups 3x15', currentWeight: 45, hasPassFail: true },
                { name: 'Abs 3x15', currentWeight: null, hasPassFail: false }
            ]
        });

        // Create Day 2 Workout
        const day2Workout = new Workout({
            userId: createdUser.id,
            dayNumber: 2,
            exercises: [
                { name: 'Squat 4x8', currentWeight: 45, hasPassFail: true },
                { name: 'Overhead Press 4x8', currentWeight: 45, hasPassFail: true },
                { name: 'Deadlift 3x5', currentWeight: 95, hasPassFail: true },
                { name: 'Chin-Ups 3x15', currentWeight: 0, hasPassFail: true },
                { name: 'Abs 3x15', currentWeight: null, hasPassFail: false }
            ]
        });

        await day1Workout.save();
        await day2Workout.save();

        res.status(201).json({
            user: {
                id: createdUser.id,
                email: createdUser.email
            }
        });
    } catch (err) {
        return res.status(500).json({ message: `sign up failed : ${err}` });
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return res.status(500).json({ message: 'Login failed, please try again later' });
    }

    if (!existingUser || existingUser.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
        user: {
            id: existingUser.id,
            email: existingUser.email
        }
    });
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return res.status(500).json({ message: 'something went wrong, could not find user!' });
    }
    if (!user) {
        return res.status(404).json({ message: 'user not found' });
    }

    res.json({
        user: user.toObject({ getters: true })
    });
}