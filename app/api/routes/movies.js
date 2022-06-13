const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');

//Create movie route
router.post('/create',movieController.createMovie);

//Real All movies route
router.get('/getAllMovies',movieController.readlAllMovies);

// Read Movie By Id route
router.get('/getMovieById/:id',movieController.readMovieById);

//update Movie By Id route
router.put('/updateMovieById/:id',movieController.updateMovieById);

//Delete Movie By Id route
router.delete('/deleteMovieById/:id',movieController.deleteMovieById);

module.exports = router;