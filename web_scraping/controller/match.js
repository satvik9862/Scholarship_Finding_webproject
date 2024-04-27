const Profile = require('../module/profile');
const Eligi = require("../module/eligibility");
const Scholar=require("../module/scholar");
const  User=require("../module/user");

const UserScholarshipMatch=require("../module/scholarship_match")
// Define user data
// let userData = {
//     income: 50000,
//     education: 'graduation',
//     caste: 'SC',
//     gender: 'female',
//     dob: '1990-05-15',
//     city: 'pune',
//     state: 'Your State'
// };
const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465
    auth: {
      user: 'gaikwadsurekha555@gmail.com',
      pass: 'pzhu tuna fmvn jssr'
    }
  });

// exports.geteligibility = async (req, res) => {
//     try {
//         console.log("eligible criteria")
//         const scholarships = await Eligi.find();
//         // const userData=await Profile.find();
//         const userData = await  Profile.findOne({ name: "Satvik " });
//         console.log(userData);
        

//         console.log(scholarships);
       
//         function isUserEligible(user, scholarship) {
//             console.log("User:", typeof user);
//             console.log("Scholarship:", typeof scholarship);
//             const scholarshipObj = scholarship.toObject();
//             const eligibilityCriteria = scholarshipObj._eligibility;
        
//             console.log("Eligibility Criteria:", eligibilityCriteria);
        
//             for (const key in eligibilityCriteria) {
//                 // Skip 'NA' criteria
//                 if (eligibilityCriteria[key] === 'NA') continue;
        
//                 // Special check for income
//                 if (key === 'income') {
//                     if (user[key] !== undefined && user[key] !== 'NA' && user[key] > parseInt(eligibilityCriteria[key])) {
//                         console.log(`User income: ${user[key]}, Criteria income: ${eligibilityCriteria[key]}`);
//                         return false;
//                     }
//                 } else {
//                     // Ensure both user and eligibility criteria have the same value for the key
//                     if (user[key] !== eligibilityCriteria[key]) {
//                         console.log(`User ${key}: ${user[key]}, Criteria ${key}: ${eligibilityCriteria[key]}`);
//                         return false;
//                     }
//                 }
//             }
        
//             return true;
//         }
        
//         const eligibleScholarships = [];
//         scholarships.forEach(scholarship => {
//             if (isUserEligible(userData, scholarship)) {
//                 console.log(`User is eligible for ${scholarship.title}`);
//                 eligibleScholarships.push(scholarship.title);
//             } else {
//                 console.log(`User is not eligible for ${scholarship.title}`);
//             }
//         });
//         const associatedInfo = [];
//     for (let i = 0; i < eligibleScholarships.length; i++) {
//         const info = await Scholar.findOne({ title: eligibleScholarships[i] });
//         if (info) {
//             associatedInfo.push(info);
//         }
//     }
//     const mobileNumber= req.session.phoneNumber;
//     // for (const scholarship of associatedInfo) {
//     //     const match = new UserScholarshipMatch({
//     //         mobileNumber,
//     //         scholarshipId: scholarship._id // Save the scholarship ID
//     //     });
//     //     await match.save();
//     // }
//     for (const scholarship of associatedInfo) {
//         // Check if the scholarship is already matched for the user
//         const existingMatch = await UserScholarshipMatch.findOne({ mobileNumber, scholarshipId: scholarship._id });
//         if (!existingMatch) {
//             // If the scholarship is not already matched, create a new match entry
//             const match = new UserScholarshipMatch({
//                 mobileNumber,
//                 scholarshipId: scholarship._id // Save the scholarship ID
//             });
//             await match.save();
//             const mailOptions = {
//                 from: 'Scholarship <gaikwadsatvik555@gmail.com>', // Sender information
//                 to: 'gaikwadsatvik555@gmail.com', // Recipient email address
//                 subject: 'Scholarship  Notification', // Email subject line
//                 text: 'New Scholarship updated' // Plain text body
//                 // You can also add HTML content using the 'html' property
//               };
//               transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                   console.error(error);
//                 } else {
//                   console.log('Email sent: ' + info.response);
//                 }
//               });
//         }
//     }
    

//     // Render the EJS page with the associated information for eligible scholarships
//     return res.render('match', { todos: associatedInfo });
//         // res.status(200).json({
//         //     success: true,
//         //     data: scholarships,
//         //     message: "Eligibility criteria fetched successfully"
//         // });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             success: false,
//             error: err.message,
//             message: 'Server error'
//         });
//     }
// };
async function sendEmailNotification(email, subject, text) {
    try {
        const mailOptions = {
            from: 'Scholarship <gaikwadsatvik555@gmail.com>',
            to: email,
            subject: subject,
            text: text
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


// Function to fetch and process eligibility for all users
exports.geteligibility = async (req, res) => {
    try {
        console.log("Fetching eligibility criteria");
        const scholarships = await Scholar.find();
        const users = await Profile.find();
        
        function isUserEligible(user, scholarship) {
                        console.log("User:", typeof user);
                        console.log("Scholarship:", typeof scholarship);
                        const scholarshipObj = scholarship.toObject();
                        const eligibilityCriteria = scholarshipObj._eligibility;
                    
                        console.log("Eligibility Criteria:", eligibilityCriteria);
                    
                        for (const key in eligibilityCriteria) {
                            // Skip 'NA' criteria
                            if (eligibilityCriteria[key] === 'NA') continue;
                    
                            // Special check for income
                            if (key === 'income') {
                                if (user[key] !== undefined && user[key] !== 'NA' && user[key] > parseInt(eligibilityCriteria[key])) {
                                    console.log(`User income: ${user[key]}, Criteria income: ${eligibilityCriteria[key]}`);
                                    return false;
                                }
                            } else {
                                // Ensure both user and eligibility criteria have the same value for the key
                                if (user[key] !== eligibilityCriteria[key]) {
                                    console.log(`User ${key}: ${user[key]}, Criteria ${key}: ${eligibilityCriteria[key]}`);
                                    return false;
                                }
                            }
                        }
                    
                        return true;
                    }
        const eligibleUsers = [];
        for (const user of users) {
            console.log("User data:", user);
            const eligibleScholarships = [];
            for (const scholarship of scholarships) {
                if (isUserEligible(user, scholarship)) {
                    console.log(`User ${user.name} is eligible for ${scholarship.title}`);
                    eligibleScholarships.push(scholarship);
                }
            }
            if (eligibleScholarships.length > 0) {
                eligibleUsers.push({ user, scholarships: eligibleScholarships });
            }
        }

        // Save matched scholarships for each eligible user
        for (const { user, scholarships } of eligibleUsers) {
            const mobileNumber = user.mobileNumber; // Assuming phoneNumber is stored in the user document
            for (const scholarship of scholarships) {
                const existingMatch = await UserScholarshipMatch.findOne({ mobileNumber, scholarshipId: scholarship._id });
                if (!existingMatch) {
                    const match = new UserScholarshipMatch({ mobileNumber, scholarshipId: scholarship._id });
                    await match.save();
                    // Send email notification
                    const subject = 'Scholarship Notification';
                    const text = `New scholarship available: ${scholarship.title}`;
                    await sendEmailNotification(user.email, subject, text);
                }
            }
        }

        // Render the EJS page with the associated information for eligible users
        // return res.render('match', { users: eligibleUsers });

        return res.status(200).json({ message: "successful" });
        // if (res) {
        //     // Render the EJS page with the associated information for eligible users
        //     return res.render('match', { users: eligibleUsers });
        // }
    } catch (err) {
        console.error('Error processing eligibility:', err);
        // res.status(500).json({ success: false, error: err.message, message: 'Server error' });
        if (res) {
            res.status(500).json({ success: false, error: err.message, message: 'Server error' });
        }
    }
};

Profile.watch().on('change', async (change) => {
    if (change.operationType === 'insert') {
        console.log('New user added:', change.fullDocument);
        // Call the geteligibility function to process eligibility for all users
        await exports.geteligibility();
    }
});
Scholar.watch().on('change', async (change) => {
    if (change.operationType === 'insert') {
        console.log('New user added:', change.fullDocument);
        try {
            // Call the checkEligibility function to process eligibility for all users
            await exports.geteligibility();
        } catch (err) {
            // Handle errors
            console.error('Error processing eligibility:', err);
        }
    }
});

exports.chat=async(req,res)=>{
    try{
       
        const phoneNumber = req.session.phoneNumber;
        const data=await User.findOne({phone:phoneNumber});
        console.log("user phone no:",phoneNumber);
        return  res.render('chat', { name:data.name });
        // res.status(200).json({
        //     success:true,
        //     data:todos,
        //     message:"entire todo is fetched"
        // })
      

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:true,
            error:err.message,
            message:'Server errror'

        })
        
    
    }
};