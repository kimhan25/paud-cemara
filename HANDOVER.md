# Handover Guide — Local Setup & Deploy

Panduan ini mencakup:

1. setup lokal
2. setup database
3. verifikasi fitur utama
4. persiapan sebelum deploy

Project ini adalah website sekolah dengan:

- frontend HTML + React CDN
- backend PHP murni
- database PostgreSQL
- upload file lokal ke folder `uploads/`

Untuk jalur cepat Windows native, lihat `SETUP_WINDOWS.md`.

## Ringkasan stack

- PHP `>= 8.1`
- PostgreSQL `>= 14` disarankan `16`
- Browser modern
- Tidak ada build step frontend

## Rekomendasi environment lokal

Environment lokal yang direkomendasikan:

- **Windows 11 / Windows 10 native + PostgreSQL Desktop / pgAdmin**

Alternatif:

- Windows 11 / Windows 10 + WSL2 Ubuntu
- Laragon/XAMPP/WAMP, asalkan `pdo_pgsql` aktif

Pertimbangan teknis:

- PostgreSQL installer Windows + pgAdmin umum dipakai untuk setup lokal
- import schema dan seed bisa dilakukan tanpa bergantung ke terminal Linux
- WSL2 tetap relevan jika environment lokal ingin dibuat lebih mirip server Linux

---

## Struktur penting project

- `index.html`: entry point aplikasi
- `api/`: endpoint PHP
- `sql/schema.sql`: struktur database
- `sql/seed.sql`: data awal
- `sql/make_admin.php`: buat / reset akun admin
- `uploads/`: file upload gambar
- `README.md`: dokumentasi teknis umum
- `DEPLOY.md`: panduan deploy server

---

## Setup Lokal Cepat

Bagian ini adalah jalur tercepat untuk menjalankan project di Windows native
dengan PostgreSQL Desktop / pgAdmin.

### 1. Clone / ekstrak project

Ekstrak atau clone project ke folder kerja lokal, lalu buka folder tersebut di
PowerShell.

Contoh:

```powershell
cd C:\path\ke\project\paud-cemara
```

### 2. Install PHP dan aktifkan extension yang dibutuhkan

Yang dibutuhkan:

- PHP CLI `>= 8.1`
- `pdo_pgsql`
- `pgsql`
- `mbstring`
- `fileinfo`

Verifikasi command PHP:

```powershell
php -v
php --ini
```

Jika `php` belum dikenali:

- pastikan `php.exe` sudah ter-install
- tambahkan folder PHP ke `PATH`
- tutup lalu buka ulang PowerShell

Aktifkan extension yang diperlukan di `php.ini`, lalu verifikasi:

```powershell
php -m | findstr /I pgsql
php -m | findstr /I mbstring
php -m | findstr /I fileinfo
```

Output harus memuat minimal:

- `pdo_pgsql`
- `pgsql`
- `mbstring`
- `fileinfo`

### 3. Install PostgreSQL Desktop dan pastikan servicenya hidup

Install PostgreSQL Windows installer. Paket ini biasanya sudah mencakup:

- PostgreSQL service
- `psql`
- pgAdmin 4

Catat parameter koneksi saat install:

- host: `localhost`
- port: biasanya `5432`
- user: biasanya `postgres`
- password: sesuai yang diisi saat instalasi

Verifikasi client PostgreSQL:

```powershell
psql --version
```

Verifikasi service PostgreSQL:

```powershell
Get-Service *postgres*
```

Status service harus `Running`. Jika belum aktif, nyalakan dari aplikasi
`Services` di Windows.

### 4. Buat database `paud_cemara`

Opsi `pgAdmin`:

1. Buka `pgAdmin 4`
2. Login ke server PostgreSQL lokal
3. Buka `Databases`
4. Klik kanan `Create > Database...`
5. Isi nama database: `paud_cemara`
6. Simpan

Opsi `psql`:

```powershell
createdb -h localhost -p 5432 -U postgres paud_cemara
```

Jika PostgreSQL lokal memakai port selain `5432`, sesuaikan port pada command.

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

### 6. Buat `api/config.local.php`

Copy file contoh:

```powershell
Copy-Item api\config.local.example.php api\config.local.php
```

Lalu edit nilai koneksi database di `api/config.local.php`.

Contoh minimal untuk PostgreSQL lokal di port `5432`:

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
    'cors_origin' => '',
    'debug' => true,
    'upload_dir' => __DIR__ . '/../uploads',
    'session_name' => 'paud_admin_sess',
    'trust_proxy' => false,
    'force_secure_session' => false,
    'rate_limit_dir' => sys_get_temp_dir() . '/paud-cemara-rate-limit',
];
```

Catatan:

- default code project memakai port `5433`
- PostgreSQL Desktop Windows biasanya memakai port `5432`
- gunakan port yang benar-benar dipakai server PostgreSQL lokal
- `api/config.local.php` bersifat override lokal dan tidak ikut ke git
- environment variable `PAUD_*` tetap bisa dipakai untuk override sementara jika diperlukan

### 7. Buat akun admin

Jika `api/config.local.php` sudah benar, jalankan:

```powershell
php sql\make_admin.php admin PasswordKuat123
```

Alternatif override sementara via environment variable:

```powershell
$env:PAUD_DB_HOST="localhost"
$env:PAUD_DB_PORT="5432"
$env:PAUD_DB_NAME="paud_cemara"
$env:PAUD_DB_USER="postgres"
$env:PAUD_DB_PASS="PASSWORD_DB"
php sql\make_admin.php admin PasswordKuat123
```

### 8. Jalankan aplikasi

```powershell
php -S localhost:8000
```

Buka:

- website: `http://localhost:8000`
- admin: `http://localhost:8000/#/admin`

### 9. Login admin

Gunakan akun admin yang sudah dibuat:

- username: `admin`
- password: sesuai yang di-set saat menjalankan `make_admin.php`

---

## Verifikasi Lokal yang Wajib

Verifikasi minimum setelah setup lokal:

1. `http://localhost:8000` menampilkan halaman beranda
2. `http://localhost:8000/api/bootstrap.php` menampilkan JSON tanpa error database
3. `http://localhost:8000/#/admin` bisa login
4. Form kontak bisa submit
5. Form PPDB bisa submit
6. Admin bisa melihat data pesan dan pendaftar

Verifikasi cepat di browser:

- buka `http://localhost:8000/api/bootstrap.php`
- pastikan response berformat JSON
- pastikan data seperti `settings`, `programs`, `news`, dan `teachers` muncul

Verifikasi cepat di PowerShell:

```powershell
(Invoke-WebRequest http://localhost:8000/api/bootstrap.php).Content
```

Verifikasi akun admin di PostgreSQL:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT username FROM admin_user;"
```

Verifikasi data seed:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT COUNT(*) FROM news;"
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT COUNT(*) FROM programs;"
```

---

## Setup Lokal per OS

### macOS

Contoh dengan Homebrew:

```bash
brew install php
brew install postgresql@16
brew services start postgresql@16
```

Jika PostgreSQL default Homebrew berjalan di `5432`, gunakan `api/config.local.php` untuk override port.

### Linux Ubuntu / Debian

Contoh:

```bash
sudo apt update
sudo apt install -y php php-pgsql php-mbstring php-cli postgresql postgresql-contrib
```

Lalu buat database:

```bash
sudo -u postgres createdb paud_cemara
sudo -u postgres psql -d paud_cemara -f sql/schema.sql
sudo -u postgres psql -d paud_cemara -f sql/seed.sql
```

Jika login database memakai user `postgres` dengan password, sesuaikan `api/config.local.php`.

### Windows

#### Opsi utama: Windows native + PostgreSQL Desktop / pgAdmin

##### 1. Install PHP

Install PHP `>= 8.1` dan pastikan command berikut berjalan di PowerShell:

```powershell
php -v
php --ini
```

Pastikan extension `pdo_pgsql`, `pgsql`, `mbstring`, dan `fileinfo` aktif:

```powershell
php -m | findstr /I pgsql
php -m | findstr /I mbstring
php -m | findstr /I fileinfo
```

##### 2. Install PostgreSQL Desktop

Install PostgreSQL Windows installer. Paket ini biasanya sudah mencakup:

- service PostgreSQL
- `psql`
- pgAdmin 4

Catat parameter koneksi saat install:

- host: `localhost`
- port: biasanya `5432`
- user: biasanya `postgres`
- password: sesuai yang diisi saat instalasi

Verifikasi `psql` dan status service:

```powershell
psql --version
Get-Service *postgres*
```

##### 3. Buat database `paud_cemara`

Opsi `pgAdmin`:

1. Buka `pgAdmin 4`
2. Login ke server PostgreSQL lokal
3. Buka `Databases`
4. Klik kanan `Create > Database...`
5. Isi nama database: `paud_cemara`
6. Simpan

Opsi `psql` dari PowerShell:

```powershell
createdb -h localhost -p 5432 -U postgres paud_cemara
```

##### 4. Import `schema.sql` dan `seed.sql`

Opsi `pgAdmin`:

1. Klik database `paud_cemara`
2. Buka `Tools > Query Tool`
3. Jalankan isi file `sql/schema.sql`
4. Setelah selesai, jalankan isi file `sql/seed.sql`

Opsi `psql` dari PowerShell:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\schema.sql
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\seed.sql
```

Jika port PostgreSQL lokal bukan `5432`, ganti port pada command di atas.

##### 5. Buat `api/config.local.php`

Copy file contoh:

```powershell
Copy-Item api\config.local.example.php api\config.local.php
```

Lalu isi koneksi database sesuai instalasi lokal.

Contoh untuk PostgreSQL Desktop default di Windows:

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
    'cors_origin' => '',
    'debug' => true,
    'upload_dir' => __DIR__ . '/../uploads',
    'session_name' => 'paud_admin_sess',
    'trust_proxy' => false,
    'force_secure_session' => false,
    'rate_limit_dir' => sys_get_temp_dir() . '/paud-cemara-rate-limit',
];
```

Environment variable `PAUD_*` tetap bisa dipakai untuk override sementara bila diperlukan.

##### 6. Buat akun admin

Jika `api/config.local.php` sudah benar, jalankan:

```powershell
php sql\make_admin.php admin PasswordKuat123
```

Alternatif via env:

```powershell
$env:PAUD_DB_HOST="localhost"
$env:PAUD_DB_PORT="5432"
$env:PAUD_DB_NAME="paud_cemara"
$env:PAUD_DB_USER="postgres"
$env:PAUD_DB_PASS="PASSWORD_DB"
php sql\make_admin.php admin PasswordKuat123
```

##### 7. Jalankan aplikasi

```powershell
php -S localhost:8000
```

Buka:

- `http://localhost:8000`
- `http://localhost:8000/#/admin`

##### 8. Verifikasi minimum di Windows

- `http://localhost:8000` menampilkan halaman beranda
- `http://localhost:8000/api/bootstrap.php` menampilkan JSON
- login admin berhasil
- form kontak dan PPDB bisa submit

#### Opsi alternatif: WSL2 Ubuntu

##### 1. Install WSL2

Jalankan **PowerShell as Administrator**:

```powershell
wsl --install -d Ubuntu
```

Restart Windows jika diminta.

Setelah itu buka aplikasi **Ubuntu** dari Start Menu dan buat username/password Linux.

##### 2. Install dependency di Ubuntu (WSL)

Di terminal Ubuntu:

```bash
sudo apt update
sudo apt install -y php php-pgsql php-mbstring php-cli postgresql postgresql-contrib git unzip
```

##### 3. Simpan project di filesystem Linux WSL

Disarankan project disimpan di folder home Ubuntu, misalnya:

```bash
mkdir -p ~/projects
cd ~/projects
```

Lalu clone / copy project ke sana.

Jalankan project dari filesystem Linux WSL, bukan `/mnt/c/...`, untuk menghindari
masalah permission dan performa.

##### 4. Setup database di Ubuntu (WSL)

```bash
sudo service postgresql start
sudo -u postgres createdb paud_cemara
sudo -u postgres psql -d paud_cemara -f sql/schema.sql
sudo -u postgres psql -d paud_cemara -f sql/seed.sql
```

##### 5. Buat admin

Untuk PostgreSQL default WSL di port `5432`, buat `api/config.local.php`
dengan port `5432`, lalu jalankan:

```bash
php sql/make_admin.php admin PasswordKuat123
```

Atau langsung via env:

```bash
PAUD_DB_HOST=localhost \
PAUD_DB_PORT=5432 \
PAUD_DB_NAME=paud_cemara \
PAUD_DB_USER=postgres \
PAUD_DB_PASS='' \
php sql/make_admin.php admin PasswordKuat123
```

##### 6. Jalankan aplikasi

```bash
php -S localhost:8000
```

Lalu buka dari browser Windows:

- `http://localhost:8000`
- `http://localhost:8000/#/admin`

Browser Windows tetap bisa mengakses service yang berjalan di WSL lewat `localhost`.

##### 7. Alternatif jika `sudo -u postgres createdb` gagal

Coba masuk ke user postgres dulu:

```bash
sudo -u postgres psql
```

Lalu buat database manual:

```sql
CREATE DATABASE paud_cemara;
```

Keluar dengan:

```sql
\q
```

---

## Reset Data Demo

Reset ke baseline:

```bash
php sql/reset_baseline.php
```

Untuk koneksi DB non-default:

```bash
PAUD_DB_PORT=5432 php sql/reset_baseline.php
```

---

## Troubleshooting Lokal

### `php` tidak dikenali

Cek:

- PHP CLI memang sudah ter-install
- folder yang berisi `php.exe` sudah masuk `PATH`
- PowerShell sudah dibuka ulang setelah perubahan `PATH`

Verifikasi:

```powershell
php -v
php --ini
```

### `psql` tidak dikenali

Cek:

- PostgreSQL Desktop sudah ter-install penuh
- folder binary PostgreSQL sudah masuk `PATH`
- PowerShell sudah dibuka ulang setelah instalasi

Verifikasi:

```powershell
psql --version
```

### PostgreSQL service tidak jalan

Verifikasi service:

```powershell
Get-Service *postgres*
```

Status harus `Running`.

Jika belum aktif:

- nyalakan dari aplikasi `Services` di Windows
- atau start service PostgreSQL lewat service manager bawaan Windows
- lalu ulangi tes koneksi `psql`

### `Database connection failed`

Cek:

- PostgreSQL benar-benar jalan
- port di `config.local.php` benar
- user/password benar
- database `paud_cemara` sudah dibuat
- `api/config.local.php` menunjuk ke server PostgreSQL yang benar

Tes manual:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT current_database();"
```

atau:

```powershell
psql -h localhost -p 5433 -U postgres -d paud_cemara -c "SELECT current_database();"
```

### Halaman publik tampil, tapi data tidak dari DB

Berarti frontend sedang fallback ke seed lokal, jadi masalah API bisa tertutup.

Cek:

- `http://localhost:8000/api/bootstrap.php`
- error PHP / error koneksi DB
- isi `api/config.local.php`
- database seed benar-benar sudah ter-import

### Login admin gagal

Cek ulang user admin:

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT username FROM admin_user;"
```

Reset password:

```powershell
php sql\make_admin.php admin PasswordBaru123
```

### Upload gambar gagal

Pastikan folder `uploads/` writable oleh proses PHP yang Anda pakai.

Pada `php -S` lokal di Windows, folder ini biasanya otomatis writable selama
project dijalankan dari folder yang punya izin tulis.

Untuk Linux/macOS:

```bash
chmod -R 775 uploads
```

### Port 8000 sudah dipakai

Jalankan di port lain:

```bash
php -S localhost:8080
```

Lalu buka:

`http://localhost:8080`

---

## Urutan implementasi yang disarankan

Urutan idealnya:

1. Jalankan project di local
2. Verifikasi semua fitur inti
3. Pastikan koneksi database, reset baseline, dan reset password admin dipahami
4. Setelah local stabil, lanjut ke deploy server lewat `DEPLOY.md`

Untuk deploy server, lanjut ke `DEPLOY.md`.
