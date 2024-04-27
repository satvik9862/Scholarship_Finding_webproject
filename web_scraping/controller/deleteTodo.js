const Todo=require("../module/todo")


exports.deleteTodo=async(req,res)=>{
    try{
        const {id}=req.params;

        const todo=await Todo.findByIdAndDelete({_id:id})

        res.status(200).json({
            status:true,
            message:"delete successfully"
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
}