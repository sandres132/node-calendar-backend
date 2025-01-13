/* 
    events routes
    /api/events
*/

const { Router } = require("express");
const router = Router();
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

// Todas las peticiones bajo este router pasan por la validacion del JWT
router.use(validarJWT);

//obtener eventos
router.get('/',obtenerEventos );

//crear evento
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento );

//actualizar evento
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').notEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha final es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento );

//actualizar evento
router.delete('/:id', eliminarEvento );

module.exports = router;