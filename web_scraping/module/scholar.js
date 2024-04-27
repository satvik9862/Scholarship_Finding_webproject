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
        deadline:{
            type: String,
             required: true

        },
        eligibility:{
            type:String,
            required:true

        },eligi: {
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
            state:{
                type:String,
                default:'NA'
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

module.exports = mongoose.model("scholar",scholarschema);