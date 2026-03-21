import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "Aurora Home — Documentation",
  description: "Documentation complète du système Aurora Home : application web et firmware ESP32 pour la surveillance environnementale.",
};

const THEME_SCRIPT = `
try {
  const theme = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.toggle('dark', theme === 'dark');
} catch(e) {}
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
