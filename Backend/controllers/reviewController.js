import Review from '../models/Review.js';
import Property from '../models/Property.js';

export const createReview = async (req, res) => {
  try {
    const { propertyId, rating, comment, sustainabilityRating, landlordRating, locationRating } = req.body;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Check if user already reviewed this property
    const existingReview = await Review.findOne({
      property: propertyId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this property' });
    }

    const review = new Review({
      property: propertyId,
      user: req.user._id,
      rating,
      comment,
      sustainabilityRating,
      landlordRating,
      locationRating
    });

    const createdReview = await review.save();
    await createdReview.populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      review: createdReview
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.propertyId })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews
    });
  } catch (error) {
    console.error('Get property reviews error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    // Check if user owns the review or is admin
    if (review.user.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};