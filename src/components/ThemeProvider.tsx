"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

const ThemeContext = createContext<{
	theme: Theme | null;
	toggle: () => void;
}>({ theme: null, toggle: () => {} });

/**
 * Context provider that initialises the theme from localStorage and exposes a toggle function.
 *
 * @param children - Application subtree that can consume `useTheme()`
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("theme") as Theme | null;
		const initial = stored ?? "dark";
		setTheme(initial);
		document.documentElement.classList.toggle("dark", initial === "dark");
	}, []);

	const toggle = () => {
		const next = theme === "dark" ? "light" : "dark";
		setTheme(next);
		localStorage.setItem("theme", next);
		document.documentElement.classList.toggle("dark", next === "dark");
	};

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
}

/**
 * Returns the current theme and a function to toggle between light and dark.
 *
 * @returns `{ theme, toggle }` — current theme (`'light' | 'dark'`) and a toggle callback
 */
export const useTheme = () => useContext(ThemeContext);
