const { Schema, model } = require('mongoose')
// Schema lo que hace es definir un esquema, que se guarda dentro de mongodb
// Model, a partir de un esquema, crea una clase que va a tener metodos

// Creamos esquema de las notas que vamos a guardar en la base de datos
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, {
    // Esto lo trae mongoose, y le agrega "CreatedAt" y "UpdatedAt"
    timestamps: true,
})

// Todavía no interactuamos con la base de datos
// Entonces creamos una colección 

module.exports = model('Note', NoteSchema)