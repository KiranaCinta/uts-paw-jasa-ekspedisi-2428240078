const mongoose = require('mongoose');

  const alamatSchema = new mongoose.Schema({
  jalan: String,
  kota: String,
}, { _id: false });

  const paketSchema = new mongoose.Schema({
    nim: { type: String, required: [true, 'nim wajib diisi'], unique: true, trim: true },
    nama: { type: String, required: [true, 'nama wajib diisi'], trim: true },
    alamat: alamatSchema,
    kurirId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prodi' },
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('paket', paketSchema);