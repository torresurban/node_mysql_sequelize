const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize/index.sequelize');

const GenderType = sequelize.define('GenderType', {

    description:{
        type: DataTypes.STRING(50),
        allowNull: false,
    }
},{
    timestamps: false
})

module.exports = GenderType;