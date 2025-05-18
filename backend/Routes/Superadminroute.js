const express = require('express');
const UserModel = require('../Models/User');
const Creditmodel = require('../Models/superadmin/Creditmodel');
const PricePlanmodel = require('../Models/superadmin/PricePlanmodel');
const Adminmodel = require('../Models/superadmin/Adminmodel');
const Couponmodel = require('../Models/superadmin/Couponmodel');
const CheckoutModel = require('../Models/Checkoutmodel');
const Categorymodel = require('../Models/superadmin/Categorymodel');
const Countrymodel = require('../Models/superadmin/Countrymodel');
const Languagemodel = require('../Models/superadmin/Langugaemodel');
const Timezonemodel = require('../Models/superadmin/Timezonemodel');
const Timeformatmodel = require('../Models/superadmin/Timeformatmodel');
const Dateformatmodel = require('../Models/superadmin/Dateformatmodel');
const Superadminrouter = express.Router();
const userController=require("../Controllers/userController");
const authMiddleware=require("../Middlewares/authMiddleware");
const Userrolemodel = require('../Models/Userrolemodel');
const Customeruser = require('../Models/Customerusermodel');
const  Ticket= require('../Models/superadmin/Ticket');
const MainWebSettings = require('../Models/superadmin/Mainwebsettings');
const multer=require("multer")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ------------------------all-customer----------------------------
// ✅ CREATE a new customer
Superadminrouter.post('/customers', async (req, res) => {
    try {
      const newCustomer = new UserModel(req.body);
      await newCustomer.save();
      res.status(201).json({ success: true, message: 'Customer created successfully', data: newCustomer });
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ success: false, message: 'Error creating customer', error: error.message });
    }
  });
  
  // ✅ READ all customers
  Superadminrouter.get('/customers', async (req, res) => {
    try {
      const customers = await UserModel.find();
      console.log(customers)
      res.status(200).json({ success: true, data: customers });
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ success: false, message: 'Server Error' });
    }
  });
  
  // ✅ UPDATE a customer by ID
  Superadminrouter.put('/customers/:id', async (req, res) => {
    try {
      const updatedCustomer = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.status(200).json({ success: true, message: 'Customer updated successfully', data: updatedCustomer });
    } catch (error) {
      console.error('Error updating customer:', error);
      res.status(500).json({ success: false, message: 'Error updating customer', error: error.message });
    }
  });
  
  // ✅ DELETE a customer by ID
  Superadminrouter.delete('/customers/:id', async (req, res) => {
    try {
      const deletedCustomer = await UserModel.findByIdAndDelete(req.params.id);
      if (!deletedCustomer) {
        return res.status(404).json({ success: false, message: 'Customer not found' });
      }
      res.status(200).json({ success: true, message: 'Customer deleted successfully' });
    } catch (error) {
      console.error('Error deleting customer:', error);
      res.status(500).json({ success: false, message: 'Error deleting customer', error: error.message });
    }
  });
  // ✅ UPDATE customer's status by ID
Superadminrouter.patch('/customers/:id/status', async (req, res) => {
  try {
    const { status } = req.body;

    if (typeof status === 'undefined') {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedCustomer = await UserModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }

    res.status(200).json({ success: true, message: 'Customer status updated successfully', data: updatedCustomer });
  } catch (error) {
    console.error('Error updating customer status:', error);
    res.status(500).json({ success: false, message: 'Error updating customer status', error: error.message });
  }
});

// ------------------------all-customer----------------------------
// -------------credit0-cost-plan----------------------------
Superadminrouter.post('/create-costplan', async function (req, res) {
  try {
    var inputData = req.body;

    var groupedData = {
      Pages: {},
      Contents: {},
      Products: {},
      UploadLibrary: {},
      Appearance: {},
      Setting: {},
      Users: {},
      SupportTicket: {}
    };

    // Group input values into sections
    for (var key in inputData) {
      if (["New Page"].includes(key)) {
        groupedData.Pages[key] = inputData[key];
      } else if (["New Post", "New Post Category", "New Post Tag", "New Comment"].includes(key)) {
        groupedData.Contents[key] = inputData[key];
      } else if ([ 
        "New Product", "New Category", "New Tag", "New Brand", "New Review",
        "New Coupon", "New Order", "New Delivery", "New Customer", "Setting"
      ].includes(key)) {
        groupedData.Products[key] = inputData[key];
      } else if (["New Library"].includes(key)) {
        groupedData.UploadLibrary[key] = inputData[key];
      } else if (["Themes", "Web Menus", "Install Plugins"].includes(key)) {
        groupedData.Appearance[key] = inputData[key];
      } else if (["App Integration", "Apps Generator"].includes(key)) {
        groupedData.Setting[key] = inputData[key];
      } else if (["New User", "New User Role"].includes(key)) {
        groupedData.Users[key] = inputData[key];
      } else if (["New Tickets"].includes(key)) {
        groupedData.SupportTicket[key] = inputData[key];
      }
    }

    // Check if a cost plan already exists
    let existingCostPlan = await Creditmodel.findOne();

    if (existingCostPlan) {
      // If it exists, update the existing document
      existingCostPlan.Pages = groupedData.Pages;
      existingCostPlan.Contents = groupedData.Contents;
      existingCostPlan.Products = groupedData.Products;
      existingCostPlan.UploadLibrary = groupedData.UploadLibrary;
      existingCostPlan.Appearance = groupedData.Appearance;
      existingCostPlan.Setting = groupedData.Setting;
      existingCostPlan.Users = groupedData.Users;
      existingCostPlan.SupportTicket = groupedData.SupportTicket;

      const updatedCostPlan = await existingCostPlan.save();

      return res.status(200).json({
        success: true,
        message: "Cost Plan updated successfully",
        data: updatedCostPlan
      });
    } else {
      // If it does not exist, create a new document
      const newCostPlan = new Creditmodel(groupedData);
      const savedCostPlan = await newCostPlan.save();

      return res.status(201).json({
        success: true,
        message: "Cost Plan created successfully",
        data: savedCostPlan
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});
Superadminrouter.get('/costplan', async function (req, res) {
  try {
    // Find the cost plan
    let existingCostPlan = await Creditmodel.findOne();

    if (existingCostPlan) {
      return res.status(200).json({
        success: true,
        message: "Cost Plan fetched successfully",
        data: existingCostPlan
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No cost plan found"
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message
    });
  }
});

// -------------------price-plan----------------------------
// Create a new price plan
Superadminrouter.post('/new-price-plan', async (req, res) => {
  try {
    const {
      name,
      note,
      price,
      credits,
      mediaSize,
      traffic,
      technologies,
      supports,
      description,
      image,
      admin_id
    } = req.body;

    console.log(req.body);

    // Basic validation
    if (!admin_id || !name || !note || !price || !credits || !mediaSize || !traffic || !description) {
      return res.status(400).json({ 
        success: false,
        message: 'All required fields must be provided' 
      });
    }
     const admin_info=await Adminmodel.findById({_id:admin_id})
    // Create new price plan
    const newPricePlan = new PricePlanmodel({
      adminId:admin_id, // Assuming admin info is attached to request
      name,
      note,
      price: parseFloat(price),
      credits: parseInt(credits),
      mediaSize,
      traffic,
      technologies: technologies || [],
      supports: supports || [],
      description,
      image: image || '',
      createBy: admin_info.email, // The admin creating the plan
      createDate: Date.now(), // Set the creation date
      publishBy: admin_info.email, // Assuming publishBy is the same as createBy
      publishDate: Date.now(), // Set the publish date
    });

    // Save to database
    const savedPricePlan = await newPricePlan.save();

    res.status(201).json({
      success: true,
      message: 'Price plan created successfully',
      data: savedPricePlan
    });

  } catch (error) {
    console.error('Error creating price plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
// --------------------all-price-plan--------------------
Superadminrouter.get('/price-plans', async (req, res) => {
  try {
    const pricePlans = await PricePlanmodel.find();

    res.status(200).json({
      success: true,
      message: 'Price plans fetched successfully',
      data: pricePlans
    });
  } catch (error) {
    console.error('Error fetching price plans:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
// ------------single-price-plan----------------------------
Superadminrouter.get('/price-plan/:id', async (req, res) => {
  try {
    const pricePlan = await PricePlanmodel.findById(req.params.id);

    if (!pricePlan) {
      return res.status(404).json({
        success: false,
        message: 'Price plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Price plan fetched successfully',
      data: pricePlan
    });
  } catch (error) {
    console.error('Error fetching price plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
// ---------------------update-price-plan-------------------------
Superadminrouter.put('/update-price-plan/:id', async (req, res) => {
  try {
    const {
      name,
      note,
      price,
      credits,
      mediaSize,
      traffic,
      technologies,
      supports,
      description,
      image,
      admin_id
    } = req.body;

    // Basic validation
    if (!name || !note || !price || !credits || !mediaSize || !traffic || !description) {
      return res.status(400).json({ 
        success: false,
        message: 'All required fields must be provided' 
      });
    }

    const admin_info = await Adminmodel.findById(admin_id);
    if (!admin_info) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Find the price plan by ID
    const pricePlan = await PricePlanmodel.findById(req.params.id);

    if (!pricePlan) {
      return res.status(404).json({
        success: false,
        message: 'Price plan not found'
      });
    }

    // Update fields
    pricePlan.name = name;
    pricePlan.note = note;
    pricePlan.price = parseFloat(price);
    pricePlan.credits = parseInt(credits);
    pricePlan.mediaSize = mediaSize;
    pricePlan.traffic = traffic;
    pricePlan.technologies = technologies || [];
    pricePlan.supports = supports || [];
    pricePlan.description = description;
    pricePlan.image = image || '';
    pricePlan.updateBy = admin_info.email;
    pricePlan.updateDate = Date.now();

    // Save updated price plan
    const updatedPricePlan = await pricePlan.save();

    res.status(200).json({
      success: true,
      message: 'Price plan updated successfully',
      data: updatedPricePlan
    });
  } catch (error) {
    console.error('Error updating price plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
// --------------delete-price-plan-------------------
Superadminrouter.delete('/delete-price-plan/:id', async (req, res) => {
  try {
    const pricePlan = await PricePlanmodel.findByIdAndDelete(req.params.id);

    if (!pricePlan) {
      return res.status(404).json({
        success: false,
        message: 'Price plan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Price plan deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting price plan:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});
// ---------------------update-price-plan-status-------------------------
Superadminrouter.put('/price-plan-status/:id', async (req, res) => {
  try {
    const { status, admin_id } = req.body;

    if (!status || !admin_id) {
      return res.status(400).json({
        success: false,
        message: 'Status and admin_id are required'
      });
    }

    // Validate admin
    const admin_info = await Adminmodel.findById(admin_id);
    if (!admin_info) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Find price plan
    const pricePlan = await PricePlanmodel.findById(req.params.id);
    if (!pricePlan) {
      return res.status(404).json({
        success: false,
        message: 'Price plan not found'
      });
    }

    // Update status
    pricePlan.status = status;
    pricePlan.statusUpdateBy = admin_info.email;
    pricePlan.statusUpdateDate = Date.now();

    await pricePlan.save();

    res.status(200).json({
      success: true,
      message: 'Price plan status updated successfully',
      data: pricePlan
    });

  } catch (error) {
    console.error('Error updating price plan status:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// POST route to create a new coupon
Superadminrouter.post('/coupons', async (req, res) => {
  try {
    const {
      couponCode,
      description,
      discountType,
      couponAmount,
      allowFreeShipping,
      startDate,
      expiryDate,
      minSpend,
      maxSpend,
      individualUseOnly,
      excludeSaleItems,
      usageLimitPerCoupon,
      usageLimitPerUser ,
      usageLimitPerDay,
      status,
      visibility,
      publishedDate,
      password,
      packages,
      excludePackages,
      admin_id
    } = req.body;
    console.log(req.body)
    const admin_info=await Adminmodel.findById({_id:admin_id})

    // Create a new coupon instance
    const newCoupon = new Couponmodel({
      couponCode,
      description,
      discountType,
      couponAmount,
      allowFreeShipping,
      startDate,
      expiryDate,
      minSpend,
      maxSpend,
      individualUseOnly,
      excludeSaleItems,
      usageLimitPerCoupon,
      usageLimitPerUser ,
      usageLimitPerDay,
      visibility:status,
      publishedDate,
      password,
      authorized:visibility,
      packages,
      excludePackages,
      createBy: admin_info.email, // The admin creating the plan
      createDate: Date.now(), // Set the creation date
      authorizedBy: admin_info.email, // Assuming publishBy is the same as createBy
      authorizedDate: Date.now(), // Set the publish date
    });

    // Save the coupon to the database
    const savedCoupon = await newCoupon.save();

    // Respond with the created coupon
    res.status(201).json(savedCoupon);
  } catch (error) {
    console.error('Error creating coupon:', error);
    res.status(500).json({ message: 'Failed to create coupon. Please try again.', error: error.message });
  }
});
// GET route to retrieve all coupons
Superadminrouter.get('/coupons', async (req, res) => {
  try {
    const coupons = await Couponmodel.find();
    res.status(200).json({success:true,coupons});
    console.log(coupons)
  } catch (error) {
    console.error('Error fetching coupons:', error);
    res.status(500).json({ message: 'Failed to fetch coupons. Please try again.', error: error.message });
  }
});

// GET route to retrieve a single coupon by ID
Superadminrouter.get('/coupons/:id', async (req, res) => {
  try {
    const coupon = await Couponmodel.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    console.error('Error fetching coupon:', error);
    res.status(500).json({ message: 'Failed to fetch coupon. Please try again.', error: error.message });
  }
});

// PUT route to update a coupon by ID
Superadminrouter.put('/coupons/:id', async (req, res) => {
  try {
    const updatedCoupon = await Couponmodel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json(updatedCoupon);
  } catch (error) {
    console.error('Error updating coupon:', error);
    res.status(500).json({ message: 'Failed to update coupon. Please try again.', error: error.message });
  }
});

// DELETE route to delete a coupon by ID
Superadminrouter.delete('/coupons/:id', async (req, res) => {
  try {
    const deletedCoupon = await Couponmodel.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    console.error('Error deleting coupon:', error);
    res.status(500).json({ message: 'Failed to delete coupon. Please try again.', error: error.message });
  }
})

// ---------------------------------checkout------------------------------
Superadminrouter.get("/checkout", async (req, res) => {
  try {
    const checkouts = await CheckoutModel.find().sort({ createdAt: -1 });
    res.status(200).json(checkouts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch checkouts." });
  }
});
Superadminrouter.get("/checkout/:id", async (req, res) => {
  try {
    const checkout = await CheckoutModel.findById(req.params.id);
    console.log(checkout)
    if (!checkout) {
      return res.json({ message: "Checkout not found" });
    }
    res.status(200).json(checkout);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch checkout." });
  }
});
Superadminrouter.put("/checkout/:id", async (req, res) => {
  try {
    const updatedCheckout = await CheckoutModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    res.status(200).json({ message: "Checkout updated", updatedCheckout });
  } catch (error) {
    res.status(500).json({ message: "Failed to update checkout." });
  }
});
Superadminrouter.delete("/checkout/:id", async (req, res) => {
  try {
    const deletedCheckout = await CheckoutModel.findByIdAndDelete(req.params.id);

    if (!deletedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    res.status(200).json({ message: "Checkout deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete checkout." });
  }
});
Superadminrouter.patch("/checkout/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    const updatedCheckout = await CheckoutModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedCheckout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    res.status(200).json({ message: "Status updated", updatedCheckout });
  } catch (error) {
    res.status(500).json({ message: "Failed to update status." });
  }
});


// @route   POST /api/categories
// @desc    Create a new category
// @access  Private/Admin
Superadminrouter.post('/categories', async (req, res) => {
  try {
    const {admin_id, name, description, image, permissions } = req.body;
    
    // Check if category already exists
    let category = await Categorymodel.findOne({ name });
    const admin_info=await Adminmodel.findById({_id:admin_id})
    if (category) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }
    // Convert permissions array to map if needed
    const permissionsMap = {};
    if (Array.isArray(permissions)) {
      permissions.forEach(module => {
        permissionsMap[module] = true;
      });
    } else if (typeof permissions === 'object') {
      Object.assign(permissionsMap, permissions);
    }
    console.log(req.body)
    category = new Categorymodel({
      name,
      description,
      image,
      permissions: permissionsMap,
      createBy:admin_info.email,
      publishBy:admin_info.email,
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/categories/draft
// @desc    Save category as draft
// @access  Private/Admin
Superadminrouter.post('/categories/draft', async (req, res) => {
  try {
    const { name, description, image, permissions } = req.body;
    
    const category = new Categorymodel({
      name,
      description,
      image,
      permissions,
      status: 'draft',
      createdBy: req.user.id
    });

    await category.save();

    res.status(201).json({
      success: true,
      message: 'Category draft saved successfully',
      data: category
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
Superadminrouter.get('/categories', async (req, res) => {
  try {
    const categories = await Categorymodel.find()
      .sort({ createdAt: -1 })

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/categories/:id
// @desc    Get category by ID
// @access  Public
Superadminrouter.get('/categories/:id',authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const category = await Categorymodel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({
      success: true,
      data: category
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
Superadminrouter.put('/categories/:id',authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { name, description, image, permissions, status } = req.body;

    const category = await Categorymodel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        image,
        permissions,
        status,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!category) {
      return res.status(404).json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
Superadminrouter.delete('/category/:id',  async (req, res) => {
  try {
    console.log(req.params.id)
    const category = await Categorymodel.findByIdAndDelete(req.params.id );

    if (!category) {
      return res.json({ 
        success: false, 
        message: 'Category not found' 
      });
    }

    res.json({
      success: true,
      message: 'Category archived successfully',
      data: category
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/categories/search?q=
// @desc    Search categories
// @access  Public
Superadminrouter.get('/categories/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }

    const categories = await Categorymodel.find({
      $text: { $search: query },
      status: 'active'
    })
    .sort({ score: { $meta: "textScore" } })
    .limit(10);

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// @route   PATCH /api/categories/:id/status
// @desc    Update category status
// @access  Private/Admin
Superadminrouter.patch('/categories/:id/status', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { status } = req.body;

    // Check if status is provided
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required'
      });
    }

    // Update only the status field
    const category = await Categorymodel.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.json({
      success: true,
      message: 'Category status updated successfully',
      data: category
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// =============================country-route=======================================
// @route   POST /api/countries
// @desc    Create a new country
// @access  Private/Admin
Superadminrouter.post('/country',async (req, res) => {
  const { countryName, description, status, visibility,image,admin_id} = req.body;
  
  // Check if image was uploaded
  console.log(req.body)
  // Check if country already exists
  const countryExists = await Countrymodel.findOne({ countryName });
  const match_amdin=await Adminmodel.findById({_id:admin_id})
  if (countryExists) {
    res.status(400);
    throw new Error('Country already exists');
  }

  const country = await Countrymodel.create({
    countryName,
    description,
    image,
    visibility:status,
    authorized:visibility,
    createdBy: match_amdin.email,
    authorizedBy:match_amdin.email,
  })

  res.status(201).json({
    success: true,
    data: country
  });
});

// @route   GET /api/countries
// @desc    Get all countries
// @access  Public
Superadminrouter.get('/countries', async (req, res) => {
  const countries = await Countrymodel.find().sort({ createdAt: -1 });
  console.log("countries")
  res.status(200).json({
    success: true,
    count: countries.length,
    data: countries
  });
});
// @route   GET /api/countries/:id
// @desc    Get single country
// @access  Public
Superadminrouter.get('/country/:id',async (req, res) => {
  const country = await Countrymodel.findById(req.params.id);

  if (!country) {
    res.send('Country not found');
  }

  res.status(200).json({
    success: true,
    data: country
  });
});

// @route   PUT /api/countries/:id
// @desc    Update country
// @access  Private/Admin
Superadminrouter.put('/country/:id',async (req, res) => {
  let country = await Countrymodel.findById(req.params.id);

  if (!country) {
    res.status(404);
    throw new Error('Country not found');
  }

  const { countryName, description, status, visibility, publishedDate } = req.body;
  
  // Check if country name is being updated and if it already exists
  if (countryName && countryName !== country.countryName) {
    const countryExists = await Countrymodel.findOne({ countryName });
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

  country = await Countrymodel.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: country
  });
});

// @route   DELETE /api/countries/:id
// @desc    Delete country
// @access  Private/Admin
Superadminrouter.delete('/delete-country/:id', async (req, res) => {
  const country = await Countrymodel.findByIdAndDelete(req.params.id);


  res.status(200).json({
    success: true,
    message: 'Country deleted successfully'
  });
});


// =================================language=======================================
Superadminrouter.post('/langugae',async (req, res) => {
  const { languageName, description, status, visibility,image,admin_id} = req.body;
  
  // Check if image was uploaded
  console.log(req.body)
  // Check if country already exists
  const lanugaeExists = await Languagemodel.findOne({ languageName });
  const match_amdin=await Adminmodel.findById({_id:admin_id})
  if (lanugaeExists) {
    res.send({success:false,message:"Language already exists"});
  }

  const language = await Languagemodel.create({
    languageName,
    description,
    image,
    visibility:status,
    authorized:visibility,
    createdBy: match_amdin.email,
    authorizedBy:match_amdin.email,
  })

  res.status(201).json({
    success: true,
    data: language,
    message:"Language created successfully!"
  });
});
Superadminrouter.get('/languges', async (req, res) => {
  const languges = await Languagemodel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: languges.length,
    data: languges
  });
});
Superadminrouter.put('/language/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { languageName, description, status, visibility, image, admin_id } = req.body;
    
    // Find admin who is updating
    const match_admin = await Adminmodel.findById({_id: admin_id});
    if (!match_admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found"
      });
    }

    const updatedLanguage = await Languagemodel.findByIdAndUpdate(
      id,
      {
        languageName,
        description,
        image,
        status,
        visibility,
        updateBy: match_admin.email,
        updateDate: Date.now(),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!updatedLanguage) {
      return res.status(404).json({
        success: false,
        message: "Language not found"
      });
    }

    res.status(200).json({
      success: true,
      data: updatedLanguage,
      message: "Language updated successfully!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
Superadminrouter.delete('/language/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLanguage = await Languagemodel.findByIdAndDelete(id);

    if (!deletedLanguage) {
      return res.status(404).json({
        success: false,
        message: "Language not found"
      });
    }

    res.status(200).json({
      success: true,
      data: deletedLanguage,
      message: "Language deleted successfully!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
Superadminrouter.get('/language/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const language = await Languagemodel.findById(id);
 console.log(language)
    if (!language) {
      return res.status(404).json({
        success: false,
        message: "Language not found"
      });
    }

    res.status(200).json({
      success: true,
      data: language
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});
// =============================time-zone-=================================
Superadminrouter.post('/timezone',async (req, res) => {
  const { timezoneName, description, status, visibility,admin_id} = req.body;
  
  // Check if image was uploaded
  console.log(req.body)
  // Check if country already exists
  const timezoneExist = await Timezonemodel.findOne({ timezoneName });
  const match_amdin=await Adminmodel.findById({_id:admin_id})
  if (timezoneExist) {
    res.send({success:false,message:"Timezone already exists"});
  }

  const timezone = await Timezonemodel.create({
    timezoneName,
    description,
    visibility:status,
    authorized:visibility,
    createdBy: match_amdin.email,
    authorizedBy:match_amdin.email,
  })

  res.status(201).json({
    success: true,
    data: timezone,
    message:"Timezone created successfully!"
  });
});
Superadminrouter.get('/timezone', async (req, res) => {
  const timezone = await Timezonemodel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: timezone.length,
    data: timezone
  });
});
Superadminrouter.get('/timezone/:id', async (req, res) => {
  try {
    const timezone = await Timezonemodel.findById(req.params.id);
  console.log(req.params)
    if (!timezone) {
      return res.json({
        success: false,
        message: 'Timezone not found'
      });
    }

    res.status(200).json({
      success: true,
      data: timezone
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.put('/timezone/:id', async (req, res) => {
  try {
    const { timezoneName, description, status, visibility, admin_id } = req.body;
    const match_admin = await Adminmodel.findById({_id: admin_id});

    const updateData = {
      timezoneName,
      description,
      status,
      visibility,
      updateBy: match_admin.email,
      updateDate: Date.now()
    };

    const timezone = await Timezonemodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!timezone) {
      return res.status(404).json({
        success: false,
        message: 'Timezone not found'
      });
    }

    res.status(200).json({
      success: true,
      data: timezone,
      message: 'Timezone updated successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.delete('/timezone/:id', async (req, res) => {
  try {
    const timezone = await Timezonemodel.findByIdAndDelete(req.params.id);

    if (!timezone) {
      return res.status(404).json({
        success: false,
        message: 'Timezone not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {},
      message: 'Timezone deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
// =============================time-format-=================================
Superadminrouter.post('/timeformat',async (req, res) => {
  const { timeformat, description, status, visibility,admin_id} = req.body;
  
  // Check if image was uploaded
  console.log(req.body)
  // Check if country already exists
  const timeformatExist = await Timeformatmodel.findOne({ timeformat });
  const match_amdin=await Adminmodel.findById({_id:admin_id})
  if (timeformatExist) {
    res.send({success:false,message:"Timeformat already exists"});
  }

  const newtimeformat = await Timeformatmodel.create({
    timeformat,
    description,
    visibility:status,
    authorized:visibility,
    createdBy: match_amdin.email,
    authorizedBy:match_amdin.email,
  })

  res.status(201).json({
    success: true,
    data: newtimeformat,
    message:"Timeformat created successfully!"
  });
});
Superadminrouter.get('/timeformat', async (req, res) => {
  const timeformat = await Timeformatmodel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: timeformat.length,
    data: timeformat
  });
});
Superadminrouter.get('/timeformat/:id', async (req, res) => {
  try {
    const timeformat = await Timeformatmodel.findById(req.params.id);
    
    if (!timeformat) {
      return res.json({
        success: false,
        message: 'Timeformat not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: timeformat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.put('/timeformat/:id', async (req, res) => {
  try {
    const { timeformat, description, status, visibility, admin_id } = req.body;
    const match_admin = await Adminmodel.findById({_id: admin_id});
    
    const updatedData = {
      timeformat,
      description,
      status,
      visibility,
      updateBy: match_admin.email,
      updateDate: Date.now()
    };
    
    const updatedTimeformat = await Timeformatmodel.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true, runValidators: true }
    );
    
    if (!updatedTimeformat) {
      return res.status(404).json({
        success: false,
        message: 'Timeformat not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedTimeformat,
      message: 'Timeformat updated successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.delete('/timeformat/:id', async (req, res) => {
  try {
    const timeformat = await Timeformatmodel.findByIdAndDelete(req.params.id);
    
    if (!timeformat) {
      return res.status(404).json({
        success: false,
        message: 'Timeformat not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Timeformat deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
// =============================date-format-=================================
Superadminrouter.post('/dateformat',async (req, res) => {
  const { dateformat, description, status, visibility,admin_id} = req.body;
  
  // Check if image was uploaded
  console.log(req.body)
  // Check if country already exists
  const dateformatExist = await Dateformatmodel.findOne({ dateformat });
  const match_amdin=await Adminmodel.findById({_id:admin_id})
  if (dateformatExist) {
    res.send({success:false,message:"Dateformat already exists"});
  }

  const newdateformat = await Dateformatmodel.create({
    dateformat,
    description,
    visibility:status,
    authorized:visibility,
    createdBy: match_amdin.email,
    authorizedBy:match_amdin.email,
  })

  res.status(201).json({
    success: true,
    data: newdateformat,
    message:"Dateformat created successfully!"
  });
});
Superadminrouter.get('/dateformat', async (req, res) => {
  const dateformat = await Dateformatmodel.find().sort({ createdAt: -1 });
  res.status(200).json({
    success: true,
    count: dateformat.length,
    data: dateformat
  });
});
Superadminrouter.get('/dateformat/:id', async (req, res) => {
  try {
    const dateformat = await Dateformatmodel.findById(req.params.id);
    
    if (!dateformat) {
      return res.json({
        success: false,
        message: 'Date format not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: dateformat
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.put('/dateformat/:id', async (req, res) => {
  try {
    const { dateformat, description, status, visibility, admin_id } = req.body;
    const match_admin = await Adminmodel.findById({_id: admin_id});
    
    if (!match_admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }
    
    const updatedDateformat = await Dateformatmodel.findByIdAndUpdate(
      req.params.id,
      {
        dateformat,
        description,
        status,
        visibility,
        updateBy: match_admin.email,
        updateDate: Date.now()
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedDateformat) {
      return res.status(404).json({
        success: false,
        message: 'Date format not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedDateformat,
      message: 'Date format updated successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.delete('/dateformat/:id', async (req, res) => {
  try {
    const deletedDateformat = await Dateformatmodel.findByIdAndDelete(req.params.id);
    
    if (!deletedDateformat) {
      return res.status(404).json({
        success: false,
        message: 'Date format not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: {},
      message: 'Date format deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
Superadminrouter.get('/dateformat/status/:status', async (req, res) => {
  try {
    const dateformats = await Dateformatmodel.find({ status: req.params.status }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: dateformats.length,
      data: dateformats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});
// Get all users
Superadminrouter.get('/all-users', authMiddleware.protect, authMiddleware.admin, async (req, res, next) => {
    try {
      const users = await Customeruser.find().sort({ createdAt: -1 });
       console.log(users)
      res.status(200).json({
        success: true,
        count: users.length,
        data: users
      });
    } catch (error) {
      next(error);
    }
});
  // Create new user
Superadminrouter.post('/create-new-user', authMiddleware.protect, authMiddleware.admin, userController.createUser);
  
  // Get single user
  Superadminrouter.get('/single-user/:id', authMiddleware.protect, authMiddleware.admin,  async (req, res, next) => {
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
});
  
  // Update user
  Superadminrouter.put('/update-user/:id', authMiddleware.protect, authMiddleware.admin,  async (req, res, next) => {
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
  });
  
  // Delete user (soft delete)
  Superadminrouter.delete('/delete-user/:id', authMiddleware.protect, authMiddleware.admin, userController.deleteUser);

  // @access   Private
Superadminrouter.post('/create-user-role',authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { roleName, description, permissions,admin_id } = req.body;
    
    // Check if role already exists
    let userRole = await Userrolemodel.findOne({ roleName });
    if (userRole) {
      return res.status(400).json({ msg: 'Role already exists' });
    }
    const match_amdin=await Adminmodel.findById({_id:admin_id})

    userRole = new Userrolemodel({
      roleName,
      description,
      permissions: permissions || {},
      createdBy:match_amdin.email,
      authorizedBy:match_amdin.email
    });
    await userRole.save();
    res.json(userRole);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
Superadminrouter.get('/all-user-role', authMiddleware.protect, authMiddleware.admin, async (req, res, next) => {
  try {
    const usersrole = await Userrolemodel.find()
      .select('-password -customPermissions')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: usersrole.length,
      data: usersrole
    });
  } catch (error) {
    next(error);
  }
});
// Get single user role by ID
Superadminrouter.get('/user-role/:id', authMiddleware.protect, authMiddleware.admin, async (req, res, next) => {
  try {
    const userRole = await Userrolemodel.findById(req.params.id);
    
    if (!userRole) {
      return res.status(404).json({
        success: false,
        message: 'User role not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: userRole
    });
  } catch (error) {
    next(error);
  }
});

// Update user role
Superadminrouter.put('/update-user-role/:id', authMiddleware.protect, authMiddleware.admin, async (req, res, next) => {
  try {
    const { roleName, description, permissions, admin_id, status, visibility, authorized } = req.body;
    const match_admin = await Adminmodel.findById({_id: admin_id});

    const updateData = {
      roleName,
      description,
      permissions: permissions || {},
      updatedBy: match_admin.email,
      updatedAt: Date.now()
    };

    // Optional fields - only update if provided
    if (status) updateData.status = status;
    if (visibility) updateData.visibility = visibility;
    if (authorized) updateData.authorized = authorized;

    const updatedRole = await Userrolemodel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({
        success: false,
        message: 'User role not found'
      });
    }

    res.status(200).json({
      success: true,
      data: updatedRole
    });
  } catch (error) {
    next(error);
  }
});

// Delete user role
Superadminrouter.delete('/delete-user-role/:id', authMiddleware.protect, authMiddleware.admin, async (req, res, next) => {
  try {
    const deletedRole = await Userrolemodel.findByIdAndDelete(req.params.id);
    
    if (!deletedRole) {
      return res.json({
        success: false,
        message: 'User role not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'User role deleted successfully',
      data: deletedRole
    });
  } catch (error) {
    next(error);
  }
});
// ---------------------------upload-ticket------------------------------------------
// Create a new ticket
// Utility to generate a 6-character alphanumeric ticket ID
const generateTicketId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TKT-${timestamp}-${random}`;
};

const generateReplyId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `REP-${timestamp}-${random}`;
};
Superadminrouter.post('/create-ticket', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { accountHolder, shopName, email, subject, message, attachments, admin_id } = req.body;
    console.log(req.body);

    const match_amdin = await Adminmodel.findById({ _id: admin_id });

    const newTicket = new Ticket({
      ticket_id: generateTicketId(), // 👈 Add generated ticket_id
      profile_pic: match_amdin.profile_pic,
      accountHolder,
      shopName,
      email,
      subject,
      message,
      attachments,
      createdBy: match_amdin.email,
      authorizedBy: match_amdin.email,
    });

    await newTicket.save();

    res.status(201).json({
      success: true,
      message: 'Ticket created successfully',
      ticket: newTicket,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Error creating ticket',
      error: error.message,
    });
  }
});


// Save as draft
Superadminrouter.post('/create-ticket/draft', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { accountHolder, shopName, email, subject, message, attachments } = req.body;
    
    const newDraft = new Ticket({
      accountHolder,
      shopName,
      email,
      subject,
      message,
      attachments,
      adminId: req.admin._id,
      status: 'draft'
    });

    await newDraft.save();
    
    res.status(201).json({
      success: true,
      message: 'Draft saved successfully',
      ticket: newDraft
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error saving draft',
      error: error.message
    });
  }
});

// Get all tickets (with optional filtering)
Superadminrouter.get('/all-tickets', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });

    console.log(tickets)
    res.status(200).json({
      success: true,
      tickets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tickets',
      error: error.message
    });
  }
});

// Get a single ticket
Superadminrouter.get('/ticket-information/:id', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id,
    });
    
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }
    
    res.status(200).json({
      success: true,
      ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching ticket',
      error: error.message
    });
  }
});

// Update a ticket
Superadminrouter.put('/update-ticket/:id', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { accountHolder, shopName, email, subject, message, attachments, status } = req.body;
    
    const updatedTicket = await Ticket.findOneAndUpdate(
      { 
        _id: req.params.id,
        adminId: req.admin._id 
      },
      {
        accountHolder,
        shopName,
        email,
        subject,
        message,
        attachments,
        status,
        updatedAt: Date.now()
      },
      { new: true }
    );
    
    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Ticket updated successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating ticket',
      error: error.message
    });
  }
});

// Delete a ticket
Superadminrouter.delete('/delete-ticket/:id', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    console.log(req.params.id)
    const deletedTicket = await Ticket.findOneAndDelete({
      _id: req.params.id,
    });
    
    if (!deletedTicket) {
      return res.json({
        success: false,
        message: 'Ticket not found'
      });
    }
    
    // TODO: You might want to delete associated attachments here
    
    res.status(200).json({
      success: true,
      message: 'Ticket deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting ticket',
      error: error.message
    });
  }
});
Superadminrouter.post('/reply/:ticketId', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { message, attachments, admin_id } = req.body;
    const { ticketId } = req.params;
   console.log(req.body)
    // Find the admin who is replying
    const replyingAdmin = await Adminmodel.findById(admin_id);
    if (!replyingAdmin) {
      return res.json({
        success: false,
        message: 'Admin not found'
      });
    }

    // Create the reply object
    const newReply = {
      reply_id: generateReplyId(), // You'll need to implement this similar to ticket_id
      message,
      attachments: attachments || [],
      repliedBy: replyingAdmin.email,
      isAdminReply: true
    };

    // Update the ticket with the new reply
    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        $push: { replies: newReply },
        $set: { 
          status: 'Open',
          lastReply: Date.now(),
          updateBy: replyingAdmin.email,
          updateDate: Date.now()
        }
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Reply added successfully',
      ticket: updatedTicket
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error adding reply',
      error: error.message
    });
  }
});
Superadminrouter.get('/:ticketId/replies', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticketId)
      .select('replies')
      .sort({ 'replies.repliedAt': -1 });

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.status(200).json({
      success: true,
      replies: ticket.replies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching replies',
      error: error.message
    });
  }
});
Superadminrouter.put('/:ticketId/replies/:replyId', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { ticketId, replyId } = req.params;
    const { message, attachments, admin_id } = req.body;

    const updatingAdmin = await Adminmodel.findById(admin_id);
    if (!updatingAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    // Find the reply to update
    const replyToUpdate = ticket.replies.id(replyId);
    if (!replyToUpdate) {
      return res.status(404).json({
        success: false,
        message: 'Reply not found'
      });
    }

    // Update reply fields
    replyToUpdate.message = message || replyToUpdate.message;
    replyToUpdate.attachments = attachments || replyToUpdate.attachments;
    replyToUpdate.updatedBy = updatingAdmin.email;
    replyToUpdate.updatedAt = Date.now();

    // Update ticket's update fields
    ticket.updateBy = updatingAdmin.email;
    ticket.updateDate = Date.now();

    await ticket.save();

    res.status(200).json({
      success: true,
      message: 'Reply updated successfully',
      ticket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating reply',
      error: error.message
    });
  }
});
Superadminrouter.delete('/:ticketId/replies/:replyId', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const { ticketId, replyId } = req.params;
    const { admin_id } = req.body;

    const deletingAdmin = await Adminmodel.findById(admin_id);
    if (!deletingAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      {
        $pull: { replies: { reply_id: replyId } },
        $set: {
          updateBy: deletingAdmin.email,
          updateDate: Date.now()
        }
      },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: 'Ticket not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Reply deleted successfully',
      ticket: updatedTicket
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting reply',
      error: error.message
    });
  }
});
// -----------------web-settings---------------------------------
// @route   POST /api/web-settings
// @desc    Create new web settings
// @access  Private (typically)
Superadminrouter.post('/main-websettings', authMiddleware.protect, authMiddleware.admin,  async (req, res) => {
  try {
    // Create a new web settings document
    const webSettings = new MainWebSettings(req.body);
    
    // Save to database
    const savedSettings = await webSettings.save();
    
    res.status(201).json({
      success: true,
      data: savedSettings
    });
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    // Handle other errors
    res.status(500).json({
      success: false,
      error: 'Server Error: ' + err.message
    });
  }
});

// @route   GET /api/web-settings
// @desc    Get all web settings
// @access  Public or Private depending on your needs
// server route with caching
const cache = require('memory-cache');
const ManualGateway = require('../Models/ManualGateway');

Superadminrouter.get('/main-websettings', authMiddleware.protect, authMiddleware.admin, async (req, res) => {
  try {
    const cachedSettings = cache.get('webSettings');
    if (cachedSettings) {
      return res.status(200).json({
        success: true,
        fromCache: true,
        data: cachedSettings
      });
    }

    const webSettings = await MainWebSettings.find();
    cache.put('webSettings', webSettings, 3600000); // Cache for 1 hour
    
    res.status(200).json({
      success: true,
      count: webSettings.length,
      data: webSettings
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error: ' + err.message
    });
  }
});
// @route   GET /api/web-settings/:id
// @desc    Get single web settings by ID
// @access  Public or Private
Superadminrouter.get('/main-websettings/:id', authMiddleware.protect, authMiddleware.admin,  async (req, res) => {
  try {
    const webSettings = await MainWebSettings.findById(req.params.id);
    
    if (!webSettings) {
      return res.status(404).json({
        success: false,
        error: 'Web settings not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: webSettings
    });
  } catch (err) {
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid web settings ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error: ' + err.message
    });
  }
});

// @route   PUT /api/web-settings/:id
// @desc    Update web settings
// @access  Private
Superadminrouter.put('/main-websettings/:id', authMiddleware.protect, authMiddleware.admin,  async (req, res) => {
  try {
    let webSettings = await MainWebSettings.findById(req.params.id);
    
    if (!webSettings) {
      return res.status(404).json({
        success: false,
        error: 'Web settings not found'
      });
    }
    
    // Update each field that comes in the request body
    Object.keys(req.body).forEach(key => {
      if (key in webSettings) {
        webSettings[key] = req.body[key];
      }
    });
    
    // This will trigger the pre-save hook to update the updatedAt field
    const updatedSettings = await webSettings.save();
    
    res.status(200).json({
      success: true,
      data: updatedSettings
    });
  } catch (err) {
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    
    // Handle invalid ObjectId format
    if (err.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid web settings ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server Error: ' + err.message
    });
  }
});


// -------------------------------transaction-method-------------------------
Superadminrouter.post("/manual-payment", upload.single("image"), async (req, res) => {
  try {
    const {
      gatewayName,
      currencyName,
      fixedCharge,
      percentCharge,
      rate,
      depositInstruction,
      accountType,
      accountNumber,
      userData, // userData is now a plain object, no need to parse
    } = req.body;
    // Ensure userData is in the correct format (already parsed from frontend if needed)
    const parsedUserData = Array.isArray(userData) ? userData : JSON.parse(userData);

    const newMethod = new ManualGateway({
      gatewayName,
      currencyName,
      fixedCharge,
      percentCharge,
      rate,
      accountType,
      accountNumber,
      depositInstruction,
      image: req.file.filename,
      userData: parsedUserData,
    });

    await newMethod.save();
    res.status(201).json({ message: "Manual deposit method added successfully." });
  } catch (error) {
    console.error("Create Error:", error);
    res.status(500).json({ message: "Failed to add manual deposit method." });
  }
});
/**
 * @route   GET /api/deposit-method/manual
 * @desc    Get all manual deposit methods
 */
Superadminrouter.get("/deposit-methods", async (req, res) => {
  try {
    const methods = await ManualGateway.find().sort({ createdAt: -1 });
    res.json(methods);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch manual deposit methods." });
  }
});
// -------------enabled deposit method------------------
Superadminrouter.get("/enabled-deposit-methods", async (req, res) => {
  try {
    const methods = await ManualGateway.find({enabled:true}).sort({ createdAt: -1 });
    res.json(methods);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Failed to fetch manual deposit methods." });
  }
});
/**
 * @route   PUT /api/deposit-method/manual/:id
 * @desc    Update a manual deposit method
 */
Superadminrouter.put("/deposit-methods/:id", upload.single("image"), async (req, res) => {
  try {
    const {
      gatewayName,
      currencyName,
      minAmount,
      maxAmount,
      fixedCharge,
      percentCharge,
      rate,
      depositInstruction,
      userData,
    } = req.body;

    const updatedData = {
      gatewayName,
      currencyName,
      minAmount,
      maxAmount,
      fixedCharge,
      percentCharge,
      rate,
      depositInstruction,
      userData: JSON.parse(userData),
    };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    await ManualGateway.findByIdAndUpdate(req.params.id, updatedData);
    res.json({ message: "Manual deposit method updated successfully." });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Failed to update manual deposit method." });
  }
});

/**
 * @route   DELETE /api/deposit-method/manual/:id
 * @desc    Delete a manual deposit method
 */
Superadminrouter.delete("/deposit-methods/:id", async (req, res) => {
  try {
    await ManualGateway.findByIdAndDelete(req.params.id);
    res.json({ message: "Manual deposit method deleted successfully." });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Failed to delete manual deposit method." });
  }
});
module.exports=Superadminrouter;