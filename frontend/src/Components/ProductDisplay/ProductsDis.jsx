import React, { useContext } from "react";
import "./ProductsDis.scss";
import {itemContext} from "../../Context/itemsContext";
import star_icon from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import imagenremplazable from "../Assets/product_1.png"


const ProductDisplay = ({ selectedProductId }) =>{

    const { products, addTOcart } = useContext(itemContext);

    const selectedProduct = products.find(product => product._id === selectedProductId);
    return(
        <div className="productdisplay">
            <div className="productodisplay-left">
                <div className="productdisplay-img-list">
                    <img src={selectedProduct.imagen} alt={selectedProduct.nombre}/>
                    <img src={selectedProduct.imagen} alt={selectedProduct.nombre}/>
                    <img src={selectedProduct.imagen} alt={selectedProduct.nombre}/>
                    <img src={selectedProduct.imagen} alt={selectedProduct.nombre}/>
                </div>
                <div className="productdisplay-img">
                    <img className= "productdisplay-main-img" src={selectedProduct.imagen} alt={selectedProduct.nombre}/>
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{selectedProduct.nombre}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull} alt="" />
                    
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-pricesnew">${selectedProduct.precioUnitario}</div>
                </div>
                <div className="productdisplay-right-description">
                    {selectedProduct.descripcion}
                </div>
                <div className="productdisplay-right-size">
                    <h1>Tallas Disponibles</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                    <button onClick={()=>{addTOcart(selectedProduct._id)}}>AÑADIR AL CARRITO</button>
                    
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay