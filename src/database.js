const mongoose = require('mongoose')

const { NOTES_APP_MONGODB_HOST, NOTES_APP_MONGODB_DATABASE } = process.env
const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`

// Nos pide una direccion de donde esta la DB para conectarse
// Y también pide algunas opciones de configuración
// Si le sacamos esta config, la pide por consola
mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => {
        console.log('Database is connected')
    })
    .catch(err => {
        console.log(err)
    })