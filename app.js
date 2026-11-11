require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   // tambahkan di antara require lainnya

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const paketRoutes = require('./routes/paketRoutes');
const kurirRoutes = require('./routes/kurirRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.send('Server API JasaEkspedisi berjalan!');
});

// ---------- Route Paket ----------
app.use('/paket', paketRoutes);

// ---------- Route Kurir ----------
app.use('/kurir', kurirRoutes);

// ---------- Route untuk mensimulasikan error ----------
app.get('/error-uji', () => {
  throw new Error('Kesalahan tak terduga untuk pengujian');
});

// ---------- Handler 404 dan error handler ----------
app.use(notFoundHandler);
app.use(errorHandler);

// app.listen(PORT, () => {
//   console.log(`Server berjalan di http://localhost:${PORT}`);
// });

mongoose.connect(process.env.DB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });