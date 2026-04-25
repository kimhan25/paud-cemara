-- =====================================================================
-- PAUD Cemara — Seed data
-- Jalankan SETELAH schema.sql:
--   psql -U postgres -d paud_cemara -f sql/seed.sql
-- =====================================================================

-- Settings -----------------------------------------------------------
INSERT INTO settings (id, school_name, tagline_id, tagline_en, address, phone, whatsapp, email, hours_id, hours_en, logo_path, maps_embed_url)
VALUES (1,
    'PAUD Cemara',
    'Taman tempat anak belajar menjadi diri sendiri.',
    'A garden where children learn to be themselves.',
    'Villa Puncak Tidar N-01, Karangwidoro, Dau, Malang 65151',
    '+62 341 550 175',
    '628112334455',
    'halo@paudcemara.id',
    'Senin–Jumat · 07.30–13.30',
    'Mon–Fri · 07.30–13.30',
    NULL,
    'https://www.openstreetmap.org/export/embed.html?bbox=112.575%2C-7.925%2C112.595%2C-7.912&layer=mapnik&marker=-7.9186%2C112.5841'
);

-- Hero stats ---------------------------------------------------------
INSERT INTO hero_stats (k, n, label_id, label_en, sort_order) VALUES
('hero_stat1', '142', 'Anak aktif',        'Active children',   1),
('hero_stat2', '18',  'Tahun',              'Years',              2),
('hero_stat3', '17',  'Guru & staff',        'Teachers & staff',  3),
('hero_stat4', '60+', 'Lulusan / tahun',     'Graduates / year',  4);

-- Programs -----------------------------------------------------------
INSERT INTO programs (id, sort_order, age_id, age_en, title_id, title_en, tone, hours_id, hours_en, desc_id, desc_en, pillars_id, pillars_en) VALUES
('kb',   1, 'Usia 2–3 tahun','Ages 2–3','Kelompok Bermain','Playgroup','yellow',
 '3 jam / hari · 3× seminggu','3 hrs / day · 3× weekly',
 'Eksplorasi sensorik, musik, dan interaksi pertama dengan teman sebaya.',
 'Sensory play, music, and first friendships with peers.',
 ARRAY['Bermain bebas','Lingkaran lagu','Eksplorasi tekstur'],
 ARRAY['Free play','Song circle','Texture exploration']),
('tk-a', 2, 'Usia 4 tahun','Age 4','TK A','Kindergarten A','green',
 '5 jam / hari · 5× seminggu','5 hrs / day · 5× weekly',
 'Literasi awal, numerasi bermakna, dan proyek tematik per dua minggu.',
 'Early literacy, meaningful numeracy, and fortnightly thematic projects.',
 ARRAY['Membaca bersama','Numerasi lewat cerita','Proyek tematik'],
 ARRAY['Shared reading','Math through stories','Thematic projects']),
('tk-b', 3, 'Usia 5–6 tahun','Ages 5–6','TK B','Kindergarten B','blue',
 '5 jam / hari · 5× seminggu','5 hrs / day · 5× weekly',
 'Persiapan SD yang lembut — tetap bermain, tetap bertanya, tanpa terburu-buru.',
 'Gentle primary-school prep — still playing, still asking, never rushed.',
 ARRAY['Menulis cerita sendiri','Sains anak','Proyek komunitas'],
 ARRAY['Write-your-own stories','Kid science','Community projects']);

-- Albums -------------------------------------------------------------
INSERT INTO albums (id, sort_order, name_id, name_en, tone) VALUES
('kelas',  1, 'Kegiatan Kelas', 'Classroom',       'red'),
('puncak', 2, 'Puncak Tema',    'Theme Days',      'yellow'),
('ortu',   3, 'Hari Orang Tua', 'Parent Days',     'green'),
('kebun',  4, 'Kebun Sekolah',  'School Garden',   'blue'),
('lulus',  5, 'Kelulusan',      'Graduation',      'purple');

-- Gallery ------------------------------------------------------------
INSERT INTO gallery_items (album_id, sort_order, caption_id, caption_en, w, h, tone) VALUES
('kelas',  1,  'Lingkaran pagi di kelas TK A','Morning circle, TK A',         2,2,'yellow'),
('kebun',  2,  'Panen tomat ceri pertama','First cherry tomato harvest',     1,1,'green'),
('puncak', 3,  'Parade tema profesi','Careers theme parade',                 1,2,'red'),
('ortu',   4,  'Ayah membacakan dongeng','Dad reads a story',                2,1,'blue'),
('kelas',  5,  'Kolase daun dari taman','Leaf collage from the garden',      1,1,'purple'),
('lulus',  6,  'Toga kecil kelas TK B','Tiny toga, class TK B',              1,1,'pink'),
('puncak', 7,  'Hari air & pelangi','Water & rainbow day',                   1,1,'blue'),
('kebun',  8,  'Menanam kangkung bersama','Planting water spinach',          2,1,'green'),
('kelas',  9,  'Eksperimen warna dari kol ungu','Color experiment — red cabbage',1,1,'purple'),
('ortu',   10, 'Ibu mengajar membatik','Mom teaches batik',                  1,2,'orange'),
('puncak', 11, 'Hari pasar tradisional','Traditional market day',            1,1,'red'),
('kelas',  12, 'Cerita sebelum tidur siang','Story before afternoon nap',    1,1,'yellow');

-- News ---------------------------------------------------------------
INSERT INTO news (id, slug, category_id, category_en, tone, pinned, publish_date, author, title_id, title_en, excerpt_id, excerpt_en, body_id, body_en) VALUES
('n001','ppdb-2026-dibuka','Pengumuman','Announcement','red', TRUE,'2026-04-21','Tim Admin',
 'PPDB 2026/2027 resmi dibuka — gelombang pertama hingga 30 Mei',
 'Admissions 2026/2027 now open — first wave until May 30',
 'Gelombang pertama PPDB PAUD Cemara telah dibuka dengan kuota 36 anak untuk tiga jenjang. Daftar lebih awal, dapat diskon formulir.',
 'The first admissions wave is open with 36 seats across three levels. Apply early for a form-fee discount.',
 ARRAY[
   'Tahun ajaran 2026/2027 akan menjadi tahun ke-18 PAUD Cemara. Kami membuka pendaftaran dalam dua gelombang, dan gelombang pertama resmi dibuka hari ini, 21 April 2026.',
   'Kuota terbatas: 12 anak per jenjang untuk Kelompok Bermain, TK A, dan TK B. Pendaftar gelombang pertama mendapatkan potongan biaya formulir sebesar 30% dan prioritas jadwal observasi.',
   'Alur pendaftaran sama dengan tahun sebelumnya — isi formulir online, kunjungan sekolah, observasi anak (bermain bersama, bukan tes), lalu pengumuman dalam 7 hari kerja.',
   'Butuh info lebih lanjut? Hubungi kami via WhatsApp di nomor yang tertera, atau datang langsung ke kantor Selasa dan Kamis pukul 09.00–11.00.'
 ],
 ARRAY[
   'The 2026/2027 academic year will be Cemara''s 18th. We open admissions in two waves, and the first wave starts today, April 21, 2026.',
   'Limited seats: 12 children per level across Playgroup, Kindergarten A, and Kindergarten B. First-wave applicants receive a 30% form-fee discount and priority observation scheduling.',
   'The process is the same as last year — fill the online form, school visit, child observation (playing together, not a test), then announcement within 7 business days.',
   'Questions? WhatsApp us at the number listed, or visit the office Tuesdays and Thursdays 09.00–11.00.'
 ]),
('n002','panen-kebun','Cerita Kelas','Classroom Story','green', FALSE,'2026-04-14','Bu Ratih',
 'Panen pertama kebun mini — tomat ceri dan kangkung',
 'First mini-garden harvest — cherry tomatoes and water spinach',
 'Tiga bulan menanam, hari ini anak-anak memanen hasilnya dan membawa pulang satu kantung masing-masing.',
 'Three months of planting, and today the children harvested their first batch and took home a bag each.',
 ARRAY[
   'Proyek kebun mini dimulai Januari lalu sebagai bagian dari tema ''Tumbuh bersama tanah''. Setiap kelompok TK A mengadopsi satu petak 1×1 meter.',
   'Hari ini, hasil panen pertama tiba. Tomat ceri, kangkung, dan dua batang daun bawang yang menurut Rania ''tumbuh paling semangat''.',
   'Anak-anak membawa pulang hasil panen dalam kantung kertas daur ulang buatan kelas mereka sendiri. Beberapa orang tua sudah mengirim foto sup kangkung dari rumah.'
 ],
 ARRAY[
   'The mini-garden project started last January as part of the ''Growing with the soil'' theme. Each TK A group adopted a 1×1 meter plot.',
   'Today the first harvest arrived. Cherry tomatoes, water spinach, and two stalks of spring onion that Rania insists ''grew the most enthusiastically''.',
   'The children took their produce home in recycled paper bags they made themselves. A few parents have already sent photos of spinach soup from home.'
 ]),
('n003','libur-idulfitri','Pengumuman','Announcement','yellow', FALSE,'2026-04-08','Tim Admin',
 'Libur Idulfitri 1447 H: 18 April – 25 April 2026',
 'Eid holidays 1447 H: April 18–25, 2026',
 'Sekolah libur selama delapan hari. Kegiatan reguler kembali dimulai Senin, 27 April 2026.',
 'The school will be closed for eight days. Regular classes resume Monday, April 27, 2026.',
 ARRAY[
   'Keluarga besar PAUD Cemara mengucapkan Selamat Idulfitri 1447 H. Mohon maaf lahir dan batin dari tim guru dan staf.',
   'Libur berlangsung dari 18 April sampai 25 April 2026. Kami kembali beraktivitas pada Senin, 27 April, dengan tema baru ''Rumah yang hangat''.'
 ],
 ARRAY[
   'The PAUD Cemara family wishes you a joyful Eid 1447 H.',
   'The holiday runs April 18 to 25, 2026. We return to regular schedule on Monday, April 27, with a new theme ''A warm home''.'
 ]),
('n004','workshop-montessori','Acara','Event','blue', FALSE,'2026-03-28','Pak Danu',
 'Workshop orang tua: Mengenali tantrum tanpa panik',
 'Parent workshop: Handling tantrums without panic',
 'Sabtu 5 April, bersama psikolog anak Dr. Melati S., kami akan berbagi pendekatan yang ramah anak dan ramah orang tua.',
 'Saturday April 5, with child psychologist Dr. Melati S., we''ll share an approach that''s kind to both children and parents.',
 ARRAY[
   'Workshop dibuka untuk orang tua PAUD Cemara dan umum. Kapasitas 40 peserta, pendaftaran melalui formulir di halaman kontak.',
   'Sesi berlangsung 09.00–11.30 di aula Cemara, diikuti sesi tanya-jawab dan kopi.'
 ],
 ARRAY[
   'The workshop is open to Cemara parents and the public. Capacity 40, register via the form on the contact page.',
   'The session runs 09.00–11.30 in the Cemara hall, followed by Q&A and coffee.'
 ]),
('n005','guru-baru-bu-sari','Sekolah','School','purple', FALSE,'2026-03-15','Tim Admin',
 'Selamat datang, Bu Sari — wali kelas baru TK A-2',
 'Welcome, Bu Sari — new TK A-2 homeroom teacher',
 'Dengan 9 tahun pengalaman di PAUD berbasis alam, Bu Sari bergabung bulan ini menggantikan Bu Rini yang pindah tugas.',
 'With 9 years of nature-based early-education experience, Bu Sari joins us this month, replacing Bu Rini who relocated.',
 ARRAY['Bu Sari lulusan PAUD UPI dan sebelumnya mengajar di sekolah alam di Lembang selama hampir satu dekade. Anak-anak TK A-2 sudah mulai bertukar gambar dengan beliau sejak minggu lalu.'],
 ARRAY['Bu Sari graduated in Early Childhood Education from UPI and previously taught at a nature school in Lembang for nearly a decade. TK A-2 children have been exchanging drawings with her since last week.']),
('n006','hari-kartini','Acara','Event','red', FALSE,'2026-04-19','Bu Maya',
 'Hari Kartini: anak-anak cerita tentang perempuan hebat di rumahnya',
 'Kartini Day: children talk about the heroes at home',
 'Setiap anak membawa satu foto perempuan yang ia kagumi dari keluarganya dan menceritakannya di depan kelas.',
 'Each child brought a photo of a woman they admire from their family and shared her story with the class.',
 ARRAY['Cerita paling ramai datang dari Bima yang memperkenalkan ''Nenek Kartini'', nenek buyutnya yang katanya ''pernah naik kuda sampai Subang''. Kami tidak membantah.'],
 ARRAY['The liveliest story came from Bima, introducing ''Grandma Kartini'' — his great-grandmother who allegedly ''rode a horse all the way to Subang''. We didn''t argue.']);

-- Teachers -----------------------------------------------------------
INSERT INTO teachers (id, sort_order, name, role_id, role_en, tone) VALUES
('t1', 1, 'Bu Maya Rahardian',    'Kepala Sekolah',        'Head of School',   'red'),
('t2', 2, 'Pak Danu Syahputra',   'Koordinator Kurikulum', 'Curriculum Lead',  'blue'),
('t3', 3, 'Bu Ratih Kusumastuti', 'Wali Kelas TK A-1',     'Homeroom TK A-1',  'green'),
('t4', 4, 'Bu Sari Indrawati',    'Wali Kelas TK A-2',     'Homeroom TK A-2',  'yellow'),
('t5', 5, 'Pak Agung Prasetya',   'Wali Kelas TK B',        'Homeroom TK B',   'purple'),
('t6', 6, 'Bu Lila Ardhana',      'Guru Musik & Gerak',     'Music & Movement','pink');

-- Facilities ---------------------------------------------------------
INSERT INTO facilities (sort_order, tone, text_id, text_en) VALUES
(1,'green',  'Kebun mini & area panen',      'Mini-garden & harvest plot'),
(2,'blue',   'Kolam pasir & air',             'Sand & water pool'),
(3,'red',    'Aula musik dan gerak',          'Music & movement hall'),
(4,'yellow', 'Perpustakaan anak',             'Children''s library'),
(5,'purple', 'Dapur belajar (cooking class)', 'Learning kitchen'),
(6,'orange', 'Taman bermain luar',            'Outdoor playground');

-- History ------------------------------------------------------------
INSERT INTO history_entries (sort_order, year, text_id, text_en) VALUES
(1,'2008','Tiga guru dan sembilan anak memulai kelas di garasi rumah Bu Maya.','Three teachers and nine children start class in Bu Maya''s garage.'),
(2,'2012','Pindah ke bangunan di Jalan Cemara Asri — namanya kami pakai sampai sekarang.','We move to a building on Jalan Cemara Asri — the name we still carry today.'),
(3,'2017','Menambahkan jenjang Kelompok Bermain untuk usia 2–3 tahun.','We add a Playgroup level for ages 2–3.'),
(4,'2021','Memulai program kebun mini dan dapur belajar.','We launch the mini-garden and learning-kitchen programs.'),
(5,'2024','Akreditasi A dari BAN-PAUD dan PNF.','Accreditation grade A from BAN-PAUD dan PNF.');

-- Fees ---------------------------------------------------------------
INSERT INTO fees (sort_order, label_id, label_en, amount, once) VALUES
(1, 'Formulir pendaftaran',        'Application form fee',   150000,  TRUE),
(2, 'Uang pangkal (sekali bayar)', 'Enrollment fee (one-time)', 6500000, TRUE),
(3, 'SPP bulanan',                  'Monthly tuition',        1250000, FALSE),
(4, 'Seragam & buku tahunan',       'Uniform & annual book',  950000,  TRUE);

-- Day schedule -------------------------------------------------------
INSERT INTO day_schedule (sort_order, time_label, tone, text_id, text_en) VALUES
(1,'07.30','yellow','Penyambutan & main bebas',     'Welcome & free play'),
(2,'08.30','red',   'Lingkaran pagi & lagu',         'Morning circle & songs'),
(3,'09.30','green', 'Proyek tematik / kebun',        'Thematic project / garden'),
(4,'11.00','blue',  'Makan bersama & istirahat',     'Shared meal & rest'),
(5,'12.30','purple','Membaca & lagu pulang',         'Reading & farewell song');

-- Messages (contoh) --------------------------------------------------
INSERT INTO messages (name, email, subject, body, created_at) VALUES
('Dewi Anggraini',  'dewi@example.id',      'Tanya jadwal tur sekolah',
 'Halo, saya ingin tahu apakah masih ada slot tur di minggu kedua Mei untuk orang tua calon murid baru.', '2026-04-22 09:10+07'),
('Bapak Hendra P.', 'hendra.p@example.com', 'Biaya gelombang kedua',
 'Apakah ada perubahan biaya antara gelombang 1 dan 2? Terima kasih.', '2026-04-21 14:32+07');
