// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

vi.mock("@/components/demos/ProfilePreview", () => ({
	default: () => <div data-testid="profile-preview" />,
}));

import DocsProfile from "../[locale]/docs/profile/page";

describe("DocsProfile page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsProfile();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsProfile();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsProfile();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the editTitle key", async () => {
		const jsx = await DocsProfile();
		render(jsx);
		expect(screen.getByText("editTitle")).toBeTruthy();
	});

	it("renders the avatarTitle key", async () => {
		const jsx = await DocsProfile();
		render(jsx);
		expect(screen.getByText("avatarTitle")).toBeTruthy();
	});

	it("renders the ProfilePreview component", async () => {
		const jsx = await DocsProfile();
		render(jsx);
		expect(screen.getByTestId("profile-preview")).toBeTruthy();
	});
});
