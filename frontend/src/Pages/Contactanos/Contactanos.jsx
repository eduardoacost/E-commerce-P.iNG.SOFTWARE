import React from "react";
import './Contactanos.scss'

const Contactanos = () => {
    return(
        <div className="Contactanos">
            <p className="cami">Camisetas Colombia</p>
            <div className="titulo">
                <p className="form">
                    Formulario de Contacto
                </p>
                <p className="subtitulo">¡Mándanos un Mensaje aqui mismo usando el formulario!</p>
            </div>
            <div className="datosmensaje">
                <p>Nombre Completo</p>
                <input type="text" />
                <p>Email</p>
                <input type="text" />
            </div>
            <div className="mensaje">
                <p>Mensaje</p>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>
            <div className="botonenviar">
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default Contactanos