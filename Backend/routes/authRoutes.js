import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  createAdmin  // ✅ Make sure this import is added
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateUserRegistration, validateUserLogin } from '../utils/validation.js';

const router = express.Router();

router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);
router.post('/create-admin', createAdmin); // ✅ This should now work
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;