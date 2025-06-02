import {Request, Response} from 'express';
import { createToken } from '../lib/utils.js';
import { connection } from '../lib/db.js';
import bcrypt from 'bcrypt';

export const signup = async(req: Request, res: Response) => {
    const {email, password, re_password } = req.body;
    try {
        connection.query('SELECT * FROM users WHERE email = ?',
            [email],
            async (err: { message: any; }, results: string) => {
                // Handle database query error
                if (err) {
                    console.log('Error in signup controller:', err.message);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Check if passwords match
                if (password !== re_password) {
                    return res.status(400).json({ message: 'Passwords do not match' });
                }

                // Check if email already exists
                if (results.length > 0) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
            })
        // const user = await User.findOne({email});
        // if (user) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // const newUser = new User({
        //     email,
        //     password: hashedPassword,
        // })

        
        // Save the new user to the database
        connection.query('INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hashedPassword],
            async (error: { message: any; }, results: any) => {
                if (error) {
                    console.log("Error in signup controller:", error.message);
                    return res.status(500).json({ message: "Internal Server Error" });
                }  
                
                const newUser = { id: results.insertId, email };
                createToken(newUser.id, res);

                res.status(201).json({
                    id: newUser.id,
                    email: newUser.email,
                });
            }
        )


        // if (newUser) {
        //     createToken(newUser._id, res);
        //     await newUser.save();

        //     res.status(201).json({
        //         _id: newUser._id,
        //         email: newUser.email,
        //     });
        // } else {
        //     console.log("Error in signup controller:", error.message);
        //     res.status(500).json({ message: "Internal Server Error" });
        // }

    } catch (error) {
        console.log("Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (
        req: Request,
        res: Response
    ) => {
    const { email, password } = req.body;
    try {
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            async (err: { message: any }, results: any[]) => {
                // Handle database query error
                if (err) {
                    console.log('Error in login controller:', err.message);
                    return res.status(500).json({ message: 'Internal Server Error' });
                }

                // Check if user exists
                if (results.length === 0) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                const user = results[0];

                const isPasswordCorrect = await bcrypt.compare(password, user.password);
                if (!isPasswordCorrect) {
                    return res.status(400).json({ message: "Invalid credentials" });
                }

                createToken(user.id, res);

                res.status(200).json({
                    id: user.id,
                    email: user.email,
                });
            }
        );
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req: Request, res: Response) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('Error in checkAuth controller:', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};