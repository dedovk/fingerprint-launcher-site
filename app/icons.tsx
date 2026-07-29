import {
  AppWindow,
  Check,
  ChevronDown,
  Clipboard,
  Clock3,
  Download,
  ExternalLink,
  Fingerprint,
  Globe2,
  Keyboard,
  LockKeyhole,
  Minimize2,
  Monitor,
  Moon,
  Palette,
  PanelTop,
  Power,
  RotateCcw,
  ShieldCheck,
  SquareTerminal,
  SquareX,
  Timer,
  Volume2,
  VolumeX,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "fingerprint" | "shield" | "workflow" | "palette" | "windows" | "tray"
  | "app" | "globe" | "keyboard" | "terminal" | "lock" | "minimize"
  | "volume-off" | "volume" | "close-window" | "power" | "restart" | "moon"
  | "clipboard" | "delay" | "timer" | "download" | "external" | "check"
  | "chevron";

const icons: Record<IconName, LucideIcon> = {
  fingerprint: Fingerprint,
  shield: ShieldCheck,
  workflow: Workflow,
  palette: Palette,
  windows: Monitor,
  tray: PanelTop,
  app: AppWindow,
  globe: Globe2,
  keyboard: Keyboard,
  terminal: SquareTerminal,
  lock: LockKeyhole,
  minimize: Minimize2,
  "volume-off": VolumeX,
  volume: Volume2,
  "close-window": SquareX,
  power: Power,
  restart: RotateCcw,
  moon: Moon,
  clipboard: Clipboard,
  delay: Clock3,
  timer: Timer,
  download: Download,
  external: ExternalLink,
  check: Check,
  chevron: ChevronDown,
};

export function SiteIcon({
  name,
  size = 24,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={1.8}
      absoluteStrokeWidth
      aria-hidden="true"
    />
  );
}
