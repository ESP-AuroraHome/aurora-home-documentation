// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

import DocsIntroduction from "../[locale]/docs/page";

describe("DocsIntroduction page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsIntroduction();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsIntroduction();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsIntroduction();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the esp32CardTitle key", async () => {
		const jsx = await DocsIntroduction();
		render(jsx);
		expect(screen.getByText("esp32CardTitle")).toBeTruthy();
	});

	it("renders a link to installation", async () => {
		const jsx = await DocsIntroduction();
		render(jsx);
		const link = screen
			.getAllByRole("link")
			.find((el) => el.getAttribute("href") === "/docs/installation");
		expect(link).toBeTruthy();
	});

	it("renders the architectureTitle key", async () => {
		const jsx = await DocsIntroduction();
		render(jsx);
		expect(screen.getByText("architectureTitle")).toBeTruthy();
	});
});
