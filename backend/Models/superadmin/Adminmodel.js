const mongoose=require("mongoose");

const Adminschema=new mongoose.Schema({  
    profile_pic:{
        type:String,
        default:"https://militaryhealthinstitute.org/wp-content/uploads/sites/37/2021/08/blank-profile-picture-png.png"
      },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    uploadedImages: {
        type: [String],  // Array of strings to store image URLs or paths
        default: [],
      },
      totalstorage:{
        type:Number,
        default:0,
      },
      imagessize:{
        type:Number,
        default:0,
      },
      documentssize:{
        type:Number,
        default:0,
      },  
      audiosize:{
        type:Number,
        default:0,
      },
},{timestamps:true})

const Adminmodel=mongoose.model("Admin",Adminschema);

module.exports=Adminmodel;