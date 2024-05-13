const Articulo = require("../models/articulo");

// Esta función te permitirá obtener todos los productos con su categoría
const obtenerProductosConCategoria = async () => {
  try {
      const productos = await Articulo.find().populate('categoria');
      return productos;
  } catch (error) {
      console.log(error);
      throw new Error('Error al obtener los productos con categoría');
  }
};
// Controlador para añadir un nuevo artículo
const añadirArticulo = async (req, res) => {
  try {
    const {
      nombre,
      precioUnitario,
      categoria,
      stock,
      comentario,
      isPersonalizable,
      tallas,
      total
    } = req.body;

    // Validación de campos obligatorios
    if (!nombre) {
      return res.json({ error: "El nombre es obligatorio" });
    }
    if (!precioUnitario) {
      return res.json({ error: "El precio unitario es obligatorio" });
    }
    if (precioUnitario < 0) {
      return res.json({ error: "El precio unitario no puede ser negativo" });
    }
    if (!categoria){
      return res.json({error:"La categoria es obligatoria"});
    }
    if (precioUnitario === 0) {
      return res.json({ error: "El precio unitario no puede ser 0" });
    }
    if (!stock) {
      return res.json({ error: "El stock es obligatorio" });
    }
    // Validación de stock
    if(stock.tallas){
      for(let talla in stock.tallas){
        if(stock.tallas[talla] < 0){
          return res.json({error: `El stock de la talla ${talla} no puede ser negativo`});
        }
      }
    }
    if (stock.total < 0) {
      return res.json({ error: "El stock no puede ser negativo" });
    }
    if (stock.tallas){
      let sumaTallas = 0;
      for (let talla in stock.tallas){
        sumaTallas += stock.tallas[talla];
      }
      if (stock.total !== sumaTallas){
        return res.json({error: "La suma de los stock por tallas no coincide con el stock total"});
      }
    }
    if (stock.tallas) {
      for (let talla in stock.tallas) {
        if (!['XL', 'L', 'M', 'S'].includes(talla)) {
          return res.status(400).send(`La talla ${talla} ingresada no es válida.`);
        }
      }
    }
    if (!comentario) {
      return res.json({ error: "El comentario es obligatorio" });
    }
    if (isPersonalizable === undefined) {
      return res.json({ error: "El campo personalizable es obligatorio" });
    }

    const existeArticulo = await Articulo.findOne({ nombre });

    if (existeArticulo) {
      return res.json({ error: "El articulo ya existe" });
    };

    let articulo = new Articulo(req.body);
    await articulo.save();
    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

// Controlador para actualizar un artículo
const actualizarArticulo = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      precioUnitario,
      stock,
      comentario,
      isPersonalizable,
      imagen
    } = req.body;


    // Validación de campos obligatorios
    if (!nombre) {
      return res.json({ error: "El nombre es obligatorio" });
    }
    if (!precioUnitario) {
      return res.json({ error: "El precio unitario es obligatorio" });
    }
    if (precioUnitario < 0) {
      return res.json({ error: "El precio unitario no puede ser negativo" });
    }
    if (precioUnitario === 0) {
      return res.json({ error: "El precio unitario no puede ser 0" });
    } 
    if (!stock) {
      return res.json({ error: "El stock es obligatorio" });
    }
    // Validación de stock
    if(stock.tallas){
      for(let talla in stock.tallas){
        if(stock.tallas[talla] < 0){
          return res.json({error: `El stock de la talla ${talla} no puede ser negativo`});
        }
      }
    }
    if (stock.total < 0) {
      return res.json({ error: "El stock no puede ser negativo" });
    }
    if (stock.tallas){
      let sumaTallas = 0;
      for (let talla in stock.tallas){
        sumaTallas += stock.tallas[talla];
      }
      if (stock.total !== sumaTallas){
        return res.json({error: "La suma de los stock por tallas no coincide con el stock total"});
      }
    }
    if (stock.tallas) {
      for (let talla in stock.tallas) {
        if (!['XL', 'L', 'M', 'S'].includes(talla)) {
          return res.status(400).send(`La talla ${talla} ingresada no es válida.`);
        }
      }
    }
    if (!comentario) {
      return res.json({ error: "El comentario es obligatorio" });
    }
    if (!precioUnitario) {
      return res.json({ error: "El precio es obligatorio" });
    }
    if (isPersonalizable === undefined) {
      return res.json({ error: "El campo personalizable es obligatorio" });
    }
    if (!imagen) {
      return res.json({ error: "La imagen es obligatoria" });
    }

    const articulo = await Articulo.findByIdAndUpdate(req.params.id, {
      nombre,
      descripcion,
      precioUnitario,
      stock, // No es necesario especificar 'stock: stock' si el nombre de la variable es igual al nombre de la propiedad
      comentario,
      isPersonalizable,
      imagen
    }, {
      new: true,
    });

    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

// Controlador para eliminar un artículo
const eliminarArticulo = async (req, res) => {
  try {
    const articulo = await Articulo.findByIdAndDelete(req.params.id);

    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
};

// Controlador para buscar productos y filtrarlos por categoría si es necesario
const buscarArticulos = async (req, res) => {
  try {
      const { categoria } = req.query; // Obtener la categoría del query string

      let articulos;
      if (categoria && categoria !== 'Todos') {
          // Si hay una categoría específica, filtrar los productos por esa categoría
          const productosConCategoria = await obtenerProductosConCategoria();
          articulos = productosConCategoria.filter(producto => producto.categoria.nombre === categoria);
      } else {
          // Si no se especifica una categoría o es "Todos", obtener todos los productos
          const keyword = req.query.keyword
              ? {
                nombre: {
                      $regex: req.query.keyword,
                      $options: "i",
                  },
              }
              : {};

          const count = await Articulo.countDocuments({ ...keyword });
          articulos = await Articulo.find({ ...keyword }); // Eliminamos el método limit()

          articulos = {
              articulos,
              page: 1,
              pages: Math.ceil(count / articulos.length),
              hasMore: false,
          };
      }

      res.json(articulos);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno" });
  }
};

// Controlador para buscar un artículo por su ID
const buscarArticuloPorId = async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);

    if (articulo) {
      return res.json(articulo);
    } else {
      res.status(404);
      throw new Error("No se encontró el articulo");
    }
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "No se encontró el producto" });
  }
};

// Controlador para buscar todos los artículos
const buscarTodosLosArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.find({}).limit(12).sort({ createAt: -1 });
    res.json(articulos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno" });
  }
};

module.exports = {
  añadirArticulo,
  actualizarArticulo,
  eliminarArticulo,
  buscarArticulos,
  buscarArticuloPorId,
  buscarTodosLosArticulos,
};
