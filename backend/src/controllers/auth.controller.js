import { createToken } from '../lib/utils.js';
import { findUserByEmail, findUserById, createUser } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export const signup = async (req, res) => {
  const { email, password, re_password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (user) return res.status(400).json({ message: 'Email already exists' });

    if (password !== re_password) return res.status(400).json({ message: 'Passwords do not match' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: randomUUID(),
      email,
      password: hashedPassword,
    };

    await createUser(newUser);
    createToken(newUser.id, res);

    res.status(201).json({
      _id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    console.log('Error in signup controller:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    createToken(user.id, res);

    res.status(200).json({
      _id: user.id,
      email: user.email,
    });
  } catch (error) {
    console.log('Error in login controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log('Error in logout controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log('Error in checkAuth controller', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};