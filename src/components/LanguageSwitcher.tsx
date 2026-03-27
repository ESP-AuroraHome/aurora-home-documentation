"use client";
import { Check, Globe } from "lucide-react";
import { useLocale } from "next-intl";
import { useState } from "react";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
	fr: "FR",
	en: "EN",
	es: "ES",
	zh: "中文",
};

/**
 * Dropdown button for switching the active locale (FR / EN / ES / ZH) via a full-page navigation.
 */
export function LanguageSwitcher() {
	const locale = useLocale();
	const [open, setOpen] = useState(false);

	const switchLocale = (newLocale: string) => {
		const current = window.location.pathname;
		const newPath = current.replace(
			new RegExp(`^/(${routing.locales.join("|")})`),
			`/${newLocale}`,
		);
		window.location.href = newPath;
		setOpen(false);
	};

	return (
		<div className="relative">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all"
			>
				<Globe className="w-3.5 h-3.5" />
				{LOCALE_LABELS[locale]}
			</button>

			{open && (
				<>
					<div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
					<div className="absolute right-0 top-full mt-1 z-50 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl shadow-xl overflow-hidden min-w-[100px]">
						{routing.locales.map((l) => (
							<button
								key={l}
								type="button"
								onClick={() => switchLocale(l)}
								className="w-full flex items-center justify-between gap-3 px-3 py-2 text-sm hover:bg-[var(--bg-muted)] transition-colors text-left"
							>
								<span
									className={
										l === locale
											? "text-[var(--text-primary)] font-medium"
											: "text-[var(--text-secondary)]"
									}
								>
									{LOCALE_LABELS[l]}
								</span>
								{l === locale && (
									<Check className="w-3.5 h-3.5 text-[var(--text-primary)]" />
								)}
							</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
