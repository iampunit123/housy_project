import express from 'express';
import {
  getDashboardStats,
  getAllUsers,
  updateUser,
  getAllProperties,
  togglePropertyFeatured,
  adminDeleteProperty,
} from '../controllers/adminController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes are protected and require admin privileges
router.use(protect);
router.use(admin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.get('/properties', getAllProperties);
router.put('/properties/:id/feature', togglePropertyFeatured);
router.delete('/properties/:id', adminDeleteProperty);

export default router;