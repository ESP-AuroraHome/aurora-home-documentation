"use client";

import { ArrowRight, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { allPages, navigation } from "@/lib/docs-navigation";

/**
 * Trigger button that opens the command palette, showing a search icon and ⌘K hint.
 *
 * @param onOpen - Callback fired when the button is clicked
 */
export function CommandPaletteButton({ onOpen }: { onOpen: () => void }) {
	return (
		<button
			type="button"
			onClick={onOpen}
			className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-muted)] transition-all"
		>
			<Search className="w-3.5 h-3.5" />
			<span className="hidden sm:inline text-xs">Rechercher...</span>
			<kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--bg-muted)] text-[10px] text-[var(--text-muted)] font-mono">
				⌘K
			</kbd>
		</button>
	);
}

/**
 * Modal search palette for navigating docs pages, with keyboard arrow and Enter support.
 *
 * @param open - Whether the palette is currently visible
 * @param onClose - Callback fired when the user dismisses the palette (Escape or backdrop click)
 */
export function CommandPalette({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(0);
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const t = useTranslations("nav");

	const filtered =
		query.trim() === ""
			? allPages
			: allPages.filter((p) => {
					const pageTitle = t(p.titleKey).toLowerCase();
					const section = navigation.find((s) =>
						s.items.some((i) => i.href === p.href),
					);
					const sectionTitle = section ? t(section.titleKey).toLowerCase() : "";
					const q = query.toLowerCase();
					return pageTitle.includes(q) || sectionTitle.includes(q);
				});

	useEffect(() => {
		if (open) {
			setQuery("");
			setSelected(0);
			setTimeout(() => inputRef.current?.focus(), 50);
		}
	}, [open]);

	useEffect(() => {
		setSelected(0);
	}, []);

	useEffect(() => {
		if (!open) return;
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setSelected((s) => Math.min(s + 1, filtered.length - 1));
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setSelected((s) => Math.max(s - 1, 0));
			}
			if (e.key === "Enter" && filtered[selected]) {
				router.push(filtered[selected].href);
				onClose();
			}
		};
		window.addEventListener("keydown", handler);
		return () => window.removeEventListener("keydown", handler);
	}, [open, filtered, selected, router, onClose]);

	if (!open) return null;

	const getSectionTitle = (href: string) => {
		const section = navigation.find((s) =>
			s.items.some((i) => i.href === href),
		);
		return section ? t(section.titleKey) : "";
	};

	return (
		<div
			className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
			onClick={onClose}
		>
			{/* Backdrop */}
			<div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

			{/* Panel */}
			<div
				className="relative w-full max-w-lg mx-4 rounded-xl border border-[var(--border)] bg-[var(--bg-base)] shadow-2xl overflow-hidden"
				style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.3)" }}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Search input */}
				<div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-subtle)]">
					<Search className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0" />
					<input
						ref={inputRef}
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						placeholder="Rechercher dans la documentation..."
						className="flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] outline-none"
					/>
					{query && (
						<button
							type="button"
							onClick={() => setQuery("")}
							className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
						>
							<X className="w-4 h-4" />
						</button>
					)}
					<kbd className="hidden sm:flex items-center px-1.5 py-0.5 rounded bg-[var(--bg-muted)] text-[10px] text-[var(--text-muted)] font-mono">
						ESC
					</kbd>
				</div>

				{/* Results */}
				<div className="max-h-80 overflow-y-auto">
					{filtered.length === 0 ? (
						<div className="px-4 py-8 text-center text-sm text-[var(--text-muted)]">
							Aucun résultat pour &ldquo;{query}&rdquo;
						</div>
					) : (
						<div className="py-2">
							{filtered.map((page, i) => {
								const Icon = page.icon;
								const section = getSectionTitle(page.href);
								const isSelected = i === selected;
								return (
									<button
										type="button"
										key={page.href}
										className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
											isSelected
												? "bg-[var(--bg-muted)]"
												: "hover:bg-[var(--bg-card)]"
										}`}
										onClick={() => {
											router.push(page.href);
											onClose();
										}}
										onMouseEnter={() => setSelected(i)}
									>
										<div
											className={`p-1.5 rounded-md ${isSelected ? "bg-[var(--bg-muted)]" : "bg-[var(--bg-card)]"}`}
										>
											<Icon className="w-3.5 h-3.5 text-[var(--text-muted)]" />
										</div>
										<div className="flex-1 min-w-0">
											<span
												className={`text-sm ${isSelected ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}
											>
												{t(page.titleKey)}
											</span>
											<span className="ml-2 text-xs text-[var(--text-muted)]">
												{section}
											</span>
										</div>
										{isSelected && (
											<ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
										)}
									</button>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
