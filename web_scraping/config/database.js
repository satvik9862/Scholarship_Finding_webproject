const mongoose=require("mongoose");

// require("dotenv").config();

const dbConnect=()=>{
    mongoose.connect('mongodb+srv://gaikwadsatvik555:satvik555@cluster0.gwj3knx.mongodb.net/todo',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>{console.log("connection succesfull")})
    .catch((error)=>{
        console.log("error occuring")
        console.error(error.message);
        process.exit(1);
     })
};
//dbConnect();
module.export=dbConnect();