const Country = require('../models/Country');
const asyncHandler = require('express-async-handler');

// @desc    Create a new country
// @route   POST /api/countries
// @access  Private/Admin
exports.createCountry = asyncHandler(async (req, res) => {
  const { countryName, description, status, visibility, publishedDate } = req.body;
  
  // Check if image was uploaded
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload an image');
  }

  const image = req.file.path;

  // Check if country already exists
  const countryExists = await Country.findOne({ countryName });
  if (countryExists) {
    res.status(400);
    throw new Error('Country already exists');
  }

  const country = await Country.create({
    countryName,
    description,
    image,
    status,
    visibility,
    publishedDate: publishedDate || Date.now(),
    createdBy: req.user._id
  });

  res.status(201).json({
    success: true,
    data: country
  });
});

// @desc    Get all countries
// @route   GET /api/countries
// @access  Public
exports.getCountries = asyncHandler(async (req, res) => {
  const { status, visibility } = req.query;
  
  let query = {};
  
  if (status) {
    query.status = status;
  }
  
  if (visibility) {
    query.visibility = visibility;
  }

  const countries = await Country.find(query).sort({ createdAt: -1 }).populate('createdBy', 'name email');

  res.status(200).json({
    success: true,
    count: countries.length,
    data: countries
  });
});

// @desc    Get single country
// @route   GET /api/countries/:id
// @access  Public
exports.getCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id).populate('createdBy', 'name email');

  if (!country) {
    res.status(404);
    throw new Error('Country not found');
  }

  res.status(200).json({
    success: true,
    data: country
  });
});

// @desc    Update country
// @route   PUT /api/countries/:id
// @access  Private/Admin
exports.updateCountry = asyncHandler(async (req, res) => {
  let country = await Country.findById(req.params.id);

  if (!country) {
    res.status(404);
    throw new Error('Country not found');
  }

  const { countryName, description, status, visibility, publishedDate } = req.body;
  
  // Check if country name is being updated and if it already exists
  if (countryName && countryName !== country.countryName) {
    const countryExists = await Country.findOne({ countryName });
    if (countryExists) {
      res.status(400);
      throw new Error('Country already exists');
    }
  }

  // Prepare update data
  const updateData = {
    countryName: countryName || country.countryName,
    description: description || country.description,
    status: status || country.status,
    visibility: visibility || country.visibility,
    publishedDate: publishedDate || country.publishedDate,
    updatedAt: Date.now()
  };

  // If new image is uploaded
  if (req.file) {
    updateData.image = req.file.path;
    // TODO: Delete old image from server
  }

  country = await Country.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: country
  });
});

// @desc    Delete country
// @route   DELETE /api/countries/:id
// @access  Private/Admin
exports.deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findById(req.params.id);

  if (!country) {
    res.status(404);
    throw new Error('Country not found');
  }

  // TODO: Delete image from server before deleting country
  await country.remove();

  res.status(200).json({
    success: true,
    message: 'Country deleted successfully'
  });
});