# PAUD Cemara

Website profil sekolah PAUD dengan halaman publik, panel admin, backend PHP,
dan database PostgreSQL.

**Stack:** HTML + React (via CDN) · PHP murni + PDO · PostgreSQL · tanpa build
step frontend.

## Dokumentasi

README ini ditulis untuk setup:

- Windows native
- PostgreSQL Desktop / PostgreSQL installer
- pgAdmin 4
- PHP CLI

Dokumen lain:

- [`DEPLOY.md`](DEPLOY.md): panduan deploy ke server / VPS
- `Dockerfile`: opsi deploy berbasis container, tidak dipakai untuk local setup Windows

## Fitur utama

- halaman publik untuk profil sekolah, program, galeri, berita, kontak, dan PPDB
- panel admin dengan login berbasis session
- CRUD berita, galeri, album, program, guru/staf, dan pengaturan sekolah
- upload gambar ke folder lokal `uploads/`
- form `Kontak` dan `PPDB` tersimpan ke PostgreSQL

## Quick Start untuk Windows + PostgreSQL Desktop

### 1. Buka project di PowerShell

Contoh:

```powershell
cd C:\path\ke\project\paud-cemara
```

### 2. Pastikan PHP CLI siap

Jalankan:

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

Jika `php` tidak dikenali, periksa instalasi PHP dan `PATH`.

### 3. Pastikan PostgreSQL Desktop siap

Jalankan:

```powershell
psql --version
Get-Service *postgres*
```

Service PostgreSQL harus berstatus `Running`.

Jika belum aktif, nyalakan dari aplikasi `Services` di Windows.

### 4. Buat database `paud_cemara`

Opsi `pgAdmin`:

1. Buka `pgAdmin 4`
2. Login ke server PostgreSQL lokal
3. Klik kanan `Databases`
4. Pilih `Create > Database...`
5. Isi nama database: `paud_cemara`

Opsi `psql`:

```powershell
createdb -h localhost -p 5432 -U postgres paud_cemara
```

### 5. Import schema dan seed

Opsi `pgAdmin`:

1. Klik database `paud_cemara`
2. Buka `Tools > Query Tool`
3. Jalankan isi file `sql/schema.sql`
4. Setelah selesai, jalankan isi file `sql/seed.sql`

Opsi `psql`:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\schema.sql
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\seed.sql
```

### 6. Buat config lokal

Copy file contoh:

```powershell
Copy-Item api\config.local.example.php api\config.local.php
```

Lalu edit `api/config.local.php` dan isi koneksi database lokal.

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

Catatan penting:

- project default memakai port `5433` di `api/config.php`
- PostgreSQL Desktop di Windows biasanya memakai port `5432`
- jika PostgreSQL lokal memakai port lain, sesuaikan di `api/config.local.php`

### 7. Buat akun admin

```powershell
php sql\make_admin.php admin PasswordKuat123
```

### 8. Jalankan aplikasi

```powershell
php -S localhost:8000
```

Buka:

- `http://localhost:8000`
- `http://localhost:8000/#/admin`

## Verifikasi cepat

Di browser:

- `http://localhost:8000`
- `http://localhost:8000/api/bootstrap.php`
- `http://localhost:8000/#/admin`

Di PowerShell:

```powershell
(Invoke-WebRequest http://localhost:8000/api/bootstrap.php).Content
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT username FROM admin_user;"
```

## Jika ada error

- `php` tidak dikenali:
  cek instalasi PHP dan `PATH`
- `psql` tidak dikenali:
  cek instalasi PostgreSQL dan `PATH`
- `Database connection failed`:
  cek `api/config.local.php`, user/password, port, dan status service PostgreSQL
- halaman tampil tapi data tidak berubah:
  cek `http://localhost:8000/api/bootstrap.php` karena frontend bisa fallback ke `src/seed.js`

## Endpoint utama

- `GET /api/bootstrap.php`
- `POST /api/contact.php`
- `POST /api/ppdb.php`
- `POST /api/login.php`
- `POST /api/logout.php`
- `GET /api/me.php`

Endpoint admin:

- `GET /api/admin/stats.php`
- `GET/POST/DELETE /api/admin/messages.php`
- `GET/POST/DELETE /api/admin/registrations.php`
- `GET/POST/PUT/DELETE /api/admin/news.php`
- `GET/POST/PUT/DELETE /api/admin/gallery.php`
- `POST /api/admin/upload.php`
- `GET/PUT /api/admin/settings.php`
- `GET/POST/PUT/DELETE /api/admin/programs.php`
- `GET/POST/PUT/DELETE /api/admin/teachers.php`
- `GET/POST/PUT/DELETE /api/admin/albums.php`

## Catatan repo

- `uploads/` hanya menyimpan placeholder di repo
- file upload asli tidak perlu di-commit
- `api/config.local.php`, `.env`, dan kredensial lokal tidak masuk repo
- environment variable `PAUD_*` bisa dipakai untuk override sementara

## Struktur project

```text
project-root/
├─ index.html
├─ src/
├─ styles/
├─ api/
├─ sql/
└─ uploads/
```
