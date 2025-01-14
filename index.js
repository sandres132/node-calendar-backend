const path = require("path");
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
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Para despliegue del frontend
app.use( '*', (req, res) => {
    res.sendFile( path.join( __dirname, "public/index.html") );
});

// Escuchar las peticiones
app.listen( port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
} );

