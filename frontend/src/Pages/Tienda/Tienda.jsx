import React, { useContext } from "react";
import './Tienda.scss';
import Hero from "../../Components/Hero/Hero";
import bann1 from "../../Components/Assets/Frame 2.png";
import bann2 from "../../Components/Assets/Frame 3.png";
import bann3 from "../../Components/Assets/Frame 4.png";
import produ from "../../Components/Assets/Products.png";
import { Link } from "react-router-dom";
import { itemContext } from "../../Context/itemsContext";

const Tienda = () => {
    const { products } = useContext(itemContext);

    return(
        <div className="Tienda">
            <Hero/>
            <p className="titulo1">
                Algunos de Nuestros Productos
                <hr/>
            </p>
            <div className="articulosdes">
                <div className="proddes" >
                    {products && products.slice(0, 4).map(producto => (
                        <Link style={{ textDecoration: 'none' }} key={producto._id}  to={`/Preview/${producto._id}`}>
                            <div className="productosss">
                                <img src={producto.imagen} alt={producto.nombre} />
                                <div>
                                    <p>{producto.nombre} - ${producto.precioUnitario}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="banners">
                <img src={bann1} alt="" />
                <img src={bann2} alt="" />
                <img src={bann3} alt="" />
            </div>
            <p className="titulo2">
                Todos Nuestros Productos 
                <hr/>
            </p>
            <div className="filtros">
                <button>Hombres</button>
                <button>Mujeres</button>
                <button>Acessorios</button>
                <button>Personalizables</button>

            </div>
            <div className="articuin">
                <div className="prodeuni" style={{ textDecoration: 'none' }}>
                {products.map(producto => (
                        <Link key={producto._id} to={`/Preview/${producto._id}`}>
                            <div className="productosinte">
                                <img src={producto.imagen} alt={producto.nombre} />
                                <p>{producto.nombre} - ${producto.precioUnitario}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="producs">
                <img src={produ} alt="" />
            </div>
        </div>
    );
}

export default Tienda;
