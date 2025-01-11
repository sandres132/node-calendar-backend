/* 
    Rutas de Usuarios / Auth
    host + /api/auth/new reistrar usuario
    host + /api/auth loggear usuario
    host + /api/auth/renew revalidarToken del usuario
*/

const { Router } = require('express');
const router = Router();
const { createUser, loginUser, tokenRevalidation } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [// middlewares
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 8 caracters').isLength({min: 8}),
        validarCampos
    ],
    createUser
)

router.post(
    '/',
    [// middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 8 caracters').isLength({min: 8}),
        validarCampos
    ],
    loginUser
);

router.get('/renew', validarJWT, tokenRevalidation );

module.exports = router;