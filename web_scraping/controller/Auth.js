const bcrypt=require("bcrypt")
const User=require("../model/schema")
const jwt=require("jsonwebtoken")
require("dotenv").config();

exports.signup=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;

        const existuser=await User.findOne({email});

        if(existuser){
            res.status(400).json({
                success:false,
                message:"user already exist",
            })
        }
        let hashpassword;
        try{
            hashpassword=await bcrypt.hash(password,10);
        }catch(err){
            return res.status(500).json({
                status:false,
                message:"error in hashing process"
            })
        }
        const user=await User.create({name,email,password:hashpassword,role})

        return res.status(200).json({
            status:true,
            data:user,
            message:"Successfull stored in DB"

        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"user not registered"

        })

    }
}

exports.login=async(req,res)=>{
    try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"please fill all details carefully"
        })
    }
    let user=await User.findOne({email});

    if(!user){
        return res.status(400).json({
            success:false,
            message:"user is not registered"
        });
    }
    const payload=
    {
        email:user.email,
        id:user._id,
        role:user.role,
    };
    if(await bcrypt.compare(password,user.password)){
        let token=jwt.sign(payload,
            process.env.jwt_secret,{
                expiresIn:"2h",
            });

        user = user.toObject();    
        user.token=token;
        user.password=undefined;

        const options={
            expires:new Date(Date.now()+3*34*60*60*1000),
            httpOnly:true,
        }

        res.cookie("token",token,options).json({
            success:true,
            token,
            user,
            message:'user logged in successfully',
        })
    }else{
        return res.status(403).json({
            success:false,
            message:"Password Incorrect"
        })
    }
}catch(err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message:"error in login"
    })
}
}