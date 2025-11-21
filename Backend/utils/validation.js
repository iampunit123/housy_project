import { body } from 'express-validator';

export const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('userType')
    .optional()
    .isIn(['tenant', 'landlord'])
    .withMessage('User type must be either tenant or landlord'),
];

export const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const validateProperty = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long'),
  body('description')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Description must be at least 10 characters long'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be positive'),
  body('propertyType')
    .isIn(['apartment', 'house', 'office', 'short_stay', 'commercial'])
    .withMessage('Invalid property type'),
  body('priceType')
    .isIn(['monthly', 'daily', 'yearly'])
    .withMessage('Invalid price type'),
  body('location.city')
    .optional()
    .isString()
    .withMessage('City must be a string'),
  body('location.area')
    .optional()
    .isString()
    .withMessage('Area must be a string'),
  body('location.address')
    .optional()
    .isString()
    .withMessage('Address must be a string'),
  body('features.bedrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bedrooms must be a positive number'),
  body('features.bathrooms')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Bathrooms must be a positive number'),
  body('features.area')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Area must be a positive number'),
  body('features.parking')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Parking must be a positive number'),
];

export const validateReview = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Comment must be at least 10 characters long'),
  body('sustainabilityRating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Sustainability rating must be between 1 and 5'),
  body('landlordRating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Landlord rating must be between 1 and 5'),
  body('locationRating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Location rating must be between 1 and 5'),
];

export const validateApplication = [
  body('idNumber')
    .trim()
    .isLength({ min: 5 })
    .withMessage('ID number is required'),
  body('phone')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Phone number is required'),
  body('address')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Address is required'),
  body('reason')
    .trim()
    .isLength({ min: 20 })
    .withMessage('Please provide a detailed reason (at least 20 characters)'),
  body('experience')
    .optional()
    .trim(),
];

// Admin validation
export const validateAdminCreation = [
  body('secretKey')
    .notEmpty()
    .withMessage('Secret key is required'),
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters long'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
];