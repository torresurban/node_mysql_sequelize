const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize/index.sequelize');

const Character = sequelize.define('Character', {

    iamge:{
        type: DataTypes.STRING(250),
        allowNull: true
    },
    name:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    history:{
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    weigth:{
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Character;