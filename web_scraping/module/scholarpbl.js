const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");
const eligibility = require("./eligibility");

const scholarschema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            maxLength:500,
        },
        award:{
            type:String,
            required:true,
            maxLength:500,
        },
        eligi:{
            type:String,
            required:true

        },
        deadline:{
            type: String,
             required: true

        },
        eligi: {
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
       
        updatedAt:{
            type:Date,
            required:true,
            default:Date.now(),
        }
    }
)

module.exports = mongoose.model("scholarpbl",scholarschema);