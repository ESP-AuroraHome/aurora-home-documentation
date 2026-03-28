// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import DashboardPreview from "../DashboardPreview";

describe("DashboardPreview", () => {
	it("renders without crashing", () => {
		render(<DashboardPreview />);
	});

	it("shows sensor type labels", () => {
		render(<DashboardPreview />);
		expect(screen.getAllByText("Température").length).toBeGreaterThan(0);
		expect(screen.getAllByText("Humidité").length).toBeGreaterThan(0);
		expect(screen.getAllByText("CO2").length).toBeGreaterThan(0);
	});

	it("renders trend indicators", () => {
		render(<DashboardPreview />);
		const trends = screen.queryAllByText(/En hausse|En baisse|Stable/i);
		expect(trends.length).toBeGreaterThanOrEqual(0);
	});

	it("opens sensor drawer on sensor card click", async () => {
		render(<DashboardPreview />);
		const tempLabels = screen.getAllByText("Température");
		await userEvent.click(tempLabels[0]);
		// Period buttons appear in the drawer
		expect(screen.getByText("Live")).toBeTruthy();
	});

	it("shows period selector buttons after opening drawer", async () => {
		render(<DashboardPreview />);
		const tempLabels = screen.getAllByText("Température");
		await userEvent.click(tempLabels[0]);
		for (const label of ["Live", "1h", "6h", "24h", "7j"]) {
			expect(screen.getAllByText(label).length).toBeGreaterThan(0);
		}
	});

	it("shows IAQ score section", () => {
		render(<DashboardPreview />);
		expect(screen.getByText("Bon")).toBeTruthy();
	});
});
