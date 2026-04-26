-- =====================================================================
-- PAUD Cemara — Postgres schema
-- Run: psql -U postgres -d paud_cemara -f sql/schema.sql
-- =====================================================================

-- Fresh start (hati-hati di production)
DROP TABLE IF EXISTS registrations      CASCADE;
DROP TABLE IF EXISTS messages           CASCADE;
DROP TABLE IF EXISTS day_schedule       CASCADE;
DROP TABLE IF EXISTS fees               CASCADE;
DROP TABLE IF EXISTS history_entries    CASCADE;
DROP TABLE IF EXISTS facilities         CASCADE;
DROP TABLE IF EXISTS hero_stats         CASCADE;
DROP TABLE IF EXISTS teachers           CASCADE;
DROP TABLE IF EXISTS news               CASCADE;
DROP TABLE IF EXISTS gallery_items      CASCADE;
DROP TABLE IF EXISTS albums             CASCADE;
DROP TABLE IF EXISTS programs           CASCADE;
DROP TABLE IF EXISTS settings           CASCADE;
DROP TABLE IF EXISTS admin_user         CASCADE;


-- ---------------------------------------------------------------------
-- Admin (single user)
-- ---------------------------------------------------------------------
CREATE TABLE admin_user (
    id              SERIAL PRIMARY KEY,
    username        VARCHAR(50)  NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,   -- password_hash() bcrypt
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);

-- Admin dibuat via script terpisah (password di-hash bcrypt):
--   php sql/make_admin.php admin rahasia123
-- Script tersebut akan INSERT atau UPDATE tabel admin_user.


-- ---------------------------------------------------------------------
-- Settings (satu-baris, key-value via kolom tunggal)
-- ---------------------------------------------------------------------
CREATE TABLE settings (
    id              INT PRIMARY KEY DEFAULT 1,
    school_name     VARCHAR(120) NOT NULL,
    tagline_id      TEXT,
    tagline_en      TEXT,
    address         TEXT,
    phone           VARCHAR(40),
    whatsapp        VARCHAR(40),
    email           VARCHAR(120),
    hours_id        VARCHAR(120),
    hours_en        VARCHAR(120),
    logo_path       VARCHAR(255),
    map_lat         NUMERIC(10,7),
    map_lng         NUMERIC(10,7),
    map_zoom        SMALLINT DEFAULT 16,
    maps_embed_url  TEXT,
    CONSTRAINT settings_single_row CHECK (id = 1)
);


-- ---------------------------------------------------------------------
-- Program & Kurikulum
-- ---------------------------------------------------------------------
CREATE TABLE programs (
    id              VARCHAR(40)  PRIMARY KEY,
    sort_order      INT          NOT NULL DEFAULT 0,
    age_id          VARCHAR(60),
    age_en          VARCHAR(60),
    title_id        VARCHAR(120) NOT NULL,
    title_en        VARCHAR(120),
    tone            VARCHAR(20)  DEFAULT 'yellow',
    hours_id        VARCHAR(120),
    hours_en        VARCHAR(120),
    desc_id         TEXT,
    desc_en         TEXT,
    pillars_id      TEXT[],      -- array of strings
    pillars_en      TEXT[]
);


-- ---------------------------------------------------------------------
-- Galeri: album + items
-- ---------------------------------------------------------------------
CREATE TABLE albums (
    id              VARCHAR(40)  PRIMARY KEY,
    sort_order      INT          NOT NULL DEFAULT 0,
    name_id         VARCHAR(80)  NOT NULL,
    name_en         VARCHAR(80),
    tone            VARCHAR(20)  DEFAULT 'yellow'
);

CREATE TABLE gallery_items (
    id              SERIAL PRIMARY KEY,
    album_id        VARCHAR(40) REFERENCES albums(id) ON DELETE SET NULL,
    sort_order      INT         NOT NULL DEFAULT 0,
    caption_id      TEXT,
    caption_en      TEXT,
    file_path       VARCHAR(255),         -- path relatif ke uploads/gallery/xxx
    w               SMALLINT    DEFAULT 1,-- span grid width (1..2)
    h               SMALLINT    DEFAULT 1,-- span grid height (1..2)
    tone            VARCHAR(20) DEFAULT 'yellow',
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_gallery_album ON gallery_items(album_id);


-- ---------------------------------------------------------------------
-- Berita & Pengumuman
-- ---------------------------------------------------------------------
CREATE TABLE news (
    id              VARCHAR(40)  PRIMARY KEY,
    slug            VARCHAR(160) NOT NULL UNIQUE,
    category_id     VARCHAR(60),
    category_en     VARCHAR(60),
    tone            VARCHAR(20)  DEFAULT 'yellow',
    pinned          BOOLEAN      NOT NULL DEFAULT FALSE,
    publish_date    DATE         NOT NULL DEFAULT CURRENT_DATE,
    author          VARCHAR(80),
    title_id        TEXT         NOT NULL,
    title_en        TEXT,
    excerpt_id      TEXT,
    excerpt_en      TEXT,
    body_id         TEXT[],      -- paragraf-paragraf
    body_en         TEXT[],
    cover_path      VARCHAR(255),
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX idx_news_pinned_date ON news(pinned DESC, publish_date DESC);


-- ---------------------------------------------------------------------
-- Guru & Staff
-- ---------------------------------------------------------------------
CREATE TABLE teachers (
    id              VARCHAR(40)  PRIMARY KEY,
    sort_order      INT          NOT NULL DEFAULT 0,
    name            VARCHAR(120) NOT NULL,
    role_id         VARCHAR(120),
    role_en         VARCHAR(120),
    tone            VARCHAR(20)  DEFAULT 'yellow',
    photo_path      VARCHAR(255)
);


-- ---------------------------------------------------------------------
-- Content blocks kecil untuk halaman Profil
-- ---------------------------------------------------------------------
CREATE TABLE hero_stats (
    k               VARCHAR(40)  PRIMARY KEY,   -- hero_stat1..4
    n               VARCHAR(20)  NOT NULL,
    label_id        VARCHAR(80),
    label_en        VARCHAR(80),
    sort_order      INT          NOT NULL DEFAULT 0
);

CREATE TABLE facilities (
    id              SERIAL PRIMARY KEY,
    sort_order      INT         NOT NULL DEFAULT 0,
    tone            VARCHAR(20) DEFAULT 'yellow',
    text_id         VARCHAR(160),
    text_en         VARCHAR(160)
);

CREATE TABLE history_entries (
    id              SERIAL PRIMARY KEY,
    sort_order      INT         NOT NULL DEFAULT 0,
    year            VARCHAR(10),
    text_id         TEXT,
    text_en         TEXT
);

CREATE TABLE fees (
    id              SERIAL PRIMARY KEY,
    sort_order      INT         NOT NULL DEFAULT 0,
    label_id        VARCHAR(160),
    label_en        VARCHAR(160),
    amount          INT         NOT NULL,   -- rupiah
    once            BOOLEAN     NOT NULL DEFAULT TRUE
);

CREATE TABLE day_schedule (
    id              SERIAL PRIMARY KEY,
    sort_order      INT         NOT NULL DEFAULT 0,
    time_label      VARCHAR(10),
    tone            VARCHAR(20) DEFAULT 'yellow',
    text_id         VARCHAR(160),
    text_en         VARCHAR(160)
);


-- ---------------------------------------------------------------------
-- Pesan dari form kontak (moderasi)
-- ---------------------------------------------------------------------
CREATE TABLE messages (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(120) NOT NULL,
    email           VARCHAR(160),
    subject         VARCHAR(200),
    body            TEXT         NOT NULL,
    read_at         TIMESTAMPTZ,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX idx_messages_created ON messages(created_at DESC);


-- ---------------------------------------------------------------------
-- Pendaftar PPDB
-- ---------------------------------------------------------------------
CREATE TABLE registrations (
    id              SERIAL PRIMARY KEY,
    child_name      VARCHAR(120) NOT NULL,
    child_dob       DATE,
    child_gender    VARCHAR(10),
    level           VARCHAR(20),    -- kb / tk-a / tk-b
    parent_name     VARCHAR(120) NOT NULL,
    parent_email    VARCHAR(160),
    parent_phone    VARCHAR(40),
    parent_address  TEXT,
    notes           TEXT,
    status          VARCHAR(20)  NOT NULL DEFAULT 'baru',  -- baru / diproses / diterima / ditolak
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT now()
);
CREATE INDEX idx_registrations_status ON registrations(status, created_at DESC);
