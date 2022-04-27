const ContentType = require('../models/contentTypes.models');

class ContentTypeRepositorio {

    constructor(){

    }

    async finnById(id){
        return await ContentType.findByPk(id);
    }

    async findByDescription(description){
        return await ContentType.findOne({where: {description}});
    }
}

module.exports = ContentTypeRepositorio;