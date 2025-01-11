const express = require('express');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Llamar varianble puerto en .env
const port = process.env.PORT

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth'))

// Escuchar las peticiones
app.listen( port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
} );

