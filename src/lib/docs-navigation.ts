import {
  Book,
  Download,
  Cpu,
  LayoutDashboard,
  KeyRound,
  UserCircle,
  Layers,
  Server,
  Database,
  Wifi,
  Code,
  Microchip,
  GitBranch,
  UserPlus,
  Bell,
  Terminal,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  titleKey: string;
  href: string;
  icon: LucideIcon;
};

export type NavSection = {
  titleKey: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    titleKey: "gettingStarted",
    items: [
      { titleKey: "introduction", href: "/docs", icon: Book },
      { titleKey: "installApp", href: "/docs/installation", icon: Download },
      { titleKey: "installEsp32", href: "/docs/installation-esp32", icon: Cpu },
    ],
  },
  {
    titleKey: "userDoc",
    items: [
      { titleKey: "dashboard", href: "/docs/dashboard", icon: LayoutDashboard },
      { titleKey: "alerts", href: "/docs/alerts", icon: Bell },
      { titleKey: "auth", href: "/docs/auth", icon: KeyRound },
      { titleKey: "onboarding", href: "/docs/onboarding", icon: UserPlus },
      { titleKey: "profile", href: "/docs/profile", icon: UserCircle },
    ],
  },
  {
    titleKey: "techDoc",
    items: [
      { titleKey: "architecture", href: "/docs/architecture", icon: Layers },
      { titleKey: "api", href: "/docs/api", icon: Server },
      { titleKey: "database", href: "/docs/database", icon: Database },
      { titleKey: "mqtt", href: "/docs/mqtt", icon: Wifi },
    ],
  },
  {
    titleKey: "devDoc",
    items: [
      { titleKey: "simulator", href: "/docs/simulator", icon: Terminal },
      { titleKey: "codeApp", href: "/docs/code-app", icon: Code },
      { titleKey: "codeEsp32", href: "/docs/code-esp32", icon: Microchip },
      { titleKey: "contribution", href: "/docs/contribution", icon: GitBranch },
    ],
  },
];

export const allPages = navigation.flatMap((section) => section.items);
