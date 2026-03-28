// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/components/demos/AlertsPreview", () => ({
	default: () => <div data-testid="alerts-preview" />,
}));

import DocsAlerts from "../[locale]/docs/alerts/page";

describe("DocsAlerts page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the bannerTitle key", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
		expect(screen.getByText("bannerTitle")).toBeTruthy();
	});

	it("renders the notifPanelTitle key", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
		expect(screen.getByText("notifPanelTitle")).toBeTruthy();
	});

	it("renders the thresholdsTitle key", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
		expect(screen.getByText("thresholdsTitle")).toBeTruthy();
	});

	it("renders the AlertsPreview component", async () => {
		const jsx = await DocsAlerts();
		render(jsx);
		expect(screen.getByTestId("alerts-preview")).toBeTruthy();
	});
});
