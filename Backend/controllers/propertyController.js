import Property from '../models/Property.js';
import Review from '../models/Review.js';
import cloudinary from '../config/cloudinary.js';

export const getProperties = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      propertyType,
      city,
      minPrice,
      maxPrice,
      bedrooms,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      sustainabilityMin,
      search
    } = req.query;

    const filter = { isAvailable: true };

    if (propertyType) filter.propertyType = propertyType;
    if (city) filter['location.city'] = new RegExp(city, 'i');
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }
    if (bedrooms) filter['features.bedrooms'] = { $gte: Number(bedrooms) };
    if (sustainabilityMin) {
      filter['sustainability.overallScore'] = { $gte: Number(sustainabilityMin) };
    }
    if (search) {
      filter.$text = { $search: search };
    }

    const sortOptions = {};
    if (sortBy === 'sustainability') {
      sortOptions['sustainability.overallScore'] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
    }

    const properties = await Property.find(filter)
      .populate('landlord', 'name email phone avatar')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Property.countDocuments(filter);

    res.json({
      success: true,
      properties,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalProperties: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('landlord', 'name email phone avatar');

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    // Increment views
    property.views += 1;
    await property.save();

    // Get reviews for this property
    const reviews = await Review.find({ property: req.params.id })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      property: {
        ...property.toObject(),
        reviews
      }
    });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const createProperty = async (req, res) => {
  try {
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(file => file.path);
    }

    const propertyData = {
      ...req.body,
      landlord: req.user._id,
      images: images,
    };

    // Parse nested objects if they are strings
    if (typeof req.body.location === 'string') {
      propertyData.location = JSON.parse(req.body.location);
    }
    if (typeof req.body.features === 'string') {
      propertyData.features = JSON.parse(req.body.features);
    }
    if (typeof req.body.sustainability === 'string') {
      propertyData.sustainability = JSON.parse(req.body.sustainability);
    }
    if (typeof req.body.amenities === 'string') {
      propertyData.amenities = JSON.parse(req.body.amenities);
    }

    const property = new Property(propertyData);
    const createdProperty = await property.save();
    
    await createdProperty.populate('landlord', 'name email phone avatar');
    
    res.status(201).json({
      success: true,
      property: createdProperty
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.landlord.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this property' });
    }

    let updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => file.path);
      updateData.images = [...property.images, ...newImages];
    }

    // Parse nested objects if they are strings
    if (typeof req.body.location === 'string') {
      updateData.location = JSON.parse(req.body.location);
    }
    if (typeof req.body.features === 'string') {
      updateData.features = JSON.parse(req.body.features);
    }
    if (typeof req.body.sustainability === 'string') {
      updateData.sustainability = JSON.parse(req.body.sustainability);
    }

    property = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('landlord', 'name email phone avatar');

    res.json({
      success: true,
      property
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    if (property.landlord.toString() !== req.user._id.toString() && req.user.userType !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this property' });
    }

    // Delete images from Cloudinary
    if (property.images && property.images.length > 0) {
      for (const imageUrl of property.images) {
        try {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`housy/properties/${publicId}`);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
        }
      }
    }

    await Property.findByIdAndDelete(req.params.id);
    
    // Also delete associated reviews
    await Review.deleteMany({ property: req.params.id });

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getFeaturedProperties = async (req, res) => {
  try {
    const featuredProperties = await Property.find({ 
      isFeatured: true, 
      isAvailable: true 
    })
    .populate('landlord', 'name email phone avatar')
    .limit(6)
    .sort({ 'sustainability.overallScore': -1, createdAt: -1 });

    res.json({
      success: true,
      properties: featuredProperties
    });
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.user._id })
      .populate('landlord', 'name email phone avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      properties
    });
  } catch (error) {
    console.error('Get my properties error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getCities = async (req, res) => {
  try {
    const cities = await Property.distinct('location.city', { isAvailable: true });
    res.json({
      success: true,
      cities: cities.filter(city => city).sort()
    });
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};