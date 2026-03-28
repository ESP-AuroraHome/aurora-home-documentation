// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/components/demos/DashboardPreview", () => ({
	default: () => <div data-testid="dashboard-preview" />,
}));

import DocsDashboard from "../[locale]/docs/dashboard/page";

describe("DocsDashboard page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsDashboard();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsDashboard();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsDashboard();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the sensorsTitle key", async () => {
		const jsx = await DocsDashboard();
		render(jsx);
		expect(screen.getByText("sensorsTitle")).toBeTruthy();
	});

	it("renders the iaqTitle key", async () => {
		const jsx = await DocsDashboard();
		render(jsx);
		expect(screen.getByText("iaqTitle")).toBeTruthy();
	});

	it("renders the DashboardPreview component", async () => {
		const jsx = await DocsDashboard();
		render(jsx);
		expect(screen.getByTestId("dashboard-preview")).toBeTruthy();
	});
});
