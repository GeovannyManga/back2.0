//en este archivo se guardaran todas las variables de configuracion
const config = {
    appConfig : {
        port : process.env.APP_PORT||3000
    },

    dbConfig : {
        uri : process.env.URI,
        host : process.env.DB_HOST||"https://back20-production.up.railway.app/",
        dbName : process.env.DB_NAME,
        dbPort : process.env.DB_PORT||3000
    }
}


module.exports = config