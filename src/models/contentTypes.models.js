const { DataTypes } = require('sequelize');
const sequelize = require('../loaders/sequelize/index.sequelize');

const ContentType = sequelize.define('ContentType', {
    
    description:{
        type: DataTypes.STRING(50),
        allowNull: false,
    }
},{
    timestamps: false
})

module.exports = ContentType;