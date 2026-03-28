// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.stubGlobal(
	"fetch",
	vi.fn(async () => ({
		ok: true,
		json: async () => [],
	})),
);

import DocsContribution from "../[locale]/docs/contribution/page";

describe("DocsContribution page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsContribution();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsContribution();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsContribution();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the workflowTitle key", async () => {
		const jsx = await DocsContribution();
		render(jsx);
		expect(screen.getByText("workflowTitle")).toBeTruthy();
	});

	it("renders the contributorsTitle key", async () => {
		const jsx = await DocsContribution();
		render(jsx);
		expect(screen.getByText("contributorsTitle")).toBeTruthy();
	});

	it("renders the twoReposTitle key", async () => {
		const jsx = await DocsContribution();
		render(jsx);
		expect(screen.getByText("twoReposTitle")).toBeTruthy();
	});
});
