const Paket = require('../models/paketModel');
const { errorHttp } = require('../middlewares/errorHandler');

const LIMIT_DEFAULT = 10;
const LIMIT_MAKS = 50;

const FIELD_SORT = [
  'noResi', 'namaPenerima', 'beratKg', 'createdAt'
];

const FIELD_BOLEH_DIPILIH = [
  'noResi', 'namaPenerima', 'beratKg', 'layanan', 'alamatTujuan', 'kurirId', 'createdAt'
];

// Mengubah bilangan dari query string menjadi bilangan bulat yang aman
function angkaAman(nilai, bawaan, min, maks) {
  const n = parseInt(nilai, 10);
  if (Number.isNaN(n)) return bawaan;
  return Math.min(Math.max(n, min), maks);
}

// Menambahkan data paket
exports.create = async (req, res) => {
  try {
    const data = await Paket.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menampilkan semua paket
exports.getAll = async (req, res) => {
  const filter = {};

  // Filter berdasarkan jenis layanan
  if (req.query.layanan) {
    filter.layanan = String(req.query.layanan).trim();
  }

  // Filter berdasarkan kota tujuan
  if (req.query.kota) {
    filter['alamatTujuan.kota'] = String(req.query.kota).trim();
  }

  const page = angkaAman(req.query.page, 1, 1, Number.MAX_SAFE_INTEGER);
  const limit = angkaAman(req.query.limit, LIMIT_DEFAULT, 1, LIMIT_MAKS);

  // Sorting: ?sort=noResi atau ?sort=-createdAt
  const sortParam = String(req.query.sort || '-createdAt');
  const arah = sortParam.startsWith('-') ? -1 : 1;
  const sortField = sortParam.replace(/^-/, '');

  if (!FIELD_SORT.includes(sortField)) {
    throw errorHttp(400, `sort hanya boleh: ${FIELD_SORT.join(', ')}`);
  }

  // Projection: ?fields=noResi,namaPenerima
  let select = '';

  if (req.query.fields) {
    const fields = String(req.query.fields)
      .split(',')
      .map((f) => f.trim());

    if (!fields.every((f) => FIELD_BOLEH_DIPILIH.includes(f))) {
      throw errorHttp(400, `fields hanya boleh: ${FIELD_BOLEH_DIPILIH.join(', ')}`);
    }

    select = fields.join(' ');
  }

  const query = Paket.find(filter)
    .select(select)
    .sort({ [sortField]: arah, _id: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // Menampilkan informasi kurir jika diperlukan
  if (!select || select.split(' ').includes('kurirId')) {
    query.populate('kurirId', 'kode nama');
  }

  const [data, total] = await Promise.all([
    query,
    Paket.countDocuments(filter)
  ]);

  res.json({
    data,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit)
  });
};

// Menampilkan paket berdasarkan ID
exports.getById = async (req, res) => {
  const data = await Paket.findById(req.params.id)
    .populate('kurirId', 'kode nama');

  if (!data) {
    throw errorHttp(404, 'Data paket tidak ditemukan');
  }

  res.json(data);
};

// Mengubah data paket
exports.update = async (req, res) => {
  const data = await Paket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!data) {
    throw errorHttp(404, 'Data paket tidak ditemukan');
  }

  res.json(data);
};

// Menghapus data paket
exports.remove = async (req, res) => {
  const data = await Paket.findByIdAndDelete(req.params.id);

  if (!data) {
    throw errorHttp(404, 'Data paket tidak ditemukan');
  }

  res.json({ message: 'Data paket berhasil dihapus' });
};
