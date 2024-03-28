const express = require ('express')
require('dotenv').config()

const app = express();

app.use(express.static('../frontend'));

//Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth',require('./routes/auth.js'));

app.get('/',(req,res) => {
    res.json({
        ok:true
    })
})

// Escuchar en puerto 4000
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto:', process.env.PORT)
})