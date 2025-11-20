import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user-routes';
import workoutRoutes from './routes/workout-routes';


dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

const MONGODB_URI = process.env.MONGODB_URI || '';

app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);

// Test route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Workouts API is running' });
});

// Error handling middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred' });
});

mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas');
        console.log('Database is ready');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log('\nWorkouts API is ready');
            console.log('\nAvailable endpoints:');
            console.log('Users:');
            console.log('  POST   /api/users/signup              - Create new user (auto-creates Day 1 & Day 2 workouts)');
            console.log('  POST   /api/users/login               - Login user');
            console.log('  GET    /api/users/:userId             - Get user by ID');
            console.log('\nWorkouts:');
            console.log('  GET    /api/workouts/user/:userId                    - Get all workouts for user');
            console.log('  GET    /api/workouts/user/:userId/day/:dayNumber     - Get specific day workout');
            console.log('  PUT    /api/workouts/:workoutId/exercise/:exerciseName - Update exercise weight (pass/fail)');
        });
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB Atlas');
        console.error('Error:', err.message);
        console.error('\nPlease check:');
        console.error('  1. Your .env.local file exists and contains MONGODB_URI');
        console.error('  2. Your MongoDB Atlas credentials are correct');
        console.error('  3. Your IP address is whitelisted in MongoDB Atlas');
        process.exit(1);
    });
