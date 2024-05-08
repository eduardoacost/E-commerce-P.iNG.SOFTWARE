import React, { useState, useEffect } from "react";
import './Tienda.scss';
import Hero from "../../Components/Hero/Hero";
import bann1 from "../../Components/Assets/Frame 2.png";
import bann2 from "../../Components/Assets/Frame 3.png";
import bann3 from "../../Components/Assets/Frame 4.png";
import produ from "../../Components/Assets/Products.png";
import axios from "axios";

const Tienda = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/articulos/') // Utilizamos Axios para hacer la solicitud HTTP
            .then(response => {
                setProductos(response.data.articulos);
            })
            .catch(error => console.error('Error al obtener los productos:', error));
    }, []);
    return(
        <div className="Tienda">
            <Hero/>
            <p className="titulo1">
                Toda la Ropa Personalizada
            <hr/></p>
            <div className="listaarticulos">
                <li>Todas las camisetas</li>
                <li>Camisetas</li>
                <li>Camisetas all over</li>
                <li>Polos</li>
                <li>Camisetas de tirantes</li>
                <li>Camisetas media manga</li>
                <li>Camisetas manga larga</li>
                <li>Camisetas bordadas</li>
                <li>Chaquetas Personalizadas</li>
                <li>Todas las sudaderas</li>
                <li>Sudaderas con capuchas</li>
                <li>Sudaderas</li>
            </div>
            <div className="articulosdes">
                <div className="proddes">
                    {productos && productos.slice(0, 4).map(producto => (
                        // Renderizar los productos en descuento
                        <div key={producto._id} className="productosss">
                            <img src={producto.imagen} alt={producto.nombre} />
                            <div>
                            <p>{producto.nombre}
                            - ${producto.precioUnitario}</p>
                            </div>
                        </div>
                    ))}
                
                </div>
            </div>
            <div className="banners">
                <img src={bann1} alt="" />
                <img src={bann2} alt="" />
                <img src={bann3} alt="" />
            </div>
            <p className="titulo2">
                Productos Que Te Pueden Gustar
            <hr/></p>
            <div className="articuin">
                <div className="prodeuni">
                    {productos && productos.slice(0, 10).map(producto => (
                        // Renderizar los productos en descuento
                        <div key={producto._id} className="productosinte">
                            <img src={producto.imagen} alt={producto.nombre} />
                            <p>{producto.nombre}
                            - ${producto.precioUnitario}</p>
                        </div>
                    ))}
               </div>
            </div>
            <div className="producs">
                <img src={produ} alt="" />
            </div>
        </div>
    )
}

export default Tienda