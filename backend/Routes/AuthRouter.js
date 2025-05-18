const { signup, login, user_name_validation, verifyOtp, resendOtp } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const UserModel = require('../Models/User');
const WebSettings = require('../Models/WebSettings');
const authMiddleware=require("../Middlewares/authMiddleware");
const router = require('express').Router();

router.post('/login', loginValidation, login);
router.post('/signup', signup);
router.get('/username/:username', user_name_validation);
router.post('/verifyotp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.get("/customer-information/:id",async(req,res)=>{
    try {
        const customer_information=await UserModel.findById({_id:req.params.id});
        if(!customer_information){
            res.send({success:false,message:"Customer does not find!"})
        }
        res.send({success:false,message:"Customer finds successfully!",data:customer_information})
    } catch (error) {
        console.log(error)
    }
})


// Route: GET /check-subdomain/:subdomain
router.get('/check-subdomain/:subdomain', async (req, res) => {
    const { subdomain } = req.params;
  
    try {
      const user = await WebSettings.findOne({ subDomain: subdomain });
  
      if (user) {
        return res.status(200).json({ exists: true, message: 'Subdomain exists.' });
      } else {
        return res.status(200).json({ exists: false, message: 'Subdomain is available.' });
      }
    } catch (error) {
      console.error('Error checking subdomain:', error);
      return res.status(500).json({ error: 'Server error while checking subdomain.' });
    }
  });



module.exports = router;