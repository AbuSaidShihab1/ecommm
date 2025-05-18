const jwt = require('jsonwebtoken');
const Admimodel=require("../Models/superadmin/Adminmodel")
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log(token)
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await Admimodel.findById(decoded._id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized, user not found'
        });
      }

      return next();
    }

    res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

const admin = (req, res, next) => {
  try {
    if (req.user ) {
      return next();
    }

    res.status(403).json({
      success: false,
      message: 'Not authorized as an admin'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { protect, admin };