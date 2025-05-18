const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const crypto = require('crypto'); // To generate OTP
const nodemailer = require('nodemailer'); // To generate OTP
const signup = async (req, res) => {
    try {
      const {
        registration_type,
        firstName,
        lastName,
        username,
        phone,
        email,
        password
      } = req.body;
  
      console.log(req.body);
  
      // Check required fields
      if (
        !registration_type || !firstName || !lastName || 
        !username || !phone || !email || !password
      ) {
        return res.json({ message: 'All fields are required.' });
      }
   // Generate a unique 6-digit user_id
   let user_id;
   let isUnique = false;
   while (!isUnique) {
     user_id = crypto.randomInt(100000, 999999).toString();
     const idExists = await UserModel.findOne({ user_id });
     if (!idExists) isUnique = true;
   }
      // Check for existing username or email
      const existingUser = await UserModel.findOne({
        $or: [{ username }, { email }]
      });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already exists.' });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate OTP
      const otp = crypto.randomInt(100000, 999999).toString();  // Generate a 6-digit OTP
      const otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes
  
      // Create user
      const newUser = new UserModel({
        user_id,
        registration_type,
        firstName,
        lastName,
        username,
        phone,
        email,
        password: hashedPassword,
        otp,
        otpExpiry
      });
  
      await newUser.save();
  
      // Send OTP email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service provider
        auth: {
          user: 'shihabmoni15@gmail.com', // Replace with your email
          pass: 'cdir niov oqpo didg'   // Replace with your email password or app-specific password
        }
      });
  
      const mailOptions = {
        from: 'shihabmoni15@gmail.com',
        to: email,
        subject: 'Your OTP for Registration',
        html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <title>OTP Verification</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f7;
                  margin: 0;
                  padding: 0;
                  color: #333;
                }
                .container {
                  max-width: 600px;
                  margin: 40px auto;
                  background: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                  padding: 30px;
                }
                h2 {
                  color: #333333;
                  font-size: 22px;
                  margin-bottom: 10px;
                }
                p {
                  line-height: 1.6;
                  margin: 10px 0;
                }
                .otp {
                  font-size: 28px;
                  font-weight: bold;
                  color: #2f54eb;
                  letter-spacing: 4px;
                  margin: 20px 0;
                }
                .footer {
                  font-size: 12px;
                  color: #888;
                  margin-top: 30px;
                  text-align: center;
                }
                a {
                  color: #2f54eb;
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>OTP Verification</h2>
                <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
                <p>Please use the following OTP to verify your account:</p>
                <div class="otp">${otp}</div>
                <p>This OTP is valid for 15 minutes only. Do not share it with anyone.</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p>Thank you,<br />Team</p>
                <div class="footer">
                  If you did not request this, please ignore this message.
                </div>
              </div>
            </body>
          </html>
        `
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('OTP email sent:', info.response);
        }
      });
  
      res.status(201).json({ message: 'User registered successfully. Please check your email for the OTP.', user: newUser });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error.' });
    }
  };
const user_name_validation = async (req, res) => {
    try {
        const { username } = req.params;
        console.log(username)
        const existingUser = await UserModel.findOne({username})
        if (existingUser){
            return res.json({ message: 'Username already exists.' });
        }
        res.status(200).json({ message: 'Username is available.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
    }
}
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP.' });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return res.status(400).json({ message: 'OTP has expired.' });
    }

    // OTP is valid — update verified status and clear OTP info
    user.verified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || 'user',
      },
     "fdsfsdf",
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'OTP verified successfully.',
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error.' });
  }
};
  const resendOtp = async (req, res) => {
    const { email } = req.body;
   console.log(email)
    if (!email) {
      return res.status(400).json({ message: 'Email is required to resend OTP.' });
    }
  
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      console.log(user)
      // Generate new OTP
      const newOtp = crypto.randomInt(100000, 999999).toString();
      const newOtpExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
  
      // Update the user document
      user.otp = newOtp;
      user.otpExpiry = newOtpExpiry;
      await user.save();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'shihabmoni15@gmail.com', // Replace with your email
          pass: 'cdir niov oqpo didg'   // Replace with your email password or app-specific password
        }
      });

      const mailOptions = {
        from: 'shihabmoni15@gmail.com',
        to: user.email,
        subject: 'Your New OTP Code',
        text: `Hi ${user.firstName},\n\nYour new OTP is: ${newOtp}\nIt will expire in 15 minutes.\n\nBest,\nTeam`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Failed to resend OTP:', error);
        } else {
          console.log('OTP resent:', info.response);
        }
      });
    //   // Send OTP
    //   if (user.registration_type === 'email') {
    
    //   }
  
      res.status(200).json({ message: 'OTP resent successfully.' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while resending OTP.' });
    }
  };

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = {
    signup,
    login,
    user_name_validation,
    verifyOtp,
    resendOtp
}