// Aquí solo se exporta y configura el servidor , no se ejecuta.
// El encargado de la ejecución es index.js

const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

// Inicializamos
const app = express()

// ------- Settings

// Seteamos el puerto
app.set('port', process.env.PORT || 4000)

// Establecemos dónde está la carpeta views
app.set('views', path.join(__dirname, 'views'))

// Seteamos un motor de plantillas
// Express tiene un metodo engine para eso
// exphbs, configura express handlebars.
// Express handlebars se separa en partials y layouts.
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

// ------- Middlewares

// Cada vez que llegan datos de un formulario por cualquier metodo, lo trata de convertir a formato JSON.
app.use(express.urlencoded({ extended: false }))


// ------- Global variables

// ------- Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))

// ------- Static files

// Le dice a node donde esta la carpeta public, que sera la de los archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;