const express=require("express");
const router=express.Router();
const path=require('path'); 

const Todo=require("../module/todo");
const {createTodo,createProfile,like,signup,login,unlike}=require("../controller/createTodo");
const {getTodo,search,likes,getTodoByid,match}=require("../controller/getTodo");
const {updateTodo}=require("../controller/updateTodo");
const {deleteTodo}=require("../controller/deleteTodo");
const {onConnected}=require("../controller/sockets");
const {geteligibility,chat}=require("../controller/match");

router.post("/createTodo",createTodo);
router.post("/createProfile",createProfile);
// router.get("/get",getTodo);
router.get("/getTodo/:title",getTodoByid);
router.put("/updateTodo/:id",updateTodo);
router.delete("/delete/:id",deleteTodo);
router.get("/test",getTodo);
router.get('/get',getTodo);
router.get('/search',search);
router.get('/like',likes);
// router.get('/home',createProfile);
router.get('/',(req,res)=>{
    res.render("loginn",{error:""});
});
// router.get('/',(req,res)=>{
//     res.render("eligibilitypbl");
// });
router.get("/match",match);
 router.post('/login',login);
router.post('/scholarshiplike/:id',like);
router.delete('/scholarshipunlike/:id',unlike);
 router.post('/register',signup);
router.get('/geteligi',geteligibility);
router.get('/signup',(req,res)=>{
    res.render("signupn.ejs",{error:""});
})
router.get('/home',(req,res)=>{
    res.render("home.ejs");
})
router.get('/dashboard',(req,res)=>{
    res.render("dashboard.ejs");
})
router.get('/profile',(req,res)=>{
    res.render("homepbl.ejs");
})
router.get('/chat',chat);
// router.get('/login',(req,res)=>{
//     res.render("loginn.ejs")
// })
// router.get('/chat', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public', 'index.html'));
// });
// router.get('/loginpage')
// router.get('register',(req,res)=>{
//     res.render()
// })
//   router.get('/chat',onConnected)
// router.post('/scholarshipunlike/:id',unlike)
//i have change 
module.exports=router;