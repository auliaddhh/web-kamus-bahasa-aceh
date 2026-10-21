# Kamus Aceh–Indonesia Digital

Website statis berbasis HTML, CSS, dan JavaScript. Dataset `kamus.json` dibuat dari `kamus_kata_aceh_indonesia.csv`.

## Menjalankan di komputer

1. Ekstrak folder proyek jika masih berbentuk ZIP.
2. Buka folder di Visual Studio Code.
3. Pasang ekstensi **Live Server**.
4. Klik kanan `index.html` → **Open with Live Server**.
5. Browser akan membuka website di alamat lokal, biasanya `http://127.0.0.1:5500`.

> Jangan hanya klik dua kali `index.html`, karena browser dapat memblokir pembacaan `kamus.json` dari file lokal.

## Isi folder

- `index.html` — struktur halaman.
- `style.css` — desain responsif.
- `app.js` — pencarian, arah terjemahan, pengurutan, dan pagination.
- `kamus.json` — data untuk dibaca oleh website.
- `kamus_kata_aceh_indonesia.csv` — file sumber asli.

## Publikasi dengan GitHub Pages

1. Buat akun/login di GitHub.
2. Buat repository baru, misalnya `kamus-aceh-indonesia`.
3. Unggah seluruh file proyek ke root repository.
4. Buka **Settings → Pages**.
5. Pada bagian build/deployment, pilih **Deploy from a branch**.
6. Pilih branch `main` dan folder `/(root)`, lalu simpan.
7. Tunggu proses selesai; URL website akan tampil pada halaman Pages.

## Catatan data

Periksa kembali ejaan, definisi, hak penggunaan, dan atribusi dataset sebelum memublikasikan website. Hasil pencarian saat ini menggunakan pencocokan teks sebagian dan tidak otomatis mengoreksi ejaan.
