/* ================================================================
   PAUD Cemara — Gallery + News + News detail pages
   ================================================================ */

/* =================== GALLERY =================== */
function GalleryPage() {
  const { t, lang, pickLocal } = useT();
  const [s] = useStore();
  const [album, setAlbum] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = album === 'all' ? s.gallery : s.gallery.filter(g => g.album === album);

  return (
    <div className="page page-gallery">
      <section className="sect pad-xl">
        <SectionHead
          kicker={lang === 'id' ? 'Memori' : 'Memories'}
          title={t.gal_title}
          sub={t.gal_sub}
        />

        <div className="gal-filter">
          {window.SEED.albums.map(a => (
            <button
              key={a.id}
              className={'gal-filter-btn ' + (album === a.id ? 'is-active' : '')}
              onClick={() => setAlbum(a.id)}
              style={a.tone ? { '--tone': `var(--${a.tone})` } : {}}
            >
              {pickLocal(a, 'name')}
              <span className="gal-count">
                {a.id === 'all' ? s.gallery.length : s.gallery.filter(g => g.album === a.id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="gal-grid">
          {filtered.map((g, i) => (
            <div
              key={g.id}
              className="gal-item"
              style={{ gridColumn: `span ${g.w}`, gridRow: `span ${g.h}` }}
              onClick={() => setLightbox(g)}
            >
              {g.file_path
                ? <img src={g.file_path} alt={pickLocal(g, 'caption') || ''} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}/>
                : <Placeholder tone={g.tone} caption={`IMG_${String(g.id).padStart(4, '0')}.jpg`} h="100%" style={{ height: '100%' }}/>}
              <div className="gal-hover">
                <span className="chip" style={{ background: `var(--${g.tone})`, color: 'white', borderColor: 'transparent' }}>
                  {pickLocal(window.SEED.albums.find(a => a.id === g.album), 'name')}
                </span>
                <div className="gal-cap">{pickLocal(g, 'caption')}</div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            {lang === 'id' ? 'Belum ada foto di album ini.' : 'No photos in this album yet.'}
          </div>
        )}
      </section>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>×</button>
          <div className="lightbox-inner" onClick={e => e.stopPropagation()}>
            {lightbox.file_path
              ? <img src={lightbox.file_path} alt={pickLocal(lightbox, 'caption') || ''} style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block', borderRadius: 12 }}/>
              : <Placeholder tone={lightbox.tone} caption={`IMG_${String(lightbox.id).padStart(4, '0')}.jpg`} h={480}/>}
            <div className="lightbox-meta">
              <div className="chip" style={{ background: `var(--${lightbox.tone})`, color: 'white', borderColor: 'transparent' }}>
                {pickLocal(window.SEED.albums.find(a => a.id === lightbox.album), 'name')}
              </div>
              <h3>{pickLocal(lightbox, 'caption')}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =================== NEWS LIST =================== */
function NewsPage() {
  const { t, lang, pickLocal } = useT();
  const [s] = useStore();
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(s.news.map(n => pickLocal(n, 'category')));
    return ['all', ...set];
  }, [s.news, lang]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return s.news
      .filter(n => cat === 'all' || pickLocal(n, 'category') === cat)
      .filter(n => {
        if (!q) return true;
        return (
          pickLocal(n, 'title').toLowerCase().includes(q) ||
          pickLocal(n, 'excerpt').toLowerCase().includes(q) ||
          pickLocal(n, 'category').toLowerCase().includes(q)
        );
      });
  }, [s.news, query, cat, lang]);

  const pinned = filtered.filter(n => n.pinned);
  const rest = filtered.filter(n => !n.pinned);

  return (
    <div className="page page-news">
      <section className="sect pad-xl">
        <SectionHead
          kicker={lang === 'id' ? 'Ruang cerita' : 'Story room'}
          title={t.news_title}
          sub={t.news_sub}
        />

        <div className="news-controls">
          <div className="news-search">
            <span className="news-search-icon">⌕</span>
            <input
              type="text"
              placeholder={t.news_search}
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && <button className="news-search-clear" onClick={() => setQuery('')}>×</button>}
          </div>
          <div className="news-cats">
            {categories.map(c => (
              <button
                key={c}
                className={'news-cat ' + (cat === c ? 'is-active' : '')}
                onClick={() => setCat(c)}
              >
                {c === 'all' ? (lang === 'id' ? 'Semua' : 'All') : c}
              </button>
            ))}
          </div>
        </div>

        {pinned.length > 0 && (
          <div className="news-pinned">
            <div className="news-pinned-label">📌 {lang === 'id' ? 'Disematkan' : 'Pinned'}</div>
            {pinned.map(n => <NewsCard key={n.id} item={n} featured={true}/>)}
          </div>
        )}

        {rest.length > 0 ? (
          <div className="news-grid">
            {rest.map(n => <NewsCard key={n.id} item={n}/>)}
          </div>
        ) : pinned.length === 0 && (
          <div className="empty-state">
            <div className="empty-emoji">🔎</div>
            <p>{t.news_empty}</p>
          </div>
        )}
      </section>
    </div>
  );
}

/* =================== NEWS DETAIL =================== */
function NewsDetailPage() {
  const { t, lang, pickLocal } = useT();
  const [s] = useStore();
  const slug = s.route.params[0];
  const item = s.news.find(n => n.slug === slug);

  if (!item) {
    return (
      <div className="page">
        <section className="sect">
          <div className="empty-state">
            <div className="empty-emoji">🌱</div>
            <p>{lang === 'id' ? 'Berita tidak ditemukan.' : 'Story not found.'}</p>
            <button className="btn" onClick={() => navigate('news')}>{t.news_back}</button>
          </div>
        </section>
      </div>
    );
  }

  const related = s.news.filter(n => n.id !== item.id).slice(0, 3);
  const d = new Date(item.date);
  const dateStr = d.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <div className="page page-news-detail">
      <article className="sect pad-sm">
        <button className="news-back-btn" onClick={() => navigate('news')}>{t.news_back}</button>
        <div className="news-detail-meta">
          <span className={'chip ' + item.tone}>{pickLocal(item, 'category')}</span>
          <span className="news-date">{dateStr}</span>
          <span className="news-author">· {item.author}</span>
        </div>
        <h1 className="news-detail-title">{pickLocal(item, 'title')}</h1>
        <p className="news-detail-excerpt">{pickLocal(item, 'excerpt')}</p>

        {item.cover_path
          ? <img src={item.cover_path} alt={pickLocal(item, 'title')} style={{ width: '100%', height: 420, objectFit: 'cover', borderRadius: 'var(--r-lg)', border: '2px solid var(--ink)', display: 'block' }}/>
          : <Placeholder tone={item.tone} caption={item.slug + '.jpg'} h={420}/>}

        <div className="news-detail-body">
          {pickLocal(item, 'body').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="news-share">
          <span>{t.news_share}:</span>
          <button className="btn sm" onClick={() => { navigator.clipboard?.writeText(location.href); showToast(lang === 'id' ? 'Tautan disalin' : 'Link copied'); }}>🔗 {lang === 'id' ? 'Salin tautan' : 'Copy link'}</button>
          <button className="btn sm">WA</button>
          <button className="btn sm">FB</button>
        </div>
      </article>

      <section className="sect bg-cream2">
        <h3 className="related-h">{t.news_related}</h3>
        <div className="news-grid">
          {related.map(n => <NewsCard key={n.id} item={n}/>)}
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { GalleryPage, NewsPage, NewsDetailPage });
