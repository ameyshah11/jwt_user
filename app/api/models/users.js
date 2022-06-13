const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// Encrypting the password before sending to database
// Pre function means before executing any method or function firsts do this
// Here we are saying before executing save function do this task first
UserSchema.pre('save',function (next){

    // we are encrypting the password using bcrypt library hashSync function 
    // in that hashSync we are passing password and salt round 
    // salt round : how many times it has to be hashed -> here is it 10 time's 
    const saltRounds = 10;

    // when we use lambda function no need to write this keyword ex : this.password 
    this.password = bcrypt.hashSync(this.password, saltRounds)

    // next is like .then() and here we are saying without doing earlier process don't go to next
    // So what is happening is 
    // 1. Using pre we are saying before save do the hashing
    // 2. It hashing is successfull go to next step else stop
    next()
})

module.exports = mongoose.model("user",UserSchema)