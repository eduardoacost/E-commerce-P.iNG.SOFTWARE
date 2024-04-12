const express = require("express");
const router = express.Router();
const articulosModel = require("../models/articulo.js");

module.exports.getData = async (req, res) => {
  try {
    // Find all data in the DataModel
    const data = await articulosModel.find();

    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle any errors that occur
    res.status(500).send(error);
  }
};
