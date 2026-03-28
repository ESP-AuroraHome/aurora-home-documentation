// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
	useLocale: vi.fn(() => "fr"),
}));

import { LanguageSwitcher } from "../LanguageSwitcher";

beforeEach(() => {
	vi.clearAllMocks();
	Object.defineProperty(window, "location", {
		value: { pathname: "/fr/docs", href: "" },
		writable: true,
		configurable: true,
	});
});

describe("LanguageSwitcher", () => {
	it("renders a button with current locale label", () => {
		render(<LanguageSwitcher />);
		expect(screen.getByRole("button", { name: /FR/i })).toBeTruthy();
	});

	it("opens dropdown on click", async () => {
		render(<LanguageSwitcher />);
		await userEvent.click(screen.getByRole("button", { name: /FR/i }));
		expect(screen.getByText("EN")).toBeTruthy();
		expect(screen.getByText("ES")).toBeTruthy();
	});

	it("closes dropdown when backdrop is clicked", async () => {
		render(<LanguageSwitcher />);
		await userEvent.click(screen.getByRole("button", { name: /FR/i }));
		expect(screen.getByText("EN")).toBeTruthy();
		// The backdrop uses Tailwind .fixed class, not inline style
		const backdrop = document.querySelector(".fixed") as HTMLElement;
		if (backdrop) await userEvent.click(backdrop);
		expect(screen.queryByText("EN")).toBeNull();
	});

	it("shows all 4 locales in the dropdown", async () => {
		render(<LanguageSwitcher />);
		await userEvent.click(screen.getByRole("button", { name: /FR/i }));
		expect(screen.getByText("EN")).toBeTruthy();
		expect(screen.getByText("ES")).toBeTruthy();
		expect(screen.getByText("中文")).toBeTruthy();
	});

	it("navigates to new locale path on locale click", async () => {
		render(<LanguageSwitcher />);
		await userEvent.click(screen.getByRole("button", { name: /FR/i }));
		await userEvent.click(screen.getByText("EN"));
		expect(window.location.href).toBe("/en/docs");
	});
});
