const Articulo = require("../models/articulo");

const añadirArticulo = async (req, res) => {
  try {
    const { nombre, precioUnitario, serial, stock, comentario, isPersonalizable } = req.body;

    // Validación
    if (!nombre) {
      return res.json({ error: "El nombre es obligatorio" });
    }
    if (!serial) {
      return res.json({ error: "El serial es obligatorio" });
    }
    if (!stock) {
      return res.json({ error: "El stock es obligatorio" });
    }
    if (!comentario) {
      return res.json({ error: "El comentario es obligatorio" });
    }
    if (isPersonalizable === undefined) {
      return res.json({ error: "El campo personalizable es obligatorio" });
    }

    let articulo = new Articulo(req.body);
    await articulo.save();
    res.json(articulo);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
};

const actualizarArticulo = async (req, res) => {
    try{
        const { nombre, precioUnitario, serial, stock, comentario, isPersonalizable } = req.body;

    // Validación
    if (!nombre) {
      return res.json({ error: "El nombre es obligatorio" });
    }
    if (!serial) {
      return res.json({ error: "El serial es obligatorio" });
    }
    if (!stock) {
      return res.json({ error: "El stock es obligatorio" });
    }
    if (!comentario) {
      return res.json({ error: "El comentario es obligatorio" });
    }
    if (isPersonalizable === undefined) {
      return res.json({ error: "El campo personalizable es obligatorio" });
    }

    const articulo = await Articulo.findByIdAndUpdate(req.params.id,req.body,{new:true});
   
     await articulo.save();
   
    res.json(articulo);

    }catch(error){
        console.error(error)
        res.status(400).json(error.message)
    
    }

}

const eliminarArticulo = async (req, res) => {
  try {
  
    const articulo = await Articulo.findByIdAndDelete(req.params.id);

    res.json(articulo);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error interno'});
  }
};

module.exports = { añadirArticulo, actualizarArticulo, eliminarArticulo };

 