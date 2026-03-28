// @vitest-environment jsdom
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import AuthPreview from "../AuthPreview";

async function submitEmail(email: string) {
	const input = screen.getByPlaceholderText("jean.dupont@email.com");
	await userEvent.type(input, email);
	await userEvent.click(screen.getByText("Se connecter"));
}

async function fillOtp(code: string) {
	for (let i = 0; i < 6; i++) {
		const slot = document.getElementById(`otp-slot-${i}`) as HTMLInputElement;
		if (slot) fireEvent.change(slot, { target: { value: code[i] } });
	}
}

describe("AuthPreview — login screen", () => {
	it("renders the login screen by default", () => {
		render(<AuthPreview />);
		expect(screen.getByText("Connexion")).toBeTruthy();
	});

	it("shows an error when submitting an empty email", async () => {
		render(<AuthPreview />);
		await userEvent.click(screen.getByText("Se connecter"));
		expect(screen.getByText("Adresse email invalide.")).toBeTruthy();
	});

	it("shows an error for an invalid email format", async () => {
		render(<AuthPreview />);
		await submitEmail("notanemail");
		expect(screen.getByText("Adresse email invalide.")).toBeTruthy();
	});

	it("clears the error when the user starts typing", async () => {
		render(<AuthPreview />);
		await userEvent.click(screen.getByText("Se connecter"));
		expect(screen.getByText("Adresse email invalide.")).toBeTruthy();
		const input = screen.getByPlaceholderText("jean.dupont@email.com");
		await userEvent.type(input, "a");
		expect(screen.queryByText("Adresse email invalide.")).toBeNull();
	});

	it("navigates to OTP screen on valid email", async () => {
		render(<AuthPreview />);
		await submitEmail("user@example.com");
		expect(screen.getByText("user@example.com")).toBeTruthy();
	});
});

describe("AuthPreview — OTP screen", () => {
	async function goToOtp() {
		render(<AuthPreview />);
		await submitEmail("user@example.com");
	}

	it("shows the OTP screen after valid email submission", async () => {
		await goToOtp();
		expect(screen.getByText("Code de vérification")).toBeTruthy();
	});

	it("Vérifier button is disabled with empty OTP", async () => {
		await goToOtp();
		const btn = screen.getByText("Vérifier").closest("button");
		expect(btn?.disabled).toBe(true);
	});

	it("Vérifier button enables after 6 digits are entered", async () => {
		await goToOtp();
		await fillOtp("123456");
		const btn = screen.getByText("Vérifier").closest("button");
		expect(btn?.disabled).toBe(false);
	});

	it("navigates back to login on back button click", async () => {
		await goToOtp();
		await userEvent.click(screen.getByText(/Changer d['']adresse email/));
		expect(screen.getByText("Connexion")).toBeTruthy();
	});
});

describe("AuthPreview — success screen", () => {
	async function goToSuccess() {
		render(<AuthPreview />);
		await submitEmail("user@example.com");
		await fillOtp("123456");
		await userEvent.click(screen.getByText("Vérifier"));
	}

	it("shows success screen after OTP verification", async () => {
		await goToSuccess();
		expect(screen.getByText("Connexion réussie !")).toBeTruthy();
	});

	it("resets back to login on restart", async () => {
		await goToSuccess();
		await userEvent.click(screen.getByText("Recommencer la démo"));
		expect(screen.getByText("Connexion")).toBeTruthy();
	});
});
