const express = require ('express')
require('dotenv').config()

const app = express();

// Rutas
app.get('/',(req,ress) => {
    ress.json({
        ok:true
    })
})

// Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto', process.env.PORT)
})