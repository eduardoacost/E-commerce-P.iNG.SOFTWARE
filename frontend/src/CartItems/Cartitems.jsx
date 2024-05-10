import React, { useContext, useState } from 'react';
import "./CartItems.scss";
import { itemContext } from "../Context/itemsContext";
import removeicon from "../Components/Assets/cart_cross_icon.png";
import imagenremplazable from "../Components/Assets/product_1.png";
import { Link } from 'react-router-dom';

const Cartitems = () => {
    const { products, cartItems, removeFormcart, getTotalcarAmount } = useContext(itemContext);
    const [selectedSizes, setSelectedSizes] = useState({});

    const handleSizeChange = (productId, newSize) => {
        setSelectedSizes({ ...selectedSizes, [productId]: newSize });
    }

    // Función para obtener los productos en el carrito
    const getProductosEnCarrito = () => {
        const productosEnCarrito = [];
        for (const id in cartItems) {
            if (cartItems[id] > 0) {
                const producto = products.find(producto => producto._id === id);
                if (producto) {
                    productosEnCarrito.push({
                        id: producto._id,
                        nombre: producto.nombre,
                        precioUnitario: producto.precioUnitario,
                        cantidad: cartItems[id],
                        talla: selectedSizes[producto._id] || '', // Agregar la talla seleccionada
                    });
                }
            }
        }
        return productosEnCarrito;
    };

    const productosEnCarrito = getProductosEnCarrito();


    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Productos</p>
                <p>Titulo</p>
                <p>Talla</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Total</p>
                <p>Borrar</p>
            </div>
            <hr />
            <div>
                {products && products.map(product => {
                    if (cartItems[product._id] > 0) {
                        return (
                            <div key={product._id}>
                                <div className="cartimes-format cartitems-format-main">
                                    <img src={product.imagen} alt={product.nombre} className='carticon-product-icon' />
                                    <p>{product.nombre}</p>
                                    <div>
                                        <select className='droptallas'
                                            value={selectedSizes[product._id] || ''}
                                            onChange={(e) => handleSizeChange(product._id, e.target.value)}
                                        >
                                            <option value="">Selecciona Talla</option>
                                            {Object.keys(product.stock.tallas).map(talla => (
                                                <option key={talla} value={talla}>{`${talla} (${product.stock.tallas[talla]} disponible)`}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <p>{product.precioUnitario}</p>
                                    <button className='cartitmes-cantidad'>{cartItems[product._id]}</button>
                                    <p>${product.precioUnitario * cartItems[product._id]}</p>
                                    <img className="cart-remove-icon" src={removeicon} onClick={() => { removeFormcart(product._id) }} alt="" />
                                </div>
                                <hr />
                            </div>
                        );
                    }
                    return null;
                })}
                <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total Carrito</h1>
                    <div>
                        <div className="cartitmes-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalcarAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitmes-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitmes-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalcarAmount()}</h3>
                        </div>
                    </div>
                    <Link to={`/Compra?productos=${encodeURIComponent(JSON.stringify(productosEnCarrito))}`}>
                        <button>PROCEDER AL CHECKOUT</button>
                    </Link>
                </div>
                <div className="cartitems-promocode">
                    <p>Si tienes un codigo de promocion,ingresalo aqui</p>
                    <div className="cartitem-promobox">
                        <input type="text" placeholder='Codigo de Promocion' />
                        <button>Submit</button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Cartitems;
