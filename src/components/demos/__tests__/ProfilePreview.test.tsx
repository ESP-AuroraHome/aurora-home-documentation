// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("@dicebear/core", () => ({
	createAvatar: vi.fn(() => ({ toDataUri: () => "data:image/svg+xml,mock" })),
}));

vi.mock("@dicebear/collection", () => ({
	adventurer: {},
	avataaars: {},
	bottts: {},
	funEmoji: {},
	identicon: {},
	lorelei: {},
	micah: {},
	miniavs: {},
	openPeeps: {},
	personas: {},
	pixelArt: {},
	shapes: {},
	thumbs: {},
}));

import ProfilePreview from "../ProfilePreview";

describe("ProfilePreview", () => {
	it("renders without crashing", () => {
		render(<ProfilePreview />);
	});

	it("shows the user name", () => {
		render(<ProfilePreview />);
		expect(screen.getByText("Marie Dupont")).toBeTruthy();
	});

	it("shows the user email", () => {
		render(<ProfilePreview />);
		expect(screen.getByText("marie@example.com")).toBeTruthy();
	});

	it("shows sign out button", () => {
		render(<ProfilePreview />);
		expect(screen.getByText("Se déconnecter")).toBeTruthy();
	});

	it("does not show save button initially (no changes)", () => {
		render(<ProfilePreview />);
		expect(screen.queryByText("Enregistrer")).toBeNull();
	});

	it("opens avatar picker when avatar image is clicked", async () => {
		render(<ProfilePreview />);
		// The avatar button wraps the avatar image; clicking it opens the picker
		await userEvent.click(screen.getByAltText("Marie Dupont"));
		expect(screen.getByText("Choisir un avatar")).toBeTruthy();
	});

	it("shows Enregistrer button after clicking a name to edit", async () => {
		render(<ProfilePreview />);
		await userEvent.click(screen.getByText("Marie Dupont"));
		const input = screen.getByDisplayValue("Marie Dupont");
		await userEvent.clear(input);
		await userEvent.type(input, "Alice");
		await userEvent.keyboard("{Enter}");
		expect(screen.getByText("Enregistrer")).toBeTruthy();
	});

	it("shows language options when locale field is clicked", async () => {
		render(<ProfilePreview />);
		// Click the edit button (SquarePen) next to the locale text to open the select
		const localeSpan = screen.getByText("Français");
		const editBtn = localeSpan.parentElement?.querySelector("button");
		if (editBtn) await userEvent.click(editBtn);
		expect(screen.getByRole("combobox")).toBeTruthy();
	});

	it("shows Enregistrer after switching language", async () => {
		render(<ProfilePreview />);
		const localeSpan = screen.getByText("Français");
		const editBtn = localeSpan.parentElement?.querySelector("button");
		if (editBtn) await userEvent.click(editBtn);
		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "en" } });
		expect(screen.getByText("Enregistrer")).toBeTruthy();
	});

	it("hides Enregistrer after saving", async () => {
		render(<ProfilePreview />);
		const localeSpan = screen.getByText("Français");
		const editBtn = localeSpan.parentElement?.querySelector("button");
		if (editBtn) await userEvent.click(editBtn);
		const select = screen.getByRole("combobox");
		fireEvent.change(select, { target: { value: "en" } });
		expect(screen.getByText("Enregistrer")).toBeTruthy();
		await userEvent.click(screen.getByText("Enregistrer"));
		// After save, hasChanges is false so the button disappears
		expect(screen.queryByText("Enregistrer")).toBeNull();
	});

	it("opens email edit mode and shows email input", async () => {
		render(<ProfilePreview />);
		const emailSpan = screen.getByText("marie@example.com");
		const editBtn = emailSpan.parentElement?.querySelector("button");
		if (editBtn) await userEvent.click(editBtn);
		expect(screen.getByDisplayValue("marie@example.com")).toBeTruthy();
	});

	it("shows Enregistrer after changing email", async () => {
		render(<ProfilePreview />);
		const emailSpan = screen.getByText("marie@example.com");
		const editBtn = emailSpan.parentElement?.querySelector("button");
		if (editBtn) await userEvent.click(editBtn);
		const input = screen.getByDisplayValue("marie@example.com");
		fireEvent.change(input, { target: { value: "new@example.com" } });
		fireEvent.keyDown(input, { key: "Enter" });
		expect(screen.getByText("Enregistrer")).toBeTruthy();
	});

	it("name input blurs and saves on tab", async () => {
		render(<ProfilePreview />);
		await userEvent.click(screen.getByText("Marie Dupont"));
		const input = screen.getByDisplayValue("Marie Dupont");
		fireEvent.blur(input);
		// After blur, editing mode closes
		expect(screen.queryByDisplayValue("Marie Dupont")).toBeNull();
	});
});
