const mongoose = require('mongoose');

  const alamatSchema = new mongoose.Schema({
  jalan: String,
  kota: String,
}, { _id: false });

  const paketSchema = new mongoose.Schema({
    noResi: { type: String, required: [true, 'noResi wajib diisi'], unique: true, trim: true },
    namaPenerima: { type: String, required: [true, 'namaPenerima wajib diisi'], trim: true },
    beratKg: { type: Number, required: [true, 'beratKg wajib diisi'], min: [0, 'beratKg minimal 0'] },
    layanan: { type: String, required: [true, 'layanan wajib diisi'], trim: true },
    alamatTujuan: alamatSchema,
    kurirId: { type: mongoose.Schema.Types.ObjectId, ref: 'Kurir', required: [true, 'kurirId wajib diisi'] },
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('paket', paketSchema);
