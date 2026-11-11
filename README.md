UTS Pengembangan Aplikasi Web II
nama: Kirana Cinta Mentari
npm: 2428240078

Identitas Topik

Nama Topik: Jasa Ekspedisi

Model utama dan endpoint:
Paket, /paket

Model pendukung dan endpoint:
Kurir, /kurir

[unik], [teks], [angka]:
noResi, namaPenerima, beratKg

[filter]:
layanan

[embed] (embedding):
alamatTujuan dengan sub-field jalan dan kota

[ref] (referencing):
kurirId

Ketentuan C3 (sorting):
GET /paket?sort=beratKg: beratKg

Hash commit terakhir:
72dc781