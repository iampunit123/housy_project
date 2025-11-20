import User from '../models/User.js';
import Property from '../models/Property.js';
import Review from '../models/Review.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProperties,
      totalLandlords,
      totalTenants,
      featuredProperties,
      totalReviews
    ] = await Promise.all([
      User.countDocuments(),
      Property.countDocuments(),
      User.countDocuments({ userType: 'landlord' }),
      User.countDocuments({ userType: 'tenant' }),
      Property.countDocuments({ isFeatured: true }),
      Review.countDocuments()
    ]);

    const recentProperties = await Property.find()
      .populate('landlord', 'name email')
      .sort({ createdAt: -1 })
      .limit(5);

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('-password');

    const topSustainableProperties = await Property.find()
      .sort({ 'sustainability.overallScore': -1 })
      .limit(5)
      .select('title sustainability.overallScore location.city');

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalProperties,
        totalLandlords,
        totalTenants,
        featuredProperties,
        totalReviews,
      },
      recentActivities: {
        recentProperties,
        recentUsers,
      },
      topSustainableProperties
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { userType, isActive, isVerified } = req.body;

    if (userType) user.userType = userType;
    if (isActive !== undefined) user.isActive = isActive;
    if (isVerified !== undefined) user.isVerified = isVerified;

    const updatedUser = await user.save();
    
    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userType: updatedUser.userType,
        isActive: updatedUser.isActive,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt,
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('landlord', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      properties
    });
  } catch (error) {
    console.error('Get all properties error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const togglePropertyFeatured = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    property.isFeatured = !property.isFeatured;
    const updatedProperty = await property.save();
    
    await updatedProperty.populate('landlord', 'name email phone');
    
    res.json({
      success: true,
      property: updatedProperty,
      message: `Property ${updatedProperty.isFeatured ? 'featured' : 'unfeatured'} successfully`
    });
  } catch (error) {
    console.error('Toggle property featured error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const adminDeleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    await Property.findByIdAndDelete(req.params.id);
    await Review.deleteMany({ property: req.params.id });

    res.json({
      success: true,
      message: 'Property deleted by admin successfully'
    });
  } catch (error) {
    console.error('Admin delete property error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};