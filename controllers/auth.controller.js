
// import jwt from 'jsonwebtoken';
// import User from '../models/User.model.js';
// import { config } from '../config/config.js';

// export const login = async (req, res, next) => {
//     try {
//         console.log('Entering login controller'); // Log entry point

//         console.log('Request body:', req.body); // Log raw body
//         const { email, password } = req.body;
//         console.log('Login attempt:', { email, password });

//         // Find user
//         console.log('Searching for user with username:', username);
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('User not found:', email);
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }
//         console.log('User found:', user);

//         // Check password
//         console.log('Comparing password');
//         const isMatch = await user.comparePassword(password);
//         console.log('Password match:', isMatch);
//         if (!isMatch) {
//             return res.status(401).json({ error: 'Invalid credentials' });
//         }

//         // Debug JWT secret
//         console.log('JWT_SECRET in config:', config.jwtSecret ? '****' : 'not set');

//         // Generate JWT
//         console.log('Generating JWT');
//         const token = jwt.sign(
//             { userId: user._id, role: user.role },
//             config.jwtSecret,
//             { expiresIn: '1h' }
//         );

//         console.log('Sending response with token');
//         res.json({ token });
//     } catch (error) {
//         console.error('Error in login controller:', error); // Log the error
//         next(error);
//     }
// };

import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { config } from '../config/config.js';

export const login = async (req, res, next) => {
    try {
        console.log('Entering login controller');

        console.log('Request body:', req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            console.log('Missing email or password:', { email, password });
            return res.status(400).json({ error: 'Email and password are required' });
        }
        console.log('Login attempt:', { email, password });

        // Find user
        console.log('Searching for user with email:', email);
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        console.log('User found:', user);

        // Check password
        console.log('Comparing password');
        const isMatch = await user.comparePassword(password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Debug JWT secret
        console.log('JWT_SECRET in config:', config.jwtSecret ? '****' : 'not set');

        // Generate JWT
        console.log('Generating JWT');
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            config.jwtSecret,
            { expiresIn: '1h' }
        );

        console.log('Sending response with token');
        res.json({ token });
    } catch (error) {
        console.error('Error in login controller:', error);
        next(error);
    }
};