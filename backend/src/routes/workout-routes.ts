import express from "express";
import { getWorkoutByUserAndDay, getWorkoutsByUser, updateExerciseWeight } from "../controllers/workout-controllers";

const router = express.Router();

// GET /api/workouts/user/:userId - Get all workouts for a user
router.get('/user/:userId', getWorkoutsByUser);

// GET /api/workouts/user/:userId/day/:dayNumber - Get workout by user and day
router.get('/user/:userId/day/:dayNumber', getWorkoutByUserAndDay);

// PUT /api/workouts/:workoutId/exercise/:exerciseName - Update exercise weight
router.put('/:workoutId/exercise/:exerciseName', updateExerciseWeight);

export default router;