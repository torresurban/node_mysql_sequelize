const { check } = require('express-validator');
const AppError = require('../error/appError');
const characterService = require('../services/character.services');
const { ROLES, ADMIN_ROLE, USER_ROLE } = require('../constant/index.constant');
const logger = require('../loaders/logger/index.logger');
const { validationResult } = require('./commons')
const { validJWT, hasRole } = require('./auth.middleware');

const _nameRequired = check('name').not().isEmpty().withMessage('El nombre es requerido');


const _roleValid = check('role').optional().custom(
    async (role = '') => {
        
        if (!ROLES.includes(role)) {
            throw new AppError('El rol no es valido', 400);
        }
    }
)

const _idRequied = check('id').not().isEmpty().withMessage('El id es requerido');
const _idIsNumeric = check('id').isNumeric().withMessage('El id debe ser numerico');
const _idExist = check('id').custom(
    async (id = '') => {
        const cFound = await characterService.findById(id);
        if (!cFound) {
            throw new AppError('El id no existe en la BD', 400);
        }
    }
);

const _historyRequired = check('history').not().isEmpty().withMessage('La historia es requerida');
const _ageIsNumeric = check('age').optional().isNumeric().withMessage('La edad debe ser numerico');
const _weigthIsNumeric = check('weigth').optional().isNumeric().withMessage('El peso debe ser numerico');
const _nameNotExist = check('name').custom(
    async (name = '') => {
        const cFound = await characterService.findByName(name);
        if (cFound) {
            throw new AppError('El nombre ya existe', 400);
        }
    }
)



const postRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _nameRequired,
    _nameNotExist,
    _ageIsNumeric,
    _weigthIsNumeric,
    _historyRequired,
    _roleValid,
    validationResult
]

const putRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _nameNotExist,
    _idIsNumeric,
    _idExist,
    _ageIsNumeric,
    _weigthIsNumeric,
    _roleValid,
    validationResult
]

const deleteRequestValidation = [
    validJWT,
    hasRole(ADMIN_ROLE),
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

const getAllRequestValidation = [
    validJWT,
]

const getRequestValidation = [
    validJWT,
    _idRequied,
    _idIsNumeric,
    _idExist,
    validationResult
]

module.exports = {
    postRequestValidation,
    putRequestValidation,
    deleteRequestValidation,
    getAllRequestValidation,
    getRequestValidation
}