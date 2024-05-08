import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const itemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [products, setProductos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/articulos/') // Utilizamos Axios para hacer la solicitud HTTP
        .then(response => {
            setProductos(response.data.articulos);
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}, []);

  return (
    <itemContext.Provider value={{ products }}>
      {children}
    </itemContext.Provider>
  );
};

export default itemContext;
