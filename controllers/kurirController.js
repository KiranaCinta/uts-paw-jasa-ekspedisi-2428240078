const Kurir = require('../models/kurirModel');

// Menambahkan data kurir
exports.create = async (req, res) => {
  const { kode, nama } = req.body;
  const data = await Kurir.create({ kode, nama });
  res.status(201).json(data);
};

// Menampilkan semua kurir
exports.getAll = async (req, res) => {
  const data = await Kurir.find();
  res.status(200).json(data);
};