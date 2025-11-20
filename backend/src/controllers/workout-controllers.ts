import { Request, Response, NextFunction } from 'express';
import Workout from '../models/Workout';

// GET /api/workouts/user/:userId/day/:dayNumber - Get workout by user and day
export const getWorkoutByUserAndDay = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, dayNumber } = req.params;
    const day = parseInt(dayNumber);

    if (day !== 1 && day !== 2) {
        return res.status(400).json({ message: 'Day number must be 1 or 2' });
    }
    let workout;
    try {
        workout = await Workout.findOne({ userId, dayNumber: day })
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong, could not find workout.' });
    }

    if (!workout) {
        return res.status(404).json({ message: 'could not find a workout for provided user/day' })
    }


    res.json({ workout: workout.toObject({ getters: true }) });
};

// PUT /api/workouts/:workoutId/exercise/:exerciseName - Update exercise weight (pass/fail)
export const updateExerciseWeight = async (req: Request, res: Response, next: NextFunction) => {
    const { workoutId, exerciseName } = req.params;
    const { passed } = req.body;

    try {
        const workout = await Workout.findById(workoutId);
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        const exercise = workout.exercises.find(ex => ex.name === exerciseName);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        // Calculate new weight
        const newWeight = passed
            ? (exercise.currentWeight || 0) + 5
            : Math.max(0, (exercise.currentWeight || 0) - 5);

        // Update all workouts for this user with the same exercise name
        await Workout.updateMany(
            { userId: workout.userId, 'exercises.name': exerciseName },
            { $set: { 'exercises.$[elem].currentWeight': newWeight } },
            { arrayFilters: [{ 'elem.name': exerciseName }] }
        );

        const updatedWorkout = await Workout.findById(workoutId);
        res.json({ workout: updatedWorkout });
    } catch (err) {
        return res.status(500).json({ message: 'Failed to update exercise weight' });
    }
};

// GET /api/workouts/user/:userId - Get all workouts for a user
export const getWorkoutsByUser = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    try {
        const workouts = await Workout.find({ userId });

        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: 'Could not find workouts for the provided user' });
        }

        res.json({ workouts });
    } catch (err) {
        return res.status(500).json({ message: 'Fetching workouts failed, please try again later' });
    }
};