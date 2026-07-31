"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteIcon, type IconName } from "./icons";
import { FALLBACK_RELEASE, fetchLatestRelease, type ReleaseInfo } from "./release";

type Language = "en" | "uk";
type ResourceKind = "privacy" | "help";
type ResourceSection = {
  id: string;
  title: string;
  icon: IconName;
  paragraphs?: string[];
  items?: string[];
};

const SUPPORT_EMAIL = "support@fingerprint-launcher.com";

const supportOptions = {
  en: {
    email: "Email support",
    issue: "Open a GitHub issue",
    addressLabel: "Private support email",
    copyEmail: "Copy email address",
    copiedEmail: "Email address copied",
    safety: "Include your Windows and app versions, expected result, actual result, and steps to reproduce. Never send passwords, PINs, biometric data, private keys, or access tokens.",
    helpSubject: "FingerprintLauncher support request",
    privacySubject: "FingerprintLauncher privacy question",
    template: "App version:\nWindows version:\nFingerprint reader model:\n\nExpected result:\n\nActual result:\n\nSteps to reproduce:\n1. \n2. \n3. \n\nRelevant log details (remove personal or sensitive data first):\n",
  },
  uk: {
    copyEmail: "Скопіювати адресу",
    copiedEmail: "Адресу скопійовано",
    email: "Написати в підтримку",
    issue: "Створити GitHub Issue",
    addressLabel: "Приватна пошта підтримки",
    safety: "Додайте версії Windows і застосунку, очікуваний та фактичний результат, а також кроки відтворення. Не надсилайте паролі, PIN-коди, біометричні дані, приватні ключі або токени доступу.",
    helpSubject: "Звернення до підтримки FingerprintLauncher",
    privacySubject: "Питання щодо приватності FingerprintLauncher",
    template: "Версія застосунку:\nВерсія Windows:\nМодель сканера відбитків:\n\nОчікуваний результат:\n\nФактичний результат:\n\nКроки відтворення:\n1. \n2. \n3. \n\nВажливі дані журналу (спочатку видаліть особисті або чутливі дані):\n",
  },
} as const;

const resources = {
  privacy: {
    en: {
      eyebrow: "PRIVACY POLICY",
      title: "Your biometric data stays under Windows’ control.",
      lead: "FingerprintLauncher is a local-first Windows utility. It does not require an account and does not include advertising, telemetry, analytics, or user tracking.",
      updated: "Effective July 27, 2026 · Applies to version 1.0.0",
      noticeTitle: "The essential point",
      notice: "Fingerprint matching is performed by Windows Hello and the Windows Biometric Framework. FingerprintLauncher never receives or stores fingerprint images, scans, templates, biometric samples, your PIN, or Microsoft account credentials.",
      sections: [
        { id: "local-data", title: "Information stored locally", icon: "app", paragraphs: ["The app stores only the configuration needed to run your routines in a local SQLite database:"], items: ["finger names, Windows-provided identity references, and enabled state;", "actions, their order, file paths, URLs, commands, hotkeys, clipboard text, delays, and timers;", "interface language, theme, activation hotkey, and autostart preferences."] },
        { id: "retention", title: "Storage and deletion", icon: "shield", paragraphs: ["Configuration is stored at %LOCALAPPDATA%\\FingerprintLauncher\\fingerprints.sqlite3. It remains on your device until you edit it, remove it during uninstall, or delete the FingerprintLauncher data directory.", "The database is not encrypted by the app. Its protection depends on your Windows account permissions and device security, including BitLocker when enabled."] },
        { id: "network", title: "Network access", icon: "globe", paragraphs: ["FingerprintLauncher has no developer-controlled backend and does not upload your profiles, actions, clipboard text, files, or activity log.", "A network request is made only when you explicitly check for updates through the public GitHub API, or when a URL, command, or support link selected by you accesses an external service."] },
        { id: "choices", title: "Your choices and controls", icon: "check", items: ["rename, disable, or delete profiles and actions;", "pause hotkey handling and disable autostart;", "avoid optional update checks and external support links;", "uninstall the app and remove %LOCALAPPDATA%\\FingerprintLauncher."] },
        { id: "security", title: "Security and responsible use", icon: "lock", paragraphs: ["Do not place passwords, access tokens, private keys, or financial credentials in action configuration. User-created PowerShell commands, URLs, and files run with the permissions and behavior you choose.", "Download the application only from this official website or the official GitHub repository."] },
      ],
      contactTitle: "Privacy questions",
      contact: "For a private privacy request, email the support address below. Use GitHub Issues only for information that can be public.",
      contactButton: "Contact through GitHub Issues",
      navLabel: "On this page",
    },
    uk: {
      eyebrow: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ",
      title: "Ваші біометричні дані залишаються під контролем Windows.",
      lead: "FingerprintLauncher — локальний застосунок для Windows. Він не потребує облікового запису й не містить реклами, телеметрії, аналітики або відстеження користувачів.",
      updated: "Чинна з 27 липня 2026 року · Для версії 1.0.0",
      noticeTitle: "Найважливіше",
      notice: "Розпізнавання виконується Windows Hello та Windows Biometric Framework. FingerprintLauncher ніколи не отримує і не зберігає зображення, скани чи шаблони відбитків, біометричні зразки, PIN-код або дані облікового запису Microsoft.",
      sections: [
        { id: "local-data", title: "Що зберігається локально", icon: "app", paragraphs: ["Застосунок зберігає в локальній базі SQLite лише налаштування, потрібні для виконання ваших сценаріїв:"], items: ["назви пальців, надані Windows ідентифікатори та стан активності;", "дії, їх порядок, шляхи до файлів, URL, команди, hotkeys, текст буфера обміну, затримки й таймери;", "мову, тему, клавішу активації та параметри автозапуску."] },
        { id: "retention", title: "Зберігання та видалення", icon: "shield", paragraphs: ["Налаштування зберігаються у %LOCALAPPDATA%\\FingerprintLauncher\\fingerprints.sqlite3, доки ви не зміните їх, не видалите під час деінсталяції або не видалите папку даних FingerprintLauncher.", "Застосунок не шифрує цю базу. Її захист залежить від дозволів вашого облікового запису Windows і захисту пристрою, зокрема BitLocker."] },
        { id: "network", title: "Доступ до мережі", icon: "globe", paragraphs: ["FingerprintLauncher не має серверної частини розробника і не завантажує ваші профілі, дії, текст буфера обміну, файли або журнал активності.", "Мережевий запит виконується лише під час ручної перевірки оновлень через публічний GitHub API або коли вибрані вами URL, команда чи посилання підтримки звертаються до зовнішнього сервісу."] },
        { id: "choices", title: "Ваші налаштування", icon: "check", items: ["перейменовуйте, вимикайте або видаляйте профілі та дії;", "призупиняйте hotkey і вимикайте автозапуск;", "не використовуйте необов’язкову перевірку оновлень і зовнішні посилання;", "видаліть застосунок і папку %LOCALAPPDATA%\\FingerprintLauncher."] },
        { id: "security", title: "Безпека та відповідальне використання", icon: "lock", paragraphs: ["Не додавайте до дій паролі, токени доступу, приватні ключі чи фінансові дані. Створені вами PowerShell-команди, URL і файли працюють із вибраними вами дозволами та поведінкою.", "Завантажуйте застосунок лише з цього офіційного сайту або офіційного GitHub-репозиторію."] },
      ],
      contactTitle: "Питання щодо приватності",
      contact: "Для приватного питання щодо конфіденційності напишіть на адресу підтримки нижче. GitHub Issues використовуйте лише для інформації, яка може бути публічною.",
      contactButton: "Звернутися через GitHub Issues",
      navLabel: "На цій сторінці",
    },
  },
  help: {
    en: {
      eyebrow: "HELP CENTER",
      title: "Set up your first fingerprint routine.",
      lead: "Everything you need to install FingerprintLauncher, connect Windows Hello, and troubleshoot the most common setup issues.",
      updated: "FingerprintLauncher 1.0.0 · Windows 10 and 11",
      noticeTitle: "Before you begin",
      notice: "You need a Windows Hello-compatible fingerprint reader and at least one fingerprint already enrolled in Windows Settings.",
      sections: [
        { id: "install", title: "Install the application", icon: "download", items: ["Download the current installer from the official download page.", "Run FingerprintLauncher_Setup_1.0.0.exe and complete the installation.", "If SmartScreen appears, verify that the file came from fingerprint-launcher.com, then choose More info and Run anyway."] },
        { id: "first-routine", title: "Create your first routine", icon: "fingerprint", items: ["Open My fingers and select Add.", "Scan an enrolled finger and give the profile a clear name.", "Add one or more actions, arrange their order, and save.", "Press the activation hotkey, scan the finger, and let the sequence run."] },
        { id: "scanner", title: "Scanner is not detected", icon: "shield", paragraphs: ["Confirm that fingerprint sign-in works in Windows Settings → Accounts → Sign-in options. Install any pending Windows and device-driver updates, then restart Windows.", "Only fingerprints enrolled for the current Windows account can be matched."] },
        { id: "hotkey", title: "The activation hotkey does not work", icon: "keyboard", paragraphs: ["Make sure fingerprint handling is not paused in the system tray. Choose a shortcut that is not already reserved by another application, then save it again in Settings.", "Keep FingerprintLauncher running in the tray if you want to activate it while another application is focused."] },
        { id: "actions", title: "An action fails or behaves unexpectedly", icon: "workflow", paragraphs: ["Use full file paths and test the destination manually. Place sleep, restart, lock, or shutdown near the end of a sequence because later steps may not run.", "PowerShell commands execute on your computer. Review every command and never paste code from a source you do not trust."] },
      ],
      contactTitle: "Still need help?",
      contact: "Check the release notes first. Then choose private email support or a public GitHub Issue depending on whether the report contains personal or device-specific details.",
      contactButton: "Report an issue",
      navLabel: "Help topics",
    },
    uk: {
      eyebrow: "ЦЕНТР ДОПОМОГИ",
      title: "Налаштуйте свій перший сценарій відбитка.",
      lead: "Усе необхідне для встановлення FingerprintLauncher, підключення Windows Hello та вирішення типових проблем.",
      updated: "FingerprintLauncher 1.0.0 · Windows 10 та 11",
      noticeTitle: "Перед початком",
      notice: "Потрібен сумісний із Windows Hello сканер і щонайменше один відбиток, уже зареєстрований у налаштуваннях Windows.",
      sections: [
        { id: "install", title: "Встановіть застосунок", icon: "download", items: ["Завантажте актуальний інсталятор з офіційної сторінки.", "Запустіть FingerprintLauncher_Setup_1.0.0.exe і завершіть встановлення.", "Якщо з’явиться SmartScreen, перевірте, що файл отримано з fingerprint-launcher.com, потім виберіть Докладніше та Виконати."] },
        { id: "first-routine", title: "Створіть перший сценарій", icon: "fingerprint", items: ["Відкрийте Мої пальці та натисніть Додати.", "Відскануйте зареєстрований палець і дайте профілю зрозумілу назву.", "Додайте одну або кілька дій, упорядкуйте їх і збережіть.", "Натисніть hotkey активації, відскануйте палець і дочекайтеся виконання сценарію."] },
        { id: "scanner", title: "Сканер не визначається", icon: "shield", paragraphs: ["Перевірте в Параметри Windows → Облікові записи → Варіанти входу, чи працює вхід за відбитком. Встановіть оновлення Windows і драйверів та перезапустіть систему.", "Розпізнаються лише відбитки, зареєстровані для поточного облікового запису Windows."] },
        { id: "hotkey", title: "Hotkey активації не працює", icon: "keyboard", paragraphs: ["Переконайтеся, що обробку відбитків не призупинено в системному треї. Виберіть комбінацію, яку не використовує інша програма, та повторно збережіть її.", "Залишайте FingerprintLauncher запущеним у треї, щоб активувати його поверх інших програм."] },
        { id: "actions", title: "Дія не виконується або працює неочікувано", icon: "workflow", paragraphs: ["Використовуйте повні шляхи й перевіряйте ціль окремо. Сон, перезапуск, блокування або вимкнення краще ставити в кінець сценарію.", "PowerShell-команди виконуються на вашому комп’ютері. Перевіряйте кожну команду й не вставляйте код із джерел, яким не довіряєте."] },
      ],
      contactTitle: "Потрібна додаткова допомога?",
      contact: "Спочатку перегляньте опис останніх релізів. Потім оберіть приватну пошту підтримки або публічний GitHub Issue залежно від того, чи містить звернення особисті дані або інформацію про пристрій.",
      contactButton: "Повідомити про проблему",
      navLabel: "Теми допомоги",
    },
  },
} as const;

export default function ResourcePage({ kind }: { kind: ResourceKind }) {
  const [language, setLanguage] = useState<Language>("en");
  const [release, setRelease] = useState<ReleaseInfo>(FALLBACK_RELEASE);
  const [copied, setCopied] = useState(false);
  const t = resources[kind][language];
  const support = supportOptions[language];
  const emailSubject = kind === "privacy" ? support.privacySubject : support.helpSubject;
  const emailBody = kind === "privacy"
    ? `${support.template}\nPrivacy question:\n`
    : support.template;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(SUPPORT_EMAIL)}&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  const copySupportEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SUPPORT_EMAIL);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = SUPPORT_EMAIL;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const withCurrentRelease = (text: string) =>
    text
      .replaceAll("FingerprintLauncher_Setup_1.0.0.exe", release.fileName)
      .replaceAll("1.0.0", release.version);

  useEffect(() => {
    const saved = window.localStorage.getItem("fl-language");
    if (saved === "en" || saved === "uk") queueMicrotask(() => setLanguage(saved));

    const controller = new AbortController();
    fetchLatestRelease(controller.signal).then(setRelease).catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("fl-language", language);
  }, [language]);

  return (
    <main className="resource-page">
      <header className="download-header">
        <Link className="brand" href="/"><img src="/logo.png" alt="" width="38" height="38" /><span>FingerprintLauncher</span></Link>
        <div className="download-header-actions">
          <Link className="back-link" href="/">← {language === "uk" ? "На головну" : "Back to home"}</Link>
          <div className="language-switch" aria-label="Language">
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
            <button className={language === "uk" ? "active" : ""} onClick={() => setLanguage("uk")} aria-pressed={language === "uk"}>UA</button>
          </div>
        </div>
      </header>
      <section className="resource-hero">
        <span className="section-label">{t.eyebrow}</span><h1>{t.title}</h1><p>{t.lead}</p><small>{withCurrentRelease(t.updated)}</small>
      </section>
      <div className="resource-layout">
        <aside className="resource-nav"><span>{t.navLabel}</span>{t.sections.map((section) => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</aside>
        <article className="resource-article">
          <div className="resource-notice"><SiteIcon name={kind === "privacy" ? "fingerprint" : "check"} size={29} /><div><strong>{t.noticeTitle}</strong><p>{t.notice}</p></div></div>
          {t.sections.map((section: ResourceSection) => (
            <section className="resource-section" id={section.id} key={section.id}>
              <div className="resource-section-icon"><SiteIcon name={section.icon} size={24} /></div>
              <div><h2>{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{withCurrentRelease(paragraph)}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{withCurrentRelease(item)}</li>)}</ul>}</div>
            </section>
          ))}
          <section className="resource-contact" id="support">
            <div>
              <span className="section-label">{t.contactTitle}</span>
              <p>{t.contact}</p>
              <p className="resource-contact-safety">{support.safety}</p>
              <button className="support-address" type="button" onClick={() => void copySupportEmail()}>
                <span>{support.addressLabel}</span>{SUPPORT_EMAIL}
                <small>{copied ? support.copiedEmail : support.copyEmail}</small>
              </button>
            </div>
            <div className="resource-contact-actions">
              <a className="button button-primary" href={gmailUrl} target="_blank" rel="noreferrer">{support.email}<SiteIcon name="mail" size={17} /></a>
              <a className="button button-dark" href="https://github.com/dedovk/fingerprint-launcher/issues">{support.issue}<SiteIcon name="external" size={17} /></a>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
