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
  title: string;
  href: string;
  icon: LucideIcon;
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export const navigation: NavSection[] = [
  {
    title: "Pour commencer",
    items: [
      { title: "Introduction", href: "/docs", icon: Book },
      { title: "Installation App", href: "/docs/installation", icon: Download },
      { title: "Installation ESP32", href: "/docs/installation-esp32", icon: Cpu },
    ],
  },
  {
    title: "Documentation Utilisateur",
    items: [
      { title: "Tableau de bord", href: "/docs/dashboard", icon: LayoutDashboard },
      { title: "Alertes & Anomalies", href: "/docs/alerts", icon: Bell },
      { title: "Authentification", href: "/docs/auth", icon: KeyRound },
      { title: "Onboarding", href: "/docs/onboarding", icon: UserPlus },
      { title: "Profil", href: "/docs/profile", icon: UserCircle },
    ],
  },
  {
    title: "Documentation Technique",
    items: [
      { title: "Architecture", href: "/docs/architecture", icon: Layers },
      { title: "API REST", href: "/docs/api", icon: Server },
      { title: "Base de données", href: "/docs/database", icon: Database },
      { title: "MQTT & Capteurs", href: "/docs/mqtt", icon: Wifi },
    ],
  },
  {
    title: "Pour les développeurs",
    items: [
      { title: "Simulateur de capteurs", href: "/docs/simulator", icon: Terminal },
      { title: "Conventions App", href: "/docs/code-app", icon: Code },
      { title: "Conventions ESP32", href: "/docs/code-esp32", icon: Microchip },
      { title: "Contribuer", href: "/docs/contribution", icon: GitBranch },
    ],
  },
];

export const allPages = navigation.flatMap((section) => section.items);
