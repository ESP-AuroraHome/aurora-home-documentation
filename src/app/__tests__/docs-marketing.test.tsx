// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsMarketing from "../[locale]/docs/marketing/page";

describe("DocsMarketing page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsMarketing();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsMarketing();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the breadcrumbDocs key", async () => {
		const jsx = await DocsMarketing();
		render(jsx);
		expect(screen.getByText("breadcrumbDocs")).toBeTruthy();
	});

	it("renders the aurora-home-marketing text in the tree", async () => {
		const jsx = await DocsMarketing();
		render(jsx);
		expect(screen.getAllByText("aurora-home-marketing").length).toBeGreaterThan(
			0,
		);
	});
});
