import React, { useContext, useState, useEffect } from 'react';
import { itemContext } from '../../../Context/itemsContext';
import './Eliminart.scss';

const Eliminart = () => {
    const { products, eliminarArticulo, actualizarArticulo } = useContext(itemContext);
    const [selectedProductId, setSelectedProductId] = useState(null); // Usamos solo el ID del producto seleccionado
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDetails, setShowDetails] = useState(false); // Estado para controlar la visibilidad de los detalles

    useEffect(() => {
        if (products.length > 0) {
            setSelectedProductId(products[0]._id); // Seleccionamos el primer producto automáticamente
        }
    }, [products]);

    useEffect(() => {
        // Buscamos el producto seleccionado por su ID
        if (selectedProductId) {
            const foundProduct = products.find(product => product._id === selectedProductId);
            setSelectedProduct(foundProduct);
        }
    }, [selectedProductId, products]);

    const handleDelete = async (id) => {
        try {
            await eliminarArticulo(id);
            alert("Has eliminado un artículo");
        } catch (error) {
            console.error('Error al eliminar el artículo:', error);
        }
    };

    const handleUpdate = async () => {
        try {
            // Aquí puedes enviar solo los campos que has modificado, no necesitas enviar todos los campos
            await actualizarArticulo(selectedProduct._id, selectedProduct);
            alert("Has actualizado el artículo");
        } catch (error) {
            console.error('Error al actualizar el artículo:', error);
        }
    };

    const handleChange = (e, field) => {
        // Actualizamos solo el campo modificado del producto seleccionado
        setSelectedProduct({ ...selectedProduct, [field]: e.target.value });
    };

    const handleTallaChange = (e, talla) => {
        const { value } = e.target;
        // Verificar si el valor es negativo y si es así, establecerlo como 0
        const newValue = parseInt(value) < 0 ? 0 : parseInt(value);
        const newTallas = {
            ...selectedProduct.stock.tallas,
            [talla]: newValue
        };
        const newTotal = Object.values(newTallas).reduce((acc, curr) => acc + curr, 0);
        const newStock = {
            ...selectedProduct.stock,
            tallas: newTallas,
            total: newTotal
        };
        setSelectedProduct(prevState => ({
            ...prevState,
            stock: newStock
        }));
    };

    const toggleDetails = (productId) => {
        if (selectedProduct && selectedProduct._id === productId) {
            setShowDetails(!showDetails); // Cambia el estado de visibilidad de los detalles
        } else {
            setShowDetails(true); // Muestra los detalles del nuevo producto seleccionado
        }
        setSelectedProductId(productId);
    };

    return (
        <div className='Eliminart'>
            <div className='titlee'>
            <h2>Artículos</h2>
            </div>
            <hr />
            
                <div className="titlespro">
                    <p>Nombre Articulo</p>
                    <p>Imagen</p>
                    <p>Stock</p>
                    <p>Detalles</p>
                    
                </div>
                <hr />
                {products.map(product => (
                    <div key={product._id} >
                        <div className='product'>
                        <p>{product.nombre}</p>
                        <img src={product.imagen} alt="" />
                        <label> {product.stock.total}</label>
                        {/* Agregar el resto de la información del producto aquí */}
                        <button onClick={() => toggleDetails(product._id)}>
                            {showDetails && selectedProduct && selectedProduct._id === product._id ? "Ocultar detalles" : "Detalles"}
                        </button>
                        </div>
                        <hr />
                        {showDetails && selectedProduct && selectedProduct._id === product._id && (
                            <div className='selected-product'>
                                
                                <label>Nombre:</label>
                                <input type="text" value={selectedProduct.nombre} onChange={(e) => handleChange(e, 'nombre')} />
                                <label>Descripción:</label>
                                <input type="text" value={selectedProduct.descripcion} onChange={(e) => handleChange(e, 'descripcion')} />
                                {/* Agrega los demás campos de información del producto aquí */}
                                <label>Precio:</label>
                                <input type="number" value={selectedProduct.precioUnitario} onChange={(e) => handleChange(e, 'precioUnitario')} />
                                <label>Comentario:</label>
                                <input type="text" value={selectedProduct.comentario} onChange={(e) => handleChange(e, 'comentario')} />
                                <label>Personalizable:</label>
                                <select value={selectedProduct.isPersonalizable} onChange={(e) => handleChange(e, 'isPersonalizable')}>
                                    <option value={true}>Sí</option>
                                    <option value={false}>No</option>
                                </select>
                                <label>Imagen:</label>
                                <input type="text" value={selectedProduct.imagen} onChange={(e) => handleChange(e, 'imagen')} />
                                {/* Mostrar las tallas existentes y permitir al usuario modificar las cantidades */}

                                {Object.entries(selectedProduct.stock.tallas).map(([talla, cantidad]) => (
                                    <div key={talla}>
                                        <label>{`Talla ${talla}`}</label>
                                        <input type="number" value={cantidad} onChange={(e) => handleTallaChange(e, talla)} />
                                    </div>
                                ))}
                                
                                {/* Agrega más campos de entrada para otros datos que desees actualizar */}
                                <button onClick={() => handleDelete(selectedProduct._id)}>Eliminar</button>
                                <button onClick={handleUpdate}>Actualizar</button>
                            </div>
                        )}
                    </div>
                ))}
            
        </div>
    );
};

export default Eliminart;
