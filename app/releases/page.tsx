"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteIcon } from "../icons";
import {
  FALLBACK_RELEASE,
  fetchAllReleases,
  formatFileSize,
  type ReleaseInfo,
} from "../release";

type Language = "en" | "uk";

const copy = {
  en: {
    back: "Back to home",
    eyebrow: "RELEASE HISTORY",
    title: "Every version, in one place.",
    lead: "Release notes, official Windows installers, file sizes, and verification data are synchronized directly from GitHub Releases.",
    latest: "Latest release",
    prerelease: "Pre-release",
    published: "Published",
    size: "Installer size",
    checksum: "SHA-256",
    unavailable: "Not provided",
    download: "Download installer",
    github: "Open on GitHub",
    notes: "Release notes",
    current: "Current",
    automatic: "Automatically synchronized from the official GitHub repository",
  },
  uk: {
    back: "Повернутися на головну",
    eyebrow: "ІСТОРІЯ РЕЛІЗІВ",
    title: "Усі версії в одному місці.",
    lead: "Описи змін, офіційні інсталятори, розміри файлів і дані для перевірки автоматично синхронізуються з GitHub Releases.",
    latest: "Останній реліз",
    prerelease: "Попередній реліз",
    published: "Опубліковано",
    size: "Розмір інсталятора",
    checksum: "SHA-256",
    unavailable: "Не вказано",
    download: "Завантажити інсталятор",
    github: "Відкрити на GitHub",
    notes: "Опис релізу",
    current: "Актуальний",
    automatic: "Автоматично синхронізовано з офіційним GitHub-репозиторієм",
  },
} as const;

function ReleaseNotes({ notes }: { notes: string }) {
  return (
    <div className="release-notes">
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml>
        {notes}
      </ReactMarkdown>
    </div>
  );
}

export default function ReleasesPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [releases, setReleases] = useState<ReleaseInfo[]>([FALLBACK_RELEASE]);
  const t = copy[language];
  const locale = language === "uk" ? "uk-UA" : "en-US";

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("fl-language");
    if (savedLanguage === "uk" || savedLanguage === "en") {
      queueMicrotask(() => setLanguage(savedLanguage));
    }

    const controller = new AbortController();
    fetchAllReleases(controller.signal).then(setReleases).catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("fl-language", language);
  }, [language]);

  return (
    <main className="releases-page">
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

      <section className="releases-hero">
        <span className="section-label">{t.eyebrow}</span>
        <h1>{t.title}</h1>
        <p>{t.lead}</p>
        <div className="release-sync"><span className="status-dot" />{t.automatic}</div>
      </section>

      <section className="release-list" aria-label={t.eyebrow}>
        {releases.map((release, index) => {
          const publishedDate = new Intl.DateTimeFormat(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(release.publishedAt));

          return (
            <article className="release-entry" key={release.tag}>
              <aside className="release-entry-meta">
                <div className="release-version-row">
                  <strong>{release.tag}</strong>
                  {index === 0 && <span>{t.current}</span>}
                  {release.prerelease && <span className="prerelease-pill">{t.prerelease}</span>}
                </div>
                <h2>{release.name}</h2>
                <dl>
                  <div><dt>{t.published}</dt><dd>{publishedDate}</dd></div>
                  <div><dt>{t.size}</dt><dd>{formatFileSize(release.size, locale)}</dd></div>
                  <div><dt>{t.checksum}</dt><dd><code>{release.sha256 || t.unavailable}</code></dd></div>
                </dl>
                <div className="release-entry-actions">
                  <a className="button button-primary" href={release.downloadUrl}>
                    {t.download}<SiteIcon name="download" size={18} />
                  </a>
                  <a href={release.releaseUrl}>{t.github}<SiteIcon name="external" size={16} /></a>
                </div>
              </aside>

              <div className="release-entry-body">
                <span className="section-label">{t.notes}</span>
                <ReleaseNotes notes={release.notes} />
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
