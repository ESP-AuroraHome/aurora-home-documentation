// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsArchitecture from "../[locale]/docs/architecture/page";

describe("DocsArchitecture page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsArchitecture();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsArchitecture();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsArchitecture();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the schemaTitle key", async () => {
		const jsx = await DocsArchitecture();
		render(jsx);
		expect(screen.getByText("schemaTitle")).toBeTruthy();
	});

	it("renders the layersTitle key", async () => {
		const jsx = await DocsArchitecture();
		render(jsx);
		expect(screen.getByText("layersTitle")).toBeTruthy();
	});

	it("renders the decisionsTitle key", async () => {
		const jsx = await DocsArchitecture();
		render(jsx);
		expect(screen.getByText("decisionsTitle")).toBeTruthy();
	});
});
