const mongoose=require('mongoose');
const validator=require('validator');


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        minLength:10
    },
    email:{
        type:String,
        validator(value){
            if(!validator.isEmail(value)){
                throw new console.error("Please enter valid email....");
            }
        }
    },
    password:{
        type:String,
        trim:true,
        //minLength:6,
        required:true,
        validator(value){
            if(!validator.isStrongPassword(value)){
                throw new console.error("Please enter valid password...")
            }
        }
    },
    
   
});

const User=new mongoose.model('User',userSchema);

module.exports=User;