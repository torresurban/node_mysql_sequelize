const GenderTypes = require('../models/genderTypes.models');

class GenderTypeRepositorio {

    constructor(){

    }

    async findById(id){
        return await GenderTypes.findByPk(id);
    }

    async findByDescription(description){
        return await GenderTypes.findOne({where: {description}});
    }
}

module.exports = GenderTypeRepositorio;