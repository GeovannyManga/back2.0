//configuraciones para conectar mongoose al server
const mongoose = require('mongoose')

mongoose.connection.on('open', () => console.log('db connected '))

async function connectDb({ uri }) {
    try {
        await mongoose.connect( uri, {useNewUrlParser : true})
    } catch (error) {
        console.log({error : error.message})
    }
}

module.exports = connectDb