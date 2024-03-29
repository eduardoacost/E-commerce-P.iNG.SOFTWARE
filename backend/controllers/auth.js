const express = require('express');
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
    

const loginUsuario = (req, res = express.request) => {
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