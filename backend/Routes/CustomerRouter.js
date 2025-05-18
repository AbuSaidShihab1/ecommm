const express = require('express');
const CustomerRouter = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const WebSettings = require('../Models/WebSettings');
const UserModel = require('../Models/User');
const { customer_web_setting, customer_image_uplaod, customer_images, customer_package, customer_selected_package } = require('../Controllers/Customercontroller');
const Checkoutmodel = require('../Models/Checkoutmodel');
const ImageModel = require('../Models/ImageModel ');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
        const user = await UserModel.findById(req.params.id); // Get user
        console.log(user)
        if (!user) {
            return cb(new Error('User not found'), false);
        }

        // Save in public/uploads/username
        const userIdString = user._id.toString();  // Ensure _id is a string
        const uploadDir = path.join(__dirname, '../public/uploads', userIdString);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        cb(null, uploadDir);
    } catch (error) {
        cb(error, false);
    }
},
  filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
// POST /api/web-settings
CustomerRouter.post('/web-settings', customer_web_setting);
CustomerRouter.post('/upload-image/:id', upload.single('image'),async (req, res) => {
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
});
CustomerRouter.put('/update-image/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const updateData = req.body; // This can contain title, description, alt_text, etc.

    // Find the image by ID
    const image = await ImageModel.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Update the image fields
    if (updateData.title) image.title = updateData.title;
    if (updateData.description) image.description = updateData.description;
    if (updateData.alt_text) image.alt_text = updateData.alt_text;
    if (updateData.authorized) image.authorized = updateData.authorized;
    
    // Update metadata
    image.updateBy = req.user?.id || 'system'; // Assuming you have user info
    image.updateDate = Date.now();
    image.updatedAt = Date.now();

    await image.save();

    res.status(200).json({
      message: 'Image updated successfully',
      image
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
CustomerRouter.delete('/delete-image/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;

    // Find and delete the image
    const image = await ImageModel.findByIdAndDelete(imageId);
    if (!image) {
      return res.json({success:false, message: 'Image not found' });
    }

    // Optional: Also remove the image file from storage
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join('uploads', image.userId.toString(), image.file_name);
    
    fs.unlink(filePath, (err) => {
      if (err) console.error('Error deleting file:', err);
    });

    // Optional: Remove reference from user's uploadedImages array
    await UserModel.findByIdAndUpdate(image.userId, {
      $pull: { uploadedImages: image.file_name }
    });

    res.status(200).json({
      success:true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
CustomerRouter.get('/user-images/:id',customer_images);
// @access  Public or Protected (add auth if needed)
CustomerRouter.post("/purchase-package",customer_package);
// GET: Selected Package by User ID
CustomerRouter.get('/selected-package/:id',customer_selected_package);
// ------------update-package-----------
CustomerRouter.put('/update-package', async (req, res) => {
  const { userId, selectedDuration, selectedTotalPrice } = req.body;

  try {
    console.log(selectedDuration)
    await UserModel.findByIdAndUpdate(userId, {
      selectedDuration,
      selectedTotalPrice
    });
    res.status(200).json({ message: 'User package updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user package.' });
  }
});
// Route to handle checkout form submission
// POST /customer/checkout
CustomerRouter.post("/checkout", async (req, res) => {
  try {
    const {
      user_id,
      firstName,
      lastName,
      email,
      company,
      phone,
      address1,
      address2,
      city,
      zip,
      state,
      country,
      saveInfo,
      paymentMethod,
      selectedPlan,
      totalPrice,
      totalMonths,
      totaldiscount,
      availableCredits,
      transactionId,
      accountNumber,
      agentNumber,
      reference,
      dueDate,
      createBy,
      publishBy
    } = req.body;

    // Validation
    const requiredFields = [
     "firstName", "lastName", "email", "company", "phone",
      "address1", "address2", "city", "zip", "state", "country",
      "paymentMethod", "selectedPlan", "totalPrice", "totalMonths", "transactionId", "accountNumber", "createBy", "publishBy"
    ];
    const match_user=await UserModel.findById({_id:user_id})
    for (const field of requiredFields) {
      if (!req.body[field] || req.body[field].toString().trim() === "") {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

// Generate a unique 8-character invoice ID
const generateInvoiceId = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let id = '';
  for (let i = 0; i < 8; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${id}`;
};
const invoiceId = generateInvoiceId();

const user_data = await UserModel.findById({_id:user_id});

    // Create checkout document
    const checkout = new Checkoutmodel({
      profile_pic:user_data.profile_pic,
      user_id,
      invoiceId,
      dueDate,
      reference,
      firstName,
      lastName,
      email,
      company,
      phone,
      address1,
      address2,
      city,
      zip,
      state,
      country,
      saveInfo,
      selectedPlan,
      totalPrice,
      totalMonths,
      totaldiscount: totaldiscount || 0,
      walletDetails: {
        transactionId,
        accountNumber,
        agentNumber,
        paymentMethod,
      },
      createBy:match_user.firstName,
      publishBy:match_user.firstName,
 
    });
    console.log(req.body.user_id)

    await checkout.save();

    // Update user credits
    const user = await UserModel.findById({_id:user_id});
    if (user) {
      user.availableCredits = availableCredits;
      await user.save();
    }
    console.log(req.body.user_id)

    res.status(201).json({ message: "Checkout successful", checkout });
  } catch (error) {
    console.error("Error during checkout submission:", error);
    res.status(500).json({ message: "Something went wrong. Please try again." });
  }
});
module.exports = CustomerRouter;