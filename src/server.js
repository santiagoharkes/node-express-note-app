// Aquí solo se exporta y configura el servidor , no se ejecuta.
// El encargado de la ejecución es index.js

const express = require('express')
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const path = require('path')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')

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
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}))

app.set('view engine', '.hbs')

// ------- Middlewares

// Cada vez que llegan datos de un formulario por cualquier metodo, lo trata de convertir a formato JSON.
app.use(express.urlencoded({ extended: false }))

// MethodOverride es una libreria que ayuda a los forms html a que puedan usar varios metodos (como delete) que serían difíciles de hacer
// Se envia a traves de post, pero con una query ?_method=DELETE, se le agrega el metodo que quieras
app.use(methodOverride('_method'))

// Este es el modulo que nos va a ayudar a guardar mensajes tipo estados en el servidor para comunicar de pagina en pagina
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

// ------- Global variables

// Definimos variables globales, por ejemplo queremos definir la variable global de flash, que es donde se guardan los mensajes que vamos a pasar a diferentes sesiones
// Creamos nuestro propio middleware
app.use((req, res, next) => {
    res.locals.suc_msg = req.flash('suc_msg')
    next();
})

// ------- Routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))

// ------- Static files

// Le dice a node donde esta la carpeta public, que sera la de los archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app;