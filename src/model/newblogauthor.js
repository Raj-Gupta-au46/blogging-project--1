const mongoose = require("mongoose");
const newBlogAuthor=new mongoose.Schema(
    {
        firstname:String,
        lastname:String,
        gender:{
            type:String,
            enum:["Male","Female","LGBTQ"]
        },
        emailId:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true,
        },

    },
    { timestamps: true }
);




module.exports=mongoose.model("NewUser",newBlogAuthor);