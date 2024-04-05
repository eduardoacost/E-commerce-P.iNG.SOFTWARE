const { Schema } = require('mongoose');

const compraSchema = Schema ({
    consecutivo:{
        type: int,
        require: true,
        unique: true
    },
    
    fecha:{
        type: Date,
        require: true
    },

    metodoPago:{
        type: String,
        require: true
    },

    estado:{
        type: String,
        require: true
        
    },

    direccionDomicilio:{
        type: 'object',
        properties:{
            nombre: {
                type: String,
                require: true
            },

            direccion: {
                type: String,
                require: true
            },

            ciudad:{
                type: String,
                require: true
            },

            barrio:{
                type: String
            },

            codigoPostal:{
                type: int
            },

            observaciones:{
                type: String
            }
        }
    },

    articulo:{
        type: Schema.Types.ObjectId,
        ref: "articulo",
        require: true
    }
});

const compra = mongoose.model('compra',compraSchema);
export default compra;