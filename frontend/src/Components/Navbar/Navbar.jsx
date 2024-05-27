import React, { useState, useEffect, useContext } from "react";
import './Navbar.scss';
import logo from '../Assets/WhatsApp Image 2024-05-27 at 12.28.12 PM.jpeg';
import cart_icon from '../Assets/cart_icon.png';
import { Link } from "react-router-dom";
import { itemContext } from "../../Context/itemsContext";

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isDesigner, setIsDesigner] = useState(false);
    const { getTotalCartItems } = useContext(itemContext);
    const [isAdminOption, setIsAdminOption] = useState("");

    useEffect(() => {
        // Obtener el token del localStorage
        const token = localStorage.getItem('auth-token');

        if (token) {
            // Decodificar el token JWT manualmente
            const decodedToken = parseJwt(token);
            console.log("infotoke:",decodedToken)
            console.log("infous:",decodedToken.isAdmin)
            // Verificar si el usuario es administrador o diseñador
            if (decodedToken.isAdmin) {
                setIsAdmin(true);
            }
            if (decodedToken.isDesigner) {
                setIsDesigner(true);
            }
        }
    }, []);

    // Función para decodificar el token JWT manualmente
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            return {};
        }
    };

     // Función para manejar la redirección del dropdown del administrador
     const handleAdminDropdownChange = (e) => {
        const selectedOption = e.target.value;
        setIsAdminOption(selectedOption);
        if (selectedOption) {
            window.location.replace(selectedOption); // Redireccionar a la ruta seleccionada
        }
    };

    return (
        <div className="navbar">
        <div className="nav-logo">
            <img src={logo} alt="" />
            <p>SportiFusion</p>
        </div>
        <ul className="nav-menu">
            <li>
                <Link style={{ textDecoration: 'none' }} to='/'>Inicio</Link>
            </li>
            
            <li>
                <Link style={{ textDecoration: 'none' }} to='/Contactanos'>Contactanos</Link>
            </li>
        </ul>
        <div className="nav-login-cart">
            {isAdmin && (
                <div className="admin-dropdown">
                    <select className="admin-select" onChange={handleAdminDropdownChange} value={isAdminOption}>
                        <option value="">Administrar</option>
                        <option value="/VerPedidosAdmin">Compras</option>
                        <option value="/ListaDiseños">Ver Lista de Diseños</option>
                        <option value="/AñadirArticulos">Artículos</option>
                        <option value="/Categorias">Categorias</option>
                    </select>
                </div>
            )}
            {isDesigner && (
                <Link to="/ListaDiseñosDiseñador"><button>Lista de Diseños</button></Link>
            )}
             {!isAdmin && !isDesigner && localStorage.getItem('auth-token') &&(
                
                <>
                <Link to='/VerPedidos'><button>Ver Tus Pedidos</button></Link>
                <Link to='/DiseñosSolicitados'><button>Diseños Solicitados</button></Link>
            </>
            )}
            {!localStorage.getItem('auth-token') && (
                <Link to='/Login'><button>Iniciar Sesión</button></Link>
            )}
            {localStorage.getItem('auth-token') ? (
                <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/") }}>Cerrar Sesión</button>
            ) : null}
            <Link to='/Carrito'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
    );
};

export default Navbar;
