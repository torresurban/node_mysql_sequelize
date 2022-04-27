const { Router } = require('express')
const router = Router()

const { getAllCharacters,
        createCharacter,
        updateCharacter,
        getCharacterById,
        deleteCharacter
        } = require('../controllers/characters.controllers.js')

const { 
        postRequestValidation,           
        putRequestValidation,
        deleteRequestValidation,
        getRequestValidation,
        getAllRequestValidation
        } = require('../middleweare/characters.middleware.js')

router.get('/', getAllRequestValidation, getAllCharacters);
router.post('/', postRequestValidation, createCharacter);
router.put('/:id(\\d+)/', putRequestValidation, updateCharacter);
router.delete('/:id(\\d+)/', deleteRequestValidation, deleteCharacter);
router.get('/:id(\\d+)/', getRequestValidation, getCharacterById);

module.exports = router;