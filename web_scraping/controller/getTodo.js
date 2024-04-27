
const Todo=require("../module/todo");
const Scholar=require("../module/scholar");
const use=require("../MOCK_DATA.json")
const Scholarship=require("../module/scholarship");
const Like=require("../module/like");
const Profile=require("../module/profile");
 const usermatch=require("../module/scholarship_match");
exports.getTodo=async(req,res)=>{
    try{
        const todos=await Scholar.find();
        // console.log(todos);
        const phoneNumber = req.session.phoneNumber;
        console.log("user phone no:",phoneNumber);
        todos.reverse();
        return  res.render('scholarshipbl', { todos:todos });
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


exports.search= async (req, res) => {
    const searchTerm = req.query.q;
    try {
        let scholarships = [];
        if (searchTerm) {
            scholarships = await Scholar.find({ title: { $regex: searchTerm, $options: 'i' } });
        }
        res.render('scholarshipbl', { todos:scholarships });
    } catch (error) {
        console.error('Error searching for scholarships:', error);
        res.status(500).send('Error searching for scholarships');
    }
};


exports.match=async(req,res)=>{
    try{
        const phoneNumber=req.session.phoneNumber;
        const profile = await Profile.findOne({ mobileNumber: phoneNumber });
        if (!profile) {
            return res.render('dashboard', { message: 'Please fill Profile details' });
        }
        const users = await usermatch.find({ mobileNumber:phoneNumber }).populate('scholarshipId');
        // const scholarships = users.map(user => user.scholarshipId).flat();
        const like_schol=await usermatch.find().populate('scholarshipId');
        // console.log(todos);

        return  res.render('matchpbl', { todos:users });
       
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:true,
            error:err.message,
            message:'Server errror'

        })
    }
}
// exports.likes=async(req,res)=>{
//     try{

//         phoneNumber=req.session.phoneNumber;
//         const like_schol=await Like.find().populate('post');
//         // console.log(todos);
//         console.log("hello")

//         return  res.render('likepbl', { scholarships:like_schol });
       
//     }
//     catch(err){
//         console.error(err);
//         res.status(500).json({
//             success:true,
//             error:err.message,
//             message:'Server errror'

//         })
//     }
// }
exports.likes = async (req, res) => {
    try {
     const phoneNumber = req.session.phoneNumber;
     console.log(phoneNumber);
        // const profile = await Profile.findOne({ mobileNumber: phoneNumber });
        // if (!profile) {
        //     return res.render('dashboard', { message: 'Please fill Profile details' });
        // }
        // Find liked scholarships associated with the phone number
        const likedScholarships = await Like.find({ phone:phoneNumber }).populate('post');
        console.log(likedScholarships);
        // Render the page with the liked scholarships
        return res.render('likepbl', { scholarships: likedScholarships });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'Server error'
        });
    }
};


// exports.getTodoByid=async(req,res)=>{
//     try{
//         const title=req.params.id;
//         const sch=await Todo.findById( {title:title});

//         if(!sch){
//             return res.status(404).json({
//                 success:false,
//                 message:"not found"
//             })
//         }
//         res.status(200).json({
//             success:true,
//             data:sch,
//             message:" sch is fetched"
//         })
//     }
//     catch(err){
//         console.error(err);
//         console.log(err.message);
//         res.status(500).json({
//             success:true,
//             error:err.message,
//             message:'Server errror'

//         })
        
    
//     }
// };
// exports.getTodoByid = async (req, res) => {
//     try {
//         const title = req.params.title;
//         console.log(title);
//         const sch = await Scholar.findById({ _id: title });

//         if (!sch) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Not found"
//             });
//         }
//         res.status(200).json({
//             success: true,
//             data: sch,
//             message: "Scholarship is fetched"
//         });
//     } catch (err) {
//         console.error(err);
//         console.log(err.message);
//         res.status(500).json({
//             success: false,
//             error: err.message,
//             message: 'Server error'
//         });
//     }
// };
exports.getTodoByid = async (req, res) => {
    try {
        const title = req.params.title; 
        // const t="Pre-Matric SC Cleaning and Health Hazard Scholarship, Tripura 2023-24";
        console.log(title); 
        // console.log(t);
      
        const sch = await Scholar.findOne({ title: title });
        console.log("Scholarship Document:", sch); 
         return  res.render('eligibilitypbl', { eligibility:sch});

        // if (!sch) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Not found"
        //     });
        // }
        // res.status(200).json({
        //     success: true,
        //     data: sch,
        //     message: "Scholarship is fetched"
        // });
    } catch (err) {
        console.error(err);
        console.log(err.message);
        res.status(500).json({
            success: false,
            error: err.message,
            message: 'Server error'
        });
    }
};
