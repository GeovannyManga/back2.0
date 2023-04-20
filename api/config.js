//en este archivo se guardaran todas las variables de configuracion
const config = {
    appConfig : {
        port : 3000||process.env.APP_PORT
    },

    dbConfig : {
        uri : process.env.URI,
        host : process.env.DB_HOST,
        dbName : process.env.DB_NAME,
        dbPort : process.env.DB_PORT
    }
}


module.exports = config