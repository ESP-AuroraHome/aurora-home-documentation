"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

/**
 * Icon button that toggles between light and dark theme using the ThemeProvider context.
 */
export function ThemeToggle() {
	const { theme, toggle } = useTheme();

	if (!theme) return null;

	return (
		<button
			type="button"
			onClick={toggle}
			className="p-2 rounded-lg text-neutral-500 hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)] transition-all"
			aria-label={
				theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"
			}
			title={theme === "dark" ? "Mode clair" : "Mode sombre"}
		>
			{theme === "dark" ? (
				<Sun className="w-4 h-4" />
			) : (
				<Moon className="w-4 h-4" />
			)}
		</button>
	);
}
