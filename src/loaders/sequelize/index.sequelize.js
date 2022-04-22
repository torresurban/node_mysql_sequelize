const { Sequelize } =  require('sequelize')
const config = require('../../config/index.config')

const sequelize = new Sequelize(
    config.database.database,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        dialect: 'mysql',
    }
)

module.exports = sequelize