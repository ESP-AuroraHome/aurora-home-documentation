// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsInstallationEsp32 from "../[locale]/docs/installation-esp32/page";

describe("DocsInstallationEsp32 page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the hardwarePrereqTitle key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("hardwarePrereqTitle")).toBeTruthy();
	});

	it("renders the softwarePrereqTitle key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("softwarePrereqTitle")).toBeTruthy();
	});

	it("renders the wiringTitle key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("wiringTitle")).toBeTruthy();
	});

	it("renders the stepsTitle key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("stepsTitle")).toBeTruthy();
	});

	it("renders the verificationTitle key", async () => {
		const jsx = await DocsInstallationEsp32();
		render(jsx);
		expect(screen.getByText("verificationTitle")).toBeTruthy();
	});
});
