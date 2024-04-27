const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");

const todoschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:500,
        },
        description:{
            type:String,
            required:true,
            maxLength:500,
        },
        createdAt:{
            type:Date,
            required:true,
            default:Date.now(),
        },
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
)

module.exports = mongoose.model("todo",todoschema);