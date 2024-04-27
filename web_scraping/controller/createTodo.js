
const axios = require('axios');
const cheerio = require('cheerio');
const Todo = require("../module/todo");
const Scholar = require("../module/scholar");
const Scholarship=require("../module/scholarship");
const Profile=require("../module/profile");
const Like=require("../module/like");
const User=require("../module/user");
const bcrypt=require("bcrypt")
const scholarpbl=require("../module/scholarpbl");
async function createTodo(req, res) {
    try
    
    {        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ error: "Title and description are required." });
        }
        const todo = await Todo.create({ title, description });
        console.log("Todo entry created:", todo);
        return res.status(201).json(todo);
    } catch (error) {
        console.error("Error while creating todo entry:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}
async function createProfile(req, res) {
    try {
        const phoneNumber = req.session.phoneNumber;
        const{ name,email}=await User.findOne({phone:phoneNumber});
        // const {name,email,city,state,income,dob,education,caste,gender}=req.body;
        const {city,state,income,dob,education,caste,gender}=req.body;
        const profile=await Profile.create({name,email,city,mobileNumber:phoneNumber,state,income,dob,education,caste,gender});
        return res.status(201).json(profile);
        

    } catch (error) {
        console.error("Error while creating todo entry:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}

async function like(req, res) {
    try {
        console.log("reach");
        const {id}=req.params;
        const phoneNumber = req.session.phoneNumber;
        console.log(id);
        const existingMatch = await Like.findOne({ phone: phoneNumber, post:id });
        if (existingMatch) {
            // If a match already exists, send a response indicating that the scholarship is already liked
            console.log("found");
            return res.status(400).json({ message: 'Scholarship already liked' });
        }
        const profile=await Like.create({post:id,phone:phoneNumber});
        return res.status(201).json(profile);
        

    } catch (error) {
        console.error("Error while creating todo entry:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}
// exports.unlikePost = async (req, res) => {
//     try {
//       const { post, like } = req.body;
  
//       // find and delete the from like collection
//       const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });
  
//       // update the post collection
//       const updatedPost = await Post.findByIdAndUpdate(
//         post,
//         { $pull: { likes: deletedLike._id } },
//         { new: true }
//       );
  
//       res.json({
//         post: updatedPost,
//       });
//     } catch (err) {
//       return res.status(500).json({
//         error: "Error While unLike Post",
//       });
//     }
//   };
async function unlike(req, res) {
    try {
        const { id } = req.params;
        console.log(id);
        // Find and delete the like entry from the database
        const phoneNumber = req.session.phoneNumber;
        await Like.findOneAndDelete({ post: id, phone: phoneNumber });

        return res.status(200).json({ message: "Unlike successful" });
    } catch (error) {
        console.error("Error while removing like:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

  
// async function signup(req,res){
//     try{
//         const {fname,fphone,fpassword,femail}=req.body;
//         let hashpassword;
//         try{
//             hashpassword=await bcrypt.hash(fpassword,10);
//         }catch(err){
//             return res.status(500).json({
//                 status:false,
//                 message:"error in hashing process"
//             })
//         }
//         const newUser=new User({
//             name:fname,
//             phone:fphone,
//             email:femail,
//             //callege:req.body.fcallege,
//             password:hashpassword
            
//         });
//         const existuser=await User.findOne({fphone});

//         if(existuser==null){

//            await newUser.save(function(erro){
//                 if(erro){
//                     console.log(erro);
//                 }else{

//                     if(fphone.length<10 || req.body.fpassword.length<6){
//                         res.render("register.ejs",{error:"Enter valid phone number or password"}); 
//                     }
//                     else{
//                         // userInventary=req.body.fphone;
//                     //res.send("<h1>Registration done</h1>");
//                     res.render("home.ejs", {error:""});
//                     }
                    
//                 }
//             }); 
//             // res.status(400).json({
//             //     success:false,
//             //     message:"user already exist",
//             // })
//         }else{
//             res.render("signup.ejs",{error:"User already exists"}); 
//         }   
       
//         // const user=await User.create({name,email,password:hashpassword,role})

//         // return res.status(200).json({
//         //     status:true,
//         //     data:user,
//         //     message:"Successfull stored in DB"

//         // })
//     // }
// }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             success:false,
//             message:"user not registered"

//         })

//     }

// }
async function login(req,res){
    try{

    
    const phoneNumber= req.body.fphone;
    req.session.phoneNumber = phoneNumber;
    const password= req.body.fpassword;
    // const hashpassword = await bcrypt.hash(fpassword, 10);
    console.log(req.body);

    const existuser=await User.findOne({phone:phoneNumber});

    if(existuser==null){
        res.render("loginn.ejs",{error:"Enter valid phone number"})

    }else{
        console.log(existuser);
        bcrypt.compare(password, existuser.password, function(erro, respo){
            if(respo==true){
                //res.send("<h1>You are logged in</h1>");
                res.render("home.ejs", {error:""})
            // console.log(foundUser)
            // console.log("userInventary = "+ userInventary);
            }
            else{
                res.render("loginn.ejs",{error:"Please enter correct password"});
            }
        });


    }
   
    // User.findOne({phone:phoneNumber}, function(err,foundUser){
    //     if(err){
            
    //         console.log(err);
            
    //     }
    //     else if(foundUser==null){
    //         res.render("login.ejs",{error:"Enter valid phone number"});
    //     }
    //     else{
    //         if(foundUser){
    //             console.log(foundUser)
    //             userInventary=phoneNumber;
    //             bcrypt.compare(password, foundUser.password, function(erro, respo){
    //                 if(respo==true){
    //                     //res.send("<h1>You are logged in</h1>");
    //                     res.render("home.ejs", {error:""})
    //                 console.log(foundUser)
    //                 console.log("userInventary = "+ userInventary);
    //                 }
    //                 else{
    //                     res.render("login.ejs",{error:"Please enter correct password"});
    //                 }
    //             });
               
    //         }
    //     }
    // });
}catch(err){  
    console.log(err);
    return res.status(500).json({
        success: false,
        message: "login failed"
    });

}
   
}
async function signup(req, res) {
    try {
        const { fname, fphone, fpassword, femail } = req.body;
        const hashpassword = await bcrypt.hash(fpassword, 10);

        const newUser = new User({
            name: fname,
            phone: fphone,
            email: femail,
            password: hashpassword
        });

        const existUser = await User.findOne({ phone: fphone });

        if (existUser == null) {
            // await newUser.save();
            if (fphone.length < 10 || fpassword.length < 6) {
                res.render("signupn.ejs", { error: "Enter valid phone number or password" });
                console.log("phone no less than 10");
            } else {
                await newUser.save();
                req.session.phoneNumber = fphone;
                res.render("home.ejs", { error: "" });
            }
        } else {
            res.render("signupn.ejs", { error: "User already exists" });
            console.log("exist");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "user not registered"
        });
    }
}





async function scrapeAndCreateTodos() {
    try {
        const response = await axios.get("https://www.buddy4study.com/scholarships?utm_source=header");
        const html = response.data;
        const $ = cheerio.load(html);

    
        const uniqueTitles = [];
        let scholarshipsAdded = 0;

        $(".scholarshipslistcard_listCard__3oVnA").each(async (index, element) => {
            try {
                if (scholarshipsAdded >= 15) {
                    // If already added 50 scholarships, stop processing further
                    return;
                }
                const scholarshipName = $(element).find(".scholarshipslistcard_scholarshipName__1JExQ span").text().trim();
                const awardDetails = $(element).find(".scholarshipslistcard_awardEligibilityWrapper__W-r3m").text().trim();
                const deadlineArticle = $(element).find(".scholarshipslistcard_date__3RHCp").text().trim();
                const url=$(element).find('article.scholarshipslistFeaturedcard_buttonsWrapper__2Z4vP a.scholarshipslistFeaturedcard_btn__12YdD').attr('href');
              
        console.log(deadlineArticle)
                // console.log(scholarshipName)
                function separateAwardAndEligibility(text) {
                    const delimiter = "Eligibility";
                    const index = text.indexOf(delimiter);
                    if (index !== -1) {
                        const award = text.substring(0, index).trim();
                        const eligibility = text.substring(index + delimiter.length).trim();
                        return { award, eligibility };
                    } else {
                        // If "Eligibility" is not found, assume the entire text as award and eligibility
                        return { award: text.trim(), eligibility: "" };
                    }
                }
                const { award, eligibility } = separateAwardAndEligibility(awardDetails);
                console.log(award);
                console.log(eligibility);
                const existingSchola = await Scholar.findOne({ title: scholarshipName });
                const eligi=[" J N Tata scholars who have fully repaid their existing loan scholarship amount are eligible to apply",
               " Candidates planning to pursue postgraduate and undergraduate studies in India are not eligible to apply.",
            "Open for Indian nationals only."]
            _eligibility = {
                income: 'NA',
                education: 'postgraduation',
                caste: 'NA',
                gender: 'NA'
            };
                if (!existingSchola && !uniqueTitles.includes(scholarshipName)) {
                    await Scholar.create({ title: scholarshipName, award: award,deadline:deadlineArticle,eligibility:eligibility,eligi:eligi,link:"https://www.niti.gov.in/internship",_eligibility:_eligibility});
                    await Scholarship.create({title:scholarshipName,eligibility:eligi,link:"NA"})
                    uniqueTitles.push(scholarshipName); 
                    scholarshipsAdded++;
                }
            } catch (error) {
                console.error("Error while creating todo entry:", error);
            }
        });
        // $(".scholarshipslistcard_listCard__3oVnA").each(async (index, element) => {
        //     try {
        //         const scholarshipName = $(element).find(".scholarshipslistcard_scholarshipName__1JExQ span").text().trim();
        //         const awardElement = $(element).find(".scholarshipslistcard_awardEligibilityWrapper__W-r3m .scholarshipslistcard_box__pUHnL:nth-child(1)");
        //         const eligibilityElement = $(element).find(".scholarshipslistcard_awardEligibilityWrapper__W-r3m .scholarshipslistcard_box__pUHnL:nth-child(2)");
        //         const award = awardElement.find('span').text().trim();
        //         const eligibility = eligibilityElement.find('span').text().trim();
        //         const deadlineArticle = $(element).find(".scholarshipslistcard_date__3RHCp").text().trim();
        //         const url=$(element).find('article.scholarshipslistFeaturedcard_buttonsWrapper__2Z4vP a.scholarshipslistFeaturedcard_btn__12YdD').attr('href');
        
        //         const existingSchola = await Scholar.findOne({ title: scholarshipName });
        //         const eligi=[
        //             " J N Tata scholars who have fully repaid their existing loan scholarship amount are eligible to apply",
        //             " Candidates planning to pursue postgraduate and undergraduate studies in India are not eligible to apply.",
        //             "Open for Indian nationals only."
        //         ];
        
        //         if (!existingSchola && !uniqueTitles.includes(scholarshipName)) {
        //             await Scholar.create({ title: scholarshipName, award: award, deadline: deadlineArticle });
        //             await Scholarship.create({ title: scholarshipName, eligibility: eligi, link: "https://www.niti.gov.in/internship" });
        //             uniqueTitles.push(scholarshipName); 
        //         }
        //     } catch (error) {
        //         console.error("Error while creating todo entry:", error);
        //     }
        // });

        console.log("Scraping completed.");
    } catch (error) {
        console.error("Error while scraping data:", error);
    }
}

// const puppeteer = require('puppeteer');

// async function scrapeAndCreateTodos() {
//     try{
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://www.buddy4study.com/scholarships?utm_source=header');

   
//     await page.waitForSelector('.scholarshipslistFeaturedcard_listCard__EqaBe');

//     const htmlContent = await page.content();

    
//     await browser.close();


//     const cheerio = require('cheerio');
//     const $ = cheerio.load(htmlContent);

    
//     $('.scholarshipslistFeaturedcard_listCard__EqaBe').each((index, element) => {
//         const scholarshipName = $(element).find('.scholarshipslistFeaturedcard_scholarshipName__crtbm span').text().trim();
//         const awardDetails = $(element).find('.scholarshipslistFeaturedcard_awardEligibilityWrapper__3SraL').text().trim();


//         const linkElement = $(element).find('.scholarshipslistFeaturedcard_buttonsWrapper__2Z4vP a.scholarshipslistFeaturedcard_btn__12YdD');
//         const link = linkElement.length > 0 ? linkElement.attr('href') : 'No link found';
//          Scholarship.create({title:scholarshipName,award:awardDetails,});
//         console.log('Scholarship Name:', scholarshipName);
//         console.log('Award Details:', awardDetails);
//         console.log('Link:', link);
//         console.log('---');
//     });
// }catch(err){
//     console.log("error occured");
// }
// }
// const puppeteer = require('puppeteer');

// async function scrapeAndCreateTodos() {
//     try {
//         const browser = await puppeteer.launch();
//         const page = await browser.newPage();
//         await page.goto('https://www.buddy4study.com/scholarships?utm_source=header');

//         // Wait for the section containing scholarship information to be loaded
//         await page.waitForSelector('.scholarshipslistFeaturedcard_listCard__EqaBe');

//         // Get the HTML content of the page
//         const htmlContent = await page.content();

//         // Close the browser
//         await browser.close();

//         // Parse HTML content using Cheerio
//         const cheerio = require('cheerio');
//         const $ = cheerio.load(htmlContent);

//         // Extract scholarship information
//         $('.scholarshipslistFeaturedcard_listCard__EqaBe').each((index, element) => {
//             const scholarshipName = $(element).find('.scholarshipslistFeaturedcard_scholarshipName__crtbm span').text().trim();
//             const awardDetails = $(element).find('.scholarshipslistFeaturedcard_awardEligibilityWrapper__3SraL').text().trim();

//             // Extract URL if available
//             const linkElement = $(element).find('.scholarshipslistFeaturedcard_buttonsWrapper__2Z4vP a.scholarshipslistFeaturedcard_btn__12YdD');
//             const link = linkElement.length > 0 ? linkElement.attr('href') : 'No link found';

//             // Print or save the scraped data
//             console.log('Scholarship Name:', scholarshipName);
//             console.log('Award Details:', awardDetails);
//             console.log('Link:', link);
//             console.log('---');
//         });
//     } catch (error) {
//         console.error('Error while scraping and creating todos:', error);
//     }
// }





module.exports = {
    createTodo,
    scrapeAndCreateTodos,
    createProfile,
    like,
    signup,login,unlike

};



