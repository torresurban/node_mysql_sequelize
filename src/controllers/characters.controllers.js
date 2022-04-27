const express = require('express');
const characterService = require('../services/character.services');
const Success = require('../handlers/successHandler');
const logger = require('../loaders/logger/index.logger');

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getAllCharacters = async (req, res, next) => {
    try {
        
        logger.info('Query: ' + JSON.stringify(req.query));

        const { filter = '', options = '' } = req.query;

        const characters = await characterService.findAll(filter, options);
        res.json(new Success(characters));

    } catch (err) {
        next(err);
    }
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const createCharacter = async (req, res, next) => {
    try {
        
        let c = req.body;
        c = await characterService.save(c);

        
        res.status(201).json(new Success(c));

    } catch (err) {
        next(err);
    }    
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const updateCharacter = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        let c = req.body;

        const characterUpdate = await characterService.update(id, c);

        
        res.json(new Success(characterUpdate));

    } catch (err) {
        next(err);
    }    
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const getCharacterById = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const character = await characterService.findById(id);

        
        res.json(new Success(character));

    } catch (err) {
        next(err);
    }    
}

/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */

const deleteCharacter = async (req, res, next) => {
    try {
        
        const { id } = req.params;
        const character = await characterService.remove(id);

        
        res.json(new Success(character));

    } catch (err) {
        next(err);
    }    
}

module.exports = {
    getAllCharacters,
    createCharacter,
    updateCharacter,
    getCharacterById,
    deleteCharacter
}