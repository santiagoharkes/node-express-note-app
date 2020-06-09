require('dotenv').config()

// Importamos el server express
const app = require('./server')

require('./database')

// Ahora se puede ejecutar
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

