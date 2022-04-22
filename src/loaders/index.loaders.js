const ExpressServer = require('./server/express.server');
//const mongooseLoaders = require('./mongoose/index.mongoose')
const sequelize = require('./sequelize/index.sequelize')
const config = require('../config/index.config');
const logger = require('./logger/index.logger');

module.exports = async () => {

    try {
      
    await sequelize.authenticate();
    
    sequelize.sync({ force: false });
    //await mongooseLoaders();
    logger.info('Base de dato cargado y conectado');
    
    const server = new ExpressServer();
    //console.log('Express Loaded');
    logger.info('Express Loaded');

    server.start();
    //console.log(`Server listening on port ${config.port}`);
    logger.info(`#######################################
      Server listening on port: ${config.port}
      #######################################
    `);

    } catch (error) {
      console.error('No se puede conectar a la base de datos', error);
    }

}

