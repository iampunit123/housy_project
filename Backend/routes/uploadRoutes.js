import express from 'express';
import { protect, landlord } from '../middleware/authMiddleware.js';
import { uploadMultipleImages, handleUploadErrors } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Production upload endpoint - protected for landlords/admins only
router.post('/', protect, landlord, uploadMultipleImages, handleUploadErrors, (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = req.files.map(file => file.path);
    
    res.json({
      success: true,
      message: 'Images uploaded successfully',
      images: imageUrls
    });
  } catch (error) {
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
});

export default router;