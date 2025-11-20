import express from 'express';
import {
  getProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  getFeaturedProperties,
  getMyProperties,
  getCities,
} from '../controllers/propertyController.js';
import { protect, landlord } from '../middleware/authMiddleware.js';
import { uploadMultipleImages, handleUploadErrors } from '../middleware/uploadMiddleware.js';
import { validateProperty } from '../utils/validation.js';

const router = express.Router();

router.get('/', getProperties);
router.get('/featured', getFeaturedProperties);
router.get('/cities', getCities);
router.get('/:id', getPropertyById);

// Protected routes
router.use(protect);

router.get('/landlord/my-properties', landlord, getMyProperties);
router.post('/', landlord, uploadMultipleImages, handleUploadErrors, validateProperty, createProperty);
router.put('/:id', landlord, uploadMultipleImages, handleUploadErrors, validateProperty, updateProperty);
router.delete('/:id', deleteProperty);

export default router;