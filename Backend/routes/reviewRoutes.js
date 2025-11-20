import express from 'express';
import {
  createReview,
  getPropertyReviews,
  deleteReview,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/property/:propertyId', getPropertyReviews);
router.post('/', protect, createReview);
router.delete('/:id', protect, deleteReview);

export default router;