import Application from '../models/Application.js';
import User from '../models/User.js';

// @desc    Submit landlord application
// @route   POST /api/applications/landlord
// @access  Private
export const submitLandlordApplication = async (req, res) => {
  try {
    const { idNumber, phone, address, reason, experience } = req.body;

    // Check if user already has a pending application
    const existingApplication = await Application.findOne({ 
      user: req.user._id,
      status: 'pending'
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: 'You already have a pending application'
      });
    }

    // Check if user is already a landlord
    if (req.user.userType === 'landlord') {
      return res.status(400).json({
        success: false,
        message: 'You are already a verified landlord'
      });
    }

    const application = new Application({
      user: req.user._id,
      userEmail: req.user.email,
      idNumber,
      phone,
      address,
      reason,
      experience,
    });

    const savedApplication = await application.save();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      application: savedApplication
    });
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during application submission'
    });
  }
};

// @desc    Get user's application status
// @route   GET /api/applications/my-application
// @access  Private
export const getMyApplication = async (req, res) => {
  try {
    const application = await Application.findOne({ user: req.user._id })
      .populate('reviewedBy', 'name email');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'No application found'
      });
    }

    res.json({
      success: true,
      application
    });
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all applications (Admin only)
// @route   GET /api/applications
// @access  Private/Admin
export const getAllApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const applications = await Application.find(filter)
      .populate('user', 'name email userType createdAt')
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Application.countDocuments(filter);

    res.json({
      success: true,
      applications,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Review application (Admin only)
// @route   PUT /api/applications/:id/review
// @access  Private/Admin
export const reviewApplication = async (req, res) => {
  try {
    const { status, reviewNotes } = req.body;

    const application = await Application.findById(req.params.id)
      .populate('user', 'name email userType');

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      });
    }

    if (application.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Application has already been reviewed'
      });
    }

    application.status = status;
    application.reviewNotes = reviewNotes || '';
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();

    const updatedApplication = await application.save();

    // If approved, upgrade user to landlord
    if (status === 'approved') {
      await User.findByIdAndUpdate(application.user._id, {
        userType: 'landlord',
        isVerified: true
      });
    }

    res.json({
      success: true,
      message: `Application ${status} successfully`,
      application: updatedApplication
    });
  } catch (error) {
    console.error('Review application error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during application review'
    });
  }
};