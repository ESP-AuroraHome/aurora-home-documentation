// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/components/demos/AuthPreview", () => ({
	default: () => <div data-testid="auth-preview" />,
}));

import DocsAuth from "../[locale]/docs/auth/page";

describe("DocsAuth page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsAuth();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsAuth();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsAuth();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the howToTitle key", async () => {
		const jsx = await DocsAuth();
		render(jsx);
		expect(screen.getByText("howToTitle")).toBeTruthy();
	});

	it("renders the faqTitle key", async () => {
		const jsx = await DocsAuth();
		render(jsx);
		expect(screen.getByText("faqTitle")).toBeTruthy();
	});

	it("renders the AuthPreview component", async () => {
		const jsx = await DocsAuth();
		render(jsx);
		expect(screen.getByTestId("auth-preview")).toBeTruthy();
	});
});
