const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize/index.sequelize');

const Movie = sequelize.define('Movie', {

    image:{
        type: DataTypes.STRING(250),
        allowNull: true
    },
    title:{
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true
    },
    creationDate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    calification:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
},{
    timestamps: false
})

module.exports = Movie;

//muchos a muchos
Movie.belongsToMany(require('./characters.models'), {
    through: 'charactersMovies',
    as: 'characters',
    foreignKey: 'movieId'
})

//uno a uno
Movie.belongsTo(require('./contentTypes.models'), {
    foreignKey: 'contentTypeId',
    targetKey: 'id',
    //as: 'contentType'
})

Movie.belongsTo(require('./genderTypes.models'), {
    foreignKey: 'genderTypeId',
    targetKey: 'id',
    //as: 'genderType',
})