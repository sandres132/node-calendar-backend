const { response } = require("express");
const Evento = require("../models/Evento");

const obtenerEventos = async( req, res = response ) => {

    const eventos = await Evento.find()
    .populate('user', 'name');
    
    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async( req, res = response ) => {

    const evento = new Evento( req.body );
    
    try {
        evento.user = req.uid

        const eventoGuardado = await evento.save()

        return res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }

}

const actualizarEvento = ( req, res = response ) => {

    return res.json({
        ok: true,
        msg: 'actualizarEvento'
    })

}

const eliminarEvento = ( req, res = response ) => {

    return res.json({
        ok: true,
        msg: 'eliminarEvento'
    })

}

module.exports = {
    actualizarEvento,
    crearEvento,
    eliminarEvento,
    obtenerEventos
}