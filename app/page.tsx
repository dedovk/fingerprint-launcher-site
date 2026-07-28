"use client";

import { useEffect, useState } from "react";

type Language = "en" | "uk";

const content = {
  en: {
    nav: [
      ["Features", "#features"],
      ["Actions", "#actions"],
      ["How it works", "#how-it-works"],
      ["Privacy", "#privacy"],
      ["FAQ", "#faq"],
    ],
    menu: "Menu",
    close: "Close",
    heroBadge: "Native Windows automation",
    heroTitle: ["Your fingerprint.", "Your next action."],
    heroLead:
      "Turn the fingerprint reader already built into your laptop into a personal command center. One scan can open apps, run shortcuts, control Windows, and launch complete routines.",
    download: "Download for Windows",
    github: "Explore on GitHub",
    downloadNote: "Version 1.0.0 · Windows 10/11 · Windows Hello required",
    realUi: "REAL APPLICATION · BLUE THEME",
    proof: [
      ["icon_scan.svg", "Private by design", "Local-first", "Settings and profiles stay on your PC."],
      ["check_version.svg", "Native security", "Windows Hello", "Windows handles biometric matching."],
      ["mono_button.svg", "Flexible workflows", "16 actions", "From apps and hotkeys to system controls."],
      ["full_screen.svg", "Make it yours", "6 themes", "Light, dark, onyx, graphite, blue and purple."],
    ],
    featureLabel: "BUILT AROUND YOUR ROUTINE",
    featureTitle: "One touch can do much more.",
    featureLead:
      "Create a small shortcut or a complete sequence. Every step remains visible, editable, and under your control.",
    chainTitle: "Build visual action sequences",
    chainText:
      "Arrange commands in the exact order you need. Disable one step without deleting it, or reuse the same finger in multiple profiles.",
    trigger: "TRIGGER",
    scanned: "Fingerprint scanned",
    step: "STEP",
    ready: "Ready",
    actionFlow: [
      ["01", "Open application", "Visual Studio Code"],
      ["02", "Press hotkey", "Ctrl + Shift + P"],
      ["03", "Start timer", "Focus session · 25 min"],
    ],
    windowsTitle: "Control Windows",
    windowsText:
      "Lock the screen, manage sound, minimize windows, sleep, restart, or shut down the PC.",
    trayTitle: "Always close at hand",
    trayText:
      "Run quietly from the system tray, pause scanning, manage timers, and start with Windows.",
    actionsLabel: "ACTION LIBRARY",
    actionsTitle: "Useful commands, ready to combine.",
    actionsLead:
      "Start with everyday actions and combine them into routines that feel natural.",
    actions: [
      "Open an app or file", "Open a website", "Press a hotkey", "Run PowerShell",
      "Copy to clipboard", "Add a delay", "Start a quick timer", "Lock Windows",
      "Minimize all windows", "Close active window", "Control volume", "Sleep or restart",
    ],
    howLabel: "HOW IT WORKS",
    howTitle: "From setup to action in three steps.",
    steps: [
      ["01", "Enroll your finger", "Use Windows Hello to add a fingerprint if it is not already enrolled."],
      ["02", "Create a profile", "Scan the finger, name the profile, and arrange the actions you want."],
      ["03", "Scan and launch", "Press the activation hotkey, touch the reader, and your routine runs."],
    ],
    privacyLabel: "PRIVACY BY DESIGN",
    privacyTitle: "Your fingerprint never enters FingerprintLauncher.",
    privacyText:
      "Fingerprint matching happens inside Windows Hello and the Windows Biometric Framework. The app never stores fingerprint images, templates, your PIN, or Microsoft account credentials.",
    privacyButton: "Read privacy policy",
    faqLabel: "COMMON QUESTIONS",
    faqTitle: "Everything important, without the fine print.",
    faq: [
      ["Does the app store my fingerprints?", "No. Windows performs biometric matching. FingerprintLauncher stores only the local profile and action settings needed to run your routines."],
      ["Do I need a fingerprint reader?", "Yes. You need Windows 10 or 11, a Windows Hello-compatible fingerprint reader, and at least one enrolled finger."],
      ["Will it work in the background?", "Yes. The app can remain in the system tray and listen for the global activation hotkey while you work in other programs."],
      ["Why can Windows show a SmartScreen warning?", "The current installer is not digitally code-signed yet. Download builds only from the official GitHub Releases page."],
    ],
    ctaTitle: "Make every touch useful.",
    ctaText: "Turn Windows Hello into your personal automation key.",
    ctaButton: "Get FingerprintLauncher",
    report: "Report an issue",
    privacy: "Privacy",
  },
  uk: {
    nav: [
      ["Можливості", "#features"],
      ["Дії", "#actions"],
      ["Як це працює", "#how-it-works"],
      ["Приватність", "#privacy"],
      ["FAQ", "#faq"],
    ],
    menu: "Меню",
    close: "Закрити",
    heroBadge: "Нативна автоматизація Windows",
    heroTitle: ["Ваш відбиток.", "Ваша наступна дія."],
    heroLead:
      "Перетворіть сканер відбитків у вашому ноутбуці на персональний центр команд. Одне сканування може відкрити програми, виконати комбінації клавіш, керувати Windows і запустити цілий сценарій.",
    download: "Завантажити для Windows",
    github: "Переглянути на GitHub",
    downloadNote: "Версія 1.0.0 · Windows 10/11 · потрібен Windows Hello",
    realUi: "РЕАЛЬНИЙ ЗАСТОСУНОК · СИНЯ ТЕМА",
    proof: [
      ["icon_scan.svg", "Приватність за задумом", "Локальна робота", "Налаштування та профілі залишаються на вашому ПК."],
      ["check_version.svg", "Нативний захист", "Windows Hello", "Біометричне зіставлення виконує Windows."],
      ["mono_button.svg", "Гнучкі сценарії", "16 дій", "Від програм і hotkeys до керування системою."],
      ["full_screen.svg", "Власний стиль", "6 тем", "Світла, темна, onyx, graphite, синя та фіолетова."],
    ],
    featureLabel: "СТВОРЕНО НАВКОЛО ВАШИХ СЦЕНАРІЇВ",
    featureTitle: "Один дотик може значно більше.",
    featureLead:
      "Створіть просту команду або повну послідовність. Кожен крок залишається видимим, редагованим і під вашим контролем.",
    chainTitle: "Створюйте наочні послідовності",
    chainText:
      "Розміщуйте команди саме в потрібному порядку. Вимикайте окремі кроки без видалення або використовуйте той самий палець у кількох профілях.",
    trigger: "ТРИГЕР",
    scanned: "Відбиток розпізнано",
    step: "КРОК",
    ready: "Готово",
    actionFlow: [
      ["01", "Відкрити програму", "Visual Studio Code"],
      ["02", "Натиснути hotkey", "Ctrl + Shift + P"],
      ["03", "Запустити таймер", "Фокус · 25 хв"],
    ],
    windowsTitle: "Керуйте Windows",
    windowsText:
      "Блокуйте екран, керуйте звуком, згортайте вікна, переводьте ПК у сон або перезавантажуйте його.",
    trayTitle: "Завжди під рукою",
    trayText:
      "Працюйте непомітно із системного трея, призупиняйте сканування, керуйте таймерами й автозапуском.",
    actionsLabel: "БІБЛІОТЕКА ДІЙ",
    actionsTitle: "Корисні команди, готові до поєднання.",
    actionsLead:
      "Почніть із повсякденних дій і складайте з них сценарії, які відчуваються природно.",
    actions: [
      "Відкрити програму або файл", "Відкрити сайт", "Натиснути hotkey", "Виконати PowerShell",
      "Скопіювати текст", "Додати затримку", "Запустити таймер", "Заблокувати Windows",
      "Згорнути всі вікна", "Закрити активне вікно", "Керувати гучністю", "Сон або перезапуск",
    ],
    howLabel: "ЯК ЦЕ ПРАЦЮЄ",
    howTitle: "Від налаштування до дії за три кроки.",
    steps: [
      ["01", "Додайте палець", "Зареєструйте відбиток у Windows Hello, якщо ще не зробили цього."],
      ["02", "Створіть профіль", "Відскануйте палець, назвіть профіль і розташуйте потрібні дії."],
      ["03", "Скануйте та запускайте", "Натисніть гарячу клавішу, торкніться сканера — і сценарій виконається."],
    ],
    privacyLabel: "ПРИВАТНІСТЬ ЗА ЗАДУМОМ",
    privacyTitle: "Ваш відбиток ніколи не потрапляє у FingerprintLauncher.",
    privacyText:
      "Зіставлення відбитка відбувається всередині Windows Hello та Windows Biometric Framework. Застосунок не зберігає зображення чи шаблони відбитків, PIN-код або дані Microsoft-акаунта.",
    privacyButton: "Політика приватності",
    faqLabel: "ПОШИРЕНІ ЗАПИТАННЯ",
    faqTitle: "Усе важливе — без дрібного шрифту.",
    faq: [
      ["Чи зберігає застосунок мої відбитки?", "Ні. Біометричне зіставлення виконує Windows. FingerprintLauncher зберігає лише локальні профілі та налаштування дій."],
      ["Чи потрібен сканер відбитків?", "Так. Потрібні Windows 10 або 11, сумісний із Windows Hello сканер і принаймні один зареєстрований палець."],
      ["Чи працює застосунок у фоні?", "Так. Він може залишатися в системному треї та реагувати на глобальну гарячу клавішу, поки ви працюєте в інших програмах."],
      ["Чому Windows може показати SmartScreen?", "Поточний інсталятор ще не має цифрового підпису. Завантажуйте збірки лише з офіційної сторінки GitHub Releases."],
    ],
    ctaTitle: "Зробіть кожен дотик корисним.",
    ctaText: "Перетворіть Windows Hello на персональний ключ автоматизації.",
    ctaButton: "Завантажити FingerprintLauncher",
    report: "Повідомити про проблему",
    privacy: "Приватність",
  },
} as const;

function AppIcon({ name, alt = "" }: { name: string; alt?: string }) {
  return <img src={`/icons/${name}`} alt={alt} aria-hidden={alt ? undefined : true} />;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#" aria-label="FingerprintLauncher home">
          <img src="/logo.png" alt="" width="38" height="38" />
          <span>FingerprintLauncher</span>
        </a>

        <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
          {t.nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
        </nav>

        <div className="header-tools">
          <div className="language-switch" aria-label="Language">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <button className={language === "uk" ? "active" : ""} onClick={() => setLanguage("uk")} aria-pressed={language === "uk"}>UA</button>
          </div>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.close : t.menu}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="status-dot" />{t.heroBadge}</div>
          <h1>{t.heroTitle[0]}<span>{t.heroTitle[1]}</span></h1>
          <p className="hero-lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/dedovk/fingerprint-launcher/releases/latest">
              {t.download}<span className="button-arrow">↓</span>
            </a>
            <a className="button button-secondary" href="https://github.com/dedovk/fingerprint-launcher">
              {t.github}<span className="button-arrow">↗</span>
            </a>
          </div>
          <p className="download-note">{t.downloadNote}</p>
        </div>

        <div className="product-stage">
          <div className="screen-glow" />
          <div className="real-screen">
            <div className="screen-caption">
              <span><i />{t.realUi}</span>
              <span className="screen-dots"><b /><b /><b /></span>
            </div>
            <img
              src="/fingerprint-launcher-blue.png"
              alt="FingerprintLauncher blue theme showing configured finger actions"
            />
          </div>
        </div>
      </section>

      <section className="proof-section" aria-label="Product highlights">
        <div className="proof-grid">
          {t.proof.map(([icon, eyebrow, title, text]) => (
            <article className="proof-card" key={title}>
              <div className="proof-icon"><AppIcon name={icon} /></div>
              <span>{eyebrow}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-heading">
          <span className="section-label">{t.featureLabel}</span>
          <h2>{t.featureTitle}</h2>
          <p>{t.featureLead}</p>
        </div>

        <div className="feature-grid">
          <article className="feature-card feature-sequence">
            <div className="feature-copy">
              <div className="feature-icon"><AppIcon name="icon_scan.svg" /></div>
              <h3>{t.chainTitle}</h3>
              <p>{t.chainText}</p>
            </div>
            <div className="automation-board">
              <div className="trigger-row">
                <div className="node-icon"><AppIcon name="icon_scan.svg" /></div>
                <div><span>{t.trigger}</span><strong>{t.scanned}</strong></div>
                <i className="live-indicator" />
              </div>
              <div className="timeline">
                {t.actionFlow.map(([number, title, meta]) => (
                  <div className="timeline-row" key={number}>
                    <span className="timeline-number">{number}</span>
                    <div><strong>{title}</strong><small>{meta}</small></div>
                    <span className="ready-pill"><AppIcon name="active_action.svg" />{t.ready}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="feature-card feature-compact">
            <div className="feature-icon"><AppIcon name="full_screen.svg" /></div>
            <div><h3>{t.windowsTitle}</h3><p>{t.windowsText}</p></div>
          </article>
          <article className="feature-card feature-compact">
            <div className="feature-icon"><AppIcon name="check_version.svg" /></div>
            <div><h3>{t.trayTitle}</h3><p>{t.trayText}</p></div>
          </article>
        </div>
      </section>

      <section className="actions-section" id="actions">
        <div className="section actions-layout">
          <div className="section-heading sticky-heading">
            <span className="section-label">{t.actionsLabel}</span>
            <h2>{t.actionsTitle}</h2>
            <p>{t.actionsLead}</p>
          </div>
          <div className="action-list">
            {t.actions.map((action, index) => (
              <div className="action-item" key={action}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{action}</strong>
                <AppIcon name={index % 3 === 0 ? "mono_button.svg" : index % 3 === 1 ? "full_screen.svg" : "check_version.svg"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section steps-section" id="how-it-works">
        <div className="section-heading">
          <span className="section-label">{t.howLabel}</span>
          <h2>{t.howTitle}</h2>
        </div>
        <div className="steps">
          {t.steps.map(([number, title, text]) => (
            <article key={number} data-step={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="privacy-section" id="privacy">
        <div className="privacy-visual">
          <div className="privacy-ring ring-one" /><div className="privacy-ring ring-two" />
          <AppIcon name="icon_scan.svg" />
        </div>
        <div>
          <span className="section-label">{t.privacyLabel}</span>
          <h2>{t.privacyTitle}</h2>
          <p>{t.privacyText}</p>
        </div>
        <a className="button button-dark" href="https://github.com/dedovk/fingerprint-launcher/blob/main/PRIVACY.md">
          {t.privacyButton}<span className="button-arrow">↗</span>
        </a>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading">
          <span className="section-label">{t.faqLabel}</span>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {t.faq.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{question}</span><i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="cta">
        <img src="/logo.png" alt="" width="64" height="64" />
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <a className="button button-primary" href="https://github.com/dedovk/fingerprint-launcher/releases/latest">
          {t.ctaButton}<span className="button-arrow">↓</span>
        </a>
      </section>

      <footer>
        <a className="brand" href="#"><img src="/logo.png" alt="" width="30" height="30" /><span>FingerprintLauncher</span></a>
        <p>Created by Kyrylo Diedov.</p>
        <div>
          <a href="https://github.com/dedovk/fingerprint-launcher">GitHub</a>
          <a href="https://github.com/dedovk/fingerprint-launcher/issues">{t.report}</a>
          <a href="https://github.com/dedovk/fingerprint-launcher/blob/main/PRIVACY.md">{t.privacy}</a>
        </div>
      </footer>
    </main>
  );
}
