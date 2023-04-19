//en este archivo se guardaran todas las variables de configuracion
const config = {
    appConfig : {
        port : process.env.APP_PORT||8080
    },

    dbConfig : {
        uri : process.env.URI,
        host : process.env.DB_HOST,
        dbName : process.env.DB_NAME,
        dbPort : process.env.DB_PORT||8080
    }
}


module.exports = config