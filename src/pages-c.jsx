/* ================================================================
   PAUD Cemara — PPDB + Contact pages
   ================================================================ */

/* =================== PPDB =================== */
function PPDBPage() {
  const { t, lang, pickLocal } = useT();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    childName: '', childDob: '', level: 'kb',
    parentName: '', parentPhone: '', parentEmail: '',
    address: '', notes: '', source: '', website: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  const steps = [
    { n: 1, title: t.ppdb_step1 },
    { n: 2, title: t.ppdb_step2 },
    { n: 3, title: t.ppdb_step3 },
    { n: 4, title: t.ppdb_step4 },
  ];

  function validate() {
    const e = {};
    if (step === 1) {
      if (!form.childName.trim()) e.childName = lang === 'id' ? 'Wajib diisi' : 'Required';
      if (!form.childDob) e.childDob = lang === 'id' ? 'Wajib diisi' : 'Required';
    }
    if (step === 2) {
      if (!form.parentName.trim()) e.parentName = lang === 'id' ? 'Wajib diisi' : 'Required';
      if (!/^[\d\s+\-()]{8,}$/.test(form.parentPhone)) e.parentPhone = lang === 'id' ? 'Nomor tidak valid' : 'Invalid phone';
      if (!/^\S+@\S+\.\S+$/.test(form.parentEmail)) e.parentEmail = lang === 'id' ? 'Email tidak valid' : 'Invalid email';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const [applicationNo, setApplicationNo] = useState(null);

  async function handleNext() {
    if (!validate()) return;
    if (step < 3) {
      setStep(s => Math.min(s + 1, 4));
      return;
    }

    setSubmitting(true);
    setSubmitErr('');

    try {
      const res = await fetch('api/ppdb.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.fields) setErrors(data.fields);
        const msg = data?.error || (lang === 'id' ? 'Formulir belum berhasil dikirim.' : 'The application could not be submitted yet.');
        setSubmitErr(msg);
        showToast(msg);
        return;
      }

      setErrors({});
      setApplicationNo(data.application_no || null);
      setSubmitted(true);
      setStep(4);
      showToast(lang === 'id' ? 'Formulir terkirim!' : 'Application sent!');
    } catch (err) {
      const msg = lang === 'id' ? 'Koneksi ke server gagal. Coba lagi sebentar.' : 'The server could not be reached. Please try again.';
      setSubmitErr(msg);
      showToast(msg);
      console.warn('[ppdb] network error', err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page page-ppdb">
      <section className="sect pad-xl">
        <SectionHead
          kicker={lang === 'id' ? 'Pendaftaran · Gelombang 1' : 'Admissions · Wave 1'}
          title={t.ppdb_title}
          sub={t.ppdb_sub}
        />

        {/* Stepper */}
        <div className="ppdb-stepper">
          {steps.map((st, i) => (
            <React.Fragment key={st.n}>
              <div className={'ppdb-step ' + (step >= st.n ? 'done' : '') + (step === st.n ? ' current' : '')}>
                <div className="ppdb-step-num">{step > st.n ? 'OK' : String(st.n).padStart(2, '0')}</div>
                <div className="ppdb-step-label">
                  <div className="ppdb-step-n">Step {st.n}</div>
                  <div className="ppdb-step-t">{st.title}</div>
                </div>
              </div>
              {i < steps.length - 1 && <div className={'ppdb-step-line ' + (step > st.n ? 'done' : '')}/>}
            </React.Fragment>
          ))}
        </div>

        <div className="ppdb-body">
          {/* Main form card */}
          <div className="card ppdb-form-card">
            <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
              <label>
                Website
                <input
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                />
              </label>
            </div>

            {step === 1 && !submitted && (
              <>
                <h3>{t.ppdb_form_title}</h3>
                <p className="ppdb-form-sub">{t.ppdb_form_sub}</p>

                <div className="form-grid">
                  <FormField label={lang === 'id' ? 'Nama anak' : 'Child name'} error={errors.childName}>
                    <input value={form.childName} onChange={e => setForm(f => ({ ...f, childName: e.target.value }))}/>
                  </FormField>
                  <FormField label={lang === 'id' ? 'Tanggal lahir' : 'Date of birth'} error={errors.childDob}>
                    <input type="date" value={form.childDob} onChange={e => setForm(f => ({ ...f, childDob: e.target.value }))}/>
                  </FormField>
                  <FormField label={lang === 'id' ? 'Jenjang dilamar' : 'Level applied'} span={2}>
                    <div className="seg">
                      {window.SEED.programs.map(p => (
                        <button key={p.id}
                                className={form.level === p.id ? 'on' : ''}
                                onClick={() => setForm(f => ({ ...f, level: p.id }))}>
                          {pickLocal(p, 'title')}
                        </button>
                      ))}
                    </div>
                  </FormField>
                  <FormField label={lang === 'id' ? 'Catatan tentang anak (alergi, kondisi khusus, minat)' : 'Notes about the child'} span={2}>
                    <textarea rows="3" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}/>
                  </FormField>
                </div>
              </>
            )}

            {step === 2 && !submitted && (
              <>
                <h3>{lang === 'id' ? 'Data orang tua / wali' : 'Parent / guardian info'}</h3>
                <p className="ppdb-form-sub">{lang === 'id' ? 'Kami hubungi melalui WhatsApp dan email.' : 'We contact via WhatsApp and email.'}</p>
                <div className="form-grid">
                  <FormField label={lang === 'id' ? 'Nama orang tua' : 'Parent name'} error={errors.parentName} span={2}>
                    <input value={form.parentName} onChange={e => setForm(f => ({ ...f, parentName: e.target.value }))}/>
                  </FormField>
                  <FormField label={lang === 'id' ? 'No. telepon' : 'Phone'} error={errors.parentPhone}>
                    <input value={form.parentPhone} onChange={e => setForm(f => ({ ...f, parentPhone: e.target.value }))} placeholder="08xx..."/>
                  </FormField>
                  <FormField label="Email" error={errors.parentEmail}>
                    <input type="email" value={form.parentEmail} onChange={e => setForm(f => ({ ...f, parentEmail: e.target.value }))}/>
                  </FormField>
                  <FormField label={lang === 'id' ? 'Alamat tempat tinggal' : 'Home address'} span={2}>
                    <input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))}/>
                  </FormField>
                  <FormField label={lang === 'id' ? 'Dari mana tahu Cemara?' : 'How did you hear about us?'} span={2}>
                    <div className="seg wrap">
                      {(lang === 'id'
                        ? ['Instagram', 'Teman / keluarga', 'Pencarian Google', 'Acara komunitas', 'Lainnya']
                        : ['Instagram', 'Friend / family', 'Google search', 'Community event', 'Other']
                      ).map(s => (
                        <button key={s}
                                className={form.source === s ? 'on' : ''}
                                onClick={() => setForm(f => ({ ...f, source: s }))}>{s}</button>
                      ))}
                    </div>
                  </FormField>
                </div>
              </>
            )}

            {step === 3 && !submitted && (
              <>
                <h3>{lang === 'id' ? 'Tinjau & kirim' : 'Review & submit'}</h3>
                <p className="ppdb-form-sub">{lang === 'id' ? 'Pastikan data di bawah sudah benar.' : 'Make sure the info below is correct.'}</p>
                <div className="ppdb-review">
                  <ReviewRow label={lang === 'id' ? 'Nama anak' : 'Child name'} value={form.childName}/>
                  <ReviewRow label={lang === 'id' ? 'Tanggal lahir' : 'DOB'} value={form.childDob}/>
                  <ReviewRow label={lang === 'id' ? 'Jenjang' : 'Level'} value={pickLocal(window.SEED.programs.find(p => p.id === form.level), 'title')}/>
                  <ReviewRow label={lang === 'id' ? 'Orang tua' : 'Parent'} value={form.parentName}/>
                  <ReviewRow label={lang === 'id' ? 'Telepon' : 'Phone'} value={form.parentPhone}/>
                  <ReviewRow label="Email" value={form.parentEmail}/>
                  {form.notes && <ReviewRow label={lang === 'id' ? 'Catatan' : 'Notes'} value={form.notes}/>}
                </div>
                {submitErr && <div className="ff-err" style={{ marginTop: 14 }}>{submitErr}</div>}
              </>
            )}

            {(step === 4 || submitted) && (
              <div className="ppdb-done">
                <h3>{lang === 'id' ? 'Terima kasih!' : 'Thank you!'}</h3>
                <p>{lang === 'id'
                  ? `Formulir pendaftaran untuk ${form.childName || 'anak Anda'} telah diterima. Kami akan menghubungi nomor ${form.parentPhone || 'yang Anda berikan'} dalam 1×24 jam kerja untuk menjadwalkan kunjungan.`
                  : `Your application for ${form.childName || 'your child'} has been received. We'll reach out to ${form.parentPhone || 'your phone'} within 1 business day to schedule a visit.`}</p>
                <div className="ppdb-done-actions">
                  <div className="ppdb-done-code">
                    {lang === 'id' ? 'Nomor pendaftaran' : 'Application ID'}: <strong>#{applicationNo || ('CMR-' + Math.floor(100000 + Math.random() * 899999))}</strong>
                  </div>
                  <button className="btn primary" onClick={() => navigate('home')}>
                    {lang === 'id' ? 'Kembali ke beranda' : 'Back to home'}
                  </button>
                </div>
              </div>
            )}

            {!submitted && step < 4 && (
              <div className="ppdb-form-actions">
                {step > 1 && <button className="btn" onClick={() => setStep(s => s - 1)} disabled={submitting}>← {lang === 'id' ? 'Kembali' : 'Back'}</button>}
                <div style={{ flex: 1 }}/>
                <button className="btn primary" onClick={handleNext} disabled={submitting}>
                  {step === 3
                    ? (submitting ? (lang === 'id' ? 'Mengirim…' : 'Submitting…') : (lang === 'id' ? 'Kirim formulir' : 'Submit application'))
                    : (lang === 'id' ? 'Lanjut' : 'Continue')} →
                </button>
              </div>
            )}
          </div>

          {/* Fees sidebar */}
          <aside className="ppdb-side">
            <div className="card ppdb-fees">
              <h4>{t.ppdb_fee_title}</h4>
              <table>
                <tbody>
                  {window.SEED.fees.map((f, i) => (
                    <tr key={i}>
                      <td className="ppdb-fee-label">
                        <span className="ppdb-fee-name">{pickLocal(f, 'label')}</span>
                        <span className="fee-chip">{f.once ? (lang === 'id' ? 'sekali' : 'once') : (lang === 'id' ? '/ bulan' : '/ month')}</span>
                      </td>
                      <td className="fee-amt">Rp {f.amount.toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="ppdb-fee-note">
                {lang === 'id' ? '* Gelombang 1: diskon 30% formulir.' : '* Wave 1: 30% off form fee.'}
              </div>
            </div>

            <div className="card ppdb-contact">
              <h4>{lang === 'id' ? 'Butuh bantuan?' : 'Need help?'}</h4>
              <p>{lang === 'id' ? 'Hubungi tim PPDB kami.' : 'Talk to our admissions team.'}</p>
              <a className="btn green sm" href="#" onClick={e => { e.preventDefault(); navigate('contact'); }}>
                {lang === 'id' ? 'Chat WhatsApp' : 'Chat on WhatsApp'}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

function FormField({ label, error, span = 1, children }) {
  return (
    <label className="ff" style={{ gridColumn: `span ${span}` }}>
      <span className="ff-l">{label}</span>
      {children}
      {error && <span className="ff-err">{error}</span>}
    </label>
  );
}
function ReviewRow({ label, value }) {
  return (
    <div className="rr">
      <span className="rr-l">{label}</span>
      <span className="rr-v">{value || '—'}</span>
    </div>
  );
}

/* =================== CONTACT =================== */
function ContactPage() {
  const { t, lang } = useT();
  const [s] = useStore();
  const { settings } = s;
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitErr, setSubmitErr] = useState('');

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = lang === 'id' ? 'Wajib diisi' : 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = lang === 'id' ? 'Email tidak valid' : 'Invalid email';
    if (!form.message.trim() || form.message.length < 10) errs.message = lang === 'id' ? 'Minimal 10 karakter' : 'At least 10 chars';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSending(true);
    setSubmitErr('');

    try {
      const res = await fetch('api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({
          name: form.name, email: form.email,
          subject: form.subject, message: form.message, website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data?.fields) setErrors(data.fields);
        const msg = data?.error || (lang === 'id' ? 'Pesan belum berhasil dikirim.' : 'The message could not be sent yet.');
        setSubmitErr(msg);
        showToast(msg);
        console.warn('[contact] server rejected:', data);
        return;
      }
      setErrors({});
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '', website: '' });
      showToast(t.contact_sent);
    } catch (err) {
      const msg = lang === 'id' ? 'Koneksi ke server gagal. Coba lagi sebentar.' : 'The server could not be reached. Please try again.';
      setSubmitErr(msg);
      showToast(msg);
      console.warn('[contact] network error', err);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page page-contact">
      <section className="sect pad-xl">
        <SectionHead
          kicker={lang === 'id' ? 'Mampir' : 'Say hi'}
          title={t.contact_title}
          sub={t.contact_sub}
        />

        <div className="contact-grid">
          {/* Left: contact info */}
          <div className="contact-info">
            <div className="contact-info-card">
              <div className="contact-label"><span className="contact-mark"/> {lang === 'id' ? 'Alamat' : 'Address'}</div>
              <div className="contact-val">{settings.address}</div>
            </div>
            <div className="contact-info-card">
              <div className="contact-label"><span className="contact-mark"/> {lang === 'id' ? 'Telepon' : 'Phone'}</div>
              <div className="contact-val">{settings.phone}</div>
            </div>
            <div className="contact-info-card">
              <div className="contact-label"><span className="contact-mark"/> Email</div>
              <div className="contact-val">{settings.email}</div>
            </div>
            <div className="contact-info-card">
              <div className="contact-label"><span className="contact-mark"/> {t.footer_hours}</div>
              <div className="contact-val">{t.footer_hours_1}<br/>{t.footer_hours_2}</div>
            </div>
            <a
              className="btn green wa-btn"
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener"
            >
              {t.contact_wa}
            </a>
          </div>

          {/* Middle: form */}
          <form className="card contact-form" onSubmit={submit}>
            <h3>{t.contact_form_title}</h3>
            <div style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }} aria-hidden="true">
              <label>
                Website
                <input
                  tabIndex="-1"
                  autoComplete="off"
                  value={form.website}
                  onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                />
              </label>
            </div>
            <div className="form-grid">
              <FormField label={t.contact_name} error={errors.name} span={2}>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}/>
              </FormField>
              <FormField label={t.contact_email} error={errors.email}>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}/>
              </FormField>
              <FormField label={t.contact_subject}>
                <input value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}/>
              </FormField>
              <FormField label={t.contact_message} error={errors.message} span={2}>
                <textarea rows="5" maxLength="2000" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}/>
              </FormField>
            </div>
            {submitErr && <div className="ff-err" style={{ marginTop: 12 }}>{submitErr}</div>}
            <div className="contact-form-actions">
              <span className="contact-char">{form.message.length} / 2000</span>
              <button type="submit" className="btn primary" disabled={sent || sending}>
                {sending ? (lang === 'id' ? 'Mengirim…' : 'Sending…') : (sent ? (lang === 'id' ? 'Terkirim ✓' : 'Sent ✓') : t.contact_send)}
              </button>
            </div>
          </form>
        </div>

        {/* Map — Leaflet (JavaScript Maps API, tile dari OpenStreetMap) */}
        <LeafletMap
          lat={-7.9186}
          lng={112.5841}
          label={settings.schoolName || 'PAUD Cemara'}
          address={settings.address}
        />
        <div className="map-action-row">
          <a className="btn sm" target="_blank" rel="noopener"
             href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address || 'Universitas Ma Chung Malang')}`}>
            {lang === 'id' ? 'Buka di Google Maps' : 'Open in Google Maps'} ↗
          </a>
        </div>
      </section>
    </div>
  );
}

/* =================== Leaflet map component =================== */
function LeafletMap({ lat, lng, label, address }) {
  const ref = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (!window.L || !ref.current) return;
    if (mapInstance.current) return;

    const map = window.L.map(ref.current, { scrollWheelZoom: false }).setView([lat, lng], 16);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    window.L.marker([lat, lng]).addTo(map)
      .bindPopup(`<strong>${label}</strong><br>${address || ''}`)
      .openPopup();

    mapInstance.current = map;
    return () => { map.remove(); mapInstance.current = null; };
  }, [lat, lng, label, address]);

  return (
    <div className="map-wrap">
      <div ref={ref} className="leaflet-map" aria-label="Peta lokasi sekolah"/>
      <div className="map-caption">
        <strong>{label}</strong>
        <span>{address}</span>
      </div>
    </div>
  );
}

Object.assign(window, { PPDBPage, ContactPage });
