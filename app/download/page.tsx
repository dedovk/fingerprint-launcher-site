"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SiteIcon } from "../icons";
import {
  FALLBACK_RELEASE,
  fetchLatestRelease,
  formatFileSize,
  type ReleaseInfo,
} from "../release";

type Language = "en" | "uk";

const copy = {
  en: {
    back: "Back to home",
    eyebrow: "LATEST WINDOWS RELEASE",
    title: "Download FingerprintLauncher.",
    lead: "Get the official installer from GitHub Releases and verify the file before installation.",
    download: "Download installer",
    github: "View release on GitHub",
    releases: "All releases",
    latest: "Latest stable release",
    version: "Version",
    published: "Published",
    size: "Download size",
    file: "Installer",
    checksum: "SHA-256 checksum",
    copy: "Copy",
    copied: "Copied",
    requirements: "System requirements",
    requirementItems: [
      "Windows 10 or Windows 11",
      "A Windows Hello-compatible fingerprint reader",
      "At least one fingerprint enrolled in Windows Hello",
    ],
    install: "Install in four steps",
    steps: [
      "Download the installer from this page.",
      "Open the downloaded .exe file.",
      "Complete the installer and launch FingerprintLauncher.",
      "Choose an activation hotkey, then add your first finger profile.",
    ],
    smartTitle: "Why Windows may show SmartScreen",
    smartText:
      "The current installer is not digitally code-signed yet, so Windows may display “Unknown publisher”. Only continue when the file came from the official FingerprintLauncher GitHub release and its checksum matches the value shown above.",
    safety: "Official build · Hosted by GitHub · Local-first application",
  },
  uk: {
    back: "Повернутися на головну",
    eyebrow: "ОСТАННІЙ РЕЛІЗ ДЛЯ WINDOWS",
    title: "Завантажте FingerprintLauncher.",
    lead: "Отримайте офіційний інсталятор із GitHub Releases і перевірте файл перед встановленням.",
    download: "Завантажити інсталятор",
    github: "Переглянути реліз на GitHub",
    releases: "Усі релізи",
    latest: "Останній стабільний реліз",
    version: "Версія",
    published: "Опубліковано",
    size: "Розмір",
    file: "Інсталятор",
    checksum: "Контрольна сума SHA-256",
    copy: "Копіювати",
    copied: "Скопійовано",
    requirements: "Системні вимоги",
    requirementItems: [
      "Windows 10 або Windows 11",
      "Сканер відбитків, сумісний із Windows Hello",
      "Принаймні один відбиток, зареєстрований у Windows Hello",
    ],
    install: "Встановлення у чотири кроки",
    steps: [
      "Завантажте інсталятор із цієї сторінки.",
      "Відкрийте завантажений файл .exe.",
      "Завершіть встановлення та запустіть FingerprintLauncher.",
      "Оберіть клавішу активації та створіть перший профіль пальця.",
    ],
    smartTitle: "Чому Windows може показати SmartScreen",
    smartText:
      "Поточний інсталятор поки не має цифрового підпису, тому Windows може показати «Невідомий видавець». Продовжуйте лише якщо файл завантажено з офіційного GitHub-релізу FingerprintLauncher, а його контрольна сума збігається зі значенням вище.",
    safety: "Офіційна збірка · Зберігається на GitHub · Локальна робота",
  },
} as const;

export default function DownloadPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [release, setRelease] = useState<ReleaseInfo>(FALLBACK_RELEASE);
  const [copied, setCopied] = useState(false);
  const t = copy[language];
  const locale = language === "uk" ? "uk-UA" : "en-US";

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("fl-language");
    if (savedLanguage === "uk" || savedLanguage === "en") {
      queueMicrotask(() => setLanguage(savedLanguage));
    }

    const controller = new AbortController();
    fetchLatestRelease(controller.signal).then(setRelease).catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("fl-language", language);
  }, [language]);

  const publishedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(release.publishedAt));

  async function copyChecksum() {
    await navigator.clipboard.writeText(release.sha256);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="download-page">
      <header className="download-header">
        <Link className="brand" href="/">
          <img src="/logo.png" alt="" width="38" height="38" />
          <span>FingerprintLauncher</span>
        </Link>
        <div className="download-header-actions">
          <Link className="back-link" href="/">← {t.back}</Link>
          <div className="language-switch" aria-label="Language">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <button className={language === "uk" ? "active" : ""} onClick={() => setLanguage("uk")} aria-pressed={language === "uk"}>UA</button>
          </div>
        </div>
      </header>

      <section className="download-hero">
        <div className="download-intro">
          <span className="section-label">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.lead}</p>
          <div className="release-status">
            <span className="status-dot" />
            {t.latest} · {release.tag}
          </div>
        </div>

        <article className="release-card">
          <div className="release-card-top">
            <div className="release-app-icon">
              <img src="/logo.png" alt="" width="50" height="50" />
            </div>
            <div>
              <span>FingerprintLauncher</span>
              <strong>{release.fileName}</strong>
            </div>
          </div>

          <dl className="release-facts">
            <div><dt>{t.version}</dt><dd>{release.version}</dd></div>
            <div><dt>{t.published}</dt><dd>{publishedDate}</dd></div>
            <div><dt>{t.size}</dt><dd>{formatFileSize(release.size, locale)}</dd></div>
            <div><dt>{t.file}</dt><dd>Windows .exe</dd></div>
          </dl>

          <a className="button button-primary release-download" href={release.downloadUrl}>
            {t.download}<SiteIcon name="download" size={19} />
          </a>
          <a className="release-github-link" href={release.releaseUrl}>
            {t.github}<SiteIcon name="external" size={16} />
          </a>
          <a className="release-history-link" href="/releases">{t.releases} →</a>
        </article>
      </section>

      <section className="download-content">
        <article className="checksum-card">
          <div>
            <span className="section-label">{t.checksum}</span>
            <code>{release.sha256 || "Not provided in the GitHub release notes"}</code>
          </div>
          <button type="button" onClick={copyChecksum}>
            {copied ? t.copied : t.copy}
          </button>
        </article>

        <div className="download-grid">
          <article className="download-info-card">
            <div className="download-info-icon"><SiteIcon name="windows" size={24} /></div>
            <h2>{t.requirements}</h2>
            <ul>
              {t.requirementItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>

          <article className="download-info-card">
            <div className="download-info-icon"><SiteIcon name="check" size={24} /></div>
            <h2>{t.install}</h2>
            <ol>
              {t.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </article>
        </div>

        <article className="smartscreen-note">
          <div className="download-info-icon"><SiteIcon name="shield" size={25} /></div>
          <div>
            <h2>{t.smartTitle}</h2>
            <p>{t.smartText}</p>
          </div>
        </article>

        <p className="download-safety"><span className="status-dot" />{t.safety}</p>
      </section>
    </main>
  );
}
