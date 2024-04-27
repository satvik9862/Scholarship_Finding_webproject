// UserScholarshipMatch collection schema

const mongoose=require("mongoose");
const UserScholarshipMatchSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true
    },
    scholarshipId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'scholar',
        required: true
    },
    
});

module.exports = mongoose.model('UserScholarshipMatch', UserScholarshipMatchSchema);
