const userModel = require('../models/user.model')
const jwt = require("jsonwebtoken");


async function registerUser(req,res) {
    const {username , email , password} = req.body;
//this is object destructuring;
//If the client sends:
// {
//   "username": "Ronit",
//   "email": "ronit@gmail.com",
//   "password": "123456"
// }
// then this line is equivalent to:
// const username = req.body.username;
// const email = req.body.email;
// const password = req.body.password;
const isUserAlreadyExists = await userModel.findOne({email})
if(isUserAlreadyExists){
    return res.status(409).json({
        messagee:"User already exits"
    })
}

    const user = await userModel.create({
        username,email,password

    })

const token = jwt.sign({
    id: user._id
},
    process.env.JWT_SECRET
)

res.cookie("token",token)
//ham cookie storage ke under mama naame se ham token ko save karenge

res.status(201).json({
    message:"User registered successfully",
    user,
})
}

module.exports = { registerUser }

// Overall flow
// Client sends a POST request with username, email, and password.
// req.body contains those values.
// A new user is created in MongoDB using userModel.create().
// After creation, user._id is available.
// A JWT is generated containing that user ID.
// A 201 Created response is sent back to the client. (In your current code, the token is created but not included in the response.)