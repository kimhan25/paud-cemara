# PAUD Cemara

Website profil sekolah PAUD dengan halaman publik, panel admin, backend PHP,
dan database PostgreSQL.

Stack yang dipakai:

- HTML + React via CDN
- PHP murni + PDO
- PostgreSQL
- tanpa build step frontend

## Dokumen ini untuk apa

README ini ditulis untuk setup lokal di:

- Windows
- PostgreSQL Desktop / PostgreSQL installer
- pgAdmin 4
- PHP CLI
- Git

Dokumen lain:

- [`DEPLOY.md`](DEPLOY.md): panduan deploy ke server / VPS
- `Dockerfile`: opsi deploy berbasis container

## Hasil akhir yang diharapkan

Setelah semua langkah selesai:

- website bisa dibuka di `http://localhost:8000`
- panel admin bisa dibuka di `http://localhost:8000/#/admin`
- data website dibaca dari PostgreSQL lokal
- upload gambar tersimpan di folder `uploads/`

## File yang penting

- `api/config.php`
  File config utama project. Tidak perlu diubah untuk setup biasa.
- `api/config.local.php`
  File config lokal per mesin. File ini tidak masuk Git dan aman untuk diisi password database.
- `api/config.local.example.php`
  Template untuk membuat `api/config.local.php`.
- `sql/schema.sql`
  Membuat ulang struktur database dari nol.
- `sql/seed.sql`
  Mengisi data awal / contoh ke database.
- `uploads/`
  Tempat file gambar yang di-upload dari admin.

## Peringatan penting sebelum mulai

- `sql/schema.sql` hanya untuk database baru / kosong
- `sql/seed.sql` hanya untuk isi awal / reset data contoh
- jangan jalankan `schema.sql` atau `seed.sql` pada database yang sudah berisi data penting, kecuali memang ingin mengulang dari nol
- jangan isi password database di `api/config.php`
- isi config mesin lokal di `api/config.local.php`

## 1. Install Git

Cek dulu:

```powershell
git --version
```

Kalau muncul versi Git, lanjut ke langkah berikutnya.

Kalau `git` tidak dikenali:

1. Install Git for Windows
2. Tutup PowerShell
3. Buka PowerShell lagi
4. Jalankan lagi `git --version`

## 2. Download project dari GitHub

Buat folder kerja, contoh:

```powershell
mkdir C:\projects
cd C:\projects
```

Clone project:

```powershell
git clone <URL_REPO_GITHUB>
cd paud-cemara
```

Contoh `URL_REPO_GITHUB`:

```text
https://github.com/username/paud-cemara.git
```

Cara mengambil URL repo:

1. Buka halaman repo di GitHub
2. Klik tombol `Code`
3. Pilih `HTTPS`
4. Copy URL yang muncul

Catatan:

- jika project diambil dengan `git clone`, update berikutnya bisa memakai `git pull`
- jika project hanya di-download sebagai ZIP, `git pull` tidak bisa dipakai

Setelah ini, semua command berikutnya dijalankan dari folder project:

```powershell
cd C:\projects\paud-cemara
```

## 3. Jika nanti ada update project dari GitHub

Masuk ke folder project:

```powershell
cd C:\projects\paud-cemara
```

Tarik update:

```powershell
git pull
```

Catatan:

- hentikan server lokal PHP dulu sebelum `git pull`
- jangan simpan perubahan lokal di file tracked kalau tidak perlu
- untuk config lokal, pakai `api/config.local.php`
- untuk gambar upload, biarkan tetap di folder `uploads/`
- kalau `git pull` menampilkan conflict, jangan lanjut sembarang. Simpan backup dulu lalu cek file yang bentrok

## 4. Install PostgreSQL Desktop dan pgAdmin

Cek dulu:

```powershell
psql --version
Get-Service *postgres*
```

Yang diharapkan:

- `psql --version` menampilkan versi PostgreSQL
- service PostgreSQL berstatus `Running`

Kalau belum ada:

1. Install PostgreSQL untuk Windows
2. Pastikan `pgAdmin 4` ikut terpasang
3. Simpan username dan password `postgres` saat instalasi
4. Setelah instalasi selesai, buka PowerShell baru
5. Jalankan lagi:

```powershell
psql --version
Get-Service *postgres*
```

Kalau service belum berjalan, nyalakan dari aplikasi `Services` di Windows.

## 5. Install PHP CLI

Cek dulu:

```powershell
php -v
```

Kalau `php` belum dikenali, install PHP CLI.

Cara yang aman:

1. Download PHP 8.2 atau 8.3 untuk Windows
2. Extract ke folder tetap, misalnya `C:\php`
3. Copy `php.ini-development` menjadi `php.ini`
4. Aktifkan extension berikut di `php.ini`:
   - `extension=pdo_pgsql`
   - `extension=pgsql`
   - `extension=mbstring`
   - `extension=fileinfo`
5. Tambahkan `C:\php` ke `PATH`
6. Tutup PowerShell
7. Buka PowerShell lagi

Cek hasilnya:

```powershell
php -v
php --ini
php -m | findstr /I pgsql
php -m | findstr /I mbstring
php -m | findstr /I fileinfo
```

Yang harus tersedia:

- `pdo_pgsql`
- `pgsql`
- `mbstring`
- `fileinfo`

## 6. Buat database lokal

Nama database yang dipakai project:

```text
paud_cemara
```

Opsi lewat `pgAdmin`:

1. Buka `pgAdmin 4`
2. Login ke server PostgreSQL lokal
3. Klik kanan `Databases`
4. Pilih `Create > Database...`
5. Isi nama database: `paud_cemara`

Opsi lewat `psql`:

```powershell
createdb -h localhost -p 5432 -U postgres paud_cemara
```

## 7. Import schema dan seed

Langkah ini hanya untuk setup pertama pada database baru.

Opsi lewat `pgAdmin`:

1. Klik database `paud_cemara`
2. Buka `Tools > Query Tool`
3. Buka file `sql/schema.sql`
4. Jalankan seluruh isi `sql/schema.sql`
5. Setelah selesai, buka file `sql/seed.sql`
6. Jalankan seluruh isi `sql/seed.sql`

Opsi lewat `psql`:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\schema.sql
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\seed.sql
```

## 8. Buat config lokal

Copy file contoh:

```powershell
Copy-Item api\config.local.example.php api\config.local.php
```

Lalu edit file `api/config.local.php`.

File ini bisa dibuka dengan:

- Notepad
- VS Code
- editor teks lain yang biasa dipakai

Yang biasanya cukup diubah:

- `host`
- `port`
- `dbname`
- `user`
- `password`

Contoh minimal:

```php
<?php
return [
    'db' => [
        'host'     => 'localhost',
        'port'     => '5432',
        'dbname'   => 'paud_cemara',
        'user'     => 'postgres',
        'password' => 'PASSWORD_DB',
        'sslmode'  => '',
    ],
];
```

Catatan:

- default project di `api/config.php` memakai port `5433`
- PostgreSQL Windows biasanya memakai port `5432`
- karena itu, `api/config.local.php` hampir selalu perlu diisi port `5432`

## 9. Buat akun admin

Jalankan:

```powershell
php sql\make_admin.php admin PasswordKuat123
```

Kalau berhasil, akun admin `admin` sudah siap dipakai login.

## 10. Jalankan aplikasi

Jalankan server lokal:

```powershell
php -S localhost:8000
```

Buka di browser:

- `http://localhost:8000`
- `http://localhost:8000/#/admin`

Untuk menghentikan server lokal:

```text
Ctrl + C
```

Kalau port `8000` sudah dipakai:

```powershell
php -S localhost:8080
```

Lalu buka:

- `http://localhost:8080`
- `http://localhost:8080/#/admin`

## 11. Cek bahwa setup berhasil

Di browser:

1. Buka `http://localhost:8000`
2. Pastikan halaman utama tampil
3. Buka `http://localhost:8000/api/bootstrap.php`
4. Pastikan tampil JSON, bukan error
5. Buka `http://localhost:8000/#/admin`
6. Login dengan akun admin yang dibuat tadi

Di PowerShell:

```powershell
(Invoke-WebRequest http://localhost:8000/api/bootstrap.php).Content
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT username FROM admin_user;"
```

Yang diharapkan:

- endpoint `bootstrap.php` mengembalikan JSON
- tabel `admin_user` berisi username admin

## 12. Hal yang perlu diingat setelah setup berhasil

- `api/config.local.php` adalah file config lokal. Simpan file ini, jangan hapus sembarang
- `uploads/` menyimpan file gambar hasil upload
- kalau project dipindah ke komputer atau server lain, yang harus ikut dibawa adalah:
  - database PostgreSQL
  - folder `uploads/`
  - file `api/config.local.php` atau data koneksi databasenya

## Troubleshooting

### `git` tidak dikenali

Install Git for Windows lalu buka ulang PowerShell.

### `php` tidak dikenali

Periksa instalasi PHP dan `PATH`.

### `psql` tidak dikenali

Periksa instalasi PostgreSQL dan `PATH`.

### `Database connection failed`

Cek:

- isi `api/config.local.php`
- host
- port
- username
- password
- status service PostgreSQL

### Website tampil, tapi datanya tidak berubah

Cek:

- `http://localhost:8000/api/bootstrap.php`
- apakah `api/config.local.php` sudah benar
- apakah database `paud_cemara` memang sudah diisi `schema.sql` dan `seed.sql`

### Login admin gagal

Cek:

- akun admin sudah dibuat dengan `php sql\make_admin.php`
- password yang dimasukkan benar
- browser mengizinkan cookie untuk `localhost`

### Port `8000` sudah dipakai

Gunakan port lain:

```powershell
php -S localhost:8080
```

## Catatan repo

- `api/config.local.php` tidak masuk Git
- file upload asli tidak masuk Git
- `uploads/` di repo hanya berisi placeholder
- `api/config.php` tidak perlu diubah untuk setup biasa
