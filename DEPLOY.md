# Panduan Deploy — PAUD Cemara

Tiga skenario yang paling umum untuk situs kecil–menengah.
Pilih salah satu sesuai anggaran & pengetahuan teknis.

| Opsi | Biaya | Kesulitan | Cocok untuk |
|---|---|---|---|
| **A. VPS Ubuntu Indonesia** | Mulai kisaran VPS entry-level | ★★☆ | Rekomendasi utama untuk handover dan produksi |
| **B. Docker di VPS Indonesia** | Sedikit di atas VPS biasa | ★★☆ | Tim yang nyaman dengan Docker |
| **C. Shared hosting Indonesia** | Paling murah | ★☆☆ | Hanya jika provider benar-benar support `pdo_pgsql` + SSH |

## Rekomendasi untuk handover di Indonesia

Arsitektur yang direkomendasikan:

- **Pilih VPS Indonesia**, lalu jalankan **PHP + Postgres di server yang sama**
- Hindari setup yang memecah web dan database ke beberapa layanan untuk proyek ini
- Gunakan shared hosting hanya bila provider mendukung **PHP 8+, `pdo_pgsql`, akses SSH/terminal, writable upload, dan HTTPS**

Urutan implementasi yang direkomendasikan:

1. Sewa VPS Indonesia
2. Install Ubuntu + Apache/Nginx + PHP + PostgreSQL
3. Clone repo
4. Import `sql/schema.sql` dan `sql/seed.sql`
5. Buat admin dengan `php sql/make_admin.php`
6. Atur env `PAUD_*`

---

## Checklist umum sebelum deploy

- [ ] Ganti password admin default: `php sql/make_admin.php admin <PasswordBaru>`
- [ ] Set `cors_origin` di `api/config.php` menjadi domain Anda, **bukan `*`**, untuk produksi
- [ ] Pastikan HTTPS aktif (Let's Encrypt gratis)
- [ ] Konfigurasi upload: `uploads/` harus writable oleh user web server (biasanya `www-data`)
- [ ] Jika project sudah pernah dipakai, copy folder `uploads/` lama ke server. Dump database saja tidak cukup
- [ ] Cadangan DB: `pg_dump` periodik (lihat bagian *Backup* di bawah)
- [ ] Set `PAUD_TRUST_PROXY=1` saat app berada di balik reverse proxy / load balancer
- [ ] Set `PAUD_SESSION_SECURE=1` saat cookie admin harus selalu `Secure`
- [ ] Set `PAUD_DB_SSLMODE=require` saat database mewajibkan TLS/SSL

Set kredensial DB lewat environment variable (jangan hardcode di `config.php`):

```bash
PAUD_DB_HOST=localhost
PAUD_DB_PORT=5432
PAUD_DB_NAME=paud_cemara
PAUD_DB_USER=paud_user
PAUD_DB_PASS=rahasia_kuat
PAUD_DB_SSLMODE=
PAUD_UPLOAD_DIR=/var/www/paud-cemara/uploads
PAUD_TRUST_PROXY=0
PAUD_SESSION_SECURE=0
```

## Data yang harus ikut saat pindah server

Simpan dan pindahkan tiga hal ini bersama-sama:

1. dump database PostgreSQL
2. seluruh folder `uploads/`
3. konfigurasi koneksi database (`PAUD_*` atau `api/config.local.php`)

Catatan penting:

- database hanya menyimpan path relatif seperti `uploads/gallery/nama-file.jpg`
- file gambar aslinya tetap berada di filesystem server
- jika database dipindah tanpa folder `uploads/`, data masih ada tetapi gambar akan rusak

---

## Opsi A — VPS Ubuntu (Apache + PHP + Postgres)

Skenario: VPS minimal 1 GB RAM, OS Ubuntu 22.04 / 24.04. Contoh provider lokal: Biznet Gio, IDCloudHost, DomaiNesia, Qwords.

### 1. Install stack

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apache2 php php-pgsql php-mbstring php-curl php-gd \
                    postgresql postgresql-contrib certbot python3-certbot-apache \
                    git unzip
```

### 2. Setup Postgres

```bash
sudo -u postgres psql <<'SQL'
CREATE USER paud_user WITH PASSWORD 'GANTI_INI';
CREATE DATABASE paud_cemara OWNER paud_user;
\c paud_cemara
GRANT ALL ON SCHEMA public TO paud_user;
SQL
```

### 3. Clone project & apply schema

```bash
cd /var/www
sudo git clone <repo-anda> paud-cemara
sudo chown -R www-data:www-data paud-cemara
cd paud-cemara

# Import schema & seed
sudo -u postgres psql -d paud_cemara -f sql/schema.sql
sudo -u postgres psql -d paud_cemara -f sql/seed.sql

# Buat admin
sudo PAUD_DB_HOST=localhost PAUD_DB_PORT=5432 PAUD_DB_NAME=paud_cemara \
     PAUD_DB_USER=paud_user PAUD_DB_PASS='GANTI_INI' \
     php sql/make_admin.php admin 'PasswordKuat123!'

# Pastikan folder upload writable
sudo chmod -R 775 uploads
sudo chown -R www-data:www-data uploads
```

Jika project sudah pernah dipakai sebelumnya, salin juga isi folder `uploads/`
ke server ini sebelum situs dibuka ke publik.

### 4. Apache virtualhost

Edit `/etc/apache2/sites-available/paud.conf`:

```apache
<VirtualHost *:80>
    ServerName paudcemara.sch.id
    ServerAlias www.paudcemara.sch.id
    DocumentRoot /var/www/paud-cemara

    <Directory /var/www/paud-cemara>
        AllowOverride All
        Require all granted
    </Directory>

    # Pass kredensial DB ke PHP via env
    SetEnv PAUD_DB_HOST localhost
    SetEnv PAUD_DB_PORT 5432
    SetEnv PAUD_DB_NAME paud_cemara
    SetEnv PAUD_DB_USER paud_user
    SetEnv PAUD_DB_PASS GANTI_INI

    ErrorLog  ${APACHE_LOG_DIR}/paud-error.log
    CustomLog ${APACHE_LOG_DIR}/paud-access.log combined
</VirtualHost>
```

```bash
sudo a2enmod rewrite headers deflate
sudo a2ensite paud
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### 5. HTTPS (Let's Encrypt)

```bash
sudo certbot --apache -d paudcemara.sch.id -d www.paudcemara.sch.id
```

Setelah ini set `PAUD_CORS_ORIGIN=https://paudcemara.sch.id`.

### 6. Backup otomatis harian (opsional)

```bash
sudo tee /etc/cron.daily/paud-backup <<'EOF'
#!/bin/bash
DEST=/var/backups/paud
mkdir -p $DEST
pg_dump -U paud_user -h localhost paud_cemara | gzip > $DEST/db-$(date +%F).sql.gz
tar czf $DEST/uploads-$(date +%F).tar.gz -C /var/www/paud-cemara uploads
find $DEST -mtime +14 -delete
EOF
sudo chmod +x /etc/cron.daily/paud-backup
```

---

## Opsi B — Docker di VPS Indonesia

Untuk workflow container, gunakan `Dockerfile` yang sudah ada dan tetap jalankan
di VPS Indonesia agar file upload dan database lebih mudah dikelola.

Alur sederhananya:

1. Siapkan VPS Ubuntu
2. Install Docker + Docker Compose plugin
3. Jalankan container web dari repo ini
4. Jalankan PostgreSQL di host yang sama atau container terpisah dengan volume persisten
5. Inject env `PAUD_DB_*`, `PAUD_TRUST_PROXY=1`, `PAUD_SESSION_SECURE=1`
6. Mount `uploads/` ke volume persisten

**Penting:** jangan deploy ke filesystem ephemeral kalau upload gambar dipakai aktif.

Build image:

```bash
docker build -t paud-cemara:latest .
```

Contoh `docker run`:

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

Kalau sudah ada gambar dari mesin lain, copy isi `uploads/` lama ke volume atau bind mount yang dipakai container.

---

## Opsi C — Shared hosting Indonesia (opsional, tidak direkomendasikan)

Gunakan shared hosting hanya bila provider mengonfirmasi semua poin ini:

- PHP 8+ aktif
- ekstensi `pdo_pgsql` tersedia
- ada SSH / terminal / cron
- `.htaccess` aktif
- folder `uploads/` bisa dibuat writable
- HTTPS dan custom domain didukung

### Konfigurasi

1. Upload semua file via FTP ke document root (biasanya `public_html/`).
2. Buat file `api/config.local.php` (override, tidak ter-track git):
   ```php
   <?php
   return [
       'db' => [
           'host'     => 'postgres.provider-anda.id',
           'port'     => '5432',
           'dbname'   => 'paud_cemara',
           'user'     => 'USER_DB',
           'password' => 'PASS_DB',
           'sslmode'  => 'require',
       ],
       'cors_origin'  => 'https://paudcemara.sch.id',
       'upload_dir'   => __DIR__ . '/../uploads',
       'session_name' => 'paud_admin_sess',
       'trust_proxy'  => true,
       'force_secure_session' => true,
   ];
   ```
3. Pastikan `uploads/` punya permission `775` via File Manager cPanel.
4. Jalankan via cPanel Terminal:
   ```bash
   php sql/make_admin.php admin 'PasswordKuat'
   ```

**Catatan:** jangan gunakan shared hosting yang tidak bisa memastikan `pdo_pgsql`.
Untuk project ini, VPS tetap lebih aman dan lebih efisien secara operasional.

---

## Post-deploy checklist

- [ ] Buka `https://domain-anda.com` — beranda tampil dengan data Postgres
- [ ] Buka `/#/admin` — bisa login dengan akun admin
- [ ] Tab **Berita → + Berita baru** → simpan → muncul di publik
- [ ] Tab **Galeri → + Foto** → upload gambar → file tersimpan di `uploads/gallery/`
- [ ] Submit form kontak dari halaman publik → muncul di tab Pesan admin
- [ ] Submit form PPDB → muncul di tab Pendaftar admin
- [ ] Edit **Pengaturan** → reload halaman publik → footer/alamat ikut berubah
- [ ] `curl https://domain-anda.com/api/config.php` → **harusnya 403** (diblok `.htaccess`)
- [ ] `curl https://domain-anda.com/sql/schema.sql` → **harusnya 403**

---

## Troubleshooting singkat

| Gejala | Kemungkinan penyebab |
|---|---|
| Halaman publik blank, console error `Cannot read 'SEED'` | JSX gagal di-compile → cek browser Console; biasanya typo di file `.jsx` |
| Login gagal terus walau password benar | Cookie session tidak set — biasanya CORS atau `cors_origin` mismatch |
| Upload gambar 500 error | `uploads/` tidak writable → `chmod 775 uploads && chown www-data:www-data uploads` |
| Gambar lama hilang setelah pindah server | Folder `uploads/` lama tidak ikut disalin atau container tidak memakai storage persisten |
| API `500 Database connection failed` | Kredensial `PAUD_DB_*` salah atau Postgres belum jalan |
| Admin auto-logout terus | Idle timeout 2 jam di `_session.php` — aman, login ulang |
