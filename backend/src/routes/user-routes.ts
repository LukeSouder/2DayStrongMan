import express from 'express';
import { check } from 'express-validator';
import { createUser, getUserById, loginUser } from '../controllers/user-controllers';

const router = express.Router();

// POST /api/users/signup - Create new user
router.post('/signup', [
    check('email').isEmail().withMessage('Please enter a valid email'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], createUser);

// POST /api/users/login - login user
router.post('/login', [
    check('email').isEmail().withMessage('Please enter a valid email!'),
    check('password').notEmpty().withMessage('Password is required')
], loginUser)

// GET /api/users/:userId - get user by id
router.get('/:userId', getUserById);

export default router;