// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsInstallation from "../[locale]/docs/installation/page";

describe("DocsInstallation page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the prereqTitle key", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
		expect(screen.getByText("prereqTitle")).toBeTruthy();
	});

	it("renders the stepsTitle key", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
		expect(screen.getByText("stepsTitle")).toBeTruthy();
	});

	it("renders the commandsTitle key", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
		expect(screen.getByText("commandsTitle")).toBeTruthy();
	});

	it("renders the verificationTitle key", async () => {
		const jsx = await DocsInstallation();
		render(jsx);
		expect(screen.getByText("verificationTitle")).toBeTruthy();
	});
});
