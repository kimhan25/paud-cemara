/* Main app mount + router */

// Fetch data dari backend sekali di awal. Kalau API down,
// fallback ke data hardcoded yang sudah di-load dari seed.js.
function useBootstrap() {
  useEffect(() => {
    let alive = true;
    fetch('api/bootstrap.php', { credentials: 'same-origin' })
      .then(r => r.ok ? r.json() : Promise.reject(r.status))
      .then(data => {
        if (!alive || !data) return;
        // Merge ke window.SEED supaya komponen yang langsung baca SEED
        // (misal PPDB, fees) dapat data fresh.
        Object.assign(window.SEED, data);
        // Sync ke store reaktif
        store.set(s => ({
          ...s,
          news:     data.news     ?? s.news,
          gallery:  data.gallery  ?? s.gallery,
          settings: data.settings ?? s.settings,
        }));
      })
      .catch(err => console.warn('[bootstrap] fallback ke seed lokal —', err));
    return () => { alive = false; };
  }, []);
}

function App() {
  useBootstrap();
  const [s] = useStore();
  const { route } = s;

  // Admin has its own chromeless layout
  if (route.name === 'admin') {
    return (
      <>
        <AdminPage/>
        <Toast/>
      </>
    );
  }

  return (
    <div className="app">
      <NavBar/>
      <main style={{ flex: 1 }}>
        {route.name === 'home' && <HomePage/>}
        {route.name === 'profile' && <ProfilePage/>}
        {route.name === 'program' && <ProgramPage/>}
        {route.name === 'gallery' && <GalleryPage/>}
        {route.name === 'news' && <NewsPage/>}
        {route.name === 'news-detail' && <NewsDetailPage/>}
        {route.name === 'ppdb' && <PPDBPage/>}
        {route.name === 'contact' && <ContactPage/>}
      </main>
      <Footer/>
      <Toast/>

      {/* floating WA button */}
      <a className="wa-float" href={`https://wa.me/${s.settings.whatsapp}`} target="_blank" rel="noopener" aria-label="WhatsApp">
        <span>💬</span>
      </a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
