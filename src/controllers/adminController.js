import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import { adminEmail, adminPassword, adminName, role } from '../config/admin.js';

export const admin = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        if (email !== adminEmail) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await bcrypt.compare(password, adminPassword);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

      
        const token = jwt.sign(
            { email: adminEmail, role: role }, 
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.json({
            success: true,
            message: 'Login successful',
            token: token,
            admin: {
                name: adminName,
                role: role,
                email: adminEmail,
            },
        });
    } catch (error) {
        console.error('Error during admin login:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
export const getAdminProfile = async (req, res) => {
    try {
        return res.json({
            success: true,
            admin: {
                name: adminName,
                role: role,
                email: adminEmail,
            },
        });
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

