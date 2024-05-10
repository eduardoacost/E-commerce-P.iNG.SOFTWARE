import React, { useState, useContext, useEffect } from 'react';
import { itemContext } from '../../Context/itemsContext';
import axios from 'axios';

const Añaarti = () => {
  const [newArticle, setNewArticle] = useState({
    nombre: '',
    descripcion: '',
    precioUnitario: 0,
    categoria: '', // Aquí debes incluir las propiedades adicionales según tu modelo
    stock: {
      tallas: {},
      total: 0
    },
    comentario: '',
    isPersonalizable: false,
    imagen: '' // Asegúrate de agregar todos los campos necesarios del modelo
  });

  const [categorias, setCategorias] = useState([]);
  const { addArticleToDatabase } = useContext(itemContext);

  useEffect(() => {
    // Cargar categorías al montar el componente
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/categoria/categorias'); // Reemplaza 'puerto' con el puerto de tu servidor
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/articulos/', newArticle); // Reemplaza 'puerto' con el puerto de tu servidor
      console.log('Artículo añadido correctamente');
      // Puedes agregar lógica adicional aquí si lo necesitas, como actualizar el estado después de agregar el artículo
    } catch (error) {
      console.error('Error al añadir el artículo:', error);
    }
  };

  return (
    <div>
      <h2>Añadir Nuevo Artículo</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={newArticle.nombre} onChange={handleChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="descripcion" value={newArticle.descripcion} onChange={handleChange} />
        </label>
        <label>
          Precio Unitario:
          <input type="number" name="precioUnitario" value={newArticle.precioUnitario} onChange={handleChange} />
        </label>
        <label>
          Categoría:
          <select name="categoria" value={newArticle.categoria} onChange={handleChange}>
            <option value="">Seleccione una categoría</option>
            {categorias.map(categoria => (
              <option key={categoria._id} value={categoria._id}>{categoria.nombre}</option>
            ))}
          </select>
        </label>
        <label>
          Stock Total:
          <input type="number" name="stock.total" value={newArticle.stock.total} onChange={handleChange} />
        </label>
        <label>
          Comentario:
          <input type="text" name="comentario" value={newArticle.comentario} onChange={handleChange} />
        </label>
        <label>
          Personalizable:
          <input type="checkbox" name="isPersonalizable" checked={newArticle.isPersonalizable} onChange={handleChange} />
        </label>
        <label>
          Imagen:
          <input type="text" name="imagen" value={newArticle.imagen} onChange={handleChange} />
        </label>
        <button type="submit">Agregar Artículo</button>
      </form>
    </div>
  );
};

export default Añaarti;
