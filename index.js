/** 
 * Application : Movies App Using JWT (Json Web Token)
 * Author : Amey Shah
 * Version : 1.0
 * 
 * Description : This is a Movies app which performs all the CRUD operations based on JWT
 *               Features of the App
 *              1. User Registration
 *              2. User Login
 *              3. Add Movies
 *              4. Retrieve all the movies details
 *              5. Retrieve specific movie details using Movie Id
 *              6. Update Specific movie details using Movie Id
 *              7. Delete Specific movie Using Movie Id
 * 
 *              For performing CRUD operation 
 *              User must be logged in as it will generate a
 *              User token to access all API regarding MOVIE CRUD OPS.
 * 
*/


const express = require("express");
const mongoose = require('mongoose');
// logger is just for developer uses it gives us the log of all the activities in the terminal
// logger and bodyParser are middlewares
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken')
const app = express();

const userRoute = require('./app/api/routes/users');
const movieRoute = require('./app/api/routes/movies');


// Setter set a secretKey with a random string for your jwt intial token generation
app.set('secretKey','hdjsakfhdjskgfsdfgsdf')


// Validating user function : will check does user have token or not for performing ops
const userValidation = (req,res,next)=>{
    jwt.verify(req.headers['x-access-token'],req.app.get('secretKey'),
    (err,decoded)=>{
        if(err)
        {
            res.json({
                message:err
            })
        }
        // If no errors are there do the next step and complete the operations
        next()
        
    })
}

// for using middleware we use (use function)
app.use(logger('dev'));
//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()) // also works
app.use('/user',userRoute);
app.use('/movie',userValidation,movieRoute);

//home page routing using slash ('/')
app.get('/',(req,res)=>{
    res.json({
        "App":"JWT Based API Application",
        "message":"Successfully running the application"
    })
})

// Connect to database
const mongoURI  = "mongodb+srv://ameyshah11:amey123@cluster0.utzxr.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(mongoURI)
.then(()=>{
    console.log("Database Connection Established!");
})
.catch((err)=>{
    console.log(err);
})



// listen function used for port 
app.listen(5000,()=>{
    console.log("Successfully Running on the port : 5000");
})