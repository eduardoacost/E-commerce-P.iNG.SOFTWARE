import React , { useState }from "react";
import './Login.scss';
import foton from "../../Components/Assets/image 22.png"
import ojoabierto from "../../Components/Assets/ojo (1).png"
import ojocerrado from "../../Components/Assets/ojo.png"
import { Link } from "react-router-dom";

const Login = () => {
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    const toggleMostrarContrasena = () => {
        setMostrarContrasena(!mostrarContrasena);
    }

    return(
        <div className="login">
            <div className="foton">
                <img src={foton} alt="" />
            </div>
            <div className="ti">
                <p>Camisetas Colombia</p>
            </div>
            <div className="subti">
                <p>Acceso gratuito a todas las herramientas de nuestro E-commerce</p>
            </div>
            <div className="info">
                <p>Email</p>
                <input type="email" />
                <p>Contraseña</p>
                 <div className="contrasena-input">
                    <input
                        type={mostrarContrasena ? "text" : "password"}
                        placeholder=""
                    />
                    <img
                        src={mostrarContrasena ? ojoabierto : ojocerrado}
                        alt="Mostrar Contraseña"
                        onClick={toggleMostrarContrasena}
                    />
                </div>
               
            </div>
            <div className="btlogon">
                <button>Iniciar Sesion</button>
                </div>

            <div className="register">
            <Link style={{textDecoration:'none'}} to='/Registrar'><p>¿No tienes una cuenta?Registrate</p></Link>
            </div>

        </div>
    )
}

export default Login

