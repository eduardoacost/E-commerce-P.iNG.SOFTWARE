import React, { useContext, useState } from "react";
import "./ProductsDis.scss";
import { itemContext } from "../../Context/itemsContext";
import star_icon from "../Assets/star_icon.png";
import star_dull from "../Assets/star_dull_icon.png";
import imagenremplazable from "../Assets/product_1.png";

const ProductDisplay = ({ selectedProductId }) => {
    const { products, addTOcart } = useContext(itemContext);

    const selectedProduct = products.find(product => product._id === selectedProductId);

    const [customDescription, setCustomDescription] = useState('');
    const [customImageUrl, setCustomImageUrl] = useState('');

    const handleCreateDesign = () => {
        // Handle the creation of the custom design here
        console.log('Custom Design Created:', customDescription, customImageUrl);
    };

    return (
        <div className="productdisplay">
            <div className="productodisplay-left">
                <div className="productdisplay-img-list">
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={selectedProduct.imagen} alt={selectedProduct.nombre} />
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
                    <button onClick={() => { addTOcart(selectedProduct._id) }}>AÑADIR AL CARRITO</button>
                </div>
                {selectedProduct.isPersonalizable && (
                    <div className="productdisplay-customization">
                        <h2>Personaliza tu Producto</h2>
                        <div className="descripdes">
                            <label>Descripción:</label>
                            <input
                                type="text"
                                value={customDescription}
                                onChange={(e) => setCustomDescription(e.target.value)}
                            />
                        </div>
                        <div className="imagendes">
                            <label>URL Imagen:</label>
                            <input
                                type="text"
                                value={customImageUrl}
                                onChange={(e) => setCustomImageUrl(e.target.value)}
                            />
                        </div>
                        <button onClick={handleCreateDesign}>CREAR DISEÑO</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDisplay;
