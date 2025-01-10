const express = require('express');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Llamar varianble puerto en .env
const port = process.env.PORT

// Directorio publico
app.use( express.static('public') );

// Rutas
// app.get('/', (req, res) => {

//     res.json({
//         "ok": true
//     })
// })

// Escuchar las peticiones
app.listen( port, () => {
    console.log(`Servidor corriendo en puerto: ${port}`);
} );

