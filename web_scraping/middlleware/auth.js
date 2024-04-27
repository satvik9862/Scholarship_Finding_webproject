
const jwt=require("jsonwebtoken")
require("dotenv").config();


exports.auth=(req,res,next)=>{
    try{
        const token=req.body.token;

        if(!token){
            return res.status(404).json({
                success:false,
                message:'token missing',
            });
        }
        try{
            const decode=jwt.verify(token,process.env.jwt_secret);
            console.log(decode);
            req.user=decode;

        }catch(err){
            return res.status(401).json({
                status:false,
                message:"token is invalid"
            })

        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:'spmething went wrong,while verifying token'
        })

    }

}

exports.isStudent=(req,res,next)=>{

    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
    success:false,
    message:"this is protected route for student"
   })        
   }
   next();

    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'user role not matching'
        })


    }
}

exports.isAdmin=(req,res,nex)=>{

    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
    success:false,
    message:"this is protected route for admin"
   })        
   }
   next();

    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:'user role not matching',
        })


    }
}