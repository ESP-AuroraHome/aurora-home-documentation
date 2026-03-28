// @vitest-environment jsdom
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider } from "../ThemeProvider";
import { ThemeToggle } from "../ThemeToggle";

function Wrapper() {
	return (
		<ThemeProvider>
			<ThemeToggle />
		</ThemeProvider>
	);
}

beforeEach(() => {
	localStorage.clear();
	document.documentElement.classList.remove("dark");
});

describe("ThemeToggle", () => {
	it("renders a button", async () => {
		render(<Wrapper />);
		await act(async () => {});
		expect(screen.getByRole("button")).toBeTruthy();
	});

	it("shows switch-to-light label when theme is dark", async () => {
		render(<Wrapper />);
		await act(async () => {});
		expect(screen.getByRole("button").getAttribute("aria-label")).toBe(
			"Passer en mode clair",
		);
	});

	it("shows switch-to-dark label when theme is light", async () => {
		localStorage.setItem("theme", "light");
		render(<Wrapper />);
		await act(async () => {});
		expect(screen.getByRole("button").getAttribute("aria-label")).toBe(
			"Passer en mode sombre",
		);
	});

	it("toggles theme on click", async () => {
		render(<Wrapper />);
		await act(async () => {});
		await userEvent.click(screen.getByRole("button"));
		expect(localStorage.getItem("theme")).toBe("light");
	});

	it("renders nothing before theme is initialised", () => {
		render(<ThemeToggle />);
		expect(screen.queryByRole("button")).toBeNull();
	});
});
