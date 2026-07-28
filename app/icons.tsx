export type IconName =
  | "fingerprint" | "shield" | "workflow" | "palette" | "windows" | "tray"
  | "app" | "globe" | "keyboard" | "terminal" | "lock" | "minimize"
  | "volume-off" | "volume" | "close-window" | "power" | "restart" | "moon"
  | "clipboard" | "delay" | "timer" | "download" | "external" | "check"
  | "chevron";

export function SiteIcon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    fingerprint: <>
      <path d="M12 11.2a2.3 2.3 0 0 0-2.3 2.3c0 1.4-.16 3.65-.52 5.5" />
      <path d="M14.6 14.5c0 3.45-.2 5.8-1.05 7.5M18.2 19.4c.35-1.25.55-2.7.58-4.05" />
      <path d="M4 13.5a8 8 0 0 1 14.5-4.7M4.2 17.2h.01M20 16.7c.18-2.25.1-4.9-.2-6" />
      <path d="M7.2 19.8c.55-1.75.9-4.05.9-6.3 0-1.05.25-2.05.7-2.9M10.7 22c.35-1 .65-2.05.8-3" />
      <path d="M10.2 8.1a5.4 5.4 0 0 1 8.1 4.65v2" />
    </>,
    shield: <>
      <path d="M12 3 19 6v5.2c0 4.4-2.85 7.75-7 9.8-4.15-2.05-7-5.4-7-9.8V6l7-3Z" />
      <path d="m8.7 12.1 2.15 2.15 4.65-4.7" />
    </>,
    workflow: <>
      <rect x="3" y="4" width="6" height="5" rx="1.4" /><rect x="15" y="15" width="6" height="5" rx="1.4" />
      <path d="M9 6.5h3a3 3 0 0 1 3 3v5.5M12.2 12.3 15 15l2.8-2.7" />
    </>,
    palette: <>
      <path d="M12 3a9 9 0 0 0 0 18h1.2a1.8 1.8 0 0 0 1.4-2.95 1.8 1.8 0 0 1 1.4-2.95h1.5A3.5 3.5 0 0 0 21 11.6 8.8 8.8 0 0 0 12 3Z" />
      <path d="M7.5 10h.01M9.5 6.8h.01M14 6.5h.01M17.2 9h.01" />
    </>,
    windows: <>
      <path d="M3.5 5.2 10.8 4v7H3.5V5.2ZM13.2 3.6 20.5 2.5V11h-7.3V3.6ZM3.5 13h7.3v7l-7.3-1.2V13ZM13.2 13h7.3v8.5l-7.3-1.1V13Z" />
    </>,
    tray: <>
      <rect x="4" y="4" width="16" height="16" rx="4" /><path d="M8 16h8M9.5 12.5 12 15l2.5-2.5M12 8v7" />
    </>,
    app: <>
      <rect x="3" y="4" width="18" height="16" rx="3" /><path d="M3 9h18M8 4v5" />
    </>,
    globe: <>
      <circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.2 2.45 3.3 5.45 3.3 9S14.2 18.55 12 21M12 3C9.8 5.45 8.7 8.45 8.7 12s1.1 6.55 3.3 9" />
    </>,
    keyboard: <>
      <rect x="2.5" y="5" width="19" height="14" rx="3" /><path d="M6 9h.01M9 9h.01M12 9h.01M15 9h.01M18 9h.01M6 13h.01M9 13h.01M12 13h.01M15 13h.01M7 16h10" />
    </>,
    terminal: <>
      <rect x="3" y="4" width="18" height="16" rx="3" /><path d="m7 9 3 3-3 3M12.5 15H17" />
    </>,
    lock: <>
      <rect x="4.5" y="10" width="15" height="11" rx="3" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
    </>,
    minimize: <>
      <rect x="3" y="4" width="18" height="16" rx="3" /><path d="M7 16h10M8 12l4 4 4-4" />
    </>,
    "volume-off": <>
      <path d="M4 10h4l5-4v12l-5-4H4v-4ZM17 9l4 4M21 9l-4 4" />
    </>,
    volume: <>
      <path d="M4 10h4l5-4v12l-5-4H4v-4ZM16.5 9.2a4 4 0 0 1 0 5.6M19 7a7 7 0 0 1 0 10" />
    </>,
    "close-window": <>
      <rect x="3" y="4" width="18" height="16" rx="3" /><path d="m9 10 6 6M15 10l-6 6" />
    </>,
    power: <>
      <path d="M12 3v9M7 5.8A8 8 0 1 0 17 5.8" />
    </>,
    restart: <>
      <path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8.4A7.5 7.5 0 0 1 20 12M4 12a7.5 7.5 0 0 0 13.9 3.6" />
    </>,
    moon: <>
      <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.7 8.7 0 1 0 20.2 15.2Z" />
    </>,
    clipboard: <>
      <rect x="5" y="4.5" width="14" height="16" rx="2.5" /><path d="M9 4.5V3h6v1.5M8.5 10h7M8.5 14h7M8.5 18h4" />
    </>,
    delay: <>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2M7 3.8 4.5 6" />
    </>,
    timer: <>
      <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2M9 2h6M12 2v3M18 6l1.5-1.5" />
    </>,
    download: <>
      <path d="M12 3v12M7.5 11 12 15.5 16.5 11M4 20h16" />
    </>,
    external: <>
      <path d="M14 4h6v6M20 4l-9 9" /><path d="M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />
    </>,
    check: <path d="m5 12.5 4.2 4.2L19 7" />,
    chevron: <path d="m8 10 4 4 4-4" />,
  };

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  );
}
