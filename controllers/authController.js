import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel.js';

const generateToken = (user) => {
    return jwt.sign({ id: user._id, type: user.type }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const register = async (req, res) => {
    try {
        const { fullName, email, password, passwordConfirmation, phoneNumber, type } = req.body;

        // Asegúrate de que se proporciona la confirmación de la contraseña
        if (password !== passwordConfirmation) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new UserModel({ fullName, email, password, passwordConfirmation, phoneNumber, type });
        await user.save();
        const token = generateToken(user);
        res.status(201).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const profile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
