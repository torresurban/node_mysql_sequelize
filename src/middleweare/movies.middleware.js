const { check } = require('express-validator');
const AppError = require('../error/appError');
const movieService = require('../services/movies.services');
const characterService = require('../services/character.services');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../constant/index.constant');
const logger = require('../loaders/logger/index.logger');
const { validationResult } = require('./commons')
const { validJWT, hasRole } = require('./auth.middleware');
const GenderTypeRepositorio = require('../repositorios/genderType.repositorios');
const ContentTypeRepositorio = require('../repositorios/contentType.repositorios');
const genderTypeRepositorio = new GenderTypeRepositorio();
const contentTypeRepositorio = new ContentTypeRepositorio();


const _idExist = check('id').custom(
    async (id = '') => {
        const mFound = await movieService.findById(id);
        if (!mFound) {
            throw new AppError('El id no existe en la BD', 400);
        }
    }
)

const _creationDateIsDateAndOptional = check('creationDate').optional().isDate().withMessage('La fecha debe ser una fecha valida');
const _creationDateRequired = check('creationDate').not().isEmpty().withMessage('La fecha de creacion es requerida');
const _creationDateIsDate = check('creationDate').isDate().withMessage('La fecha de creacion debe ser una fecha valida');

const _titleOptional = check('title').optional()
const _titleRequired = check('title').not().isEmpty().withMessage('El titulo es requerido');
const _titleNotExist = check('title').custom(
    async (title = '') => {
        const mFound = await movieService.findByTitle(title);
        if (mFound) {
            throw new AppError('El titulo ya existe', 400);
        }
    }
)

const _calificationIsNumericAndOptional = check('calification').optional().isNumeric().withMessage('La calificacion debe ser numerica');
const _calificationRequired = check('calification').not().isEmpty().withMessage('La calificacion es requerida');
const _calificationIsNumeric = check('calification').isNumeric().withMessage('La calificacion debe ser numerica');

const _contentTypeExistValadation = async (contentType = '') => {
    const contentTypeFound = await contentTypeRepositorio.findByDescription(contentType);
    if (!contentTypeFound) {
        throw new AppError('El tipo de contenido no existe', 400);
    }
}

const _genderTypeExistValadation = async (genderType = '') => {
    const genderTypeFound = await genderTypeRepositorio.findByDescription(genderType);
    if (!genderTypeFound) {
        throw new AppError('El tipo de genero no existe', 400);
    }
}

const _contentTypeExist = check('contentType').custom(_contentTypeExistValadation);

const _genderTypeExist = check('genderType').custom(_genderTypeExistValadation);

const _contentTypeExistAndOptional = check('contentType').optional().custom(_contentTypeExistValadation);

const _genderTypeExistAndOptional = check('genderType').optional().custom(_genderTypeExistValadation);

const _idRequired = (name) => {
    return check(name).not().isEmpty().withMessage(`El id es requerido`);
}

const _idIsNumeric = (name) => {
    return check(name).isNumeric().withMessage(`El id debe ser numerico`);
}

const _idCharacterExist = check('idCharacter').custom(
    async (idCharacter = '', {req}) => {
        const cFound = await characterService.findById(idCharacter);
        if (!cFound) {
            throw new AppError('El id del personaje no existe', 400);
        }
        req.character = cFound;
    }
);

const _idMovieExist = check('idMovie').custom(
    async (idMovie = '', {req}) => {
        const mFound = await movieService.findById(idMovie);
        if (!mFound) {
            throw new AppError('El id de la pelicula no existe', 400);
        }
        req.movie = mFound;
    }
)

const postRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _titleRequired,
    _titleNotExist,
    _creationDateRequired,
    _creationDateIsDate,
    _calificationRequired,
    _calificationIsNumeric,
    _contentTypeExist,
    _genderTypeExist,
    validationResult
]

const putRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    _titleOptional,
    _titleNotExist,
    _creationDateIsDateAndOptional,
    _calificationIsNumericAndOptional,
    _contentTypeExistAndOptional,
    _genderTypeExistAndOptional,
    validationResult
]

const deleteRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT,
]

const getRequestValidation = [
    validJWT,
    _idRequired('id'),
    _idIsNumeric('id'),
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidation,
    putRequestValidation,
    deleteRequestValidation,
    getAllRequestValidation,
    getRequestValidation,
}