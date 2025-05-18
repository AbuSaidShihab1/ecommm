const fs = require('fs');
const path = require('path');
const Customeruser = require('../Models/Customerusermodel');
const bcrypt = require('bcryptjs');
const Adminmodel = require('../Models/superadmin/Adminmodel');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res, next) => {
  try {
    const users = await Customeruser.find({ isActive: true })
      .select('-password -customPermissions')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new user
// @route   POST /api/users
// @access  Private/Admin
const createUser = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      designation,
      username,
      email,
      phone,
      password,
      profileImage,
      accessLevel,
      customPermissions,
      admin_id
    } = req.body;

    // Check if user already exists
    const userExists = await Customeruser.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }
    const match_amdin=await Adminmodel.findById({_id:admin_id})

    const user = await Customeruser.create({
      firstName,
      lastName,
      designation,
      username,
      email,
      phone,
      password,
      profileImage,
      accessLevel,
      customPermissions: accessLevel === 'custom' ? customPermissions : undefined,
      createdBy:match_amdin.email,
      authorizedBy:match_amdin.email
    });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        designation: user.designation,
        profileImage: user.profileImage,
        accessLevel: user.accessLevel,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private/Admin
const getUser = async (req, res, next) => {
  try {
    const user = await Customeruser.findById(req.params.id)
      .select('-password')
      .populate('createdBy', 'firstName lastName email');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res, next) => {
  try {
    const user = await Customeruser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const {
      firstName,
      lastName,
      designation,
      username,
      email,
      phone,
      profileImage,
      accessLevel,
      customPermissions
    } = req.body;

    // Check if email or username is being updated and belongs to another user
    if (email && email !== user.email) {
      const emailExists = await Customeruser.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use by another user'
        });
      }
    }

    if (username && username !== user.username) {
      const usernameExists = await Customeruser.findOne({ username });
      if (usernameExists) {
        return res.status(400).json({
          success: false,
          message: 'Username already in use by another user'
        });
      }
    }

    // Update user fields
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.designation = designation || user.designation;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.profileImage = profileImage || user.profileImage;
    user.accessLevel = accessLevel || user.accessLevel;
    
    if (accessLevel === 'custom') {
      user.customPermissions = customPermissions || user.customPermissions;
    } else {
      user.customPermissions = undefined;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        username: updatedUser.username,
        designation: updatedUser.designation,
        profileImage: updatedUser.profileImage,
        accessLevel: updatedUser.accessLevel,
        updatedAt: updatedUser.updatedAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (soft delete)
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res, next) => {
  try {
    const user = await Customeruser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Soft delete by setting isActive to false
    user.isActive = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deactivated successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload profile image
// @route   POST /api/users/upload-image/:userId
// @access  Private/Admin
const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const user = await Customeruser.findById(req.params.userId);
    if (!user) {
      // Delete the uploaded file if user not found
      fs.unlinkSync(req.file.path);
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Update user's profile image
    user.profileImage = `/uploads/${req.params.userId}/${req.file.filename}`;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      imagePath: user.profileImage
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's uploaded images
// @route   GET /api/users/images/:userId
// @access  Private/Admin
const getUserImages = async (req, res, next) => {
  try {
    const uploadPath = path.join(__dirname, '../public/uploads', req.params.userId);
    
    fs.readdir(uploadPath, (err, files) => {
      if (err) {
        if (err.code === 'ENOENT') {
          return res.status(200).json({
            success: true,
            data: []
          });
        }
        throw err;
      }

      const images = files.map(file => ({
        name: file,
        path: `/uploads/${req.params.userId}/${file}`
      }));

      res.status(200).json({
        success: true,
        data: images
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  getUserImages
};