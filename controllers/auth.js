const { response } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')

const createUser = async(req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email })

        if( usuario ){
            
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con ese email'
            })
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name );

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            "ok": false,
            msg: 'Por favor contacte al administrador',
        });
    }
};

const loginUser = async(req, res = response ) => {

    const { email, password } = req.body;
    
    try {
        const usuario = await Usuario.findOne({ email })

        if( !usuario ){
            // console.log('email');
            
            return res.status(400).json({
                ok: false,
                msg: 'Email o Password incorrectos porfavor verifica los datos introducidos'
            })
        }

        //confirmar los passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ){
            // console.log('password');
            
            return res.status(400).json({
                ok: false,
                msg: 'Email o Password incorrectos porfavor verifica los datos introducidos'
            })

        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name );

        
        return res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            "ok": false,
            msg: 'Por favor contacte al administrador',
        });
    }
};

const tokenRevalidation = async(req, res = response ) => {

    const {uid, name} = req;
    
    // Generar nuevo JWT
    const token = await generarJWT( uid, name );

    res.json({
        "ok": true,
        uid,
        name,
        token
    });
};

module.exports = {
    createUser,
    loginUser,
    tokenRevalidation,
};