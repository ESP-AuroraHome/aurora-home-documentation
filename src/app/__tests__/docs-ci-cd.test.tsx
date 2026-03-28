// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsCiCd from "../[locale]/docs/ci-cd/page";

describe("DocsCiCd page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the ciTitle key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getAllByText("ciTitle").length).toBeGreaterThan(0);
	});

	it("renders the coverageTitle key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("coverageTitle")).toBeTruthy();
	});

	it("renders the prAgentTitle key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("prAgentTitle")).toBeTruthy();
	});

	it("renders the vercelTitle key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("vercelTitle")).toBeTruthy();
	});

	it("renders the coderabbitTitle key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("coderabbitTitle")).toBeTruthy();
	});

	it("renders the precommitTitle key", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("precommitTitle")).toBeTruthy();
	});
});
