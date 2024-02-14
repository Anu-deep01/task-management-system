// src/controllers/auth.ts

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists', status: 400 });
        }

        // Create a new user
        user = new User({ username, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database
        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, status: 200 });
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', status: 500 });
    }
};

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials', status: 400 });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials', status: 400 });
        }

        // Generate JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET || "", { expiresIn: '1h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, status: 200 });
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Server Error', status: 500 });
    }
};
