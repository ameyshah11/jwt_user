const UserModel = require('../models/users');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Create user
const create = (req,res,next) => {
    // array destructure
    const {name,email,password} = req.body

    UserModel.create({
        name, 
        email,
        password
    }, (err,result) => {
        if(err)
        {
            next(err)
        }
        else
        {
            // Send Response with the status code of 200
            // Json Function => Object => status, message, data: result[object]
            res.status(200).json({
                status: "Success",
                message: "User Added Successfully",
                data: result
            })
        }
            
        })
    } 

// User Login
const login = (req,res,next) => {
    UserModel.findOne({email:req.body.email},(err,result)=>{
        // result comprises of whole document
        if(err)
        {
            next(err)
        }
        else
        {
            // Using compare we are comaparing the enterd password with database stored password
            //1. first parameter is password which user is sending while login in
            // 2. second parameter is password which is stored in database while registration
            // result holds the complete document (including id , email and password)
            // compare returns boolean true and false if matched true else false
            if(bcrypt.compare(req.body.password, result.password))
            {
                // IF password matches and everything goes fine we are generating a token for user
                // It is a security token
                // to generate the token we use sign function (Signature)
                // sign function takes some info and on that basis it generates the token for us
                const token = jwt.sign({

                    // here we are mentioning the user id as _id of database
                    // based on this id info jwt will generate a token for us something similar to hash

                    // result we have written as it hold the document and _id because in database the
                    // field name is _id 
                    id:result._id

                    // expiresIn :- states that the token will expire after 1 hour (1h) and relogin required
                }, req.app.get('secretKey'),{expiresIn:'1h'})

                res.json({
                    status:"Success",
                    message:"Successfully logged in",
                    data:{
                        user:result,
                        token : token
                    }
                })
                
            }
        }
    })
}

module.exports = {create, login}