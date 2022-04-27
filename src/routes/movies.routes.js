const { Router } = require('express')
const router = Router()

const { getAllMovies,
        createMovie,
        updateMovie,
        getMovieById,
        deleteMovie
        } = require('../controllers/movies.controllers.js')

const { 
        postRequestValidation,           
        putRequestValidation,
        deleteRequestValidation,
        getRequestValidation,
        getAllRequestValidation
        } = require('../middleweare/movies.middleware.js')

router.get('/', getAllRequestValidation, getAllMovies);
router.post('/', postRequestValidation, createMovie);
router.put('/:id(\\d+)/', putRequestValidation, updateMovie);
router.delete('/:id(\\d+)/', deleteRequestValidation, deleteMovie);
router.get('/:id(\\d+)/', getRequestValidation, getMovieById);

module.exports = router;