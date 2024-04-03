const express = require('express');
const router = express.Router();
const { validarJWT } = require('../middlewares/validarToken');
const { listarTareas, crearTarea} = require('../controllers/task.js'); //PENDIENTE actualizarTarea, eliminarTarea

router.use(validarJWT);

router.get('/', listarTareas, (req, res) => {
    res.status(200).json({
        ok: true
    });
});

router.post('/', crearTarea);
//router.put('/:id', actualizarTarea);
//router.delete('/:id', eliminarTarea);

module.exports = router;
