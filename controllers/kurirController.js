const kurir = require('../models/kurirModel');


exports.create = async (req, res) => {
  try {
    const kurir = await kurir.create(req.body);
    res.status(201).json(kurir);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAll = async (req, res) => {
  res.json(await kurir.find());
};