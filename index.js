const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConection } = require('./database/config')

// Llamar varianble puerto en .env
const port = process.env.PORT

// Crear el servidor de express
const app = express();

// Base de datos
dbConection();

// CORS
app.use(cors());

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'))

// TODO: CRUD: eventos
// algoo...

// Escuchar las peticiones
app.listen( port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
} );

