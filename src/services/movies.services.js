const MovieRepositorio = require('../repositorios/movies.repositorios');
//const CharacterRepositorio = require('../repositorios/character.repositorios');
const GenderTypeRepositorio = require('../repositorios/genderType.repositorios');
const ContentTypeRepositorio = require('../repositorios/contentType.repositorios');
const repositorio = new MovieRepositorio();
//const characterRepositorio = new CharacterRepositorio();
const genderTypeRepositorio = new GenderTypeRepositorio();
const contentTypeRepositorio = new ContentTypeRepositorio();

const findById = async (id) => {
    return await repositorio.findByIdWithCharacters(id);
}

const findByTitle = async (title) => {
    return await repositorio.findByTitle(title);
}

const findAll = async (filter, options) => {
    return await repositorio.findAll(filter, options);
}

const save = async (m) => {
    const genderType = await genderTypeRepositorio.findByDescription(m.genderType);
    const contentType = await contentTypeRepositorio.findByDescription(m.contentType);
    m.genderTypeId = genderType.id;
    m.contentTypeId = contentType.id;
    return await repositorio.save(m);
}

const update = async (id, m) => {
    if(m.genderType) {
        const genderType = await genderTypeRepositorio.findByDescription(m.genderType);
        const contentType= await contentTypeRepositorio.findByDescription(m.contentType);
        m.genderTypeId = genderType.id;
        m.contentTypeId = contentType.id;
    }
    return await repositorio.update(id, m);
}

const remove = async (id) => {
    return await repositorio.remove(id);
}

module.exports = {
    findById,
    findByTitle,
    findAll,
    save,
    update,
    remove
}