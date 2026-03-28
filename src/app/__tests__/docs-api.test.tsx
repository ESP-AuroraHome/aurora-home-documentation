// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsApi from "../[locale]/docs/api/page";

describe("DocsApi page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsApi();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsApi();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsApi();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the endpointsTitle key", async () => {
		const jsx = await DocsApi();
		render(jsx);
		expect(screen.getByText("endpointsTitle")).toBeTruthy();
	});

	it("renders the errorsTitle key", async () => {
		const jsx = await DocsApi();
		render(jsx);
		expect(screen.getByText("errorsTitle")).toBeTruthy();
	});

	it("renders the sensor-stream endpoint path", async () => {
		const jsx = await DocsApi();
		render(jsx);
		expect(screen.getByText("/api/sensor-stream")).toBeTruthy();
	});
});
