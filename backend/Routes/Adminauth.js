const express=require("express");
const Adminmodel = require("../Models/superadmin/Adminmodel");
const adminauth=express.Router();
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// -------------admin-registration-----------------------
adminauth.post("/admin-registration",async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
          res.send({success:false,message:"Please fill up information!"})
        }
        const existemail=await Adminmodel.findOne({email:email})
        if(existemail){
            res.send({success:false,message:"Email already exist!"})
        }
        const haspassword=await bcrypt.hash(password,10);
        const newadmin=new Adminmodel({
            email,
            password:haspassword
        });
        newadmin.save();
        res.send({success:true,message:"New Admin Created SUccessfully!"})
    } catch (error) {
        console.log(error)
    }
})
// -------------------admin-login-------------------
adminauth.post("/admin-login",async(req,res)=>{
    try {
        const { email, password } = req.body;
        console.log(req.body)
        const admin = await Adminmodel.findOne({ email });
        console.log(admin)
        const errorMsg = 'Auth failed email or password is wrong';
        console.log(admin)
        // if (!admin) {
        //     return res
        //         .json({ message: errorMsg, success: false });
        // }
        const isPassEqual = await bcrypt.compare(password, admin.password);
        if (!isPassEqual) {
            return res
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: admin.email, _id: admin._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                admin
            })
    } catch (err) {
        console.log(err)
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
})
module.exports=adminauth;