const MovieModel = require('../models/movies');

// Create function :- To add movies into database
const createMovie = (req,res,next)=>{
    let {name,release_date} = req.body
    MovieModel.create({
        name,
        release_date
    }, (err,result)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"Movie added successfully",
            })
        }
    })
}

//Real all function : To fetch all movie details
const readlAllMovies = (req,res,next)=>{
    MovieModel.find({},(err,result)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"All Movies details retrieved successfully",
                data:{
                    movies:result
                }
            })
        }
    })
}

// Real By ID function : To fetch movie details using ID
const readMovieById = (req,res,next)=>{
    MovieModel.findById(req.params.id,(err,result)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"Movie details retrieved successfully By Id",
                data:{
                    movie:result
                }
            })
        }
    })
}

// Update By Id function : To modify movie details with the help of Id
const updateMovieById = (req,res,next)=>{
    MovieModel.findByIdAndUpdate(req.params.id,req.body,(err,result)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"Movie details Updated successfully By Id",
                data:{
                    movie:result
                }
            })
        }
    })
}

// Delete By Id function : To delete perticular movie from database using ID
const deleteMovieById = (req,res,next)=>{
    MovieModel.findByIdAndRemove(req.params.id,(err,result)=>{
        if(err)
        {
            next(err)
        }
        else
        {
            res.json({
                status:"Success",
                message:"Movie deleted successfully By Id",
                data:{
                    movie:result
                }
            })
        }
    })
}

module.exports = {createMovie,readlAllMovies,readMovieById,updateMovieById,deleteMovieById};