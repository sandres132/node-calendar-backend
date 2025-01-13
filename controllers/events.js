const { response } = require("express");
const Evento = require("../models/evento");

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

const actualizarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const evento  = await Evento.findById( eventoId );

        if( !evento ) {
            
            return res.status(404).json({
                ok: false,
                msg: 'Evento con ese id no existe'
            });
        }

        if ( evento.user.toString() !== uid ) {
            
            return res.status(401).json({
                ok: false,
                msg: 'Privilegios insuficientes para editar este evento'
            });
        }

        const nuevoEvento ={
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        return res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}

const eliminarEvento = async( req, res = response ) => {

    const eventoId = req.params.id;
    const uid = req.uid

    try {

        const evento  = await Evento.findById( eventoId );

        if( !evento ) {
            
            return res.status(404).json({
                ok: false,
                msg: 'Evento con ese id no existe'
            });
        }

        if ( evento.user.toString() !== uid ) {
            
            return res.status(401).json({
                ok: false,
                msg: 'Privilegios insuficientes para eliminar este evento'
            });
        }

        const eventoEliminado = await Evento.findByIdAndDelete( eventoId );

        return res.json({
            ok: true,
            msg: 'Evento eliminado con exito',
            evento: eventoEliminado
        })

    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            ok: false,
            msg: 'Contacte al administrador'
        });
    }
}

module.exports = {
    actualizarEvento,
    crearEvento,
    eliminarEvento,
    obtenerEventos
}