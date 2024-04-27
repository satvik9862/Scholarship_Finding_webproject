const mongoose=require('mongoose');

const likeSchema=new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"scholar"
    },
    phone:{
        type:Number,
        required:true
    }
});
module.exports = mongoose.model("Like",likeSchema);