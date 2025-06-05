// import express from 'express';
// import { login } from '../controllers/auth.controller.js';

// const router = express.Router();

// // router.post('/login', login);

// // export default router;

// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         console.log('Login attempt with email:', email);

//         const user = await User.findOne({ email });
//         console.log('Found user:', user);

//         if (!user || user.role !== 'admin') {
//             console.log('User not found or not an admin:', email);
//             return res.status(401).json({ message: 'Invalid credentials or not an admin' });
//         }

//         const isMatch = await user.comparePassword(password);
//         console.log('Password match:', isMatch);

//         if (!isMatch) {
//             console.log('Invalid password for email:', email);
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: error.message });
//     }
// });

// export default router;

import express from 'express';
import { login } from '../controllers/auth.controller.js'; // Use the controller

const router = express.Router();

router.post('/login', login); // Uncommented and using the controller

export default router;