import express from 'express';
import {
  submitLandlordApplication,
  getMyApplication,
  getAllApplications,
  reviewApplication
} from '../controllers/applicationController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/landlord', protect, submitLandlordApplication);
router.get('/my-application', protect, getMyApplication);
router.get('/', protect, admin, getAllApplications);
router.put('/:id/review', protect, admin, reviewApplication);

export default router;