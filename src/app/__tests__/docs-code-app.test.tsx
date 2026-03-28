// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsCodeApp from "../[locale]/docs/code-app/page";

describe("DocsCodeApp page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsCodeApp();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsCodeApp();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the breadcrumbDocs key", async () => {
		const jsx = await DocsCodeApp();
		render(jsx);
		expect(screen.getByText("breadcrumbDocs")).toBeTruthy();
	});

	it("renders the aurora-home-app folder name in the tree", async () => {
		const jsx = await DocsCodeApp();
		render(jsx);
		expect(screen.getByText("aurora-home-app")).toBeTruthy();
	});
});
