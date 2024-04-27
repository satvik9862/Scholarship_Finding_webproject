
const Todo=require("../module/todo");
const Scholar=require("../module/scholar");
const scholarships=require("./pbl2.json")
exports.updateTodo=async(req,res)=>{
    try{
        const {id}=req.params;
        const {title,description}=req.body;
        const todo=await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,updatedAt:Date.now()}
            )
        
            res.status(200).json({
                status:true,
                data:todo,
                message:"successfully updated"
            })
       
    }
    catch(err){
        console.error(err);
        console.log(err.message);
        res.status(500).json({
            success:true,
            error:err.message,
            message:'Server errror'

        })
        
       
    }
};


exports.scholarupdate=async(req,res)=>{
    
        // const {id}=req.params;
        // const {title,description}=req.body;
        // const scholarships = [
        //     {
        //       "title": "Government of India Post-Matric Scholarship for SC Students, Maharashtra  2023-24",
        //       "eligi": [
        //         "be a domicile of Maharashtra",
        //         "belong to Scheduled Caste (SC) or Neo Buddhist community",
        //         "be studying in Class 11 and above","have completed SSC or equivalent matric","have annual income less than or equal to ₹ 2,50,000 from all sources"
        //       ],
        //       "_eligibility": {
        //         "income": "250000",
        //         "education": "undergraduation",
        //         "caste": "SC",
        //         "state":"maharashtra",
        //         "gender": "NA"
        //       },
        //       "link": "https://mahadbt.maharashtra.gov.in/Login/Logout",
        //       "updatedAt": "2024-04-02T16:56:19.645+00:00",
        //       "__v": 0
        //     },
        //     {
        //       "title": "Eklavya Scholarship, Maharashtra 2023-24",
        //       "eligi": [
        //         "be a graduate domiciled in Maharashtra",
        //         "have secured a minimum of  60% marks in the Law, Commerce, and Arts streams and 70% marks in the Science stream from a recognised institution/university of Maharashtra",
        //         "have an annual family income of less than or equal to ₹75,000",
        //         "not be working anywhere as a part-time or full-time employee"
        //       ],
        //       "_eligibility": {
        //         "income": "75000",
        //         "education": "undergraduation",
        //         "caste": "NA",
        //         "state":"maharashtra",
        //         "gender": "NA"
        //       },
        //       "link": "https://mahadbt.maharashtra.gov.in/Login/Login",
        //       "updatedAt": "2024-04-02T16:56:19.645+00:00",
        //       "__v": 0
        //     }
        //   ];

          scholarships.forEach(async scholarship => {
            try {
              // Find the document in the collection by title and update it
              const updatedScholarship = await Scholar.findOneAndUpdate(
                { title: scholarship.title },
                scholarship,
                { new: true }
              );
        
              console.log('Updated scholarship:', updatedScholarship);
            } catch (error) {
              console.error('Error updating scholarship:', error);
            }
          });
        
        

        
       

};
