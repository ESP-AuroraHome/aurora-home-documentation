// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AlertsPreview from "../AlertsPreview";

async function openPanel() {
	render(<AlertsPreview />);
	// Bell button contains the unread badge (a digit span)
	const badge = screen.getByText(/^\d+$/);
	const bellBtn = badge.closest("button");
	if (bellBtn) await userEvent.click(bellBtn);
}

describe("AlertsPreview", () => {
	it("renders without crashing", () => {
		render(<AlertsPreview />);
	});

	it("shows unread count badge when there are unread alerts", () => {
		render(<AlertsPreview />);
		const btns = screen.getAllByRole("button");
		const withBadge = btns.find((b) => {
			const spans = b.querySelectorAll("span");
			return Array.from(spans).some((s) => /^\d+$/.test(s.textContent ?? ""));
		});
		expect(withBadge).toBeTruthy();
	});

	it("opens the notification panel on bell click", async () => {
		await openPanel();
		expect(screen.getByText("Alertes")).toBeTruthy();
	});

	it("shows Non lues and Résolues tabs", async () => {
		await openPanel();
		expect(screen.getByText("Non lues")).toBeTruthy();
		expect(screen.getByText("Résolues")).toBeTruthy();
	});

	it("can click Tout marquer résolu", async () => {
		await openPanel();
		const resolveAll = screen.getByText("Tout marquer résolu");
		await userEvent.click(resolveAll);
		expect(screen.getByText("Résolues")).toBeTruthy();
	});

	it("switches to Résolues tab after resolving all", async () => {
		await openPanel();
		await userEvent.click(screen.getByText("Tout marquer résolu"));
		await userEvent.click(screen.getByText("Résolues"));
		expect(screen.getByText("Résolues")).toBeTruthy();
	});

	it("shows Marquer résolu button on individual alert", async () => {
		await openPanel();
		const resolveBtn = screen.getAllByText("Marquer résolu");
		expect(resolveBtn.length).toBeGreaterThan(0);
	});

	it("resolves individual alert", async () => {
		await openPanel();
		const resolveBtns = screen.getAllByText("Marquer résolu");
		const initial = resolveBtns.length;
		await userEvent.click(resolveBtns[0]);
		const remaining = screen.queryAllByText("Marquer résolu");
		expect(remaining.length).toBeLessThan(initial);
	});
});
