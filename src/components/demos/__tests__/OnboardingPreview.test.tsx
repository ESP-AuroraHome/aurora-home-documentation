// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
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

import OnboardingPreview from "../OnboardingPreview";

describe("OnboardingPreview — step 0 (welcome)", () => {
	it("renders the welcome screen by default", () => {
		render(<OnboardingPreview />);
		expect(screen.getByText("Bienvenue sur Aurora Home")).toBeTruthy();
	});

	it("Continuer button is disabled when name is empty", () => {
		render(<OnboardingPreview />);
		const btn = screen.getByText("Continuer").closest("button");
		expect(btn?.disabled).toBe(true);
	});

	it("Continuer button is enabled after typing a name", async () => {
		render(<OnboardingPreview />);
		const input = screen.getByPlaceholderText("Ex : Marie");
		await userEvent.type(input, "Alice");
		const btn = screen.getByText("Continuer").closest("button");
		expect(btn?.disabled).toBe(false);
	});

	it("advances to step 1 on Continuer click", async () => {
		render(<OnboardingPreview />);
		const input = screen.getByPlaceholderText("Ex : Marie");
		await userEvent.type(input, "Alice");
		await userEvent.click(screen.getByText("Continuer"));
		expect(screen.getByText("Choisissez votre avatar")).toBeTruthy();
	});
});

describe("OnboardingPreview — step 1 (avatar)", () => {
	async function goToStep1() {
		render(<OnboardingPreview />);
		const input = screen.getByPlaceholderText("Ex : Marie");
		await userEvent.type(input, "Alice");
		await userEvent.click(screen.getByText("Continuer"));
	}

	it("shows avatar selection screen", async () => {
		await goToStep1();
		expect(screen.getByText("Choisissez votre avatar")).toBeTruthy();
	});

	it("shows Retour button", async () => {
		await goToStep1();
		expect(screen.getByText("Retour")).toBeTruthy();
	});

	it("goes back to step 0 on Retour click", async () => {
		await goToStep1();
		await userEvent.click(screen.getByText("Retour"));
		expect(screen.getByText("Bienvenue sur Aurora Home")).toBeTruthy();
	});

	it("advances to step 2 on Continuer click", async () => {
		await goToStep1();
		await userEvent.click(screen.getByText("Continuer"));
		expect(screen.getByText("Français")).toBeTruthy();
	});
});

describe("OnboardingPreview — step 2 (locale)", () => {
	async function goToStep2() {
		render(<OnboardingPreview />);
		const input = screen.getByPlaceholderText("Ex : Marie");
		await userEvent.type(input, "Alice");
		await userEvent.click(screen.getByText("Continuer"));
		await userEvent.click(screen.getByText("Continuer"));
	}

	it("shows language selection screen", async () => {
		await goToStep2();
		expect(screen.getByText("Français")).toBeTruthy();
		expect(screen.getByText("English")).toBeTruthy();
	});

	it("shows Accéder au dashboard button", async () => {
		await goToStep2();
		expect(screen.getByText("Accéder au dashboard")).toBeTruthy();
	});

	it("finishes onboarding and shows success screen", async () => {
		await goToStep2();
		await userEvent.click(screen.getByText("Accéder au dashboard"));
		expect(screen.getByText(/Bienvenue/)).toBeTruthy();
	});
});

describe("OnboardingPreview — success screen", () => {
	async function goToSuccess() {
		render(<OnboardingPreview />);
		const input = screen.getByPlaceholderText("Ex : Marie");
		await userEvent.type(input, "Alice");
		await userEvent.click(screen.getByText("Continuer"));
		await userEvent.click(screen.getByText("Continuer"));
		await userEvent.click(screen.getByText("Accéder au dashboard"));
	}

	it("shows restart button", async () => {
		await goToSuccess();
		expect(screen.getByText("Recommencer la démo")).toBeTruthy();
	});

	it("restarts back to step 0", async () => {
		await goToSuccess();
		await userEvent.click(screen.getByText("Recommencer la démo"));
		expect(screen.getByText("Bienvenue sur Aurora Home")).toBeTruthy();
	});
});
