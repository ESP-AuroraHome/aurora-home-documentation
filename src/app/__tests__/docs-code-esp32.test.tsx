// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsCodeEsp32 from "../[locale]/docs/code-esp32/page";

describe("DocsCodeEsp32 page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsCodeEsp32();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsCodeEsp32();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the breadcrumbDocs key", async () => {
		const jsx = await DocsCodeEsp32();
		render(jsx);
		expect(screen.getByText("breadcrumbDocs")).toBeTruthy();
	});

	it("renders the aurora-home-esp32 folder name in the tree", async () => {
		const jsx = await DocsCodeEsp32();
		render(jsx);
		expect(screen.getByText("aurora-home-esp32")).toBeTruthy();
	});
});
