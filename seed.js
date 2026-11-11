// seed.js
// Mengisi basis data dengan 3 kurir dan 25 paket. Aman dijalankan berulang:
// data lama dihapus dulu.
require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const Kurir = require('./models/kurirModel');
const Paket = require('./models/paketModel');

const NAMA = ['Andi', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fitri', 'Gita', 'Hadi', 'Indra', 'Joko',
  'Kiki', 'Lina', 'Maya', 'Nanda', 'Oka', 'Putri', 'Qori', 'Rina', 'Sari', 'Tono',
  'Umar', 'Vina', 'Wawan', 'Yuni', 'Zaki'];
const KOTA = ['Palembang', 'Indralaya', 'Prabumulih', 'Lubuklinggau'];
const LAYANAN = ['reguler', 'kilat', 'kargo'];

async function main() {
  await mongoose.connect(process.env.DB_URI || process.env.MONGO_URI);
  await Paket.deleteMany({});
  await Kurir.deleteMany({});

  const kurir = await Kurir.insertMany([
    { kode: 'KR01', nama: 'Joko Kurir' },
    { kode: 'KR02', nama: 'Rudi Kurir' },
    { kode: 'KR03', nama: 'Sinta Kurir' },
  ]);

  const paket = NAMA.map((nama, i) => ({
    noResi: `RS-2428240078-${String(i + 1).padStart(4, '0')}`,
    namaPenerima: nama,
    beratKg: (i % 10) + 1, // 1 sampai 10 kg, berulang
    layanan: LAYANAN[i % LAYANAN.length], // reguler, kilat, kargo bergantian
    alamatTujuan: { jalan: `Jl. Contoh No. ${i + 1}`, kota: KOTA[i % KOTA.length] },
    kurirId: kurir[i % 3]._id, // KR01, KR02, KR03 bergantian
  }));
  await Paket.insertMany(paket);

  console.log(`Seed selesai: ${kurir.length} kurir, ${paket.length} paket`);
  await mongoose.disconnect();
}

main().catch((err) => { console.error(err.message); process.exit(1); });