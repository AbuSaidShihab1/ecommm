const express = require('express');
const Imageuploadroute = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const Adminmodel = require('../Models/superadmin/Adminmodel');
const ImageModel = require('../Models/ImageModel ');

// Configure Multer for image upload
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
        const user = await Adminmodel.findById(req.params.id); // Get user
        console.log(file);
        if (!user) {
            return cb(new Error('User not found'), false);
        }

        // Convert user._id to string for the path
        const userIdString = user._id.toString();  // Ensure _id is a string
        // Save in public/uploads/username
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

Imageuploadroute.get('/admin-images/:id', async (req, res) => {
    try {
        console.log(req.params)
        const user = await Adminmodel.findById(req.params.id);
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
});

Imageuploadroute.post('/admin-library-image/:id', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        console.log("okkkk")
        console.log(req.file);
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await Adminmodel.findById(req.params.id); 
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Save file path to the database (assuming you want to save it in user model)
        const imagePath = path.join('uploads', user._id.toString(), file.filename);

        user.uploadedImages.push(file.filename);
        await user.save();

        res.status(200).json({
            message: 'Image uploaded successfully',
            imagePath: file.filename
        });
    } catch (error) {
        console.error(error);
        res.json({ message: 'Server error' });
    }
});


Imageuploadroute.post('/admin-upload-image/:id', upload.single('image'), async (req, res) => {
    try {
        const file = req.file;
        console.log(req.file)
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const admin = await Adminmodel.findById(req.params.id);
        if (!admin) {
            return res.status(400).json({ message: 'Admin user not found' });
        }

        const imageSizeInKB = file.size / 1024;
        const imageSizeInBytes = file.size;

        // Create a new image document
        const newImage = new ImageModel({
            userId: req.params.id,
            imageUrl: `/uploads/${file.filename}`,
            file_name: file.filename,
            size: `${imageSizeInKB.toFixed(2)} KB`,
            type: file.mimetype,
            title: req.body.title || '',
            author: admin.email || 'Unknown',
            authorizedBy: admin.email || 'Admin',
        });

        await newImage.save();

        // Update storage usage
        admin.imagessize += imageSizeInBytes;
        admin.totalstorage += imageSizeInBytes;

        // Save filename for reference
        admin.uploadedImages.push(file.filename);
        await admin.save();

        res.status(200).json({
            message: 'Image uploaded and saved successfully',
            image: newImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

Imageuploadroute.get('/admin-library-images/:id', async (req, res) => {
    try {
        console.log(req.params)
        const images = await ImageModel.find({userId:req.params.id});
        if (!images) {
          return res.status(404).json({ message: 'images not found' });
        }
    
        res.status(200).json({
          message: 'Images fetched successfully',
          images: images,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
});

module.exports = Imageuploadroute;
