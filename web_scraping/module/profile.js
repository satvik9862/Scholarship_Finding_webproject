const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    caste: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'], // Define possible gender values
        required: true,
    },
    income:{
        type:Number,
        required:true
    }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
