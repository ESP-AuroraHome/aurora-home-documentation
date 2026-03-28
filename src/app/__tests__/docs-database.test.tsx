// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsDatabase from "../[locale]/docs/database/page";

describe("DocsDatabase page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsDatabase();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsDatabase();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the modelsTitle key", async () => {
		const jsx = await DocsDatabase();
		render(jsx);
		expect(screen.getByText("modelsTitle")).toBeTruthy();
	});

	it("renders the enumsTitle key", async () => {
		const jsx = await DocsDatabase();
		render(jsx);
		expect(screen.getByText("enumsTitle")).toBeTruthy();
	});

	it("renders the prismaCommandsTitle key", async () => {
		const jsx = await DocsDatabase();
		render(jsx);
		expect(screen.getByText("prismaCommandsTitle")).toBeTruthy();
	});

	it("renders the newModelsTitle key", async () => {
		const jsx = await DocsDatabase();
		render(jsx);
		expect(screen.getByText("newModelsTitle")).toBeTruthy();
	});
});
