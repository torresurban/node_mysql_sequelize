const dotenv = require('dotenv');

//validamo si existe el archivo .env
const envFound = dotenv.config();
if(!envFound){
    throw new Error("No se encontro el archivo .env");
}

// en caso no este asignado nada en el archivo .env
// asignamos por default el ambiente de desarrollo 'development'
//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    api:{
        prefix: '/api/v1'
    },
    log: {
        level: process.env.LOG_LEVEL || 'debug'
    },
    swagger:{
        path: '/documentacion'
    },
    //databaseURL: process.env.DATABASE_URL
    database: {
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    },
    auth: {
        secret: process.env.AUTH_SECRET,
        ttl: process.env.AUTH_TTL
    }
}