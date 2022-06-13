const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    release_date:{
        type:Date,
        required:true
    }
})

module.exports = mongoose.model('movie',MovieSchema);