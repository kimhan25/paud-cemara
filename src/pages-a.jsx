/* ================================================================
   PAUD Cemara — Home + Profile + Program pages
   ================================================================ */

const FACILITY_DETAILS = {
  green: {
    id: 'Bedeng tanam, komposter mini, dan meja observasi kecil untuk proyek sains harian.',
    en: 'Raised beds, a mini composter, and a small observation table for daily science projects.',
  },
  blue: {
    id: 'Wadah sensori untuk menuang, menakar, membangun, dan belajar sebab-akibat lewat permainan.',
    en: 'A sensory zone for pouring, measuring, building, and learning cause and effect through play.',
  },
  red: {
    id: 'Ruang lapang untuk musik, tari, senam cerita, dan pertunjukan tema bersama orang tua.',
    en: 'An open room for music, dance, story movement, and theme performances with families.',
  },
  yellow: {
    id: 'Rak buku rendah, karpet baca, dan sudut dongeng yang membuat anak mudah memilih buku sendiri.',
    en: 'Low bookshelves, a reading rug, and a story corner that makes choosing a book feel easy.',
  },
  purple: {
    id: 'Area praktik memasak sederhana untuk mengenal tekstur, rasa, alat, dan kebiasaan hidup sehat.',
    en: 'A simple cooking area for learning textures, flavors, tools, and healthy daily habits.',
  },
  orange: {
    id: 'Permainan motorik besar dengan perosotan, titian, dan area lari yang aman dan teduh.',
    en: 'A gross-motor play zone with a slide, balance path, and a safe shaded area to run around.',
  },
};

function SceneIllustration({ scene }) {
  if (scene === 'morning-circle') {
    return (
      <svg viewBox="0 0 320 220" aria-hidden="true">
        <rect width="320" height="220" fill="oklch(0.96 0.03 84)"/>
        <rect y="130" width="320" height="90" fill="oklch(0.87 0.11 135)"/>
        <circle cx="258" cy="42" r="20" fill="oklch(0.92 0.12 92)"/>
        <rect x="40" y="60" width="240" height="96" rx="20" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3"/>
        <rect x="58" y="76" width="70" height="44" rx="12" fill="var(--yellow)"/>
        <rect x="136" y="76" width="58" height="44" rx="12" fill="var(--blue)"/>
        <rect x="202" y="76" width="58" height="44" rx="12" fill="var(--red)"/>
        <circle cx="95" cy="156" r="18" fill="var(--red)" stroke="var(--ink)" strokeWidth="3"/>
        <circle cx="140" cy="168" r="18" fill="var(--green)" stroke="var(--ink)" strokeWidth="3"/>
        <circle cx="185" cy="156" r="18" fill="var(--blue)" stroke="var(--ink)" strokeWidth="3"/>
        <circle cx="230" cy="168" r="18" fill="var(--purple)" stroke="var(--ink)" strokeWidth="3"/>
        <circle cx="162" cy="122" r="16" fill="var(--orange)" stroke="var(--ink)" strokeWidth="3"/>
      </svg>
    );
  }

  if (scene === 'garden-harvest') {
    return (
      <svg viewBox="0 0 320 180" aria-hidden="true">
        <rect width="320" height="180" fill="oklch(0.95 0.05 150)"/>
        <rect y="112" width="320" height="68" fill="oklch(0.70 0.12 135)"/>
        <rect x="24" y="104" width="272" height="42" rx="18" fill="oklch(0.60 0.08 70)" stroke="var(--ink)" strokeWidth="3"/>
        {[
          [72, 106, 'var(--red)'],
          [126, 94, 'var(--orange)'],
          [182, 108, 'var(--red)'],
          [238, 96, 'var(--orange)'],
        ].map(([x, y, fill], i) => (
          <g key={i}>
            <path d={`M${x} 112 C ${x - 4} 90, ${x - 8} 76, ${x} 58`} fill="none" stroke="var(--green-ink)" strokeWidth="4" strokeLinecap="round"/>
            <circle cx={x} cy={y} r="12" fill={fill} stroke="var(--ink)" strokeWidth="3"/>
            <path d={`M${x} 58 C ${x - 12} 48, ${x - 6} 36, ${x + 2} 42 C ${x + 10} 34, ${x + 18} 46, ${x + 8} 58`} fill="var(--green)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/>
          </g>
        ))}
        <path d="M30 128 C 70 112, 96 120, 124 136" fill="none" stroke="var(--yellow)" strokeWidth="6" strokeLinecap="round"/>
        <path d="M190 138 C 220 120, 250 120, 288 132" fill="none" stroke="var(--blue)" strokeWidth="6" strokeLinecap="round"/>
      </svg>
    );
  }

  if (scene === 'theme-parade') {
    return (
      <svg viewBox="0 0 320 160" aria-hidden="true">
        <rect width="320" height="160" fill="oklch(0.96 0.03 84)"/>
        <rect y="108" width="320" height="52" fill="oklch(0.85 0.10 92)"/>
        <path d="M36 108 V42" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M36 42 L92 58 L36 74 Z" fill="var(--orange)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/>
        <path d="M284 108 V36" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M284 36 L226 52 L284 68 Z" fill="var(--blue)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/>
        {[
          [110, 'var(--red)'],
          [160, 'var(--green)'],
          [210, 'var(--purple)'],
        ].map(([x, fill], i) => (
          <g key={i}>
            <circle cx={x} cy="72" r="13" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3"/>
            <path d={`M${x - 18} 120 Q ${x} 86 ${x + 18} 120`} fill={fill} stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/>
            <path d={`M${x - 8} 58 L ${x} 40 L ${x + 8} 58 Z`} fill="var(--yellow)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/>
          </g>
        ))}
      </svg>
    );
  }

  const icons = {
    green: (
      <>
        <path d="M104 124 C 88 104, 90 76, 112 60 C 136 74, 140 104, 124 124 Z" fill="var(--green)" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round"/>
        <path d="M112 128 C 114 98, 118 82, 126 60" fill="none" stroke="var(--green-ink)" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="82" cy="118" r="14" fill="var(--orange)" stroke="var(--ink)" strokeWidth="4"/>
        <circle cx="146" cy="120" r="14" fill="var(--red)" stroke="var(--ink)" strokeWidth="4"/>
      </>
    ),
    blue: (
      <>
        <path d="M116 48 C 144 80, 156 98, 156 118 C 156 140, 138 156, 116 156 C 94 156, 76 140, 76 118 C 76 98, 88 80, 116 48 Z" fill="var(--blue)" stroke="var(--ink)" strokeWidth="4"/>
        <path d="M162 86 Q 188 98, 188 122 Q 188 146, 164 146 H 124" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
      </>
    ),
    red: (
      <>
        <circle cx="94" cy="98" r="24" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="4"/>
        <circle cx="144" cy="86" r="18" fill="var(--red)" stroke="var(--ink)" strokeWidth="4"/>
        <path d="M112 132 L 126 54" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round"/>
      </>
    ),
    yellow: (
      <>
        <rect x="72" y="52" width="84" height="96" rx="12" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="4"/>
        <path d="M88 80 H 140" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M88 102 H 140" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
        <path d="M88 124 H 126" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
      </>
    ),
    purple: (
      <>
        <rect x="70" y="88" width="88" height="54" rx="18" fill="var(--purple)" stroke="var(--ink)" strokeWidth="4"/>
        <path d="M84 88 C 84 64, 98 54, 114 54 C 130 54, 144 64, 144 88" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="114" cy="108" r="10" fill="var(--orange)" stroke="var(--ink)" strokeWidth="4"/>
      </>
    ),
    orange: (
      <>
        <path d="M70 128 L 114 72 L 158 128" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M70 128 H 158" fill="none" stroke="var(--orange)" strokeWidth="8" strokeLinecap="round"/>
        <path d="M116 72 V 38" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round"/>
        <path d="M116 38 C 128 48, 148 48, 158 38" fill="none" stroke="var(--green)" strokeWidth="6" strokeLinecap="round"/>
      </>
    ),
  };

  return (
    <svg viewBox="0 0 228 180" aria-hidden="true">
      <rect width="228" height="180" rx="24" fill="color-mix(in oklch, var(--paper) 70%, var(--ph-b) 30%)"/>
      <path d="M34 150 Q 114 118 194 150" fill="none" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round"/>
      {icons[scene] || icons.green}
    </svg>
  );
}

function pickUploadedGalleryPhoto(preferredAlbums = []) {
  const items = Array.isArray(window.SEED?.gallery) ? window.SEED.gallery : [];
  for (const albumId of preferredAlbums) {
    const hit = items.find(item => item.file_path && item.album === albumId);
    if (hit) return hit;
  }
  return items.find(item => item.file_path) || null;
}

/* =================== HOME =================== */
function HomePage() {
  const { t, lang, pickLocal } = useT();
  const [s] = useStore();
  const topNews = s.news.slice(0, 3);
  const heroPhotos = [
    { key: 'p1', album: 'kelas', scene: 'morning-circle', tone: 'yellow', h: 220, capId: 'Lingkaran pagi', capEn: 'Morning circle' },
    { key: 'p2', album: 'kebun', scene: 'garden-harvest', tone: 'green', h: 160, capId: 'Panen tomat', capEn: 'Tomato harvest' },
    { key: 'p3', album: 'puncak', scene: 'theme-parade', tone: 'red', h: 140, capId: 'Parade tema', capEn: 'Theme parade' },
  ].map(item => ({ ...item, photo: pickUploadedGalleryPhoto([item.album]) }));

  return (
    <div className="page page-home">

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-bg">
          {/* crayon doodles */}
          <svg className="hero-doodle hd-1" viewBox="0 0 160 120"><path d="M20 60 C24 28 58 10 94 16 C124 22 148 48 140 76 C132 104 98 112 64 104 C36 98 14 82 20 60 Z" fill="none" stroke="var(--orange)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <svg className="hero-doodle hd-2" viewBox="0 0 60 60"><circle cx="30" cy="30" r="22" fill="none" stroke="var(--blue)" strokeWidth="5"/><circle cx="30" cy="30" r="10" fill="var(--blue)"/></svg>
          <svg className="hero-doodle hd-3" viewBox="0 0 80 80"><path d="M10 70 L40 10 L70 70 Z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round"/></svg>
          <svg className="hero-doodle hd-4" viewBox="0 0 100 40"><path d="M5 20 Q20 5 35 20 T65 20 T95 20" fill="none" stroke="var(--purple)" strokeWidth="5" strokeLinecap="round"/></svg>
          <svg className="hero-doodle hd-5" viewBox="0 0 60 60"><path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z" fill="var(--green)" stroke="var(--ink)" strokeWidth="2.5" strokeLinejoin="round"/></svg>
        </div>

        <div className="hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">
              <span className="kicker-dot"/> {t.hero_kicker}
            </div>
            <h1 className="hero-title">
              {t.hero_title.split('\n').map((line, i) => (
                <span key={i} className={'hero-line hero-line-' + i}>{line}<br/></span>
              ))}
            </h1>
            <p className="hero-sub">{t.hero_sub}</p>
            <div className="hero-ctas">
              <button className="btn primary" onClick={() => navigate('ppdb')}>
                {t.hero_cta1} <span aria-hidden>→</span>
              </button>
              <button className="btn ghost" onClick={() => navigate('gallery')}>
                ▶ {t.hero_cta2}
              </button>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              {window.SEED.stats.map((st, i) => (
                <div key={i} className="hero-stat" style={{ '--c': `var(--${['red','blue','green','yellow'][i]})` }}>
                  <div className="hero-stat-n">{st.n}</div>
                  <div className="hero-stat-l">{t[st.k]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating polaroid cluster */}
          <div className="hero-polaroids">
            <div className="polaroid p1">
              {heroPhotos[0].photo?.file_path
                ? <img src={heroPhotos[0].photo.file_path} alt={pickLocal(heroPhotos[0].photo, 'caption') || heroPhotos[0].capId} style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', borderRadius: 18, border: '2px solid var(--ink)' }}/>
                : (
                  <Placeholder tone="yellow" h={220}>
                    <SceneIllustration scene="morning-circle"/>
                  </Placeholder>
                )}
              <div className="polaroid-cap">{lang === 'id' ? heroPhotos[0].capId : heroPhotos[0].capEn}</div>
              <div className="tape" style={{ top: -10, left: 30 }}/>
            </div>
            <div className="polaroid p2">
              {heroPhotos[1].photo?.file_path
                ? <img src={heroPhotos[1].photo.file_path} alt={pickLocal(heroPhotos[1].photo, 'caption') || heroPhotos[1].capId} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', borderRadius: 18, border: '2px solid var(--ink)' }}/>
                : (
                  <Placeholder tone="green" h={160}>
                    <SceneIllustration scene="garden-harvest"/>
                  </Placeholder>
                )}
              <div className="polaroid-cap">{lang === 'id' ? heroPhotos[1].capId : heroPhotos[1].capEn}</div>
              <div className="tape" style={{ top: -10, right: 28, background: 'oklch(0.78 0.14 350 / 0.7)', transform: 'rotate(6deg)' }}/>
            </div>
            <div className="polaroid p3">
              {heroPhotos[2].photo?.file_path
                ? <img src={heroPhotos[2].photo.file_path} alt={pickLocal(heroPhotos[2].photo, 'caption') || heroPhotos[2].capId} style={{ width: '100%', height: 140, objectFit: 'cover', display: 'block', borderRadius: 18, border: '2px solid var(--ink)' }}/>
                : (
                  <Placeholder tone="red" h={140}>
                    <SceneIllustration scene="theme-parade"/>
                  </Placeholder>
                )}
              <div className="polaroid-cap">{lang === 'id' ? heroPhotos[2].capId : heroPhotos[2].capEn}</div>
            </div>
          </div>
        </div>
      </section>

      <StripeDivider/>
      {/* ===== Programs ===== */}
      <section className="sect bg-cream2">
        <SectionHead
          kicker={lang === 'id' ? 'Jenjang' : 'Levels'}
          title={t.home_programs_title}
          sub={t.home_programs_sub}
        />
        <div className="prog-grid">
          {window.SEED.programs.map((p) => (
            <article key={p.id} className="prog-card" style={{ '--tone': `var(--${p.tone})` }}>
              <div className="prog-card-head">
                <span className="prog-age">{pickLocal(p, 'age')}</span>
                <span className="prog-dot"/>
                <span className="prog-hours">{pickLocal(p, 'hours')}</span>
              </div>
              <h3>{pickLocal(p, 'title')}</h3>
              <p>{pickLocal(p, 'desc')}</p>
              <ul className="prog-pillars">
                {pickLocal(p, 'pillars').map((pl, i) => <li key={i}>{pl}</li>)}
              </ul>
              <button className="prog-cta" onClick={() => navigate('program')}>
                {lang === 'id' ? 'Lihat kurikulum' : 'See curriculum'} →
              </button>
            </article>
          ))}
        </div>
      </section>

      {/* ===== Latest news ===== */}
      <section className="sect">
        <div className="flex-between">
          <SectionHead
            kicker={lang === 'id' ? 'Terkini' : 'Recent'}
            title={t.home_news_title}
            sub={t.home_news_sub}
          />
          <button className="btn ghost hide-sm" onClick={() => navigate('news')}>
            {t.home_news_all}
          </button>
        </div>
        <div className="news-feature-grid">
          {topNews.map((n, i) => (
            <NewsCard key={n.id} item={n} featured={i === 0}/>
          ))}
        </div>
      </section>

      {/* ===== CTA band ===== */}
      <section className="cta-band">
        <div className="cta-band-inner">
          <div className="cta-band-text">
            <h2>{t.home_cta_title}</h2>
            <p>{t.home_cta_sub}</p>
          </div>
          <div className="cta-band-actions">
            <button className="btn primary" onClick={() => navigate('contact')}>{t.home_cta_btn}</button>
            <button className="btn ghost" onClick={() => navigate('ppdb')}>{t.nav_ppdb} →</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =================== NewsCard (shared) =================== */
function NewsCard({ item, featured = false }) {
  const { lang, pickLocal } = useT();
  const d = new Date(item.date);
  const dateStr = d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
  return (
    <article
      className={'news-card ' + (featured ? 'is-featured' : '')}
      onClick={() => navigate('news-detail/' + item.slug)}
    >
      {item.cover_path
        ? <img src={item.cover_path} alt={item.title_id} style={{ width: '100%', height: featured ? 300 : 180, objectFit: 'cover', display: 'block', borderBottom: '2px solid var(--ink)' }}/>
        : <Placeholder tone={item.tone} caption={item.slug + '.jpg'} h={featured ? 300 : 180}/>}
      <div className="news-card-body">
        <div className="news-meta">
          <span className={'chip ' + item.tone}>{pickLocal(item, 'category')}</span>
          <span className="news-date">{dateStr}</span>
        </div>
        <h3>{pickLocal(item, 'title')}</h3>
        {featured && <p>{pickLocal(item, 'excerpt')}</p>}
      </div>
    </article>
  );
}

/* =================== PROFILE =================== */
function ProfilePage() {
  const { t, lang, pickLocal } = useT();
  const profilePhoto = pickUploadedGalleryPhoto(['kelas', 'ortu', 'puncak', 'kebun', 'lulus']);
  return (
    <div className="page page-profile">
      <section className="sect pad-xl">
        <div className="profile-hero">
          <div>
            <SectionHead
              kicker={lang === 'id' ? 'Tentang kami' : 'About us'}
              title={t.profile_title}
              sub={t.profile_sub}
            />
            <div className="profile-tags">
              <span className="chip yellow">NPSN 12345678</span>
              <span className="chip green">Akreditasi A</span>
              <span className="chip blue">{lang === 'id' ? 'Sejak 2008' : 'Since 2008'}</span>
            </div>
          </div>
          <div className="profile-hero-img">
            {profilePhoto?.file_path
              ? <img src={profilePhoto.file_path} alt={pickLocal(profilePhoto, 'caption') || 'School photo'} style={{ width: '100%', height: 380, objectFit: 'cover', display: 'block', borderRadius: 'var(--r-lg)', border: '2px solid var(--ink)' }}/>
              : <Placeholder tone="blue" caption={lang === 'id' ? 'gedung-sekolah.jpg' : 'school-building.jpg'} h={380}/>}
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="sect bg-cream2">
        <div className="vm-grid">
          <div className="vm-card vm-vision">
            <div className="vm-label" style={{ background: 'var(--red)' }}>{t.profile_vision}</div>
            <p className="vm-statement">"{t.profile_vision_text}"</p>
          </div>
          <div className="vm-card vm-mission">
            <div className="vm-label" style={{ background: 'var(--blue)' }}>{t.profile_mission}</div>
            <ol className="vm-list">
              {(lang === 'id' ? [
                'Menyediakan lingkungan aman yang memeluk setiap anak apa adanya.',
                'Menemani anak belajar melalui bermain, bertanya, dan mencipta.',
                'Menjadi mitra tulus bagi keluarga dalam merawat masa emas anak.',
                'Merawat nilai-nilai kebinekaan dan cinta lingkungan sejak dini.',
              ] : [
                'Provide a safe environment that embraces each child as they are.',
                'Walk beside children learning through play, questions, and creation.',
                'Be a sincere partner for families during the golden years of childhood.',
                'Nurture values of diversity and love for the environment from an early age.',
              ]).map((m, i) => (
                <li key={i}><span>{String(i + 1).padStart(2, '0')}</span>{m}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* History timeline */}
      <section className="sect">
        <SectionHead
          kicker={lang === 'id' ? 'Perjalanan' : 'Journey'}
          title={t.profile_history}
        />
        <div className="timeline">
          {window.SEED.history.map((h, i) => (
            <div key={i} className="tl-item">
              <div className="tl-year">{h.year}</div>
              <div className="tl-dot" style={{ background: `var(--${['red','yellow','green','blue','purple'][i % 5]})` }}/>
              <div className="tl-body">{lang === 'id' ? h.id : h.en}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="sect bg-cream2">
        <SectionHead
          kicker={lang === 'id' ? 'Ruang & Alat' : 'Spaces & tools'}
          title={t.profile_facilities}
        />
        <div className="fac-grid">
          {window.SEED.facilities.map((f, i) => (
            <div key={i} className="fac-card" style={{ '--tone': `var(--${f.tone})` }}>
              <div className="fac-icon">
                <Placeholder tone={f.tone} h={140}/>
              </div>
              <div className="fac-name">{lang === 'id' ? f.id : f.en}</div>
              <p className="fac-desc">{FACILITY_DETAILS[f.tone]?.[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Teachers */}
      <section className="sect">
        <SectionHead
          kicker={lang === 'id' ? 'Yang menemani setiap hari' : 'Who walks with them daily'}
          title={lang === 'id' ? 'Guru & Staf' : 'Teachers & Staff'}
        />
        <div className="teacher-grid">
          {window.SEED.teachers.map((tch) => (
            <div key={tch.id} className="teacher-card">
              {tch.photo_path
                ? <img className="teacher-avatar teacher-avatar-img" src={tch.photo_path} alt={tch.name}/>
                : (
                  <div className="teacher-avatar" style={{ background: `var(--${tch.tone})` }}>
                    {tch.name.split(' ').slice(0, 2).map(n => n[0]).join('')}
                  </div>
                )}
              <div className="teacher-name">{tch.name}</div>
              <div className="teacher-role">{pickLocal(tch, 'role')}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* =================== PROGRAM =================== */
function ProgramPage() {
  const { t, lang, pickLocal } = useT();
  const [active, setActive] = useState('kb');
  const current = window.SEED.programs.find(p => p.id === active);

  return (
    <div className="page page-program">
      <section className="sect pad-xl">
        <SectionHead
          kicker={lang === 'id' ? 'Kurikulum' : 'Curriculum'}
          title={t.prog_title}
          sub={t.prog_sub}
        />

        {/* Tabs */}
        <div className="prog-tabs">
          {window.SEED.programs.map(p => (
            <button
              key={p.id}
              className={'prog-tab ' + (active === p.id ? 'is-active' : '')}
              onClick={() => setActive(p.id)}
              style={{ '--tone': `var(--${p.tone})` }}
            >
              <div className="prog-tab-age">{pickLocal(p, 'age')}</div>
              <div className="prog-tab-title">{pickLocal(p, 'title')}</div>
            </button>
          ))}
        </div>

        {/* Active program detail */}
        <div className="prog-detail" style={{ '--tone': `var(--${current.tone})` }}>
          <div className="prog-detail-main">
            <h3>{pickLocal(current, 'title')}</h3>
            <p className="prog-detail-desc">{pickLocal(current, 'desc')}</p>

            <h4 className="prog-sub-h">{lang === 'id' ? 'Pilar pembelajaran' : 'Learning pillars'}</h4>
            <div className="pillar-grid">
              {pickLocal(current, 'pillars').map((pl, i) => (
                <div key={i} className="pillar">
                  <div className="pillar-n">{String(i + 1).padStart(2, '0')}</div>
                  <div className="pillar-t">{pl}</div>
                </div>
              ))}
            </div>

            <h4 className="prog-sub-h">{lang === 'id' ? 'Contoh minggu belajar' : 'A sample week'}</h4>
            <table className="week-table">
              <thead>
                <tr>
                  <th>{lang === 'id' ? 'Hari' : 'Day'}</th>
                  <th>{lang === 'id' ? 'Pagi' : 'Morning'}</th>
                  <th>{lang === 'id' ? 'Siang' : 'Midday'}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Senin', 'Monday', lang === 'id' ? 'Lingkaran tema' : 'Theme circle', lang === 'id' ? 'Proyek kelompok' : 'Group project'],
                  ['Selasa', 'Tuesday', lang === 'id' ? 'Kebun & kangkung' : 'Garden time', lang === 'id' ? 'Buku & cerita' : 'Books & stories'],
                  ['Rabu', 'Wednesday', lang === 'id' ? 'Musik & gerak' : 'Music & movement', lang === 'id' ? 'Seni & kolase' : 'Art & collage'],
                  ['Kamis', 'Thursday', lang === 'id' ? 'Sains anak' : 'Kid science', lang === 'id' ? 'Bahasa Inggris' : 'Bahasa Indonesia'],
                  ['Jumat', 'Friday', lang === 'id' ? 'Dapur belajar' : 'Learning kitchen', lang === 'id' ? 'Lingkaran refleksi' : 'Reflection circle'],
                ].map((row, i) => (
                  <tr key={i}>
                    <td><strong>{lang === 'id' ? row[0] : row[1]}</strong></td>
                    <td>{row[2]}</td>
                    <td>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="prog-detail-side">
            <div className="prog-side-card">
              <div className="prog-side-label">{lang === 'id' ? 'Durasi' : 'Schedule'}</div>
              <div className="prog-side-value">{pickLocal(current, 'hours')}</div>
            </div>
            <div className="prog-side-card">
              <div className="prog-side-label">{lang === 'id' ? 'Rasio guru' : 'Ratio'}</div>
              <div className="prog-side-value">1 : {current.id === 'kb' ? 6 : current.id === 'tk-a' ? 8 : 10}</div>
            </div>
            <div className="prog-side-card">
              <div className="prog-side-label">{lang === 'id' ? 'Max / kelas' : 'Class size'}</div>
              <div className="prog-side-value">{current.id === 'kb' ? 12 : current.id === 'tk-a' ? 16 : 18}</div>
            </div>
            <Placeholder tone={current.tone} caption={lang === 'id' ? 'kelas.jpg' : 'classroom.jpg'} h={200}/>
            <button className="btn primary" onClick={() => navigate('ppdb')}>
              {lang === 'id' ? 'Daftar jenjang ini' : 'Apply to this level'} →
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, ProfilePage, ProgramPage, NewsCard });
