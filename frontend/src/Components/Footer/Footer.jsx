import React from "react";
import "./Footer.scss"
import features from '../Assets/features.png'
import sectigoLogo from '../Assets/sslTrusted.png'
import { Link } from "react-router-dom";


const Footer = () => {
    return(
        <div className="Footer">
            <div className="Features">
                <img src={features} alt=""/>
            </div>
            <ul className="Mantente-Conectado">
                <p>Mantente Conectado</p>
                <li>Dirección: Cl. 45 #99-39, Cali, VAC</li>
                <li><Link style={{ textDecoration: 'none' }} to='https://wa.me/573213595249/'><p>(+57) 321 359 5249</p></Link></li>
                <p>No te nos pierdass 🤩</p>
            </ul>
            <ul className="Mansoury">
                <p>SportiFusion</p>
                <li>Nosotros</li>
                <li>Empleo</li>
                <li>Colaboración</li>
            </ul>

            <lu className="Atencion-Al-Cliente">
                <p>Atención al Cliente</p>
                <li>Normas y reglamentos</li>
                <li>Terminos de uso</li>
                <li>Procedimientos de devolución</li>
                <li>Política de privacidad</li>
            </lu>

            <lu className="Acesso-Rapido">
                <p>Acesso Rápido</p>
                <li><Link style={{ textDecoration: 'none' }} to='/Contactanos'><p>Contáctanos</p></Link></li>
                <li>Órden de Seguimientos</li>
                <li>Devoluciones y Reembolsos</li>
                
            </lu>
            <div className="Copy">
                <hr />
                <p>Copyright © 2024 - Todos los derechos reservados</p>
                <img src={sectigoLogo} alt="Trusted by ©Sectigo" />
            </div>

        </div>
    )
}

export default Footer