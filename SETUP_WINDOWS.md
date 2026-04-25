# Setup Windows Checklist

Checklist singkat untuk menjalankan project di **Windows native** dengan
**PostgreSQL Desktop / pgAdmin**.

Untuk penjelasan lengkap, lihat `HANDOVER.md`.

---

## 1. Buka project di PowerShell

```powershell
cd C:\path\ke\project\paud-cemara
```

## 2. Pastikan PHP CLI siap

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

## 3. Pastikan PostgreSQL siap

```powershell
psql --version
Get-Service *postgres*
```

Service PostgreSQL harus berstatus `Running`.

## 4. Buat database `paud_cemara`

Opsi `psql`:

```powershell
createdb -h localhost -p 5432 -U postgres paud_cemara
```

Opsi `pgAdmin`:

1. Buka `pgAdmin 4`
2. Login ke server lokal
3. Klik kanan `Databases`
4. Pilih `Create > Database...`
5. Isi nama database: `paud_cemara`

## 5. Import schema dan seed

```powershell
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\schema.sql
psql -h localhost -p 5432 -U postgres -d paud_cemara -f sql\seed.sql
```

## 6. Buat config lokal

```powershell
Copy-Item api\config.local.example.php api\config.local.php
```

Lalu edit `api/config.local.php`:

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

## 7. Buat akun admin

```powershell
php sql\make_admin.php admin PasswordKuat123
```

## 8. Jalankan aplikasi

```powershell
php -S localhost:8000
```

Buka:

- `http://localhost:8000`
- `http://localhost:8000/#/admin`

## 9. Verifikasi cepat

Browser:

- `http://localhost:8000`
- `http://localhost:8000/api/bootstrap.php`
- `http://localhost:8000/#/admin`

PowerShell:

```powershell
(Invoke-WebRequest http://localhost:8000/api/bootstrap.php).Content
psql -h localhost -p 5432 -U postgres -d paud_cemara -c "SELECT username FROM admin_user;"
```

## 10. Jika ada error

- `php` tidak dikenali: cek instalasi PHP dan `PATH`
- `psql` tidak dikenali: cek instalasi PostgreSQL dan `PATH`
- `Database connection failed`: cek `api/config.local.php`, user/password, port, dan status service PostgreSQL
- halaman tampil tapi data tidak berubah: cek `http://localhost:8000/api/bootstrap.php` karena frontend bisa fallback ke seed lokal
