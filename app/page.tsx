"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { SiteIcon, type IconName } from "./icons";
import { FALLBACK_RELEASE, fetchLatestRelease, type ReleaseInfo } from "./release";

type Language = "en" | "uk";

const content = {
  en: {
    nav: [
      ["Features", "#features"],
      ["Releases", "/releases"],
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
    downloadNote: "Windows 10/11 · Windows Hello required",
    realUi: "REAL APPLICATION · BLUE THEME",
    proof: [
      ["fingerprint", "Private by design", "Local-first", "Settings and profiles stay on your PC."],
      ["shield", "Native security", "Windows Hello", "Windows handles biometric matching."],
      ["workflow", "Flexible workflows", "15 actions", "From apps and hotkeys to system controls."],
      ["palette", "Make it yours", "6 themes", "Light, dark, onyx, graphite, blue and purple."],
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
      ["Релізи", "/releases"],
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
    downloadNote: "Windows 10/11 · потрібен Windows Hello",
    realUi: "РЕАЛЬНИЙ ЗАСТОСУНОК · СИНЯ ТЕМА",
    proof: [
      ["fingerprint", "Приватність за задумом", "Локальна робота", "Налаштування та профілі залишаються на вашому ПК."],
      ["shield", "Нативний захист", "Windows Hello", "Біометричне зіставлення виконує Windows."],
      ["workflow", "Гнучкі сценарії", "15 дій", "Від програм і hotkeys до керування системою."],
      ["palette", "Власний стиль", "6 тем", "Світла, темна, onyx, graphite, синя та фіолетова."],
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

type ActionGuide = {
  id: string;
  icon: IconName;
  title: string;
  category: string;
  description: string;
  nuance: string;
  steps: readonly string[];
};

const actionGuides: Record<Language, readonly ActionGuide[]> = {
  en: [
    {
      id: "launch_app", icon: "app", title: "Open application or file", category: "Basic",
      description: "Launch an executable, document, folder, or any file type registered in Windows.",
      nuance: "Use the full path. Optional command-line arguments are supported for applications that accept them.",
      steps: ["Choose Open application or file.", "Select the file with Browse or paste its full path.", "Add optional arguments, then save the action."],
    },
    {
      id: "open_url", icon: "globe", title: "Open website", category: "Basic",
      description: "Open a web address in the default Windows browser.",
      nuance: "Include a complete address. The app normalizes ordinary links, but an explicit https:// address is the safest option.",
      steps: ["Choose Open website.", "Paste the complete URL.", "Check the address and save."],
    },
    {
      id: "hotkey", icon: "keyboard", title: "Press hotkey", category: "Keyboard & macros",
      description: "Send one key or a multi-key shortcut to the active application.",
      nuance: "Windows-reserved shortcuts may be unavailable. The aliases win, meta, cmd, and super are normalized to the Windows key.",
      steps: ["Choose Press hotkey.", "Record or enter the required combination.", "Test it in the target application before relying on it."],
    },
    {
      id: "shell", icon: "terminal", title: "Run PowerShell command", category: "Keyboard & macros",
      description: "Execute a PowerShell command or script without opening a visible console window.",
      nuance: "Commands run with the current user's permissions. Review downloaded scripts and avoid commands you do not understand.",
      steps: ["Choose Run PowerShell command.", "Enter the command exactly as it should run.", "Test it separately in PowerShell, then save."],
    },
    {
      id: "lock_screen", icon: "lock", title: "Lock screen", category: "Windows system",
      description: "Immediately lock the current Windows session.",
      nuance: "Any later actions in the same sequence may not interact with the desktop after the session is locked.",
      steps: ["Choose Lock screen.", "Place it at the end of a sequence when possible.", "Save; no additional parameters are needed."],
    },
    {
      id: "minimize_all", icon: "minimize", title: "Minimize all windows", category: "Windows system",
      description: "Minimize visible desktop windows and reveal the desktop.",
      nuance: "Some protected or special system windows may ignore the minimize request.",
      steps: ["Choose Minimize all windows.", "Position it before actions that need a clean desktop.", "Save the action."],
    },
    {
      id: "toggle_mute", icon: "volume-off", title: "Mute or unmute sound", category: "Windows system",
      description: "Toggle mute on the default Windows output device.",
      nuance: "The result depends on the current mute state and applies to the device selected as the default output.",
      steps: ["Choose Mute or unmute sound.", "Confirm the correct default output device in Windows.", "Save; no value is required."],
    },
    {
      id: "change_volume", icon: "volume", title: "Change volume", category: "Windows system",
      description: "Increase or decrease the master volume by a selected percentage.",
      nuance: "The value must be from 1% to 100%. It changes the current level rather than setting an absolute level.",
      steps: ["Choose Change volume.", "Select Increase or Decrease.", "Set the percentage and save."],
    },
    {
      id: "close_active_window", icon: "close-window", title: "Close active window", category: "Windows system",
      description: "Ask the foreground window to close, similar to Alt + F4.",
      nuance: "Applications with unsaved work may show a confirmation dialog and pause the expected workflow.",
      steps: ["Choose Close active window.", "Make sure the intended window will be active.", "Place it carefully in the sequence and save."],
    },
    {
      id: "shutdown", icon: "power", title: "Shut down", category: "Windows system",
      description: "Shut down the computer through Windows.",
      nuance: "Unsaved work can be lost. Use this as the final step and test the rest of the sequence first.",
      steps: ["Choose Shut down.", "Place it at the very end.", "Review the sequence, then save."],
    },
    {
      id: "restart", icon: "restart", title: "Restart", category: "Windows system",
      description: "Restart Windows immediately.",
      nuance: "Running applications may close and unsaved work can be lost. Later actions will not execute.",
      steps: ["Choose Restart.", "Use it only as the final action.", "Review and save the profile."],
    },
    {
      id: "sleep", icon: "moon", title: "Sleep", category: "Windows system",
      description: "Put the computer into Windows sleep mode.",
      nuance: "Sleep availability and wake behavior depend on the device's power settings and hardware.",
      steps: ["Choose Sleep.", "Place it at the end of the sequence.", "Save; no additional value is required."],
    },
    {
      id: "paste_text", icon: "clipboard", title: "Copy text to clipboard", category: "Keyboard & macros",
      description: "Place prepared text into the Windows clipboard for later pasting.",
      nuance: "This replaces the current clipboard text. It copies text but does not automatically press Ctrl + V.",
      steps: ["Choose Copy text to clipboard.", "Enter the exact text.", "Add a separate hotkey action afterward if you also want to paste it."],
    },
    {
      id: "delay", icon: "delay", title: "Delay", category: "Keyboard & macros",
      description: "Pause the sequence before the next action runs.",
      nuance: "The delay can be from 1 millisecond to 24 hours and can be cancelled with the running sequence.",
      steps: ["Choose Delay.", "Select milliseconds, seconds, minutes, or hours.", "Enter the duration and save."],
    },
    {
      id: "quick_timer", icon: "timer", title: "Quick timer", category: "Keyboard & macros",
      description: "Start a background countdown with a reminder and optional custom sound.",
      nuance: "The timer can run for up to 30 days. A custom audio file must remain available at the saved path.",
      steps: ["Choose Quick timer.", "Set the duration and reminder text.", "Optionally select an audio file, then save."],
    },
  ],
  uk: [
    {
      id: "launch_app", icon: "app", title: "Відкрити програму або файл", category: "Основні",
      description: "Запускає програму, документ, папку або інший зареєстрований у Windows тип файлу.",
      nuance: "Використовуйте повний шлях. Для програм можна додати аргументи командного рядка.",
      steps: ["Виберіть «Відкрити програму або файл».", "Знайдіть файл через огляд або вставте повний шлях.", "За потреби додайте аргументи й збережіть дію."],
    },
    {
      id: "open_url", icon: "globe", title: "Відкрити сайт", category: "Основні",
      description: "Відкриває вебадресу у стандартному браузері Windows.",
      nuance: "Найнадійніше вказувати повну адресу з https://, хоча звичайні посилання застосунок нормалізує.",
      steps: ["Виберіть «Відкрити сайт».", "Вставте повну URL-адресу.", "Перевірте її та збережіть."],
    },
    {
      id: "hotkey", icon: "keyboard", title: "Натиснути hotkey", category: "Клавіатура і макроси",
      description: "Надсилає одну клавішу або комбінацію в активну програму.",
      nuance: "Зарезервовані Windows комбінації можуть бути недоступними. win, meta, cmd і super означають клавішу Windows.",
      steps: ["Виберіть «Натиснути hotkey».", "Запишіть або введіть комбінацію.", "Перевірте її у потрібній програмі та збережіть."],
    },
    {
      id: "shell", icon: "terminal", title: "Виконати PowerShell", category: "Клавіатура і макроси",
      description: "Виконує команду або сценарій PowerShell без видимого вікна консолі.",
      nuance: "Команда працює з правами поточного користувача. Не запускайте сценарії, призначення яких вам невідоме.",
      steps: ["Виберіть «Виконати PowerShell».", "Введіть точну команду.", "Спочатку перевірте її окремо в PowerShell, а потім збережіть."],
    },
    {
      id: "lock_screen", icon: "lock", title: "Заблокувати екран", category: "Система Windows",
      description: "Одразу блокує поточний сеанс Windows.",
      nuance: "Після блокування наступні дії не зможуть взаємодіяти з робочим столом.",
      steps: ["Виберіть «Заблокувати екран».", "За можливості поставте дію останньою.", "Збережіть — додаткові параметри не потрібні."],
    },
    {
      id: "minimize_all", icon: "minimize", title: "Згорнути всі вікна", category: "Система Windows",
      description: "Згортає видимі вікна та показує робочий стіл.",
      nuance: "Деякі захищені або спеціальні системні вікна можуть не реагувати.",
      steps: ["Виберіть «Згорнути всі вікна».", "Розмістіть перед діями, яким потрібен чистий робочий стіл.", "Збережіть дію."],
    },
    {
      id: "toggle_mute", icon: "volume-off", title: "Вимкнути або увімкнути звук", category: "Система Windows",
      description: "Перемикає звук стандартного пристрою виведення Windows.",
      nuance: "Результат залежить від поточного стану та стосується пристрою, обраного стандартним.",
      steps: ["Виберіть дію звуку.", "Перевірте стандартний пристрій у Windows.", "Збережіть — значення вводити не потрібно."],
    },
    {
      id: "change_volume", icon: "volume", title: "Змінити гучність", category: "Система Windows",
      description: "Збільшує або зменшує загальну гучність на вибраний відсоток.",
      nuance: "Доступне значення від 1% до 100%. Дія змінює поточний рівень, а не встановлює абсолютний.",
      steps: ["Виберіть «Змінити гучність».", "Оберіть збільшення або зменшення.", "Вкажіть відсоток і збережіть."],
    },
    {
      id: "close_active_window", icon: "close-window", title: "Закрити активне вікно", category: "Система Windows",
      description: "Надсилає активному вікну команду закриття, подібно до Alt + F4.",
      nuance: "Програма з незбереженими даними може показати підтвердження й зупинити очікуваний сценарій.",
      steps: ["Виберіть «Закрити активне вікно».", "Переконайтеся, що потрібне вікно буде активним.", "Обережно розташуйте дію та збережіть."],
    },
    {
      id: "shutdown", icon: "power", title: "Вимкнути комп’ютер", category: "Система Windows",
      description: "Завершує роботу комп’ютера через Windows.",
      nuance: "Незбережені дані можна втратити. Використовуйте лише останньою дією.",
      steps: ["Виберіть «Вимкнути комп’ютер».", "Поставте дію в самий кінець.", "Перевірте попередні кроки та збережіть."],
    },
    {
      id: "restart", icon: "restart", title: "Перезавантажити", category: "Система Windows",
      description: "Перезапускає Windows.",
      nuance: "Запущені програми закриються, а наступні дії не виконаються. Незбережені дані можна втратити.",
      steps: ["Виберіть «Перезавантажити».", "Використовуйте лише останньою дією.", "Перегляньте сценарій і збережіть."],
    },
    {
      id: "sleep", icon: "moon", title: "Перевести у сон", category: "Система Windows",
      description: "Переводить комп’ютер у режим сну Windows.",
      nuance: "Доступність і пробудження залежать від налаштувань живлення та обладнання.",
      steps: ["Виберіть «Сон».", "Розмістіть наприкінці сценарію.", "Збережіть — параметри не потрібні."],
    },
    {
      id: "paste_text", icon: "clipboard", title: "Скопіювати текст", category: "Клавіатура і макроси",
      description: "Записує підготовлений текст у буфер обміну Windows.",
      nuance: "Поточний текст буфера буде замінено. Дія копіює текст, але не натискає Ctrl + V.",
      steps: ["Виберіть «Скопіювати текст».", "Введіть точний текст.", "Щоб одразу вставити його, додайте наступною окрему дію hotkey."],
    },
    {
      id: "delay", icon: "delay", title: "Додати затримку", category: "Клавіатура і макроси",
      description: "Призупиняє послідовність перед наступною дією.",
      nuance: "Затримка може тривати від 1 мілісекунди до 24 годин і скасовується разом зі сценарієм.",
      steps: ["Виберіть «Затримка».", "Оберіть мілісекунди, секунди, хвилини або години.", "Вкажіть тривалість і збережіть."],
    },
    {
      id: "quick_timer", icon: "timer", title: "Запустити швидкий таймер", category: "Клавіатура і макроси",
      description: "Запускає фоновий відлік із нагадуванням і необов’язковим власним звуком.",
      nuance: "Таймер може працювати до 30 днів. Власний аудіофайл має залишатися за збереженим шляхом.",
      steps: ["Виберіть «Швидкий таймер».", "Вкажіть тривалість і текст нагадування.", "За потреби виберіть аудіофайл і збережіть."],
    },
  ],
};

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article className={open ? "faq-item open" : "faq-item"}>
      <button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        <span>{question}</span><i>+</i>
      </button>
      <div className="faq-answer"><div><p>{answer}</p></div></div>
    </article>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [release, setRelease] = useState<ReleaseInfo>(FALLBACK_RELEASE);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState("launch_app");
  const lastScrollY = useRef(0);
  const t = content[language];
  const guides = actionGuides[language];
  const selectedAction = guides.find((action) => action.id === selectedActionId) ?? guides[0];

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("fl-language", language);
  }, [language]);

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
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    root.classList.add("motion-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10%", threshold: 0.12 },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = Math.max(window.scrollY, 0);
      const delta = currentScrollY - lastScrollY.current;

      setHeaderScrolled(currentScrollY > 28);
      if (Math.abs(delta) < 4) return;

      if (!menuOpen && currentScrollY > 150 && delta > 0) {
        setHeaderHidden(true);
      } else if (delta < 0 || currentScrollY < 90 || menuOpen) {
        setHeaderHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = Math.max(window.scrollY, 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const handleStagePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    event.currentTarget.style.setProperty("--tilt-y", `${(x - 0.5) * 4}deg`);
    event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - y) * 2.8}deg`);
    event.currentTarget.style.setProperty("--glow-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--glow-y", `${y * 100}%`);
  };

  const resetStageTilt = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.removeProperty("--tilt-y");
    event.currentTarget.style.removeProperty("--tilt-x");
    event.currentTarget.style.removeProperty("--glow-x");
    event.currentTarget.style.removeProperty("--glow-y");
  };

  return (
    <main>
      <header className={`site-header${headerScrolled ? " is-scrolled" : ""}${headerHidden ? " is-hidden" : ""}`}>
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
        <div className="hero-copy hero-entrance">
          <div className="eyebrow"><span className="status-dot" />{t.heroBadge}</div>
          <h1>{t.heroTitle[0]}<span>{t.heroTitle[1]}</span></h1>
          <p className="hero-lead">{t.heroLead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={release.downloadUrl}>
              {t.download}<SiteIcon name="download" size={19} />
            </a>
            <a className="button button-secondary" href="https://github.com/dedovk/fingerprint-launcher">
              {t.github}<SiteIcon name="external" size={18} />
            </a>
          </div>
          <p className="download-note">
            {language === "uk" ? "Версія" : "Version"} {release.version} · {t.downloadNote}
            <a href="/releases">{language === "uk" ? "Деталі релізу" : "Release details"}</a>
          </p>
        </div>

        <div
          className="product-stage hero-entrance hero-entrance-delayed"
          onPointerMove={handleStagePointerMove}
          onPointerLeave={resetStageTilt}
        >
          <div className="screen-glow" />
          <div className="real-screen">
            <img
              src="/fingerprint-launcher-blue.png"
              alt="FingerprintLauncher blue theme showing configured finger actions"
            />
          </div>
        </div>
      </section>

      <section className="proof-section" aria-label="Product highlights">
        <div className="proof-grid" data-reveal>
          {t.proof.map(([icon, eyebrow, title, text]) => (
            <article className="proof-card" key={title}>
              <div className="proof-icon"><SiteIcon name={icon as IconName} size={24} /></div>
              <span>{eyebrow}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="features">
        <div className="section-heading" data-reveal>
          <span className="section-label">{t.featureLabel}</span>
          <h2>{t.featureTitle}</h2>
          <p>{t.featureLead}</p>
        </div>

        <div className="feature-grid" data-reveal>
          <article className="feature-card feature-sequence">
            <div className="feature-copy">
              <div className="feature-icon"><SiteIcon name="workflow" size={28} /></div>
              <h3>{t.chainTitle}</h3>
              <p>{t.chainText}</p>
            </div>
            <div className="automation-board">
              <div className="trigger-row">
                <div className="node-icon"><SiteIcon name="fingerprint" size={26} /></div>
                <div><span>{t.trigger}</span><strong>{t.scanned}</strong></div>
                <i className="live-indicator" />
              </div>
              <div className="timeline">
                {t.actionFlow.map(([number, title, meta]) => (
                  <div className="timeline-row" key={number}>
                    <span className="timeline-number">{number}</span>
                    <div><strong>{title}</strong><small>{meta}</small></div>
                    <span className="ready-pill"><SiteIcon name="check" size={12} />{t.ready}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="feature-card feature-compact">
            <div className="feature-icon"><SiteIcon name="windows" size={28} /></div>
            <div><h3>{t.windowsTitle}</h3><p>{t.windowsText}</p></div>
          </article>
          <article className="feature-card feature-compact">
            <div className="feature-icon"><SiteIcon name="tray" size={28} /></div>
            <div><h3>{t.trayTitle}</h3><p>{t.trayText}</p></div>
          </article>
        </div>
      </section>

      <section className="actions-section" id="actions">
        <div className="section">
          <div className="section-heading actions-heading" data-reveal>
            <span className="section-label">{t.actionsLabel}</span>
            <h2>{t.actionsTitle}</h2>
            <p>{t.actionsLead}</p>
          </div>
          <div className="action-explorer" data-reveal>
            <div className="action-picker" role="list" aria-label={t.actionsTitle}>
              {guides.map((action) => (
                <button
                  type="button"
                  role="listitem"
                  key={action.id}
                  className={selectedAction.id === action.id ? "action-choice active" : "action-choice"}
                  onClick={() => setSelectedActionId(action.id)}
                >
                  <span className="action-choice-icon"><SiteIcon name={action.icon} size={21} /></span>
                  <span><strong>{action.title}</strong><small>{action.category}</small></span>
                  <SiteIcon name="chevron" size={18} />
                </button>
              ))}
            </div>
            <article className="action-guide" key={`${language}-${selectedAction.id}`}>
              <div className="action-guide-top">
                <div className="guide-icon"><SiteIcon name={selectedAction.icon} size={31} /></div>
                <span>{selectedAction.category}</span>
              </div>
              <h3>{selectedAction.title}</h3>
              <p className="guide-description">{selectedAction.description}</p>
              <div className="guide-note">
                <SiteIcon name="shield" size={19} />
                <div>
                  <strong>{language === "uk" ? "Важливий нюанс" : "Important detail"}</strong>
                  <p>{selectedAction.nuance}</p>
                </div>
              </div>
              <div className="guide-steps">
                <span>{language === "uk" ? "ЯК КОРЕКТНО ДОДАТИ" : "HOW TO ADD IT CORRECTLY"}</span>
                <ol>
                  {selectedAction.steps.map((step) => <li key={step}>{step}</li>)}
                </ol>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section steps-section" id="how-it-works">
        <div className="section-heading" data-reveal>
          <span className="section-label">{t.howLabel}</span>
          <h2>{t.howTitle}</h2>
        </div>
        <div className="steps" data-reveal>
          {t.steps.map(([number, title, text]) => (
            <article key={number} data-step={number}><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="privacy-section" id="privacy" data-reveal>
        <div className="privacy-visual">
          <div className="privacy-ring ring-one" /><div className="privacy-ring ring-two" />
          <SiteIcon name="fingerprint" size={54} />
        </div>
        <div>
          <span className="section-label">{t.privacyLabel}</span>
          <h2>{t.privacyTitle}</h2>
          <p>{t.privacyText}</p>
        </div>
        <a className="button button-dark" href="/privacy">
          {t.privacyButton}<SiteIcon name="chevron" size={18} />
        </a>
      </section>

      <section className="section faq-section" id="faq">
        <div className="section-heading" data-reveal>
          <span className="section-label">{t.faqLabel}</span>
          <h2>{t.faqTitle}</h2>
        </div>
        <div className="faq-list" data-reveal>
          {t.faq.map(([question, answer]) => (
            <FaqItem key={question} question={question} answer={answer} />
          ))}
        </div>
      </section>

      <section className="cta" data-reveal>
        <img src="/logo.png" alt="" width="64" height="64" />
        <h2>{t.ctaTitle}</h2>
        <p>{t.ctaText}</p>
        <a className="button button-primary" href={release.downloadUrl}>
          {t.ctaButton}<SiteIcon name="download" size={19} />
        </a>
      </section>

      <footer>
        <a className="brand" href="#"><img src="/logo.png" alt="" width="30" height="30" /><span>FingerprintLauncher</span></a>
        <a
          className="creator-link"
          href="https://www.linkedin.com/in/kyrylo-diedov-112b833b2/"
          target="_blank"
          rel="noreferrer"
        >
          Created by Kyrylo Diedov.
        </a>
        <div>
          <a href="/download">{language === "uk" ? "Завантажити" : "Download"}</a>
          <a href="/releases">{language === "uk" ? "Релізи" : "Releases"}</a>
          <a href="https://github.com/dedovk/fingerprint-launcher">GitHub</a>
          <a href="https://github.com/dedovk/fingerprint-launcher/issues">{t.report}</a>
          <a href="/help">{language === "uk" ? "Допомога" : "Help"}</a>
          <a href="/privacy">{t.privacy}</a>
        </div>
      </footer>
    </main>
  );
}
