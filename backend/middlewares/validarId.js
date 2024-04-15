const { isObjectIdOrHexString, isValidObjectId } = require("mongoose");

function validarId(req, res, next) {
    if (!isValidObjectId(req.params.id)) {
        req.status(404);
        throw new Error(`El id no es valido: ${req.params.id}`);
    }
    next();
}

module.exports = validarId;
