const express = require('express');
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

const crearUsuario = async (req, res = express.request ) => {
    const {name, email, password} = req.body
    try{
        let usuario = await usuario.findOne({email: email})
        if ( usuario ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo con ese correo ya existe',
            })
        }

        usuario = new usuario(req.body);
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            error,
        })
    }
}
    

const loginUsuario = async (req, res = express.request) => {
    const { email, password} = req.body

    try{
        let usuario = await usuario.findOne({email: email})
        if (!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El Usuario no existe'
            })
        }
        
        const passwordValid = bcrypt.compareSync(password, usuario.password);
        if (!passwordValid){
            return res.status(400).json({
                ok: false,
                msg: 'Password no válido',
            })
        }
        res.status(200).json({
            ok: true,
            usuario,
        })
    }   catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            error,
        })
    }
    res.json({
        ok:true
    })
    
}

const revalidarToken = (req, res = express.request) => {
    res.json({
        ok: true
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}