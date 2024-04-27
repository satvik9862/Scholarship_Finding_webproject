const mongoose=require('mongoose');
// const { link } = require('../routes/todo');
const { required } = require('nodemon/lib/config');


const scholarshipSchema=new mongoose.Schema(
    {
        
        title:{
            type:String,
            required:true,
            maxLength:500,
        },
        eligibility:[String ],
        // deadline:{
        //     type:String,
        //     required:true,
        //     maxLength:500,
        // },
        link:{
            type:String,
            required:true

        },

        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
})

module.exports = mongoose.model("Scholarship",scholarshipSchema);