// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider, useTheme } from "../ThemeProvider";

function ThemeConsumer() {
	const { theme, toggle } = useTheme();
	return (
		<div>
			<span data-testid="theme">{theme}</span>
			<button type="button" onClick={toggle}>
				toggle
			</button>
		</div>
	);
}

beforeEach(() => {
	localStorage.clear();
	document.documentElement.classList.remove("dark");
});

afterEach(() => {
	vi.restoreAllMocks();
});

describe("ThemeProvider", () => {
	it("defaults to dark theme when no localStorage value", async () => {
		render(
			<ThemeProvider>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		await act(async () => {});
		expect(screen.getByTestId("theme").textContent).toBe("dark");
	});

	it("reads initial theme from localStorage", async () => {
		localStorage.setItem("theme", "light");
		render(
			<ThemeProvider>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		await act(async () => {});
		expect(screen.getByTestId("theme").textContent).toBe("light");
	});

	it("adds dark class to documentElement when theme is dark", async () => {
		render(
			<ThemeProvider>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		await act(async () => {});
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});

	it("toggles theme on button click", async () => {
		render(
			<ThemeProvider>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		await act(async () => {});
		await userEvent.click(screen.getByRole("button", { name: "toggle" }));
		expect(screen.getByTestId("theme").textContent).toBe("light");
		expect(localStorage.getItem("theme")).toBe("light");
	});

	it("removes dark class after toggling to light", async () => {
		render(
			<ThemeProvider>
				<ThemeConsumer />
			</ThemeProvider>,
		);
		await act(async () => {});
		await userEvent.click(screen.getByRole("button", { name: "toggle" }));
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});
});

describe("useTheme default context", () => {
	it("returns null theme outside provider", () => {
		function Outside() {
			const { theme } = useTheme();
			return <span data-testid="t">{String(theme)}</span>;
		}
		render(<Outside />);
		expect(screen.getByTestId("t").textContent).toBe("null");
	});
});
