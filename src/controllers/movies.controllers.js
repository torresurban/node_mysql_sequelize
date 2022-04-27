const express = require('express');
const movieService = require('../services/movies.services.js');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger/index.logger');
/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllMovies = async (req, res, next) => {
    try {
        logger.info('Query: ' + JSON.stringify(req.query));

        const { filter = '', options = '' } = req.query;
        const movies = await movieService.findAll(filter, options);
        res.json(new Success(movies));

    } catch (err) {
        next(err);
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createMovie = async (req, res, next) => {
    try {
        let m = req.body;
        m = await movieService.save(m);

        res.status(201).json(new Success(m));

    } catch (err) {
        next(err);
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        let m = req.body;

        const movieUpdate = await movieService.update(id, m);

        res.json(new Success(movieUpdate));

    } catch (err) {
        next(err);
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getMovieById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const m = await movieService.findById(id);

        res.json(new Success(m));

    } catch (err) {
        next(err);
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        const m = await movieService.remove(id);

        res.json(new Success(m));

    } catch (err) {
        next(err);
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

module.exports ={
    getAllMovies,
    createMovie,
    updateMovie,
    getMovieById,
    deleteMovie
}