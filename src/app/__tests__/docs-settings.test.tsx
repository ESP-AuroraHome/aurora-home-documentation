// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/components/demos/SettingsPreview", () => ({
	default: () => <div data-testid="settings-preview" />,
}));

import DocsSettings from "../[locale]/docs/settings/page";

describe("DocsSettings page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsSettings();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsSettings();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsSettings();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the notifTitle key", async () => {
		const jsx = await DocsSettings();
		render(jsx);
		expect(screen.getByText("notifTitle")).toBeTruthy();
	});

	it("renders the threshTitle key", async () => {
		const jsx = await DocsSettings();
		render(jsx);
		expect(screen.getByText("threshTitle")).toBeTruthy();
	});

	it("renders the SettingsPreview component", async () => {
		const jsx = await DocsSettings();
		render(jsx);
		expect(screen.getByTestId("settings-preview")).toBeTruthy();
	});
});
