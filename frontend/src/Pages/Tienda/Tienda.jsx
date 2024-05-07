import React from "react";
import './Tienda.scss';
import Hero from "../../Components/Hero/Hero";
import bann1 from "../../Components/Assets/Frame 2.png";
import bann2 from "../../Components/Assets/Frame 3.png";
import bann3 from "../../Components/Assets/Frame 4.png";
import produ from "../../Components/Assets/Products.png";

const Tienda = () => {
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
                <p>Articulos en Descuento</p>
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
                <p>Articulos Interesantes</p>
            </div>
            <div className="producs">
                <img src={produ} alt="" />
            </div>
        </div>
    )
}

export default Tienda