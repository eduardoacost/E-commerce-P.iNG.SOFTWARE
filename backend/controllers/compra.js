const compra = require("../models/compra.js");
const { asyncHandler } = require("../middlewares/asyncHandler.js");
const usuario = require("../models/usuario.js");
const Articulo = require("../models/articulo.js");
const mongoose = require("mongoose");

const obtenerCompras = asyncHandler(async (req, res) => {
  const Compra = await compra.find({}).populate('usuario').populate('compraItems.articulo');
  if (Compra.length === 0) {
    res.status(404).json({ mensaje: 'No se encontraron compras.' });
  } else {
    res.json(Compra);
  }
});

const agregarCompra = asyncHandler(async (req, res) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { usuario: userId, compraItems } = req.body;

    // Verificar si el usuario existe
    const usuarioExiste = await usuario.findById(userId);
    if (!usuarioExiste) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ mensaje: 'El ID del usuario no existe.' });
    }

    // Validar el stock de cada artículo en la compra
    for (const item of compraItems) {
      const articulo = await Articulo.findById(item.articulo);
      if (!articulo) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ mensaje: `Artículo con ID ${item.articulo} no encontrado.` });
      }
      
      // Validar si hay suficiente stock para cada talla del artículo
      const tallasRequeridas = new Map(Object.entries(item.stock.tallas));
      let stockSuficiente = true;
      let cantidadTotalRestar = 0;

      for (const [talla, cantidad] of tallasRequeridas) {
        if (!articulo.stock.tallas.get(talla) || articulo.stock.tallas.get(talla) < cantidad) {
          stockSuficiente = false;
          break;
        }
        cantidadTotalRestar += cantidad;
      }

      if (!stockSuficiente) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ mensaje: `No hay suficiente stock para el artículo: ${articulo.nombre}.` });
      }

      // Actualizar el stock del artículo
      const updateStock = { 'stock.total': -cantidadTotalRestar };

      for (const [talla, cantidad] of tallasRequeridas) {
        updateStock[`stock.tallas.${talla}`] = -cantidad;
      }

      await Articulo.updateOne(
        { _id: item.articulo },
        { $inc: updateStock },
        { session }
      );
    }

    // Crear la nueva compra
    const nuevaCompra = new compra(req.body);

    // Validar y guardar la nueva compra en la base de datos
    await nuevaCompra.validate();
    await nuevaCompra.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      mensaje: 'Compra agregada exitosamente',
      nuevaCompra
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Error al agregar la compra', detalles: error.message });
  }
});

const eliminarCompra = asyncHandler(async (req, res) => {
  try {
    const { consecutivo } = req.body;
    const Compra = await compra.findOneAndDelete({ 'compraItems.consecutivo': consecutivo });

    if (!Compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json({ mensaje: 'Compra eliminada exitosamente.' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la compra', error: error.message });
  }
});

const actualizarCompra = asyncHandler(async (req, res) => {
  const compraId = req.body._id;

  try {
    const compraActualizada = await compra.findByIdAndUpdate(
      compraId,
      req.body,
      { new: true, runValidators: true }
    );

    if (!compraActualizada) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json({ mensaje: 'Compra actualizada exitosamente.', compraActualizada });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la compra', error: error.message });
  }
});

const buscarCompraPorConsecutivo = asyncHandler(async (req, res) => {
  const { consecutivo } = req.body;

  try {
    const Compra = await compra.findOne({ 'compraItems.consecutivo': consecutivo });

    if (!Compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada.' });
    }

    res.json(Compra);

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar/actualizar la compra', error: error.message });
  }
});

module.exports = {
  obtenerCompras,
  agregarCompra,
  eliminarCompra,
  actualizarCompra,
  buscarCompraPorConsecutivo
};
