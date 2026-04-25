/* ================================================================
   PAUD Cemara — App shell: store hook, nav, footer, helpers
   ================================================================ */

const { useState, useEffect, useMemo, useCallback, useRef } = React;

/* -------- Tiny global store (useSyncExternalStore replacement) -------- */
const store = (() => {
  const listeners = new Set();
  let state = {
    lang: localStorage.getItem('paud:lang') || 'id',
    route: parseRoute(),
    news: [...window.SEED.news],
    gallery: [...window.SEED.gallery],
    messages: [...window.SEED.messages],
    settings: { ...window.SEED.settings },
    admin: { loggedIn: sessionStorage.getItem('paud:admin') === '1', email: 'admin@paudcemara.id' },
    toast: null,
  };
  function set(patch) {
    state = typeof patch === 'function' ? patch(state) : { ...state, ...patch };
    listeners.forEach(l => l());
  }
  return {
    get: () => state,
    set,
    sub: (fn) => { listeners.add(fn); return () => listeners.delete(fn); },
  };
})();

function parseRoute() {
  const h = location.hash.replace(/^#\/?/, '') || 'home';
  const [name, ...rest] = h.split('/');
  return { name: name || 'home', params: rest };
}

window.addEventListener('hashchange', () => store.set({ route: parseRoute() }));

function useStore() {
  const [, setTick] = useState(0);
  useEffect(() => store.sub(() => setTick(t => t + 1)), []);
  return [store.get(), store.set];
}

function useT() {
  const [s] = useStore();
  const t = window.I18N[s.lang];
  const pickLocal = (obj, key = '') => {
    if (!obj) return '';
    if (!key) return obj[s.lang] ?? obj.id ?? obj.en ?? '';
    return obj[`${key}_${s.lang}`] ?? obj[key] ?? '';
  };
  return { t, lang: s.lang, pickLocal };
}

function navigate(path) { location.hash = '#/' + path; window.scrollTo({ top: 0, behavior: 'instant' }); }

function setLang(lang) {
  localStorage.setItem('paud:lang', lang);
  store.set({ lang });
}

function showToast(msg) {
  store.set({ toast: msg });
  setTimeout(() => store.set({ toast: null }), 2600);
}

/* -------- Logo -------- */
function CemaraLogo({ size = 36 }) {
  const [s] = useStore();
  // Kalau admin sudah unggah logo di Pengaturan, pakai logo itu. Kalau belum, pakai SVG pohon cemara.
  const logoPath = s.settings?.logo_path || window.SEED?.settings?.logo_path;
  if (logoPath) {
    return (
      <img src={logoPath} alt="Logo"
           width={size} height={size}
           style={{ display: 'block', width: size, height: size, borderRadius: size / 3, objectFit: 'cover', border: '2px solid var(--ink)' }}/>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="lgleaf" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.76 0.15 145)"/>
          <stop offset="1" stopColor="oklch(0.56 0.14 160)"/>
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="28" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5"/>
      <path d="M30 12 L22 22 L26 22 L18 34 L24 34 L14 48 L46 48 L36 34 L42 34 L34 22 L38 22 Z" fill="url(#lgleaf)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
      <circle cx="30" cy="50" r="3" fill="var(--red)" stroke="var(--ink)" strokeWidth="1.5"/>
    </svg>
  );
}

/* -------- Nav -------- */
function NavBar() {
  const { t, lang } = useT();
  const [s] = useStore();
  const [open, setOpen] = useState(false);

  const links = [
    ['home', t.nav_home],
    ['profile', t.nav_profile],
    ['program', t.nav_program],
    ['gallery', t.nav_gallery],
    ['news', t.nav_news],
    ['ppdb', t.nav_ppdb],
    ['contact', t.nav_contact],
  ];

  const active = s.route.name === 'news-detail' ? 'news' : s.route.name;

  return (
    <>
      <header className="nav">
        <a className="nav-brand" onClick={() => navigate('home')}>
          <CemaraLogo size={40}/>
          <div className="nav-brand-text">
            <strong>PAUD Cemara</strong>
            <span>{lang === 'id' ? 'Karangwidoro, Malang' : 'Karangwidoro, Malang'}</span>
          </div>
        </a>

        <nav className="nav-links">
          {links.map(([key, label]) => (
            <a key={key}
               className={'nav-link ' + (active === key ? 'is-active' : '')}
               onClick={() => navigate(key)}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'id' ? 'on' : ''} onClick={() => setLang('id')}>ID</button>
            <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className="btn sm primary" onClick={() => navigate('ppdb')}>
            {lang === 'id' ? 'Daftar' : 'Apply'}
          </button>
          <button className="nav-burger" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {open && (
        <div className="nav-mobile" onClick={() => setOpen(false)}>
          <div className="nav-mobile-panel" onClick={e => e.stopPropagation()}>
            {links.map(([key, label]) => (
              <a key={key}
                 className={'nav-mobile-link ' + (active === key ? 'is-active' : '')}
                 onClick={() => { navigate(key); setOpen(false); }}>
                {label}
              </a>
            ))}
            <hr/>
            <a className="nav-mobile-link" onClick={() => { navigate('admin'); setOpen(false); }}>
              {t.nav_admin}
            </a>
          </div>
        </div>
      )}
    </>
  );
}

/* -------- Footer -------- */
function Footer() {
  const { t, lang, pickLocal } = useT();
  const [s] = useStore();
  const { settings } = s;

  return (
    <footer className="foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <div className="foot-brand-row">
            <CemaraLogo size={44}/>
            <div>
              <strong>PAUD Cemara</strong>
              <p>{pickLocal(settings, 'tagline')}</p>
            </div>
          </div>
          <div className="foot-social">
            <a className="foot-social-btn">IG</a>
            <a className="foot-social-btn">FB</a>
            <a className="foot-social-btn">YT</a>
            <a className="foot-social-btn">TT</a>
          </div>
        </div>

        <div className="foot-col">
          <h4>{t.footer_explore}</h4>
          <a onClick={() => navigate('profile')}>{t.nav_profile}</a>
          <a onClick={() => navigate('program')}>{t.nav_program}</a>
          <a onClick={() => navigate('gallery')}>{t.nav_gallery}</a>
          <a onClick={() => navigate('news')}>{t.nav_news}</a>
          <a onClick={() => navigate('ppdb')}>{t.nav_ppdb}</a>
        </div>

        <div className="foot-col">
          <h4>{t.footer_contact}</h4>
          <span>{settings.address}</span>
          <span>{settings.phone}</span>
          <span>{settings.email}</span>
        </div>

        <div className="foot-col">
          <h4>{t.footer_hours}</h4>
          <span>{t.footer_hours_1}</span>
          <span>{t.footer_hours_2}</span>
          <a className="foot-admin" onClick={() => navigate('admin')}>↪ {t.nav_admin}</a>
        </div>
      </div>
      <div className="foot-rule">
        <span>{t.footer_rights}</span>
        <span className="foot-credit">NPSN 12345678 · Terakreditasi A (BAN-PAUD &amp; PNF)</span>
      </div>
    </footer>
  );
}

/* -------- Toast -------- */
function Toast() {
  const [s] = useStore();
  if (!s.toast) return null;
  return <div className="toast">{s.toast}</div>;
}

/* -------- Shared atoms -------- */
function Placeholder({ tone = 'yellow', caption, h = 240, style = {}, children }) {
  const a = `var(--${tone})`;
  const b = `color-mix(in oklch, var(--${tone}) 70%, white)`;
  return (
    <div className={'placeholder' + (children ? ' has-art' : '')} style={{ height: h, '--ph-a': a, '--ph-b': b, ...style }}>
      {children && <div className="ph-art">{children}</div>}
      {caption && <span className="ph-label">{caption}</span>}
    </div>
  );
}

function SectionHead({ kicker, title, sub, align = 'left' }) {
  return (
    <div className={'sect-head align-' + align}>
      {kicker && <div className="sect-kicker">{kicker}</div>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}

function StripeDivider({ tones = ['red','yellow','green','blue','purple'] }) {
  return (
    <div className="stripe-divider">
      {tones.map((t, i) => <span key={i} style={{ background: `var(--${t})` }}/>)}
    </div>
  );
}

/* export */
Object.assign(window, {
  store, useStore, useT, navigate, setLang, showToast,
  CemaraLogo, NavBar, Footer, Toast,
  Placeholder, SectionHead, StripeDivider,
});
