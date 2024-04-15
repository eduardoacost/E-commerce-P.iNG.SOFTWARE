import React from "react";
import "./Footer.scss"
import features from '../Assets/features.png'

const Footer = () => {
    return(
        <div className="Footer">
            <div className="Features">
                <img src={features} alt=""/>
            </div>
            <ul className="Mantente-Conectado">
                <p>Mantente Conectado</p>
                <li>Direccion: Colombia</li>
                <li>Phone: (+52) 985 98 75</li>
                <p>siguenos en las redes sociales</p>
            </ul>
            <ul className="Mansoury">
                <p>Mansoury</p>
                <li>Sobre Nosotros</li>
                <li>Empleo</li>
                <li>Colaboracion</li>
            </ul>

            <lu className="Atencion-Al-Cliente">
                <p>Atencion al Cliente</p>
                <li>Normas y Reglamentos</li>
                <li>Terminos de Uso</li>
                <li>Procedimientos de Devolucion</li>
                <li>Politica de Privacidad</li>
            </lu>

            <lu className="Acesso-Rapido">
                <p>Acesso Rápido</p>
                <li>Contactanos</li>
                <li>Orden de Seguimientos</li>
                <li>Devoluciones y Reembolsos</li>
                
            </lu>
            <div className="Copy">
                <hr />
                <p>Copyright @ 2024 - All Rigth Reserved.</p>
            </div>

        </div>
    )
}

export default Footer