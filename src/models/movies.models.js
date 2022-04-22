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
})

module.exports = Movie;