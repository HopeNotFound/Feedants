// const express=require("express");
// const router=express.Router();
// const jwt = require("jsonwebtoken"); 
// router.post("/create",(req,res)=>{

//     const token=req.cookies.token;
//     if(!token){
//         return res.status(401).json({
//             message:"unauthorized"
//         })}
//     try{

//     jwt.verify(token, process.env.JWT_SECRET)
//     }catch (err){
//         return res.status(401).json({
//             message:"Token is invalid"

//         })
    
// }
    

//     // before creating posts we will chack if he user is login i.e we can know the user
//     // is login if he has token so we will first check whether he has token or not

//     res.send("Post created successfully")
// })
// module.exports = router;





const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userModel=require("../models/user.model");

router.post("/create", async (req, res) => {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "unauthorized"
        });
    }

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       const user=await userModel.findOne({
        _id: decoded.id})
        console.log(user)
    } catch (err) {
        return res.status(401).json({
            message: "Token is invalid"
        });
    }

    res.send("Post created successfully");
});

module.exports = router;