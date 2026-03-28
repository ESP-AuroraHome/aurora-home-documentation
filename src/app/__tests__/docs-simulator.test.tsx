// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsSimulator from "../[locale]/docs/simulator/page";

describe("DocsSimulator page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the npmCommandsTitle key", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
		expect(screen.getByText("npmCommandsTitle")).toBeTruthy();
	});

	it("renders the advancedTitle key", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
		expect(screen.getByText("advancedTitle")).toBeTruthy();
	});

	it("renders the endpointTitle key", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
		expect(screen.getByText("endpointTitle")).toBeTruthy();
	});

	it("renders the seedCommandsTitle key", async () => {
		const jsx = await DocsSimulator();
		render(jsx);
		expect(screen.getByText("seedCommandsTitle")).toBeTruthy();
	});
});
