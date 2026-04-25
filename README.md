# PAUD Cemara

Website profil sekolah PAUD dengan halaman publik, panel admin, backend PHP,
dan database PostgreSQL.

**Stack:** HTML + React (via CDN) · PHP murni + PDO · PostgreSQL · tanpa build
step frontend.

## Fitur utama

- halaman publik untuk profil sekolah, program, galeri, berita, kontak, dan PPDB
- panel admin dengan login berbasis session
- CRUD berita, galeri, album, program, guru/staf, dan pengaturan sekolah
- upload gambar ke folder lokal `uploads/`
- form `Kontak` dan `PPDB` tersimpan ke PostgreSQL
- dokumentasi setup lokal dan deploy terpisah

## Dokumentasi

- [`SETUP_WINDOWS.md`](SETUP_WINDOWS.md): checklist cepat setup lokal Windows native
- [`HANDOVER.md`](HANDOVER.md): panduan setup lokal lengkap, verifikasi, dan troubleshooting
- [`DEPLOY.md`](DEPLOY.md): panduan deploy ke server / VPS

## Quick Start

### 1. Siapkan dependency

Yang dibutuhkan:

- PHP `>= 8.1`
- PostgreSQL `>= 14`

Untuk setup Windows native dengan PostgreSQL Desktop / pgAdmin, ikuti
[`SETUP_WINDOWS.md`](SETUP_WINDOWS.md).

### 2. Buat config lokal

Copy file contoh:

```bash
cp api/config.local.example.php api/config.local.php
```

Lalu sesuaikan koneksi database di `api/config.local.php`.

### 3. Buat database dan import schema

Contoh untuk PostgreSQL di `5432`:

```bash
psql -h localhost -p 5432 -U postgres -c "CREATE DATABASE paud_cemara;"
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql/schema.sql
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql/seed.sql
```

### 4. Buat akun admin

```bash
php sql/make_admin.php admin PasswordKuat123
```

### 5. Jalankan aplikasi

```bash
php -S localhost:8000
```

Buka:

- `http://localhost:8000`
- `http://localhost:8000/#/admin`

## Catatan setup

- project default memakai port database `5433` di `api/config.php`
- PostgreSQL Desktop di Windows biasanya memakai `5432`, jadi sesuaikan lewat `api/config.local.php`
- frontend akan fallback ke `src/seed.js` jika API / DB gagal
- jangan buka `index.html` via `file://`

## API ringkas

Endpoint utama:

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

## Operasional

- `uploads/` hanya menyimpan placeholder di repo; file upload asli tidak perlu di-commit
- `api/config.local.php`, `.env`, dan kredensial lokal tidak masuk repo
- environment variable `PAUD_*` bisa dipakai untuk override config sementara

## Struktur project

```text
joki/
├─ index.html
├─ src/
├─ styles/
├─ api/
├─ sql/
└─ uploads/
```

## Detail teknis

<details>
<summary>Folder penting</summary>

```text
src/
├─ app.jsx
├─ shell.jsx
├─ i18n.js
├─ seed.js
├─ pages-a.jsx
├─ pages-b.jsx
├─ pages-c.jsx
└─ pages-admin.jsx

api/
├─ config.php
├─ db.php
├─ bootstrap.php
├─ contact.php
├─ ppdb.php
├─ login.php
├─ logout.php
├─ me.php
├─ _session.php
└─ admin/
   ├─ stats.php
   ├─ messages.php
   ├─ registrations.php
   ├─ news.php
   ├─ gallery.php
   ├─ upload.php
   ├─ settings.php
   ├─ programs.php
   ├─ teachers.php
   └─ albums.php

sql/
├─ schema.sql
├─ seed.sql
└─ reset_baseline.php
```

</details>

<details>
<summary>Test endpoint cepat</summary>

```bash
curl -s http://localhost:8000/api/bootstrap.php | head -c 400
curl -s -X POST http://localhost:8000/api/contact.php \
  -H 'Content-Type: application/json' \
  -d '{"name":"Budi","email":"budi@example.com","subject":"Test","message":"Halo dari curl"}'
```

PowerShell:

```powershell
(Invoke-WebRequest http://localhost:8000/api/bootstrap.php).Content
```

</details>
