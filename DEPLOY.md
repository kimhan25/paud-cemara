# Panduan Deploy — PAUD Cemara

Dokumen ini menjelaskan cara deploy project ke server.

Urutan yang disarankan:

1. Jalankan project dulu di komputer lokal sampai berhasil
2. Baru lanjut deploy ke server

## Pilihan deploy

Urutan yang paling aman:

1. **VPS Ubuntu biasa**
2. **Docker di VPS**
3. **Shared hosting**

Jika baru pertama kali deploy, pilih **VPS Ubuntu biasa**.

## Hal penting sebelum deploy

- project ini menyimpan data di **PostgreSQL**
- project ini menyimpan file gambar upload di folder **`uploads/`**
- database dan folder `uploads/` harus sama-sama dijaga
- `sql/schema.sql` dan `sql/seed.sql` hanya untuk **install pertama**
- jangan jalankan `schema.sql` atau `seed.sql` pada website yang sudah dipakai, kecuali memang ingin mengulang dari nol

## Data yang harus ikut saat pindah server

Kalau project sudah pernah dipakai sebelumnya, yang harus ikut dipindahkan adalah:

1. database PostgreSQL
2. seluruh folder `uploads/`
3. file `api/config.local.php` atau minimal data koneksi database

Catatan:

- database hanya menyimpan path file seperti `uploads/gallery/nama-file.jpg`
- file gambar aslinya tetap berada di filesystem server
- kalau database dipindah tanpa folder `uploads/`, gambar di website akan rusak

---

## Opsi A — VPS Ubuntu biasa

Ini adalah jalur yang paling disarankan.

### Yang dibutuhkan

- VPS Ubuntu 22.04 atau 24.04
- akses SSH ke server
- domain, jika ingin langsung pakai nama domain
- repo GitHub project

### 1. Login ke server

Contoh:

```bash
ssh user@IP_SERVER
```

### 2. Install software yang dibutuhkan

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apache2 php php-pgsql php-mbstring php-curl php-gd \
                    postgresql postgresql-contrib certbot python3-certbot-apache \
                    git unzip nano
```

### 3. Clone project dari GitHub

```bash
cd /var/www
sudo git clone <URL_REPO_GITHUB> paud-cemara
sudo chown -R $USER:$USER paud-cemara
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

### 4. Buat database dan user PostgreSQL

```bash
sudo -u postgres psql <<'SQL'
CREATE USER paud_user WITH PASSWORD 'GANTI_INI';
CREATE DATABASE paud_cemara OWNER paud_user;
\c paud_cemara
GRANT ALL ON SCHEMA public TO paud_user;
SQL
```

### 5. Import schema dan seed

Langkah ini hanya untuk install pertama pada database baru.

```bash
sudo -u postgres psql -d paud_cemara -f sql/schema.sql
sudo -u postgres psql -d paud_cemara -f sql/seed.sql
```

### 6. Buat file config server

Copy file contoh:

```bash
cp api/config.local.example.php api/config.local.php
nano api/config.local.php
```

Isi minimal yang perlu diubah:

```php
<?php
return [
    'db' => [
        'host'     => 'localhost',
        'port'     => '5432',
        'dbname'   => 'paud_cemara',
        'user'     => 'paud_user',
        'password' => 'GANTI_INI',
        'sslmode'  => '',
    ],
    'cors_origin' => 'https://domain-anda.com',
    'debug' => false,
    'upload_dir' => __DIR__ . '/../uploads',
    'trust_proxy' => true,
    'force_secure_session' => true,
];
```

Kalau belum punya domain dan masih uji pakai IP server, `cors_origin` bisa dikosongkan dulu:

```php
'cors_origin' => '',
```

### 7. Buat akun admin

```bash
php sql/make_admin.php admin 'PasswordKuat123!'
```

### 8. Pastikan folder upload writable

```bash
sudo chmod -R 775 uploads
sudo chown -R www-data:www-data uploads
```

Kalau project sudah pernah dipakai sebelumnya, salin juga isi folder `uploads/`
lama ke server ini.

### 9. Buat virtual host Apache

Edit file:

```bash
sudo nano /etc/apache2/sites-available/paud.conf
```

Isi:

```apache
<VirtualHost *:80>
    ServerName domain-anda.com
    ServerAlias www.domain-anda.com
    DocumentRoot /var/www/paud-cemara

    <Directory /var/www/paud-cemara>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/paud-error.log
    CustomLog ${APACHE_LOG_DIR}/paud-access.log combined
</VirtualHost>
```

Aktifkan:

```bash
sudo a2enmod rewrite headers deflate
sudo a2ensite paud
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### 10. Aktifkan HTTPS

```bash
sudo certbot --apache -d domain-anda.com -d www.domain-anda.com
```

Setelah HTTPS aktif, pastikan `cors_origin` di `api/config.local.php` berisi domain yang benar.

### 11. Cek hasil deploy

Pastikan hal berikut berhasil:

- buka `https://domain-anda.com`
- buka `https://domain-anda.com/#/admin`
- login admin berhasil
- upload gambar berhasil
- form kontak dan PPDB masuk ke panel admin

### 12. Cara update project di server nanti

Masuk ke folder project:

```bash
cd /var/www/paud-cemara
```

Sebelum update:

1. backup database
2. backup folder `uploads/`
3. pastikan `api/config.local.php` tetap ada

Tarik update:

```bash
git pull
```

Catatan:

- jangan jalankan `sql/schema.sql` lagi pada data produksi yang sudah berjalan
- jangan jalankan `sql/seed.sql` lagi kecuali memang ingin reset isi contoh
- kalau update baru membutuhkan perubahan database, ikuti catatan perubahan project, jangan tebak sendiri

### 13. Backup dasar yang disarankan

Backup database:

```bash
sudo -u postgres pg_dump -d paud_cemara > paud_cemara.sql
```

Backup upload:

```bash
tar czf uploads-backup.tar.gz uploads
```

---

## Opsi B — Docker di VPS

Gunakan opsi ini hanya jika memang nyaman dengan Docker.

Hal yang wajib diingat:

- database tetap harus disiapkan
- folder `uploads/` harus memakai volume persisten
- jangan deploy ke filesystem ephemeral kalau upload gambar dipakai aktif

### Build image

```bash
docker build -t paud-cemara:latest .
```

### Jalankan container

```bash
docker volume create paud_uploads

docker run -d \
  --name paud-cemara \
  -p 8080:80 \
  -e PAUD_DB_HOST=GANTI_HOST_DB \
  -e PAUD_DB_PORT=5432 \
  -e PAUD_DB_NAME=paud_cemara \
  -e PAUD_DB_USER=paud_user \
  -e PAUD_DB_PASS=GANTI_INI \
  -e PAUD_UPLOAD_DIR=/var/www/html/uploads \
  -e PAUD_TRUST_PROXY=1 \
  -e PAUD_SESSION_SECURE=1 \
  -v paud_uploads:/var/www/html/uploads \
  paud-cemara:latest
```

Kalau sudah ada file upload dari mesin lain, copy juga isi folder `uploads/`
lama ke volume yang dipakai container.

---

## Opsi C — Shared hosting

Gunakan opsi ini hanya kalau provider benar-benar mendukung:

- PHP 8+
- `pdo_pgsql`
- SSH / terminal
- `.htaccess`
- folder `uploads/` writable
- custom domain dan HTTPS

Kalau salah satu poin di atas tidak tersedia, jangan pakai shared hosting untuk project ini.

### Langkah umum

1. Upload file project ke `public_html` atau document root
2. Buat database PostgreSQL di panel hosting
3. Import `sql/schema.sql`
4. Import `sql/seed.sql`
5. Copy `api/config.local.example.php` menjadi `api/config.local.php`
6. Isi koneksi database hosting
7. Pastikan folder `uploads/` writable
8. Jalankan:

```bash
php sql/make_admin.php admin 'PasswordKuat123!'
```

---

## Troubleshooting singkat

### Website tampil, tapi database tidak terbaca

Cek:

- isi `api/config.local.php`
- host database
- port database
- username database
- password database
- status PostgreSQL

### Upload gambar gagal

Cek permission folder:

```bash
chmod -R 775 uploads
chown -R www-data:www-data uploads
```

### Setelah pindah server gambar hilang

Penyebab paling umum:

- folder `uploads/` lama tidak ikut disalin
- hanya database yang dipindahkan
- Docker tidak memakai volume persisten

### Login admin gagal

Cek:

- akun admin sudah dibuat dengan `php sql/make_admin.php`
- `cors_origin` sudah benar
- HTTPS aktif jika `force_secure_session` diaktifkan
