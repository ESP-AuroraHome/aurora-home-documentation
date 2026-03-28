// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/components/demos/OnboardingPreview", () => ({
	default: () => <div data-testid="onboarding-preview" />,
}));

import DocsOnboarding from "../[locale]/docs/onboarding/page";

describe("DocsOnboarding page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the triggerTitle key", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
		expect(screen.getByText("triggerTitle")).toBeTruthy();
	});

	it("renders the stepsTitle key", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
		expect(screen.getByText("stepsTitle")).toBeTruthy();
	});

	it("renders the validationTitle key", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
		expect(screen.getByText("validationTitle")).toBeTruthy();
	});

	it("renders the OnboardingPreview component", async () => {
		const jsx = await DocsOnboarding();
		render(jsx);
		expect(screen.getByTestId("onboarding-preview")).toBeTruthy();
	});
});
