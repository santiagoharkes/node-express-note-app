const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true,
})

// methods viene desde mongoose
// nos permite crear metodos para una clase
// porque mongoose se basa en un modelo orientado a objetos

UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema)