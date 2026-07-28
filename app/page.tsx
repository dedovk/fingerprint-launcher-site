export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="FingerprintLauncher home">
          <img src="/logo.png" alt="" width="36" height="36" />
          <span>FingerprintLauncher</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#privacy">Privacy</a>
        </nav>
        <a className="button button-compact button-ghost" href="https://github.com/dedovk/fingerprint-launcher">GitHub</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" />Built for Windows 10 &amp; 11</div>
          <h1>Your fingerprint.<span> Your shortcut.</span></h1>
          <p className="hero-lead">
            Turn Windows Hello fingerprint scans into custom action sequences.
            Open apps, launch websites, run shortcuts, and control Windows with a touch.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/dedovk/fingerprint-launcher/releases/latest">
              Download for Windows <span aria-hidden="true">↓</span>
            </a>
            <a className="button button-secondary" href="https://github.com/dedovk/fingerprint-launcher">View on GitHub</a>
          </div>
          <p className="download-note">Version 1.0.0 · Windows Hello fingerprint reader required</p>
        </div>

        <div className="product-stage" aria-label="FingerprintLauncher app preview">
          <div className="orb orb-one" /><div className="orb orb-two" />
          <div className="app-window">
            <div className="window-bar">
              <div className="window-brand"><img src="/logo.png" alt="" width="24" height="24" /><strong>FingerprintLauncher</strong></div>
              <div className="window-controls" aria-hidden="true"><span>—</span><span>□</span><span>×</span></div>
            </div>
            <div className="app-body">
              <aside>
                <div className="side-item active"><span>◎</span> My fingers</div>
                <div className="side-item"><span>◌</span> Status</div>
                <div className="side-item"><span>⚙</span> Settings</div>
              </aside>
              <div className="app-content">
                <div className="content-heading">
                  <div><small>MY FINGERS</small><h2>Action profiles</h2></div>
                  <button type="button" tabIndex={-1}>＋ Add finger</button>
                </div>
                <div className="finger-card">
                  <div className="fingerprint-mark" aria-hidden="true"><i /><i /><i /><i /></div>
                  <div className="finger-info"><strong>Right index finger</strong><span>Work setup · 4 actions</span></div>
                  <span className="enabled-pill">Enabled</span>
                </div>
                <div className="sequence"><span>Open VS Code</span><b>→</b><span>Open project</span><b>→</b><span>Start focus timer</span></div>
                <div className="scan-card">
                  <span className="scan-pulse">◎</span>
                  <div><strong>Ready to scan</strong><small>Press Ctrl + Alt + F</small></div>
                  <span className="online-dot" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Product highlights">
        <div><strong>Local-first</strong><span>Your settings stay on your PC</span></div>
        <div><strong>Windows Hello</strong><span>Biometrics handled by Windows</span></div>
        <div><strong>16 actions</strong><span>From apps to system controls</span></div>
        <div><strong>6 themes</strong><span>Make it feel like yours</span></div>
      </section>

      <section className="section" id="features">
        <div className="section-heading">
          <span className="section-label">WHAT YOU CAN DO</span>
          <h2>One touch. A whole sequence.</h2>
          <p>Build simple shortcuts or multi-step routines and assign them to the fingers already enrolled in Windows Hello.</p>
        </div>
        <div className="feature-grid">
          <article className="feature-card feature-wide">
            <div className="feature-icon violet">⌁</div>
            <div><h3>Chain actions together</h3><p>Run apps, websites, hotkeys, delays, timers, and PowerShell commands in a predictable order.</p></div>
            <div className="mini-sequence" aria-hidden="true"><span>App</span><b>→</b><span>Hotkey</span><b>→</b><span>Timer</span></div>
          </article>
          <article className="feature-card">
            <div className="feature-icon blue">⊞</div>
            <h3>Control Windows</h3>
            <p>Lock, sleep, restart, change volume, mute sound, or manage active windows.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon amber">◴</div>
            <h3>Always close at hand</h3>
            <p>Run from the system tray, set autostart, and use a global activation hotkey.</p>
          </article>
        </div>
      </section>

      <section className="section steps-section" id="how-it-works">
        <div className="section-heading"><span className="section-label">HOW IT WORKS</span><h2>Set up in three steps.</h2></div>
        <div className="steps">
          <article><span>01</span><h3>Enroll in Windows</h3><p>Add your fingerprint through Windows Hello if it is not enrolled yet.</p></article>
          <article><span>02</span><h3>Build a profile</h3><p>Scan a finger, give it a name, and choose an ordered set of actions.</p></article>
          <article><span>03</span><h3>Scan and launch</h3><p>Press the activation hotkey, scan that finger, and the sequence runs.</p></article>
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="privacy-mark" aria-hidden="true">⌁</div>
        <div>
          <span className="section-label">PRIVACY BY DESIGN</span>
          <h2>Your fingerprint never enters the app.</h2>
          <p>Fingerprint matching stays inside Windows Hello and the Windows Biometric Framework. FingerprintLauncher does not store fingerprint images, templates, your PIN, or Microsoft account credentials.</p>
        </div>
        <a className="button button-secondary" href="https://github.com/dedovk/fingerprint-launcher/blob/main/PRIVACY.md">Read privacy policy</a>
      </section>

      <section className="cta">
        <img src="/logo.png" alt="" width="64" height="64" />
        <h2>Make every touch useful.</h2>
        <p>Download FingerprintLauncher and turn Windows Hello into your personal automation key.</p>
        <a className="button button-primary" href="https://github.com/dedovk/fingerprint-launcher/releases/latest">Get FingerprintLauncher</a>
      </section>

      <footer>
        <a className="brand" href="#"><img src="/logo.png" alt="" width="30" height="30" /><span>FingerprintLauncher</span></a>
        <p>Created by Kyrylo Diedov with UI/UX by Alice.</p>
        <div>
          <a href="https://github.com/dedovk/fingerprint-launcher">GitHub</a>
          <a href="https://github.com/dedovk/fingerprint-launcher/issues">Report an issue</a>
          <a href="https://github.com/dedovk/fingerprint-launcher/blob/main/PRIVACY.md">Privacy</a>
        </div>
      </footer>
    </main>
  );
}
