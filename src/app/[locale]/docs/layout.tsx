"use client";

import { usePathname } from "@/lib/navigation";
import { Link } from "@/lib/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronRight, Github } from "lucide-react";
import { navigation, allPages } from "@/lib/docs-navigation";
import { CommandPalette, CommandPaletteButton } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations();
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const currentIndex = allPages.findIndex((page) => page.href === pathname);
  const prevPage = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const nextPage = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] overflow-x-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border-subtle)]">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/docs" className="flex items-center gap-2.5">
            <Image
              src="/assets/logo.png"
              alt="Aurora Home"
              width={24}
              height={24}
              className="w-6 h-6 object-contain invert dark:invert-0"
            />
            <span className="font-semibold text-[var(--text-primary)]">Aurora Home</span>
            <span className="text-[var(--text-muted)] text-sm">Docs</span>
          </Link>

          <div className="flex items-center gap-1">
            <CommandPaletteButton onOpen={() => setPaletteOpen(true)} />
            <ThemeToggle />
            <LanguageSwitcher />
            <span className="text-xs text-[var(--text-muted)] hidden md:block px-2">{t("layout.version")}</span>
            <a
              href="https://github.com/ESP-AuroraHome"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <div className="flex pt-14">
        <aside className="hidden lg:block w-64 fixed left-0 top-14 bottom-0 overflow-y-auto border-r border-[var(--border-subtle)] bg-[var(--bg-base)]">
          <nav className="p-6 space-y-8">
            {navigation.map((section) => (
              <div key={section.titleKey}>
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  {t(`nav.${section.titleKey}`)}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                            isActive
                              ? "bg-[var(--bg-muted)] text-[var(--text-primary)] font-medium"
                              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {t(`nav.${item.titleKey}`)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-[var(--bg-base)] border-b border-[var(--border-subtle)]" style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <nav className="flex gap-1 p-2" style={{ width: "max-content" }}>
            {allPages.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[var(--text-primary)] text-[var(--bg-base)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                  }`}
                >
                  {t(`nav.${item.titleKey}`)}
                </Link>
              );
            })}
          </nav>
        </div>

        <main className="flex-1 min-w-0 lg:ml-64 min-h-screen">
          <div
            key={pathname}
            className="max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-16 mt-12 lg:mt-0 animate-fade-in"
          >
            {children}

            <div className="mt-16 pt-8 border-t border-[var(--border-subtle)] flex items-center justify-between">
              {prevPage ? (
                <Link href={prevPage.href} className="group flex flex-col items-start">
                  <span className="text-xs text-[var(--text-muted)] mb-1">{t("layout.previous")}</span>
                  <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    {t(`nav.${prevPage.titleKey}`)}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPage ? (
                <Link href={nextPage.href} className="group flex flex-col items-end">
                  <span className="text-xs text-[var(--text-muted)] mb-1">{t("layout.next")}</span>
                  <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors flex items-center gap-2">
                    {t(`nav.${nextPage.titleKey}`)}
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
