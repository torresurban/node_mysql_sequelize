const CharacterRepositorio = require('../repositorios/character.repositorios');
const repositorio = new CharacterRepositorio();

const findById = async (id) => {
    return await repositorio.findByIdWithMovies(id);
}

const  findByName = async (name) => {
    return await repositorio.findByName(name);
}

const findAll = async (filter, options) => {
    return await repositorio.findAll(filter, options);
}

const save = async (c) => {
    return await repositorio.save(c);
}

const update = async (id, c) => {
    return await repositorio.update(id, c);
}

const remove = async (id) => {
    return await repositorio.remove(id);
}

module.exports = {
    findById,
    findByName,
    findAll,
    save,
    update,
    remove
}