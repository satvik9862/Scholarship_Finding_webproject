// const mongoose=require("mongoose");

// const eligSchema=new mongoose.Schema({
//     title:{
//         type:String,
//         required:true,
//         maxLength:500,
//     },
//     _eligibility:{
//         income: {
//             type: Number,
//             default: 'NA'
//         },
//         education: {
//             type: String,
//             default: 'NA'
//         },
//         caste: {
//             type: String,
//             default: 'NA'
//         },
//         gender: {
//             type: String,
//             default: 'NA'
//         }
//     }
//     }
// );

// module.exports=mongoose.model("Eligi",eligSchema);

const mongoose = require("mongoose");

const eligSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 500
    },
    eligibility: {
        type: Array,
        default: []
    },
    _eligibility: {
        income: {
            type: String,
            default: 'NA'
        },
        education: {
            type: String,
            default: 'NA'
        },
        caste: {
            type: String,
            default: 'NA'
        },
        gender: {
            type: String,
            default: 'NA'
        }
    },
    link: {
        type: String,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    __v: {
        type: Number,
        default: 0
    }
});


module.exports = mongoose.model("Eligi", eligSchema);
