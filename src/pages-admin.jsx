/* ================================================================
   PAUD Cemara — Admin: login, dashboard, CRUD news/gallery, messages
   ================================================================ */

function AdminMiniIcon({ kind }) {
  if (kind === 'edit') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6 16.8 V19 H8.2 L17.4 9.8 L15.2 7.6 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M14.2 8.6 L16.2 6.6 A1.4 1.4 0 0 1 18.2 6.6 L19.4 7.8 A1.4 1.4 0 0 1 19.4 9.8 L17.4 11.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'delete') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 8 H17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 8 V18 H15 V8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M10 6 H14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M10 11 V15 M14 11 V15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'pin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5 H16 L14 10 V14 L10 16 V10 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 16 V20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'pin-off') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5 H16 L14 10 V14 L10 16 V10 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M12 16 V20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M6 6 L18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'inbox') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8 H19 V18 H5 Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
        <path d="M5 14 H9 L10.5 16 H13.5 L15 14 H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    );
  }
  return null;
}

function AdminNavGlyph({ kind }) {
  if (kind === 'dash') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 13.5 L12 5 L20 13.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6.5 12.5 V19 H17.5 V12.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'news') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M8 9.5 H16 M8 12.5 H16 M8 15.5 H13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'gallery') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="6" width="15" height="12.5" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <circle cx="9" cy="10" r="1.4" fill="currentColor"/>
        <path d="M7 16 L11 12.5 L13.8 15 L16.5 12.5 L18 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'msg') {
    return <AdminMiniIcon kind="inbox"/>;
  }
  if (kind === 'ppdb') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4 V20 M4 12 H20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    );
  }
  if (kind === 'konten') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 7.5 H19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M5 12 H15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M5 16.5 H13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="17.5" cy="16.5" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    );
  }
  if (kind === 'settings') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M12 4.5 V6.5 M12 17.5 V19.5 M19.5 12 H17.5 M6.5 12 H4.5 M17.3 6.7 L15.9 8.1 M8.1 15.9 L6.7 17.3 M17.3 17.3 L15.9 15.9 M8.1 8.1 L6.7 6.7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  return null;
}

function AdminActionGlyph({ kind }) {
  if (kind === 'site') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 17 L17 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M9 7 H17 V15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (kind === 'logout') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 6 H7.5 A1.5 1.5 0 0 0 6 7.5 V16.5 A1.5 1.5 0 0 0 7.5 18 H10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M13 8.5 L17 12 L13 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 12 H17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === 'menu') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="5" width="5.5" height="5.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="13.5" y="5" width="5.5" height="5.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="5" y="13.5" width="5.5" height="5.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
        <rect x="13.5" y="13.5" width="5.5" height="5.5" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.8"/>
      </svg>
    );
  }
  if (kind === 'close') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 7 L17 17 M17 7 L7 17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    );
  }
  return null;
}

/* -------- Fetch helpers ------------------------------------------------ */
async function apiCall(path, opts = {}) {
  const isForm = opts.body instanceof FormData;
  const res = await fetch(path, {
    credentials: 'same-origin',
    headers: (opts.body && !isForm)
      ? { 'Content-Type': 'application/json', ...(opts.headers || {}) }
      : (opts.headers || {}),
    ...opts,
  });
  let data = null;
  try { data = await res.json(); } catch (_) { /* ignore */ }
  if (!res.ok) {
    const err = new Error(data?.error || `HTTP ${res.status}`);
    err.status = res.status;
    err.fields = data?.fields;
    throw err;
  }
  return data;
}

async function cleanupDraftUpload(path, preservePath = null) {
  if (!path || path === preservePath) return false;
  try {
    await apiCall('api/admin/upload.php', {
      method: 'DELETE',
      body: JSON.stringify({ path }),
    });
    return true;
  } catch (_) {
    return false;
  }
}

function cleanupDraftUploadSoon(path, preservePath = null) {
  if (!path || path === preservePath) return;
  fetch('api/admin/upload.php', {
    method: 'DELETE',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path }),
    keepalive: true,
  }).catch(() => {});
}

async function refetchPublicData() {
  try {
    const d = await apiCall('api/bootstrap.php');
    if (!d) return;
    Object.assign(window.SEED, d);
    store.set(s => ({
      ...s,
      news:     d.news     ?? s.news,
      gallery:  d.gallery  ?? s.gallery,
      settings: d.settings ?? s.settings,
    }));
  } catch (_) { /* pakai state lama */ }
}

function adminDisplayName(value) {
  const raw = String(value || '').trim();
  if (!raw) return 'Admin';
  const base = raw.includes('@') ? raw.split('@')[0] : raw;
  if (base.toLowerCase() === 'admin') return 'Admin';
  return base
    .replace(/[_\-.]+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function AdminPage() {
  const [s] = useStore();
  const [checked, setChecked] = useState(false);

  // Cek session di server sekali saat mount
  useEffect(() => {
    fetch('api/me.php', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : { user: null })
      .then(d => {
        if (d && d.user) {
          sessionStorage.setItem('paud:admin', '1');
          store.set(ss => ({ ...ss, admin: { ...ss.admin, loggedIn: true, email: d.user.username } }));
        } else {
          sessionStorage.removeItem('paud:admin');
          store.set(ss => ({ ...ss, admin: { ...ss.admin, loggedIn: false } }));
        }
      })
      .catch(() => { /* fallback: biarkan state lokal */ })
      .finally(() => setChecked(true));
  }, []);

  if (!checked) {
    return (
      <div className="admin-login-wrap">
        <div style={{ padding: 40, opacity: 0.6 }}>Memeriksa sesi…</div>
      </div>
    );
  }
  if (!s.admin.loggedIn) return <AdminLogin/>;
  return <AdminShell/>;
}

function AdminLogin() {
  const { t, lang } = useT();
  const [email, setEmail] = useState('admin');
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!email || !pwd) { setErr(lang === 'id' ? 'Isi username & sandi' : 'Enter username & password'); return; }
    setErr(''); setLoading(true);
    try {
      const res = await fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username: email, password: pwd }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error || (lang === 'id' ? 'Login gagal' : 'Login failed'));
        return;
      }
      sessionStorage.setItem('paud:admin', '1');
      store.set(ss => ({ ...ss, admin: { ...ss.admin, loggedIn: true, email: data.user.username } }));
      showToast(lang === 'id' ? 'Selamat datang!' : 'Welcome!');
    } catch (ex) {
      setErr(lang === 'id' ? 'Kesalahan jaringan' : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-art">
        <CemaraLogo size={64}/>
        <h2>PAUD Cemara</h2>
        <p>{lang === 'id' ? 'Panel pengelolaan konten internal.' : 'Internal content management panel.'}</p>
        <div className="admin-login-quotes">
          <div className="chip yellow">{lang === 'id' ? 'Berita' : 'News'}</div>
          <div className="chip green">{lang === 'id' ? 'Galeri' : 'Gallery'}</div>
          <div className="chip blue">{lang === 'id' ? 'Pesan' : 'Messages'}</div>
          <div className="chip red">{lang === 'id' ? 'Pengaturan' : 'Settings'}</div>
        </div>
      </div>
      <form className="admin-login-form" onSubmit={submit}>
        <button type="button" className="admin-back" onClick={() => navigate('home')}>← {lang === 'id' ? 'Kembali ke situs' : 'Back to site'}</button>
        <h3>{t.admin_login_title}</h3>
        <p className="adl-sub">{t.admin_login_sub}</p>
        <FormField label={lang === 'id' ? 'Username' : 'Username'}>
          <input value={email} onChange={e => setEmail(e.target.value)} autoComplete="username"/>
        </FormField>
        <FormField label={t.admin_password}>
          <input type="password" value={pwd} onChange={e => setPwd(e.target.value)} autoComplete="current-password"/>
        </FormField>
        {err && <div className="ff-err">{err}</div>}
        <button className="btn primary" type="submit" disabled={loading}
                style={{ width: '100%', justifyContent: 'center' }}>
          {loading ? (lang === 'id' ? 'Memproses…' : 'Signing in…') : (t.admin_signin + ' →')}
        </button>
      </form>
    </div>
  );
}

function AdminShell() {
  const { t, lang } = useT();
  const [s] = useStore();
  const [section, setSection] = useState('dash');
  const [editing, setEditing] = useState(null); // {type, item} or 'new-news', 'new-gallery'
  const [navOpen, setNavOpen] = useState(false);
  const displayName = adminDisplayName(s.admin.email);

  const sections = [
    { k: 'dash',     id: 'Dashboard',  en: 'Dashboard',  mobileId: 'Dashboard', mobileEn: 'Dashboard', icon: 'dash',     tone: 'yellow' },
    { k: 'news',     id: 'Berita',     en: 'News',       mobileId: 'Berita',    mobileEn: 'News',      icon: 'news',     tone: 'red' },
    { k: 'gallery',  id: 'Galeri',     en: 'Gallery',    mobileId: 'Galeri',    mobileEn: 'Gallery',   icon: 'gallery',  tone: 'blue' },
    { k: 'msg',      id: 'Pesan',      en: 'Messages',   mobileId: 'Pesan',     mobileEn: 'Inbox',     icon: 'msg',      tone: 'green' },
    { k: 'ppdb',     id: 'Pendaftar',  en: 'Applicants', mobileId: 'PPDB',      mobileEn: 'PPDB',      icon: 'ppdb',     tone: 'orange' },
    { k: 'konten',   id: 'Konten',     en: 'Content',    mobileId: 'Konten',    mobileEn: 'Content',   icon: 'konten',   tone: 'purple' },
    { k: 'settings', id: 'Pengaturan', en: 'Settings',   mobileId: 'Setelan',   mobileEn: 'Settings',  icon: 'settings', tone: 'yellow' },
  ];

  const currentSection = sections.find(sc => sc.k === section) || sections[0];
  const unreadMessages = s.messages.filter(m => m.unread).length;

  function selectSection(nextSection) {
    setSection(nextSection);
    setEditing(null);
    setNavOpen(false);
  }

  function handleJump(nextSection, edit) {
    setSection(nextSection);
    setEditing(edit || null);
    setNavOpen(false);
  }

  async function logout() {
    try {
      await fetch('api/logout.php', { method: 'POST', credentials: 'same-origin' });
    } catch (_) { /* best effort */ }
    sessionStorage.removeItem('paud:admin');
    store.set(ss => ({ ...ss, admin: { ...ss.admin, loggedIn: false } }));
    setNavOpen(false);
  }

  function goToSite() {
    setNavOpen(false);
    navigate('home');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">
          <div className="admin-brand-copy">
            <CemaraLogo size={34}/>
            <div>
              <strong>PAUD Cemara</strong>
              <span>{lang === 'id' ? 'Panel Admin' : 'Admin Panel'}</span>
            </div>
          </div>
          <div className="admin-mobile-quick">
            <div className="admin-mobile-avatar" title={displayName}>
              {s.admin.email[0].toUpperCase()}
            </div>
            <button type="button" className="admin-quick-btn" aria-label={lang === 'id' ? 'Lihat situs' : 'View site'} title={lang === 'id' ? 'Lihat situs' : 'View site'} onClick={goToSite}>
              <AdminActionGlyph kind="site"/>
            </button>
            <button type="button" className="admin-quick-btn danger" aria-label={t.admin_logout} title={t.admin_logout} onClick={logout}>
              <AdminActionGlyph kind="logout"/>
            </button>
          </div>
        </div>
        <button
          type="button"
          className={'admin-mobile-nav-toggle ' + (navOpen ? 'is-open' : '')}
          aria-label={navOpen ? (lang === 'id' ? 'Tutup navigasi admin' : 'Close admin navigation') : (lang === 'id' ? 'Buka navigasi admin' : 'Open admin navigation')}
          aria-expanded={navOpen ? 'true' : 'false'}
          aria-controls="admin-mobile-nav"
          style={{ '--admin-tone': `var(--${currentSection.tone})` }}
          onClick={() => setNavOpen(open => !open)}>
          <span className="admin-mobile-nav-toggle-icon">
            {navOpen ? <AdminActionGlyph kind="close"/> : <AdminActionGlyph kind="menu"/>}
          </span>
          {unreadMessages > 0 && !navOpen && <span className="admin-mobile-nav-toggle-badge">{unreadMessages}</span>}
        </button>
        {navOpen && <button type="button" className="admin-mobile-nav-backdrop" aria-label={lang === 'id' ? 'Tutup menu' : 'Close menu'} onClick={() => setNavOpen(false)}/>}
        <nav id="admin-mobile-nav" className={'admin-nav ' + (navOpen ? 'is-open' : '')}>
          {sections.map(sc => (
            <button key={sc.k}
                    className={'admin-nav-item ' + (section === sc.k ? 'is-active' : '')}
                    aria-label={lang === 'id' ? sc.id : sc.en}
                    onClick={() => selectSection(sc.k)}>
              <span className="admin-nav-icon"><AdminNavGlyph kind={sc.icon}/></span>
              <span className="admin-nav-label admin-nav-label-desktop">{lang === 'id' ? sc.id : sc.en}</span>
              <span className="admin-nav-label admin-nav-label-mobile">{lang === 'id' ? (sc.mobileId || sc.id) : (sc.mobileEn || sc.en)}</span>
              {sc.k === 'msg' && unreadMessages > 0 && (
                <span className="admin-badge">{unreadMessages}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="admin-side-foot">
          <div className="admin-me">
            <div className="admin-avatar">{s.admin.email[0].toUpperCase()}</div>
            <div className="admin-me-text">
              <strong>{displayName}</strong>
              <span>Super admin</span>
            </div>
          </div>
          <button className="btn sm" onClick={logout}>
            {t.admin_logout}
          </button>
          <button className="btn sm ghost" onClick={goToSite}>
            ↗ {lang === 'id' ? 'Lihat situs' : 'View site'}
          </button>
        </div>
      </aside>

      <main className="admin-main">
        {section === 'dash' && <AdminDashboard onJump={handleJump}/>}
        {section === 'news' && (editing
          ? <NewsEditor item={editing === 'new' ? null : editing} onDone={() => setEditing(null)}/>
          : <NewsList onEdit={setEditing}/>)}
        {section === 'gallery' && (editing
          ? <GalleryEditor item={editing === 'new' ? null : editing} onDone={() => setEditing(null)}/>
          : <GalleryList onEdit={setEditing}/>)}
        {section === 'msg' && <MessagesList/>}
        {section === 'ppdb' && <RegistrationsList/>}
        {section === 'konten' && <AdminContent/>}
        {section === 'settings' && <AdminSettings/>}
      </main>
    </div>
  );
}

/* -------- Dashboard -------- */
function AdminDashboard({ onJump }) {
  const { lang, pickLocal } = useT();
  const [s] = useStore();
  const [remote, setRemote] = useState(null);       // counts dari /api/admin/stats
  const [recent, setRecent] = useState(null);       // pesan terbaru dari /api/admin/messages
  const displayName = adminDisplayName(s.admin.email);

  useEffect(() => {
    fetch('api/admin/stats.php', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : null)
      .then(d => d && setRemote(d))
      .catch(() => {});
    fetch('api/admin/messages.php', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d && Array.isArray(d.messages)) {
          setRecent(d.messages);
          // sync ke store juga supaya sidebar badge akurat
          store.set(ss => ({ ...ss, messages: d.messages }));
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { k: 'news',    label: lang === 'id' ? 'Berita'          : 'News articles',  n: remote ? remote.news           : s.news.length,                                tone: 'red' },
    { k: 'gallery', label: lang === 'id' ? 'Foto galeri'     : 'Gallery photos', n: remote ? remote.gallery        : s.gallery.length,                              tone: 'yellow' },
    { k: 'msg',     label: lang === 'id' ? 'Pesan baru'      : 'New messages',   n: remote ? remote.messages_new   : s.messages.filter(m => m.unread).length,       tone: 'blue' },
    { k: 'ppdb',    label: lang === 'id' ? 'Pendaftar PPDB'  : 'Applicants',     n: remote ? remote.ppdb_total     : '—',                                           tone: 'green' },
  ];

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? `Halo, ${displayName}` : `Hi, ${displayName}`}</h1>
          <p>{lang === 'id' ? 'Ini ringkasan aktivitas sekolah minggu ini.' : 'Here is this week\'s school activity.'}</p>
        </div>
        <div className="admin-page-actions">
          <button className="btn" onClick={() => onJump('news', 'new')}>+ {lang === 'id' ? 'Berita' : 'News'}</button>
          <button className="btn yellow" onClick={() => onJump('gallery', 'new')}>+ {lang === 'id' ? 'Foto' : 'Photo'}</button>
        </div>
      </div>

      <div className="dash-stats">
        {stats.map((st, i) => (
          <div key={i} className="dash-stat" style={{ '--tone': `var(--${st.tone})` }} onClick={() => onJump(st.k)}>
            <div className="dash-stat-label">{st.label}</div>
            <div className="dash-stat-n">{st.n}</div>
            {st.sub && <div className="dash-stat-trend">{st.sub}</div>}
          </div>
        ))}
      </div>

      <div className="dash-row single">
        <div className="card dash-card">
          <div className="dash-card-head">
            <h3>{lang === 'id' ? 'Pesan terbaru' : 'Recent messages'}</h3>
            <button className="btn sm ghost" onClick={() => onJump('msg')}>{lang === 'id' ? 'Lihat semua' : 'See all'} →</button>
          </div>
          <ul className="mini-msg-list">
            {s.messages.slice(0, 4).map(m => (
              <li key={m.id} className={m.unread ? 'unread' : ''} onClick={() => onJump('msg')}>
                <div className="mini-msg-avatar">{m.name[0]}</div>
                <div className="mini-msg-body">
                  <div className="mini-msg-top">
                    <strong>{m.name}</strong>
                    {m.unread && <span className="unread-dot"/>}
                  </div>
                  <div className="mini-msg-sub">{pickLocal(m, 'subject')}</div>
                </div>
                <span className="mini-msg-date">{m.date.slice(5)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="card dash-card">
        <div className="dash-card-head">
          <h3>{lang === 'id' ? 'Berita terkini' : 'Latest news'}</h3>
          <button className="btn sm" onClick={() => onJump('news', 'new')}>+ {lang === 'id' ? 'Berita baru' : 'New post'}</button>
        </div>
        <NewsTable compact onEdit={(it) => onJump('news', it)}/>
      </div>
    </div>
  );
}

/* -------- News list & editor -------- */
function NewsList({ onEdit }) {
  const { lang } = useT();
  // Refresh dari DB saat tab dibuka
  useEffect(() => { refetchPublicData(); }, []);
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? 'Kelola Berita' : 'Manage News'}</h1>
          <p>{lang === 'id' ? 'Tulis, edit, publikasikan, atau sematkan berita.' : 'Write, edit, publish or pin news.'}</p>
        </div>
        <button className="btn primary" onClick={() => onEdit('new')}>+ {lang === 'id' ? 'Berita baru' : 'New post'}</button>
      </div>
      <div className="card"><NewsTable onEdit={onEdit}/></div>
    </div>
  );
}

function NewsTable({ compact = false, onEdit }) {
  const { lang, pickLocal } = useT();
  const [s] = useStore();
  const [query, setQuery] = useState('');
  const list = s.news.filter(n => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return pickLocal(n, 'title').toLowerCase().includes(q) || pickLocal(n, 'category').toLowerCase().includes(q);
  });

  async function del(id) {
    if (!confirm(lang === 'id' ? 'Hapus berita ini?' : 'Delete this post?')) return;
    // Optimistic update
    const prev = store.get().news;
    store.set(ss => ({ ...ss, news: ss.news.filter(n => n.id !== id) }));
    try {
      await apiCall(`api/admin/news.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      showToast(lang === 'id' ? 'Terhapus' : 'Deleted');
    } catch (err) {
      store.set(ss => ({ ...ss, news: prev })); // rollback
      showToast((lang === 'id' ? 'Gagal hapus: ' : 'Delete failed: ') + err.message);
    }
  }
  async function togglePin(id) {
    const current = store.get().news.find(n => n.id === id);
    const nextPinned = !(current?.pinned);
    // Optimistic
    store.set(ss => ({ ...ss, news: ss.news.map(n => n.id === id ? { ...n, pinned: nextPinned } : n) }));
    try {
      await apiCall(`api/admin/news.php?id=${encodeURIComponent(id)}&action=pin`, {
        method: 'POST',
        body: JSON.stringify({ pinned: nextPinned }),
      });
    } catch (err) {
      // Rollback
      store.set(ss => ({ ...ss, news: ss.news.map(n => n.id === id ? { ...n, pinned: !nextPinned } : n) }));
      showToast((lang === 'id' ? 'Gagal: ' : 'Failed: ') + err.message);
    }
  }

  return (
    <div className="tbl-wrap">
      {!compact && (
        <div className="tbl-controls">
          <input className="tbl-search" placeholder={lang === 'id' ? 'Cari judul / kategori…' : 'Search…'} value={query} onChange={e => setQuery(e.target.value)}/>
        </div>
      )}
      <table className="tbl tbl-news">
        <thead>
          <tr>
            <th>{lang === 'id' ? 'Judul' : 'Title'}</th>
            <th>{lang === 'id' ? 'Kategori' : 'Category'}</th>
            <th>{lang === 'id' ? 'Penulis' : 'Author'}</th>
            <th>{lang === 'id' ? 'Tanggal' : 'Date'}</th>
            <th/>
          </tr>
        </thead>
        <tbody>
          {list.slice(0, compact ? 5 : undefined).map(n => (
            <tr key={n.id}>
              <td>
                <div className="tbl-title">
                  {n.pinned && <span className="pin-badge"></span>}
                  {pickLocal(n, 'title')}
                </div>
                <div className="tbl-excerpt">{pickLocal(n, 'excerpt').slice(0, 80)}…</div>
                <div className="tbl-news-meta-mobile">
                  <span>{n.author}</span>
                  <span className="mono">{n.date}</span>
                </div>
                <div className="tbl-news-category-mobile">
                  <span className={'chip ' + n.tone}>{pickLocal(n, 'category')}</span>
                </div>
              </td>
              <td><span className={'chip ' + n.tone}>{pickLocal(n, 'category')}</span></td>
              <td>{n.author}</td>
              <td className="mono">{n.date}</td>
              <td className="tbl-actions has-many">
                <div className="tbl-actions-row">
                  <button onClick={() => togglePin(n.id)} title={n.pinned ? (lang === 'id' ? 'Lepas pin' : 'Unpin') : 'Pin'} aria-label={n.pinned ? (lang === 'id' ? 'Lepas pin berita' : 'Unpin post') : (lang === 'id' ? 'Pin berita' : 'Pin post')} className={'icon-btn ' + (n.pinned ? 'is-active' : '')}>
                    <AdminMiniIcon kind={n.pinned ? 'pin' : 'pin-off'}/>
                  </button>
                  <button onClick={() => onEdit(n)} title={lang === 'id' ? 'Edit' : 'Edit'} aria-label={lang === 'id' ? 'Edit berita' : 'Edit post'} className="icon-btn"><AdminMiniIcon kind="edit"/></button>
                  <button onClick={() => del(n.id)} className="danger icon-btn" title={lang === 'id' ? 'Hapus' : 'Delete'} aria-label={lang === 'id' ? 'Hapus berita' : 'Delete post'}><AdminMiniIcon kind="delete"/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function NewsEditor({ item, onDone }) {
  const { lang } = useT();
  const isNew = !item;
  const [form, setForm] = useState(() => item ? {
    ...item,
    body_id: item.body_id.join('\n\n'),
    body_en: item.body_en.join('\n\n'),
  } : {
    id: 'n' + Date.now(), slug: '', tone: 'red', pinned: false,
    category_id: 'Pengumuman', category_en: 'Announcement',
    title_id: '', title_en: '', excerpt_id: '', excerpt_en: '',
    body_id: '', body_en: '', author: 'Tim Admin', date: new Date().toISOString().slice(0, 10),
  });

  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const coverInputRef = useRef(null);
  const initialCoverPathRef = useRef(item?.cover_path || null);
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => () => {
    cleanupDraftUploadSoon(formRef.current?.cover_path, initialCoverPathRef.current);
  }, []);

  async function uploadCover(file) {
    if (!file) return;
    const prevCoverPath = form.cover_path || null;
    setUploadingCover(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('kind', 'news');
      const res = await apiCall('api/admin/upload.php', { method: 'POST', body: fd });
      setForm(f => ({ ...f, cover_path: res.path }));
      await cleanupDraftUpload(prevCoverPath, initialCoverPathRef.current);
    } catch (err) {
      showToast((lang === 'id' ? 'Gagal unggah: ' : 'Upload failed: ') + err.message);
    } finally {
      setUploadingCover(false);
    }
  }

  async function removeCover() {
    const currentPath = form.cover_path || null;
    setForm(f => ({ ...f, cover_path: null }));
    await cleanupDraftUpload(currentPath, initialCoverPathRef.current);
  }

  function handleCancel() {
    cleanupDraftUploadSoon(form.cover_path, initialCoverPathRef.current);
    onDone();
  }

  async function save() {
    if (!form.title_id.trim()) { showToast(lang === 'id' ? 'Judul (ID) wajib diisi' : 'Indonesian title is required'); return; }
    const payload = {
      ...form,
      slug: form.slug || form.title_id.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50),
      body_id: form.body_id.split(/\n\n+/).map(p => p.trim()).filter(Boolean),
      body_en: form.body_en.split(/\n\n+/).map(p => p.trim()).filter(Boolean),
    };
    setSaving(true);
    try {
      const url = isNew ? 'api/admin/news.php' : `api/admin/news.php?id=${encodeURIComponent(form.id)}`;
      const res = await apiCall(url, {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(payload),
      });
      const saved = res?.item ?? payload;
      // Sync ke store
      store.set(ss => ({
        ...ss,
        news: isNew ? [saved, ...ss.news] : ss.news.map(n => n.id === saved.id ? saved : n)
      }));
      initialCoverPathRef.current = saved.cover_path || null;
      showToast(isNew
        ? (lang === 'id' ? 'Berita dibuat' : 'Post created')
        : (lang === 'id' ? 'Berita diperbarui' : 'Post updated'));
      onDone();
    } catch (err) {
      showToast((lang === 'id' ? 'Gagal simpan: ' : 'Save failed: ') + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <button className="admin-back" onClick={handleCancel}>← {lang === 'id' ? 'Kembali' : 'Back'}</button>
          <h1>{isNew ? (lang === 'id' ? 'Berita baru' : 'New post') : (lang === 'id' ? 'Edit berita' : 'Edit post')}</h1>
        </div>
        <div className="admin-page-actions">
          <button className="btn" onClick={handleCancel} disabled={saving}>{lang === 'id' ? 'Batal' : 'Cancel'}</button>
          <button className="btn primary" onClick={save} disabled={saving}>
            {saving ? (lang === 'id' ? 'Menyimpan…' : 'Saving…') : (lang === 'id' ? 'Simpan' : 'Save')}
          </button>
        </div>
      </div>

      <div className="editor-grid">
        <div className="card editor-main">
          <div className="lang-col">
            <div className="lang-col-head"><span className="lang-badge">ID</span> Bahasa Indonesia</div>
            <FormField label="Judul"><input value={form.title_id} onChange={e => setForm(f => ({ ...f, title_id: e.target.value }))}/></FormField>
            <FormField label="Ringkasan"><textarea rows="2" value={form.excerpt_id} onChange={e => setForm(f => ({ ...f, excerpt_id: e.target.value }))}/></FormField>
            <FormField label="Isi (paragraf pisah dengan baris kosong)"><textarea rows="7" value={form.body_id} onChange={e => setForm(f => ({ ...f, body_id: e.target.value }))}/></FormField>
          </div>
          <hr/>
          <div className="lang-col">
            <div className="lang-col-head"><span className="lang-badge">EN</span> English</div>
            <FormField label="Title"><input value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))}/></FormField>
            <FormField label="Excerpt"><textarea rows="2" value={form.excerpt_en} onChange={e => setForm(f => ({ ...f, excerpt_en: e.target.value }))}/></FormField>
            <FormField label="Body (blank line = paragraph)"><textarea rows="7" value={form.body_en} onChange={e => setForm(f => ({ ...f, body_en: e.target.value }))}/></FormField>
          </div>
        </div>

        <aside className="editor-side">
          <div className="card editor-side-card">
            <h4>{lang === 'id' ? 'Gambar sampul' : 'Cover image'}</h4>
            <div onClick={() => coverInputRef.current?.click()}
                 style={{ cursor: 'pointer', border: '2px dashed var(--line)', borderRadius: 12, padding: 8, textAlign: 'center' }}>
              {form.cover_path
                ? <img src={form.cover_path} alt="cover" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, display: 'block' }}/>
                : <div style={{ height: 140, display: 'grid', placeItems: 'center', color: 'var(--ink-muted)', fontSize: 13 }}>
                    {uploadingCover ? (lang === 'id' ? 'Mengunggah…' : 'Uploading…') : (lang === 'id' ? 'Klik untuk unggah' : 'Click to upload')}
                  </div>}
              <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }}
                     onChange={e => uploadCover(e.target.files?.[0])}/>
            </div>
            {form.cover_path && (
              <button type="button" className="btn sm ghost" style={{ marginTop: 8 }}
                      onClick={removeCover}>
                {lang === 'id' ? 'Hapus sampul' : 'Remove cover'}
              </button>
            )}
          </div>
          <div className="card editor-side-card">
            <h4>{lang === 'id' ? 'Meta' : 'Meta'}</h4>
            <FormField label="Slug"><input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="auto-generated"/></FormField>
            <FormField label={lang === 'id' ? 'Penulis' : 'Author'}><input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}/></FormField>
            <FormField label={lang === 'id' ? 'Tanggal' : 'Date'}><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}/></FormField>
            <FormField label={lang === 'id' ? 'Kategori (ID)' : 'Category (ID)'}>
              <input value={form.category_id} onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}/>
            </FormField>
            <FormField label={lang === 'id' ? 'Kategori (EN)' : 'Category (EN)'}>
              <input value={form.category_en} onChange={e => setForm(f => ({ ...f, category_en: e.target.value }))}/>
            </FormField>
          </div>
          <div className="card editor-side-card">
            <h4>{lang === 'id' ? 'Tampilan' : 'Appearance'}</h4>
            <FormField label={lang === 'id' ? 'Warna tema' : 'Tone'}>
              <div className="tone-picker">
                {['red','yellow','green','blue','purple','orange','pink'].map(c => (
                  <button key={c}
                          className={'tone-swatch ' + (form.tone === c ? 'on' : '')}
                          style={{ background: `var(--${c})` }}
                          onClick={() => setForm(f => ({ ...f, tone: c }))}/>
                ))}
              </div>
            </FormField>
            <label className="checkbox">
              <input type="checkbox" checked={form.pinned} onChange={e => setForm(f => ({ ...f, pinned: e.target.checked }))}/>
              {lang === 'id' ? 'Sematkan di atas' : 'Pin to top'}
            </label>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------- Gallery list & editor -------- */
function GalleryList({ onEdit }) {
  const { lang, pickLocal } = useT();
  const [s] = useStore();
  const [filter, setFilter] = useState('all');
  useEffect(() => { refetchPublicData(); }, []);
  const list = filter === 'all' ? s.gallery : s.gallery.filter(g => g.album === filter);

  async function del(id) {
    if (!confirm(lang === 'id' ? 'Hapus foto ini?' : 'Delete this photo?')) return;
    const prev = store.get().gallery;
    store.set(ss => ({ ...ss, gallery: ss.gallery.filter(g => g.id !== id) }));
    try {
      await apiCall(`api/admin/gallery.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      showToast(lang === 'id' ? 'Terhapus' : 'Deleted');
    } catch (err) {
      store.set(ss => ({ ...ss, gallery: prev }));
      showToast((lang === 'id' ? 'Gagal hapus: ' : 'Delete failed: ') + err.message);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? 'Kelola Galeri' : 'Manage Gallery'}</h1>
          <p>{lang === 'id' ? 'Unggah, atur album, edit keterangan.' : 'Upload, organize albums, edit captions.'}</p>
        </div>
        <button className="btn primary" onClick={() => onEdit('new')}>+ {lang === 'id' ? 'Foto baru' : 'New photo'}</button>
      </div>

      <div className="gal-filter" style={{ marginBottom: 16 }}>
        {window.SEED.albums.map(a => (
          <button key={a.id}
                  className={'gal-filter-btn ' + (filter === a.id ? 'is-active' : '')}
                  onClick={() => setFilter(a.id)}
                  style={a.tone ? { '--tone': `var(--${a.tone})` } : {}}>
            {pickLocal(a, 'name')}
            <span className="gal-count">{a.id === 'all' ? s.gallery.length : s.gallery.filter(g => g.album === a.id).length}</span>
          </button>
        ))}
      </div>

      <div className="admin-gal-grid">
        {list.map(g => (
          <div key={g.id} className="admin-gal-card">
            {g.file_path
              ? <img src={g.file_path} alt={pickLocal(g, 'caption') || ''} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block', border: '2px solid var(--ink)', borderRadius: 8 }}/>
              : <Placeholder tone={g.tone} caption={`IMG_${String(g.id).padStart(4, '0')}`} h={160}/>}
            <div className="admin-gal-body">
              <div className="admin-gal-cap">{pickLocal(g, 'caption')}</div>
              <div className="admin-gal-album">
                <span className={'chip ' + g.tone}>{pickLocal(window.SEED.albums.find(a => a.id === g.album), 'name')}</span>
              </div>
            </div>
            <div className="admin-gal-actions">
              <button onClick={() => onEdit(g)} title={lang === 'id' ? 'Edit foto' : 'Edit photo'} aria-label={lang === 'id' ? 'Edit foto' : 'Edit photo'}><AdminMiniIcon kind="edit"/></button>
              <button className="danger" onClick={() => del(g.id)} title={lang === 'id' ? 'Hapus foto' : 'Delete photo'} aria-label={lang === 'id' ? 'Hapus foto' : 'Delete photo'}><AdminMiniIcon kind="delete"/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GalleryEditor({ item, onDone }) {
  const { lang } = useT();
  const isNew = !item;
  const [form, setForm] = useState(() => item || {
    id: null, album: 'kelas', caption_id: '', caption_en: '', w: 1, h: 1, tone: 'yellow', file_path: null,
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef(null);
  const initialFilePathRef = useRef(item?.file_path || null);
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => () => {
    cleanupDraftUploadSoon(formRef.current?.file_path, initialFilePathRef.current);
  }, []);

  async function handleFile(file) {
    if (!file) return;
    if (!/^image\//.test(file.type)) { showToast(lang === 'id' ? 'Hanya file gambar' : 'Image files only'); return; }
    if (file.size > 8 * 1024 * 1024)  { showToast(lang === 'id' ? 'Maks 8 MB' : 'Max 8 MB'); return; }
    const prevFilePath = form.file_path || null;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('kind', 'gallery');
      const res = await apiCall('api/admin/upload.php', { method: 'POST', body: fd });
      setForm(f => ({ ...f, file_path: res.path }));
      await cleanupDraftUpload(prevFilePath, initialFilePathRef.current);
      showToast(lang === 'id' ? 'Berhasil diunggah' : 'Uploaded');
    } catch (err) {
      showToast((lang === 'id' ? 'Gagal unggah: ' : 'Upload failed: ') + err.message);
    } finally {
      setUploading(false);
    }
  }

  async function removeImage() {
    const currentPath = form.file_path || null;
    setForm(f => ({ ...f, file_path: null }));
    await cleanupDraftUpload(currentPath, initialFilePathRef.current);
  }

  function handleCancel() {
    cleanupDraftUploadSoon(form.file_path, initialFilePathRef.current);
    onDone();
  }

  async function save() {
    setSaving(true);
    try {
      const url = isNew ? 'api/admin/gallery.php' : `api/admin/gallery.php?id=${encodeURIComponent(form.id)}`;
      const res = await apiCall(url, {
        method: isNew ? 'POST' : 'PUT',
        body: JSON.stringify(form),
      });
      const saved = res?.item ?? form;
      store.set(ss => ({
        ...ss,
        gallery: isNew ? [saved, ...ss.gallery] : ss.gallery.map(g => g.id === saved.id ? saved : g)
      }));
      initialFilePathRef.current = saved.file_path || null;
      showToast(isNew ? (lang === 'id' ? 'Foto ditambahkan' : 'Photo added') : (lang === 'id' ? 'Foto diperbarui' : 'Photo updated'));
      onDone();
    } catch (err) {
      showToast((lang === 'id' ? 'Gagal simpan: ' : 'Save failed: ') + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <button className="admin-back" onClick={handleCancel}>← {lang === 'id' ? 'Kembali' : 'Back'}</button>
          <h1>{isNew ? (lang === 'id' ? 'Foto baru' : 'New photo') : (lang === 'id' ? 'Edit foto' : 'Edit photo')}</h1>
        </div>
        <div className="admin-page-actions">
          <button className="btn" onClick={handleCancel} disabled={saving || uploading}>{lang === 'id' ? 'Batal' : 'Cancel'}</button>
          <button className="btn primary" onClick={save} disabled={saving || uploading}>
            {saving ? (lang === 'id' ? 'Menyimpan…' : 'Saving…') : (lang === 'id' ? 'Simpan' : 'Save')}
          </button>
        </div>
      </div>

      <div className="editor-grid">
        <div className="card editor-main">
          <div className="upload-area"
               onClick={() => fileInputRef.current?.click()}
               onDragOver={e => { e.preventDefault(); }}
               onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
               style={{ cursor: 'pointer' }}>
            {form.file_path
              ? <img src={form.file_path} alt="preview" style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 12, border: '2px solid var(--ink)' }}/>
              : <Placeholder tone={form.tone} caption={uploading ? (lang === 'id' ? 'mengunggah…' : 'uploading…') : (lang === 'id' ? 'klik / drop untuk unggah' : 'click / drop to upload')} h={280}/>
            }
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }}
                   onChange={e => handleFile(e.target.files?.[0])}/>
            <div className="upload-hint">
              <span>{lang === 'id' ? 'Rekomendasi: JPG/PNG/WEBP, maks 8 MB' : 'Recommended: JPG/PNG/WEBP, max 8 MB'}</span>
              {form.file_path && (
                <button type="button" className="btn sm ghost" style={{ marginLeft: 8 }}
                        onClick={e => { e.stopPropagation(); removeImage(); }}>
                  {lang === 'id' ? 'Hapus gambar' : 'Remove image'}
                </button>
              )}
            </div>
          </div>
          <FormField label={lang === 'id' ? 'Keterangan (ID)' : 'Caption (ID)'}><input value={form.caption_id} onChange={e => setForm(f => ({ ...f, caption_id: e.target.value }))}/></FormField>
          <FormField label={lang === 'id' ? 'Keterangan (EN)' : 'Caption (EN)'}><input value={form.caption_en} onChange={e => setForm(f => ({ ...f, caption_en: e.target.value }))}/></FormField>
        </div>
        <aside className="editor-side">
          <div className="card editor-side-card">
            <h4>{lang === 'id' ? 'Album' : 'Album'}</h4>
            <div className="album-picker">
              {window.SEED.albums.filter(a => a.id !== 'all').map(a => (
                <button key={a.id}
                        className={'album-chip ' + (form.album === a.id ? 'on' : '')}
                        onClick={() => setForm(f => ({ ...f, album: a.id, tone: a.tone || f.tone }))}>
                  {lang === 'id' ? a.name_id : a.name_en}
                </button>
              ))}
            </div>
          </div>
          <div className="card editor-side-card">
            <h4>{lang === 'id' ? 'Ukuran grid' : 'Grid size'}</h4>
            <div className="size-grid">
              {[[1,1],[2,1],[1,2],[2,2]].map(([w, h], i) => (
                <button key={i}
                        className={'size-btn ' + (form.w === w && form.h === h ? 'on' : '')}
                        onClick={() => setForm(f => ({ ...f, w, h }))}>
                  <div style={{ width: w * 18, height: h * 18, background: `var(--${form.tone})`, borderRadius: 4 }}/>
                  <span>{w}×{h}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------- Messages -------- */
function MessagesList() {
  const { lang, pickLocal } = useT();
  const [s] = useStore();
  const [sel, setSel] = useState(null);
  const [isMobileInbox, setIsMobileInbox] = useState(() => window.matchMedia('(max-width: 800px)').matches);
  const selected = s.messages.find(m => m.id === sel);
  const hasMessages = s.messages.length > 0;

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 800px)');
    const sync = () => setIsMobileInbox(mq.matches);
    sync();
    if (mq.addEventListener) mq.addEventListener('change', sync);
    else mq.addListener(sync);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', sync);
      else mq.removeListener(sync);
    };
  }, []);

  // Load dari API saat mount
  useEffect(() => {
    apiCall('api/admin/messages.php')
      .then(d => {
        if (d?.messages) {
          store.set(ss => ({ ...ss, messages: d.messages }));
          if (!isMobileInbox && d.messages.length > 0) setSel(d.messages[0].id);
        }
      })
      .catch(() => { /* fallback: biarkan store */ });
  }, [isMobileInbox]);

  useEffect(() => {
    if (!hasMessages) {
      if (sel !== null) setSel(null);
      return;
    }
    if (selected) return;
    if (!isMobileInbox) {
      setSel(s.messages[0].id);
    }
  }, [hasMessages, isMobileInbox, s.messages, sel, selected]);

  async function markRead(id) {
    const target = store.get().messages.find(m => m.id === id);
    if (!target || !target.unread) return;
    // Optimistic
    store.set(ss => ({ ...ss, messages: ss.messages.map(m => m.id === id ? { ...m, unread: false } : m) }));
    try {
      await apiCall(`api/admin/messages.php?id=${encodeURIComponent(id)}`, {
        method: 'POST',
        body: JSON.stringify({ read: true }),
      });
    } catch (_) {
      // Rollback kalau gagal
      store.set(ss => ({ ...ss, messages: ss.messages.map(m => m.id === id ? { ...m, unread: true } : m) }));
    }
  }

  async function deleteMsg(id) {
    if (!confirm(lang === 'id' ? 'Hapus pesan ini?' : 'Delete this message?')) return;
    const prev = store.get().messages;
    store.set(ss => ({ ...ss, messages: ss.messages.filter(m => m.id !== id) }));
    if (sel === id) setSel(null);
    try {
      await apiCall(`api/admin/messages.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      showToast(lang === 'id' ? 'Pesan dihapus' : 'Message deleted');
    } catch (err) {
      store.set(ss => ({ ...ss, messages: prev }));
      showToast((lang === 'id' ? 'Gagal: ' : 'Failed: ') + err.message);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? 'Pesan masuk' : 'Inbox'}</h1>
          <p>{lang === 'id' ? 'Pesan dari formulir kontak publik.' : 'Messages from the public contact form.'}</p>
        </div>
      </div>

      <div className="inbox">
        {(!isMobileInbox || !selected || !hasMessages) && (
        <div className="inbox-list">
          {s.messages.map(m => (
            <button key={m.id}
                    className={'inbox-item ' + (m.unread ? 'unread ' : '') + (sel === m.id ? 'on' : '')}
                    onClick={() => { setSel(m.id); markRead(m.id); }}>
              <div className="mini-msg-avatar">{m.name[0]}</div>
              <div className="inbox-item-body">
                <div className="mini-msg-top">
                  <strong>{m.name}</strong>
                  <span className="inbox-date">{m.date.slice(5)}</span>
                </div>
                <div className="inbox-sub">{pickLocal(m, 'subject')}</div>
                <div className="inbox-prev">{pickLocal(m, 'preview')}</div>
              </div>
              {m.unread && <span className="unread-dot"/>}
            </button>
          ))}
        </div>
        )}
        {(!isMobileInbox || !!selected || !hasMessages) && (
        <div className="inbox-read">
          {selected ? (
            <>
              <div className="inbox-read-head">
                {isMobileInbox && (
                  <button className="admin-back inbox-mobile-back" onClick={() => setSel(null)}>
                    ← {lang === 'id' ? 'Kembali ke daftar' : 'Back to list'}
                  </button>
                )}
                <h3>{pickLocal(selected, 'subject')}</h3>
                <div className="inbox-read-meta">
                  <strong>{selected.name}</strong>
                  <span>{selected.email}</span>
                  <span>{selected.date}</span>
                </div>
              </div>
              <div className="inbox-read-body">
                <p style={{ whiteSpace: 'pre-wrap' }}>{selected.body || pickLocal(selected, 'preview')}</p>
              </div>
              <div className="inbox-reply">
                <div className="inbox-reply-actions">
                  <button className="btn ghost sm" onClick={() => deleteMsg(selected.id)}>
                    {lang === 'id' ? 'Hapus' : 'Delete'}
                  </button>
                  <a className="btn primary" href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(pickLocal(selected, 'subject') || '')}`}>
                    {lang === 'id' ? 'Balas via email' : 'Reply via email'} →
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="empty-mark" aria-hidden="true"><AdminMiniIcon kind="inbox"/></div>
              <p>
                {hasMessages
                  ? (lang === 'id' ? 'Pilih pesan dari daftar.' : 'Select a message.')
                  : (lang === 'id' ? 'Belum ada pesan masuk.' : 'No messages yet.')}
              </p>
            </div>
          )}
        </div>
        )}
      </div>
    </div>
  );
}

/* -------- Registrations (PPDB) -------- */
function RegistrationsList() {
  const { lang } = useT();
  const [items, setItems]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [selId, setSelId]  = useState(null);
  const [filter, setFilter] = useState('all');

  const STATUSES = [
    { k: 'all',      id: 'Semua',     en: 'All',       tone: '' },
    { k: 'baru',     id: 'Baru',      en: 'New',       tone: 'red' },
    { k: 'diproses', id: 'Diproses',  en: 'In review', tone: 'yellow' },
    { k: 'diterima', id: 'Diterima',  en: 'Accepted',  tone: 'green' },
    { k: 'ditolak',  id: 'Ditolak',   en: 'Rejected',  tone: 'purple' },
  ];

  async function load() {
    setLoading(true);
    try {
      const d = await apiCall('api/admin/registrations.php');
      setItems(d.registrations || []);
    } catch (err) {
      showToast((lang === 'id' ? 'Gagal muat: ' : 'Load failed: ') + err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => { load(); }, []);

  const visible = filter === 'all' ? items : items.filter(r => r.status === filter);
  const selected = items.find(r => r.id === selId);

  async function setStatus(id, status) {
    const prev = items;
    setItems(arr => arr.map(r => r.id === id ? { ...r, status } : r));
    try {
      await apiCall(`api/admin/registrations.php?id=${id}`, { method: 'POST', body: JSON.stringify({ status }) });
      showToast(lang === 'id' ? 'Status diperbarui' : 'Status updated');
    } catch (err) {
      setItems(prev);
      showToast((lang === 'id' ? 'Gagal: ' : 'Failed: ') + err.message);
    }
  }

  async function del(id) {
    if (!confirm(lang === 'id' ? 'Hapus pendaftar ini?' : 'Delete this applicant?')) return;
    const prev = items;
    setItems(arr => arr.filter(r => r.id !== id));
    if (selId === id) setSelId(null);
    try {
      await apiCall(`api/admin/registrations.php?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      setItems(prev);
      showToast((lang === 'id' ? 'Gagal: ' : 'Failed: ') + err.message);
    }
  }

  const levelLabel = id => {
    const p = window.SEED.programs.find(p => p.id === id);
    return p ? (lang === 'id' ? p.title_id : p.title_en) : id;
  };

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? 'Pendaftar PPDB' : 'Admissions Applicants'}</h1>
          <p>{lang === 'id' ? 'Calon murid dari formulir pendaftaran online.' : 'Applicants from the online admissions form.'}</p>
        </div>
        <button className="btn sm ghost" onClick={load}>↻ {lang === 'id' ? 'Muat ulang' : 'Reload'}</button>
      </div>

      <div className="gal-filter" style={{ marginBottom: 16 }}>
        {STATUSES.map(st => {
          const count = st.k === 'all' ? items.length : items.filter(r => r.status === st.k).length;
          return (
            <button key={st.k}
                    className={'gal-filter-btn ' + (filter === st.k ? 'is-active' : '')}
                    onClick={() => setFilter(st.k)}
                    style={st.tone ? { '--tone': `var(--${st.tone})` } : {}}>
              {lang === 'id' ? st.id : st.en}
              <span className="gal-count">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="card">
        <div className="tbl-wrap">
          {loading && <p style={{ padding: 20, color: 'var(--ink-muted)' }}>{lang === 'id' ? 'Memuat…' : 'Loading…'}</p>}
          {!loading && visible.length === 0 && (
            <p style={{ padding: 20, color: 'var(--ink-muted)' }}>{lang === 'id' ? 'Belum ada pendaftar.' : 'No applicants yet.'}</p>
          )}
          {!loading && visible.length > 0 && (
            <table className="tbl tbl-registrations">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>{lang === 'id' ? 'Anak' : 'Child'}</th>
                  <th>{lang === 'id' ? 'Orang tua' : 'Parent'}</th>
                  <th>{lang === 'id' ? 'Jenjang' : 'Level'}</th>
                  <th>{lang === 'id' ? 'Tanggal' : 'Date'}</th>
                  <th>Status</th>
                  <th/>
                </tr>
              </thead>
              <tbody>
                {visible.map(r => (
                  <tr key={r.id} style={{ cursor: 'pointer' }} onClick={() => setSelId(r.id)}>
                    <td className="mono">{r.application_no}</td>
                    <td>
                      <div className="tbl-title">{r.child_name}</div>
                      <div className="tbl-excerpt">{r.child_dob}</div>
                      <div className="tbl-registrations-meta-mobile">
                        <span>
                          <strong>{lang === 'id' ? 'Orang tua' : 'Parent'}:</strong> {r.parent_name}
                        </span>
                        <span>
                          <strong>{lang === 'id' ? 'Jenjang' : 'Level'}:</strong> {levelLabel(r.level)}
                        </span>
                      </div>
                      <div className="tbl-registrations-mobile-actions">
                        <button
                          className="danger icon-btn"
                          title={lang === 'id' ? 'Hapus pendaftar' : 'Delete applicant'}
                          aria-label={lang === 'id' ? 'Hapus pendaftar' : 'Delete applicant'}
                          onClick={e => { e.stopPropagation(); del(r.id); }}>
                          <AdminMiniIcon kind="delete"/>
                        </button>
                      </div>
                    </td>
                    <td>
                      <div>{r.parent_name}</div>
                      <div className="tbl-excerpt">{r.parent_phone}</div>
                    </td>
                    <td>{levelLabel(r.level)}</td>
                    <td className="mono">{(r.created_at || '').slice(0, 10)}</td>
                    <td>
                      <select value={r.status}
                              className="status-select"
                              onClick={e => e.stopPropagation()}
                              onChange={e => setStatus(r.id, e.target.value)}>
                        {STATUSES.slice(1).map(st => (
                          <option key={st.k} value={st.k}>{lang === 'id' ? st.id : st.en}</option>
                        ))}
                      </select>
                    </td>
                    <td className="tbl-actions">
                      <div className="tbl-actions-row">
                        <button className="danger icon-btn" title={lang === 'id' ? 'Hapus pendaftar' : 'Delete applicant'} aria-label={lang === 'id' ? 'Hapus pendaftar' : 'Delete applicant'} onClick={e => { e.stopPropagation(); del(r.id); }}><AdminMiniIcon kind="delete"/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {selected && (
        <div className="card" style={{ marginTop: 16, padding: 20 }}>
          <h3 style={{ marginTop: 0 }}>
            {selected.application_no} — {selected.child_name}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, fontSize: 14 }}>
            <div><strong>{lang === 'id' ? 'Nama anak' : 'Child name'}:</strong> {selected.child_name}</div>
            <div><strong>{lang === 'id' ? 'Tanggal lahir' : 'DOB'}:</strong> {selected.child_dob}</div>
            <div><strong>{lang === 'id' ? 'Jenjang' : 'Level'}:</strong> {levelLabel(selected.level)}</div>
            <div><strong>Status:</strong> {selected.status}</div>
            <div><strong>{lang === 'id' ? 'Nama orang tua' : 'Parent'}:</strong> {selected.parent_name}</div>
            <div><strong>{lang === 'id' ? 'Telepon' : 'Phone'}:</strong> {selected.parent_phone}</div>
            <div><strong>Email:</strong> {selected.parent_email}</div>
            <div><strong>{lang === 'id' ? 'Alamat' : 'Address'}:</strong> {selected.parent_address || '—'}</div>
            {selected.notes && (
              <div style={{ gridColumn: 'span 2' }}>
                <strong>{lang === 'id' ? 'Catatan' : 'Notes'}:</strong>
                <p style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{selected.notes}</p>
              </div>
            )}
          </div>
          <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
            {selected.parent_phone && (
              <a className="btn green sm" target="_blank" rel="noopener"
                 href={`https://wa.me/${selected.parent_phone.replace(/\D/g, '')}`}>
                WhatsApp
              </a>
            )}
            {selected.parent_email && (
              <a className="btn sm" href={`mailto:${selected.parent_email}`}>Email</a>
            )}
            <button className="btn sm ghost" onClick={() => setSelId(null)} style={{ marginLeft: 'auto' }}>
              {lang === 'id' ? 'Tutup' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------- Konten: Program + Guru/Staff + Album ----------------------- */
function AdminContent() {
  const { lang } = useT();
  const [tab, setTab] = useState('programs');
  const tabs = [
    { k: 'programs', id: 'Program',    en: 'Programs' },
    { k: 'teachers', id: 'Guru & Staf', en: 'Teachers & Staff' },
    { k: 'albums',   id: 'Album',      en: 'Albums' },
  ];
  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? 'Konten Sekolah' : 'School Content'}</h1>
          <p>{lang === 'id' ? 'Kelola program kurikulum, guru/staf, dan album galeri.' : 'Manage curriculum, teachers, and gallery albums.'}</p>
        </div>
      </div>
      <div className="gal-filter" style={{ marginBottom: 16 }}>
        {tabs.map(tb => (
          <button key={tb.k}
                  className={'gal-filter-btn ' + (tab === tb.k ? 'is-active' : '')}
                  onClick={() => setTab(tb.k)}>
            {lang === 'id' ? tb.id : tb.en}
          </button>
        ))}
      </div>
      {tab === 'programs' && <ProgramsCrud/>}
      {tab === 'teachers' && <TeachersCrud/>}
      {tab === 'albums'   && <AlbumsCrud/>}
    </div>
  );
}

/* ----- Programs ----- */
function ProgramsCrud() {
  const { lang } = useT();
  const TONES = ['red','yellow','green','blue','purple','orange','pink'];
  const emptyForm = {
    id: '', sort_order: 0, age_id: '', age_en: '', title_id: '', title_en: '',
    tone: 'yellow', hours_id: '', hours_en: '', desc_id: '', desc_en: '',
    pillars_id: '', pillars_en: '',
  };
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null | 'new' | item
  const [form, setForm] = useState(emptyForm);

  async function load() {
    try {
      const d = await apiCall('api/admin/programs.php');
      setItems(d.programs || []);
    } catch (err) { showToast(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startEdit(p) {
    setEditing(p);
    setForm({
      ...p,
      pillars_id: Array.isArray(p.pillars_id) ? p.pillars_id.join('\n') : '',
      pillars_en: Array.isArray(p.pillars_en) ? p.pillars_en.join('\n') : '',
    });
  }
  function startNew() { setEditing('new'); setForm({ ...emptyForm }); }

  async function save() {
    const payload = {
      ...form,
      pillars_id: form.pillars_id.split('\n').map(s => s.trim()).filter(Boolean),
      pillars_en: form.pillars_en.split('\n').map(s => s.trim()).filter(Boolean),
    };
    try {
      if (editing === 'new') {
        await apiCall('api/admin/programs.php', { method: 'POST', body: JSON.stringify(payload) });
      } else {
        await apiCall(`api/admin/programs.php?id=${encodeURIComponent(editing.id)}`, { method: 'PUT', body: JSON.stringify(payload) });
      }
      showToast(lang === 'id' ? 'Tersimpan' : 'Saved');
      setEditing(null); await load(); refetchPublicData();
    } catch (err) { showToast(err.message); }
  }

  async function del(id) {
    if (!confirm(lang === 'id' ? 'Hapus program ini?' : 'Delete this program?')) return;
    try {
      await apiCall(`api/admin/programs.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      await load(); refetchPublicData();
    } catch (err) { showToast(err.message); }
  }

  if (editing) {
    const isNew = editing === 'new';
    return (
      <div className="card editor-main" style={{ maxWidth: 840 }}>
        <h3 style={{ marginTop: 0 }}>{isNew ? (lang === 'id' ? 'Program baru' : 'New program') : (lang === 'id' ? 'Edit program' : 'Edit program')}</h3>
        <div className="form-grid">
          <FormField label="ID (slug, mis. kb, tk-a)"><input value={form.id} onChange={e => setForm(f => ({ ...f, id: e.target.value }))} disabled={!isNew}/></FormField>
          <FormField label={lang === 'id' ? 'Urutan' : 'Sort order'}><input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}/></FormField>
          <FormField label="Judul (ID)"><input value={form.title_id} onChange={e => setForm(f => ({ ...f, title_id: e.target.value }))}/></FormField>
          <FormField label="Title (EN)"><input value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))}/></FormField>
          <FormField label="Usia (ID)"><input value={form.age_id} onChange={e => setForm(f => ({ ...f, age_id: e.target.value }))}/></FormField>
          <FormField label="Age (EN)"><input value={form.age_en} onChange={e => setForm(f => ({ ...f, age_en: e.target.value }))}/></FormField>
          <FormField label="Jam/minggu (ID)"><input value={form.hours_id} onChange={e => setForm(f => ({ ...f, hours_id: e.target.value }))}/></FormField>
          <FormField label="Hours (EN)"><input value={form.hours_en} onChange={e => setForm(f => ({ ...f, hours_en: e.target.value }))}/></FormField>
          <FormField label="Deskripsi (ID)" span={2}><textarea rows="2" value={form.desc_id} onChange={e => setForm(f => ({ ...f, desc_id: e.target.value }))}/></FormField>
          <FormField label="Description (EN)" span={2}><textarea rows="2" value={form.desc_en} onChange={e => setForm(f => ({ ...f, desc_en: e.target.value }))}/></FormField>
          <FormField label="Pilar (ID) — satu per baris" span={2}><textarea rows="3" value={form.pillars_id} onChange={e => setForm(f => ({ ...f, pillars_id: e.target.value }))}/></FormField>
          <FormField label="Pillars (EN) — one per line" span={2}><textarea rows="3" value={form.pillars_en} onChange={e => setForm(f => ({ ...f, pillars_en: e.target.value }))}/></FormField>
        </div>
        <FormField label={lang === 'id' ? 'Warna tema' : 'Tone'}>
          <div className="tone-picker">
            {TONES.map(c => (
              <button key={c} className={'tone-swatch ' + (form.tone === c ? 'on' : '')}
                      style={{ background: `var(--${c})` }} onClick={() => setForm(f => ({ ...f, tone: c }))}/>
            ))}
          </div>
        </FormField>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setEditing(null)}>{lang === 'id' ? 'Batal' : 'Cancel'}</button>
          <button className="btn primary" onClick={save}>{lang === 'id' ? 'Simpan' : 'Save'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="admin-page-head" style={{ padding: '16px 16px 0' }}>
        <div className="admin-card-head-copy">
          <h3>{lang === 'id' ? 'Program aktif' : 'Active programs'}</h3>
          <p>
            {lang === 'id'
              ? `${items.length} jenjang tampil di halaman publik.`
              : `${items.length} levels are shown on the public site.`}
          </p>
        </div>
        <button className="btn primary" onClick={startNew}>+ {lang === 'id' ? 'Program baru' : 'New program'}</button>
      </div>
      <table className="tbl tbl-programs">
        <thead><tr><th>ID</th><th>{lang === 'id' ? 'Judul' : 'Title'}</th><th>{lang === 'id' ? 'Usia' : 'Age'}</th><th>Tone</th><th/></tr></thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td className="mono">{p.id}</td>
              <td><div className="tbl-title">{lang === 'id' ? p.title_id : p.title_en}</div></td>
              <td>{lang === 'id' ? p.age_id : p.age_en}</td>
              <td><span className={'chip ' + p.tone}>{p.tone}</span></td>
              <td className="tbl-actions has-many">
                <div className="tbl-actions-row">
                  <button onClick={() => startEdit(p)} title={lang === 'id' ? 'Edit program' : 'Edit program'} aria-label={lang === 'id' ? 'Edit program' : 'Edit program'} className="icon-btn"><AdminMiniIcon kind="edit"/></button>
                  <button className="danger icon-btn" onClick={() => del(p.id)} title={lang === 'id' ? 'Hapus program' : 'Delete program'} aria-label={lang === 'id' ? 'Hapus program' : 'Delete program'}><AdminMiniIcon kind="delete"/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ----- Teachers ----- */
function TeachersCrud() {
  const { lang } = useT();
  const TONES = ['red','yellow','green','blue','purple','orange','pink'];
  const emptyForm = { id: '', sort_order: 0, name: '', role_id: '', role_en: '', tone: 'yellow', photo_path: null };
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const originalPhotoPathRef = useRef(null);
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => () => {
    cleanupDraftUploadSoon(formRef.current?.photo_path, originalPhotoPathRef.current);
  }, []);

  async function load() {
    try { setItems((await apiCall('api/admin/teachers.php')).teachers || []); }
    catch (err) { showToast(err.message); }
  }
  useEffect(() => { load(); }, []);

  function startNew() {
    originalPhotoPathRef.current = null;
    setEditing('new');
    setForm({ ...emptyForm });
  }

  function startEdit(teacher) {
    originalPhotoPathRef.current = teacher.photo_path || null;
    setEditing(teacher);
    setForm({ ...teacher, photo_path: teacher.photo_path || null });
  }

  async function handleFile(file) {
    if (!file) return;
    const prevPhotoPath = form.photo_path || null;
    setUploading(true);
    try {
      const fd = new FormData(); fd.append('file', file); fd.append('kind', 'teachers');
      const res = await apiCall('api/admin/upload.php', { method: 'POST', body: fd });
      setForm(f => ({ ...f, photo_path: res.path }));
      await cleanupDraftUpload(prevPhotoPath, originalPhotoPathRef.current);
      showToast(lang === 'id' ? 'Foto guru diunggah' : 'Teacher photo uploaded');
    } catch (err) { showToast(err.message); }
    finally { setUploading(false); }
  }

  async function removePhoto() {
    const currentPath = form.photo_path || null;
    setForm(f => ({ ...f, photo_path: null }));
    await cleanupDraftUpload(currentPath, originalPhotoPathRef.current);
  }

  function cancelEdit() {
    cleanupDraftUploadSoon(form.photo_path, originalPhotoPathRef.current);
    setEditing(null);
    setForm({ ...emptyForm });
  }

  async function save() {
    try {
      if (editing === 'new') {
        await apiCall('api/admin/teachers.php', { method: 'POST', body: JSON.stringify(form) });
      } else {
        await apiCall(`api/admin/teachers.php?id=${encodeURIComponent(editing.id)}`, { method: 'PUT', body: JSON.stringify(form) });
      }
      originalPhotoPathRef.current = form.photo_path || null;
      showToast(lang === 'id' ? 'Tersimpan' : 'Saved');
      setEditing(null); await load(); refetchPublicData();
    } catch (err) { showToast(err.message); }
  }
  async function del(id) {
    if (!confirm(lang === 'id' ? 'Hapus guru/staf ini?' : 'Delete this teacher?')) return;
    try {
      await apiCall(`api/admin/teachers.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
      await load();
      refetchPublicData();
      showToast(lang === 'id' ? 'Guru dihapus' : 'Teacher deleted');
    }
    catch (err) { showToast(err.message); }
  }

  if (editing) {
    const isNew = editing === 'new';
    return (
      <div className="card editor-main" style={{ maxWidth: 640 }}>
        <h3 style={{ marginTop: 0 }}>{isNew ? (lang === 'id' ? 'Guru baru' : 'New teacher') : (lang === 'id' ? 'Edit guru' : 'Edit teacher')}</h3>
        <div
          className="upload-area settings-logo-upload"
          onClick={() => fileRef.current?.click()}
          onDragOver={e => { e.preventDefault(); }}
          onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]); }}
          style={{ cursor: 'pointer', marginBottom: 14 }}>
          <div className={'settings-logo-preview' + (form.photo_path ? ' has-image' : '')}>
            {form.photo_path
              ? <img src={form.photo_path} alt="" className="settings-logo-preview-img" style={{ objectFit: 'cover', objectPosition: 'center' }}/>
              : (
                <div className="settings-logo-empty">
                  <div className="settings-logo-empty-mark">{lang === 'id' ? 'FOTO' : 'PHOTO'}</div>
                  <strong>{lang === 'id' ? 'Unggah foto guru' : 'Upload teacher photo'}</strong>
                  <span>{lang === 'id' ? 'Klik atau drop file untuk menampilkan avatar di halaman profil sekolah.' : 'Click or drop a file to show an avatar on the public profile page.'}</span>
                </div>
              )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => handleFile(e.target.files?.[0])}/>
          <div className="upload-hint">
            <span>
              {uploading
                ? (lang === 'id' ? 'Mengunggah foto guru…' : 'Uploading teacher photo…')
                : (lang === 'id' ? 'Rekomendasi: JPG/PNG/WEBP, maks 8 MB' : 'Recommended: JPG/PNG/WEBP, max 8 MB')}
            </span>
            {form.photo_path && (
              <button
                type="button"
                className="btn sm ghost"
                style={{ marginLeft: 8 }}
                onClick={e => { e.stopPropagation(); removePhoto(); }}>
                {lang === 'id' ? 'Hapus foto' : 'Remove photo'}
              </button>
            )}
          </div>
        </div>
        <div className="form-grid">
          <FormField label={lang === 'id' ? 'Nama' : 'Name'} span={2}><input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}/></FormField>
          <FormField label="Peran (ID)"><input value={form.role_id} onChange={e => setForm(f => ({ ...f, role_id: e.target.value }))}/></FormField>
          <FormField label="Role (EN)"><input value={form.role_en} onChange={e => setForm(f => ({ ...f, role_en: e.target.value }))}/></FormField>
          <FormField label={lang === 'id' ? 'Urutan' : 'Sort order'}><input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}/></FormField>
        </div>
        <FormField label="Tone">
          <div className="tone-picker">
            {TONES.map(c => (
              <button key={c} className={'tone-swatch ' + (form.tone === c ? 'on' : '')}
                      style={{ background: `var(--${c})` }} onClick={() => setForm(f => ({ ...f, tone: c }))}/>
            ))}
          </div>
        </FormField>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button className="btn" onClick={cancelEdit}>{lang === 'id' ? 'Batal' : 'Cancel'}</button>
          <button className="btn primary" onClick={save} disabled={uploading}>{lang === 'id' ? 'Simpan' : 'Save'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="admin-page-head" style={{ padding: '16px 16px 0' }}>
        <div className="admin-card-head-copy">
          <h3>{lang === 'id' ? 'Guru & staf' : 'Teachers & staff'}</h3>
          <p>
            {lang === 'id'
              ? `${items.length} profil tampil di halaman sekolah.`
              : `${items.length} profiles appear on the school page.`}
          </p>
        </div>
        <button className="btn primary" onClick={startNew}>
          + {lang === 'id' ? 'Guru baru' : 'New teacher'}
        </button>
      </div>
      <table className="tbl tbl-teachers">
        <thead><tr><th>{lang === 'id' ? 'Foto' : 'Photo'}</th><th>{lang === 'id' ? 'Nama' : 'Name'}</th><th>{lang === 'id' ? 'Peran' : 'Role'}</th><th/></tr></thead>
        <tbody>
          {items.map(t => (
            <tr key={t.id}>
              <td style={{ width: 60 }}>
                {t.photo_path
                  ? <img src={t.photo_path} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--ink)' }}/>
                  : <div style={{ width: 40, height: 40, borderRadius: '50%', background: `var(--${t.tone})`, border: '1.5px solid var(--ink)' }}/>}
              </td>
              <td>{t.name}</td>
              <td>{lang === 'id' ? t.role_id : t.role_en}</td>
              <td className="tbl-actions has-many">
                <div className="tbl-actions-row">
                  <button onClick={() => startEdit(t)} title={lang === 'id' ? 'Edit guru' : 'Edit teacher'} aria-label={lang === 'id' ? 'Edit guru' : 'Edit teacher'} className="icon-btn"><AdminMiniIcon kind="edit"/></button>
                  <button className="danger icon-btn" onClick={() => del(t.id)} title={lang === 'id' ? 'Hapus guru' : 'Delete teacher'} aria-label={lang === 'id' ? 'Hapus guru' : 'Delete teacher'}><AdminMiniIcon kind="delete"/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ----- Albums ----- */
function AlbumsCrud() {
  const { lang } = useT();
  const TONES = ['red','yellow','green','blue','purple','orange','pink'];
  const emptyForm = { id: '', sort_order: 0, name_id: '', name_en: '', tone: 'yellow' };
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  async function load() {
    try { setItems((await apiCall('api/admin/albums.php')).albums || []); }
    catch (err) { showToast(err.message); }
  }
  useEffect(() => { load(); }, []);

  async function save() {
    try {
      if (editing === 'new') {
        await apiCall('api/admin/albums.php', { method: 'POST', body: JSON.stringify(form) });
      } else {
        await apiCall(`api/admin/albums.php?id=${encodeURIComponent(editing.id)}`, { method: 'PUT', body: JSON.stringify(form) });
      }
      showToast(lang === 'id' ? 'Tersimpan' : 'Saved');
      setEditing(null); await load(); refetchPublicData();
    } catch (err) { showToast(err.message); }
  }
  async function del(id) {
    if (!confirm(lang === 'id' ? 'Hapus album? Foto tidak ikut terhapus.' : 'Delete album? Photos will be kept.')) return;
    try { await apiCall(`api/admin/albums.php?id=${encodeURIComponent(id)}`, { method: 'DELETE' }); await load(); refetchPublicData(); }
    catch (err) { showToast(err.message); }
  }

  if (editing) {
    const isNew = editing === 'new';
    return (
      <div className="card editor-main" style={{ maxWidth: 560 }}>
        <h3 style={{ marginTop: 0 }}>{isNew ? (lang === 'id' ? 'Album baru' : 'New album') : (lang === 'id' ? 'Edit album' : 'Edit album')}</h3>
        <div className="form-grid">
          <FormField label="ID (slug)"><input value={form.id} disabled={!isNew} onChange={e => setForm(f => ({ ...f, id: e.target.value }))}/></FormField>
          <FormField label={lang === 'id' ? 'Urutan' : 'Sort order'}><input type="number" value={form.sort_order} onChange={e => setForm(f => ({ ...f, sort_order: +e.target.value }))}/></FormField>
          <FormField label="Nama (ID)"><input value={form.name_id} onChange={e => setForm(f => ({ ...f, name_id: e.target.value }))}/></FormField>
          <FormField label="Name (EN)"><input value={form.name_en} onChange={e => setForm(f => ({ ...f, name_en: e.target.value }))}/></FormField>
        </div>
        <FormField label="Tone">
          <div className="tone-picker">
            {TONES.map(c => (
              <button key={c} className={'tone-swatch ' + (form.tone === c ? 'on' : '')}
                      style={{ background: `var(--${c})` }} onClick={() => setForm(f => ({ ...f, tone: c }))}/>
            ))}
          </div>
        </FormField>
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <button className="btn" onClick={() => setEditing(null)}>{lang === 'id' ? 'Batal' : 'Cancel'}</button>
          <button className="btn primary" onClick={save}>{lang === 'id' ? 'Simpan' : 'Save'}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="admin-page-head" style={{ padding: '16px 16px 0' }}>
        <div className="admin-card-head-copy">
          <h3>{lang === 'id' ? 'Album galeri' : 'Gallery albums'}</h3>
          <p>
            {lang === 'id'
              ? `${items.length} album tersedia untuk galeri publik.`
              : `${items.length} albums are available for the public gallery.`}
          </p>
        </div>
        <button className="btn primary" onClick={() => { setEditing('new'); setForm(emptyForm); }}>
          + {lang === 'id' ? 'Album baru' : 'New album'}
        </button>
      </div>
      <table className="tbl tbl-albums">
        <thead><tr><th>ID</th><th>{lang === 'id' ? 'Nama' : 'Name'}</th><th>Tone</th><th/></tr></thead>
        <tbody>
          {items.map(a => (
            <tr key={a.id}>
              <td className="mono">{a.id}</td>
              <td>{lang === 'id' ? a.name_id : a.name_en}</td>
              <td><span className={'chip ' + a.tone}>{a.tone}</span></td>
              <td className="tbl-actions has-many">
                <div className="tbl-actions-row">
                  <button onClick={() => { setEditing(a); setForm({ ...a }); }} title={lang === 'id' ? 'Edit album' : 'Edit album'} aria-label={lang === 'id' ? 'Edit album' : 'Edit album'} className="icon-btn"><AdminMiniIcon kind="edit"/></button>
                  <button className="danger icon-btn" onClick={() => del(a.id)} title={lang === 'id' ? 'Hapus album' : 'Delete album'} aria-label={lang === 'id' ? 'Hapus album' : 'Delete album'}><AdminMiniIcon kind="delete"/></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------- Settings -------- */
function AdminSettings() {
  const { lang } = useT();
  const [s] = useStore();
  const [form, setForm] = useState({ ...s.settings });
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const logoInputRef = useRef(null);
  const originalLogoPathRef = useRef(s.settings?.logo_path || null);
  const formRef = useRef(form);

  useEffect(() => {
    formRef.current = form;
  }, [form]);

  useEffect(() => () => {
    cleanupDraftUploadSoon(formRef.current?.logo_path, originalLogoPathRef.current);
  }, []);

  async function uploadLogo(file) {
    if (!file) return;
    const prevLogoPath = form.logo_path || null;
    const fd = new FormData();
    fd.append('file', file);
    fd.append('kind', 'settings');
    setUploadingLogo(true);
    try {
      const res = await apiCall('api/admin/upload.php', { method: 'POST', body: fd });
      setForm(f => ({ ...f, logo_path: res.path }));
      await cleanupDraftUpload(prevLogoPath, originalLogoPathRef.current);
      showToast(lang === 'id' ? 'Logo diunggah' : 'Logo uploaded');
    } catch (err) {
      showToast(err.message);
    } finally {
      setUploadingLogo(false);
    }
  }

  async function removeLogo() {
    const currentPath = form.logo_path || null;
    setForm(f => ({ ...f, logo_path: null }));
    await cleanupDraftUpload(currentPath, originalLogoPathRef.current);
  }

  async function save() {
    setSaving(true);
    try {
      await apiCall('api/admin/settings.php', { method: 'PUT', body: JSON.stringify(form) });
      window.SEED.settings = { ...(window.SEED.settings || {}), ...form };
      store.set(ss => ({ ...ss, settings: { ...form } }));
      await refetchPublicData();
      originalLogoPathRef.current = form.logo_path || null;
      showToast(lang === 'id' ? 'Pengaturan disimpan' : 'Settings saved');
    } catch (err) {
      showToast((lang === 'id' ? 'Gagal: ' : 'Failed: ') + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-page">
      <div className="admin-page-head">
        <div>
          <h1>{lang === 'id' ? 'Pengaturan' : 'Settings'}</h1>
          <p>{lang === 'id' ? 'Info kontak, jam operasional, dan identitas sekolah.' : 'Contact, hours, and school identity.'}</p>
        </div>
        <button className="btn primary" onClick={save} disabled={saving}>
          {saving ? (lang === 'id' ? 'Menyimpan…' : 'Saving…') : (lang === 'id' ? 'Simpan perubahan' : 'Save changes')}
        </button>
      </div>
      <div className="card editor-main" style={{ maxWidth: 760 }}>
        <FormField label={lang === 'id' ? 'Logo sekolah' : 'School logo'}>
          <div
            className="upload-area settings-logo-upload"
            onClick={() => logoInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); }}
            onDrop={e => { e.preventDefault(); uploadLogo(e.dataTransfer.files?.[0]); }}
            style={{ cursor: 'pointer' }}>
            <div className={'settings-logo-preview' + (form.logo_path ? ' has-image' : '')}>
              {form.logo_path
                ? <img src={form.logo_path} alt="logo" className="settings-logo-preview-img"/>
                : (
                  <div className="settings-logo-empty">
                    <div className="settings-logo-empty-mark">LOGO</div>
                    <strong>{lang === 'id' ? 'Unggah identitas sekolah' : 'Upload school identity'}</strong>
                    <span>{lang === 'id' ? 'Klik atau drop file untuk mengganti logo resmi.' : 'Click or drop a file to replace the official logo.'}</span>
                  </div>
                )}
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={e => uploadLogo(e.target.files?.[0])}/>
            <div className="upload-hint">
              <span>
                {uploadingLogo
                  ? (lang === 'id' ? 'Mengunggah logo…' : 'Uploading logo…')
                  : (lang === 'id' ? 'Klik / drop untuk unggah logo sekolah' : 'Click / drop to upload the school logo')}
              </span>
              {form.logo_path && (
                <button
                  type="button"
                  className="btn sm ghost"
                  style={{ marginLeft: 8 }}
                  onClick={e => { e.stopPropagation(); removeLogo(); }}>
                  {lang === 'id' ? 'Hapus logo' : 'Remove logo'}
                </button>
              )}
            </div>
          </div>
        </FormField>
        <FormField label={lang === 'id' ? 'Nama sekolah' : 'School name'}><input value={form.schoolName || ''} onChange={e => setForm(f => ({ ...f, schoolName: e.target.value }))}/></FormField>
        <FormField label={lang === 'id' ? 'Alamat' : 'Address'}><input value={form.address || ''} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}/></FormField>
        <FormField label={lang === 'id' ? 'Telepon' : 'Phone'}><input value={form.phone || ''} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}/></FormField>
        <FormField label="WhatsApp (kode negara, tanpa +)"><input value={form.whatsapp || ''} onChange={e => setForm(f => ({ ...f, whatsapp: e.target.value }))} placeholder="628xxxxxxxxx"/></FormField>
        <FormField label="Email"><input value={form.email || ''} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}/></FormField>
        <div className="form-grid">
          <FormField label="Tagline (ID)"><input value={form.tagline_id || ''} onChange={e => setForm(f => ({ ...f, tagline_id: e.target.value }))}/></FormField>
          <FormField label="Tagline (EN)"><input value={form.tagline_en || ''} onChange={e => setForm(f => ({ ...f, tagline_en: e.target.value }))}/></FormField>
          <FormField label={lang === 'id' ? 'Jam operasional (ID)' : 'Hours (ID)'}><input value={form.hours_id || ''} onChange={e => setForm(f => ({ ...f, hours_id: e.target.value }))}/></FormField>
          <FormField label={lang === 'id' ? 'Jam operasional (EN)' : 'Hours (EN)'}><input value={form.hours_en || ''} onChange={e => setForm(f => ({ ...f, hours_en: e.target.value }))}/></FormField>
        </div>
        <FormField label={lang === 'id' ? 'URL embed Google Maps' : 'Google Maps embed URL'}>
          <input value={form.maps_embed_url || ''} onChange={e => setForm(f => ({ ...f, maps_embed_url: e.target.value }))}
                 placeholder="https://www.google.com/maps/embed?pb=…"/>
        </FormField>
      </div>
    </div>
  );
}

Object.assign(window, { AdminPage });
