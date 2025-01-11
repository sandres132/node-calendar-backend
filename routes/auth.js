/* 
    Rutas de Usuarios / Auth
    host + /api/auth/new reistrar usuario
    host + /api/auth loggear usuario
    host + /api/auth/renew revalidarToken del usuario
*/

const { Router } = require('express');
const router = Router();
const { createUser, loginUser, tokenRevalidation } = require('../controllers/auth')

router.post('/new', createUser )

router.post('/', loginUser );

router.get('/renew', tokenRevalidation );

module.exports = router;