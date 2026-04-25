# PAUD Cemara — Website Profil Sekolah

Website profil sekolah PAUD dengan halaman publik + panel admin.
**Stack:** HTML + React (via CDN) · PHP murni + PDO · PostgreSQL · tanpa build step.

Lihat [`HANDOVER.md`](HANDOVER.md) untuk panduan setup lokal lengkap, termasuk
Windows native + PostgreSQL Desktop / pgAdmin, konfigurasi database, akun admin,
verifikasi, dan troubleshooting.

Lihat [`SETUP_WINDOWS.md`](SETUP_WINDOWS.md) untuk checklist singkat setup lokal
Windows native.

---

## Status pengerjaan

- [x] **Tahap 1** — Setup project, design system, halaman public pakai data hardcoded, schema Postgres + seed
- [x] **Tahap 2** — Backend API (PHP) + wiring data DB ke frontend + form kontak/PPDB
- [x] **Tahap 3** — Login admin real (session + bcrypt) + dashboard fetch dari DB
- [x] **Tahap 4a** — CRUD Berita + Galeri (dengan upload), moderasi Pesan, daftar Pendaftar PPDB, Pengaturan
- [x] **Tahap 4b** — CRUD Program + Guru/Staff + Album
- [x] **Tahap 5** — Hardening (.htaccess, session timeout, idle logout) + panduan deploy — lihat [DEPLOY.md](DEPLOY.md)

---

## Struktur folder

```
joki/
├─ index.html              ← entry point (buka ini di browser)
├─ src/                    ← JSX (dibaca langsung oleh Babel standalone)
│  ├─ app.jsx              ← root app + router
│  ├─ shell.jsx            ← nav + footer + store
│  ├─ i18n.js              ← string bilingual ID/EN
│  ├─ seed.js              ← data hardcoded (akan diganti fetch() di Tahap 2)
│  ├─ pages-a.jsx          ← Beranda, Profil
│  ├─ pages-b.jsx          ← Program, Galeri
│  ├─ pages-c.jsx          ← Berita, PPDB, Kontak
│  └─ pages-admin.jsx      ← Halaman admin
├─ styles/
│  ├─ tokens.css           ← design tokens (warna, font, radius)
│  ├─ shell.css            ← nav + footer
│  ├─ pages-public.css
│  └─ pages-admin.css
├─ api/                    ← PHP endpoints
│  ├─ config.php           ← kredensial DB (override via env var)
│  ├─ db.php               ← PDO helper + header JSON/CORS
│  ├─ bootstrap.php        ← GET: seluruh data publik dalam 1 fetch
│  ├─ contact.php          ← POST: form kontak
│  ├─ ppdb.php             ← POST: form PPDB
│  ├─ login.php            ← POST: login admin
│  ├─ logout.php           ← POST: logout admin
│  ├─ me.php               ← GET: sesi admin saat ini
│  ├─ _session.php         ← helper session (internal)
│  └─ admin/
│     ├─ stats.php         ← GET: counts untuk dashboard
│     ├─ messages.php      ← GET/POST/DELETE: pesan kontak
│     ├─ registrations.php ← GET/POST/DELETE: pendaftar PPDB
│     ├─ news.php          ← GET/POST/PUT/DELETE: CRUD berita (+ ?action=pin)
│     ├─ gallery.php       ← GET/POST/PUT/DELETE: CRUD galeri
│     ├─ upload.php        ← POST multipart: unggah gambar ke uploads/<kind>/
│     ├─ settings.php      ← GET/PUT: pengaturan sekolah
│     ├─ programs.php      ← GET/POST/PUT/DELETE: CRUD jenjang kurikulum
│     ├─ teachers.php      ← GET/POST/PUT/DELETE: CRUD guru/staf
│     └─ albums.php        ← GET/POST/PUT/DELETE: CRUD album galeri
├─ sql/
│  ├─ schema.sql           ← DDL tabel
│  ├─ seed.sql             ← data awal
│  └─ reset_baseline.php   ← reset konten/demo ke baseline
└─ uploads/                ← file gambar (galeri, berita, logo)
   ├─ gallery/
   ├─ news/
   ├─ settings/
   └─ teachers/
```

---

## Cara menjalankan

Untuk setup lokal lengkap, ikuti [`HANDOVER.md`](HANDOVER.md).

Ringkasnya:

1. Install PHP + PostgreSQL
2. Buat database `paud_cemara`
3. Import `sql/schema.sql` dan `sql/seed.sql`
4. Copy `api/config.local.example.php` menjadi `api/config.local.php`
5. Isi koneksi database lokal
6. Buat admin dengan `php sql/make_admin.php admin PasswordKuat123`
7. Jalankan:

```bash
php -S localhost:8000
```

Buka <http://localhost:8000>

Catatan:

- frontend akan fallback ke `src/seed.js` jika API / DB gagal
- jangan buka `index.html` via `file://`
- untuk Windows native, jalur detail yang direkomendasikan ada di `HANDOVER.md`

---

## Setup Postgres

Project default memakai `port=5433` di `api/config.php` untuk menghindari konflik
dengan PostgreSQL lokal lain yang sering memakai `5432`.

Untuk local setup yang memakai PostgreSQL Desktop / installer Windows di `5432`,
atur port tersebut di `api/config.local.php`.

Contoh import manual:

```bash
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql/schema.sql
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql/seed.sql
```

Contoh verifikasi:

```bash
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT username FROM admin_user;"
```

---

## API endpoints (Tahap 2)

| Method | Path                               | Fungsi                                       |
|--------|------------------------------------|----------------------------------------------|
| GET    | `/api/bootstrap.php`               | Ambil semua data publik dalam 1 response     |
| POST   | `/api/contact.php`                 | Submit form kontak                           |
| POST   | `/api/ppdb.php`                    | Submit form PPDB                             |
| POST   | `/api/login.php`                   | `{username, password}` → set session         |
| POST   | `/api/logout.php`                  | Hapus session                                |
| GET    | `/api/me.php`                      | `{user: {id, username} \| null}`            |
| GET    | `/api/admin/stats.php`             | **(auth)** counts dashboard                  |
| GET/POST/DELETE | `/api/admin/messages.php`  | **(auth)** list / mark-read / hapus pesan    |
| GET/POST/DELETE | `/api/admin/registrations.php` | **(auth)** list / update status / hapus |
| GET/POST/PUT/DELETE | `/api/admin/news.php`         | **(auth)** CRUD berita (+ `?action=pin`) |
| GET/POST/PUT/DELETE | `/api/admin/gallery.php`      | **(auth)** CRUD galeri       |
| POST            | `/api/admin/upload.php`            | **(auth)** multipart image upload (JPG/PNG/WEBP, maks 8 MB) |
| GET/PUT         | `/api/admin/settings.php`          | **(auth)** pengaturan sekolah |
| GET/POST/PUT/DELETE | `/api/admin/programs.php`      | **(auth)** CRUD program / jenjang |
| GET/POST/PUT/DELETE | `/api/admin/teachers.php`      | **(auth)** CRUD guru / staf       |
| GET/POST/PUT/DELETE | `/api/admin/albums.php`        | **(auth)** CRUD album galeri      |

**Override kredensial DB** tanpa ubah `config.php`:
```bash
PAUD_DB_HOST=localhost PAUD_DB_NAME=paud_cemara PAUD_DB_USER=postgres PAUD_DB_PASS=secret \
    php -S localhost:8000
```

Environment variable `PAUD_*` dapat dipakai untuk override sementara terhadap
default project maupun `api/config.local.php`.

**Environment opsional untuk production:**
```bash
PAUD_CORS_ORIGIN=https://domain-sekolah.id
PAUD_DEBUG=0
PAUD_DB_SSLMODE=require
PAUD_TRUST_PROXY=1
PAUD_SESSION_SECURE=1
```

**Proteksi dasar yang sudah aktif:**
- Login admin dibatasi rate limit sederhana berbasis IP
- Form `Kontak` dan `PPDB` memakai honeypot + rate limit sederhana
- Cookie session admin mendukung deployment di balik reverse proxy lewat `PAUD_TRUST_PROXY=1` dan/atau `PAUD_SESSION_SECURE=1`

**Test endpoint:**
```bash
curl -s http://localhost:8000/api/bootstrap.php | head -c 400
curl -s -X POST http://localhost:8000/api/contact.php \
     -H 'Content-Type: application/json' \
     -d '{"name":"Budi","email":"budi@example.com","subject":"Test","message":"Halo dari curl"}'
```

Untuk PowerShell, gunakan browser atau:

```powershell
(Invoke-WebRequest http://localhost:8000/api/bootstrap.php).Content
```

---

## Admin

- URL: buka `/#/admin` (atau klik "Admin" di footer situs)
- Username: `admin` (bisa diganti via `sql/make_admin.php`)
- Password: yang Anda set saat menjalankan `sql/make_admin.php`
- Ganti password kapan saja: `php sql/make_admin.php admin password_baru`
- Reset konten/demo ke baseline awal: `php sql/reset_baseline.php`

---

## Catatan penting

- **Jangan** commit folder `uploads/` isi file asli ke git (sudah ada `.gitkeep` penanda).
- Design tokens (warna, font) ada di `styles/tokens.css` — ubah di satu tempat.
- Bahasa ID/EN disimpan sebagai kolom paralel (`title_id` / `title_en` dst). Toggle
  bahasa di UI membaca dari kolom yang sesuai.
- Prototype menggunakan React via CDN + Babel in-browser. Ini disengaja supaya
  "tanpa build step" — bisa dideploy ke shared hosting apa pun yang support PHP.
