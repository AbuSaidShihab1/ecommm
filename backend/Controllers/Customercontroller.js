const UserModel = require("../Models/User");
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const WebSettings = require("../Models/WebSettings");
const customer_web_setting=async (req, res) => {
    try {
      console.log(req.body.customer_id)
      const {
        customer_id,
        favicon,
        squareLogo,
        landscapeLogo,
        organizationName,
        organizationPhone,
        organizationEmail,
        organizationAddress,
        city,
        postCode,
        stateCountry,
        countryRegion,
        subDomain,
        businesscategory
      } = req.body;
  
      // Validation
      if (!organizationName || !organizationEmail || !subDomain) {
        return res.status(400).json({
          message: 'Organization name, email, and subdomain are required',
        });
      }
  
      const newSettings = new WebSettings({
        customer_id,
        favicon,
        squareLogo,
        landscapeLogo,
        organizationName,
        organizationPhone,
        organizationEmail,
        organizationAddress,
        city,
        postCode,
        stateCountry,
        countryRegion,
        subDomain,
        businesscategory
        
      });
  
      const savedSettings = await newSettings.save();
      const update_user=await UserModel.findByIdAndUpdate({_id:customer_id},{$set:{  organizationName,
        organizationPhone,
        organizationEmail,
        organizationAddress,
        city,
        postCode,
        stateCountry,
        countryRegion,
        category:businesscategory,
        subDomain:`https://www.${subDomain}.weblesser.com`}});
      res.status(201).json({
        message: 'Web settings saved successfully',
        data: savedSettings,
      });
    } catch (error) {
      console.error('Error saving web settings:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
// -------------images-uplaod-------------------
const customer_image_uplaod= async (req, res) => {
  try {
      const file = req.file;
      console.log(req.file)
      if (!file) {
          return res.status(400).json({ message: 'No file uploaded' });
      }

      // Assuming user is authenticated and user ID is available in req.user
      const user = await UserModel.findById(req.params.id); 
      if (!user) {
          return res.status(400).json({ message: 'User not found' });
      }

      // Save file path to the database (assuming you want to save it in user model)
      const imagePath = path.join('uploads', user._id.toString(), file.filename);

      // You can save this image path in the user's model or wherever necessary
      user.uploadedImages.push(file.filename);
      await user.save();

      res.status(200).json({
          message: 'Image uploaded successfully',
          imagePath: file.filename
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
  }
};
const customer_images=async (req, res) => {
    try {
      console.log(req.params)
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Images fetched successfully',
        images: user.uploadedImages
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
const customer_package= async (req, res) => {
    const { userId, package } = req.body;
    console.log(req.body)
    if (!userId || !package) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    // const pkg = packageDetails[package];
  
    // if (!pkg) {
    //   return res.status(400).json({ error: "Invalid package selected" });
    // }
  
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
        selectedPackagename:package.name,
          selectedPackage: {
            ...package,
            purchaseDate: new Date(),
            active_package:false
          }
        },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.json({
        message: "Package added successfully",
        user: updatedUser,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
};
const customer_selected_package=async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserModel.findById(userId).select('selectedPackage');
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user.selectedPackage);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
};
module.exports={customer_web_setting,customer_image_uplaod,customer_images,customer_package,customer_selected_package}