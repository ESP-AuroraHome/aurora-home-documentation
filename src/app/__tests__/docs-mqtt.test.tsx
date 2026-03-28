// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsMqtt from "../[locale]/docs/mqtt/page";

describe("DocsMqtt page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
	});

	it("renders the title key", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
	});

	it("renders the description key", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the brokerConfigTitle key", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
		expect(screen.getByText("brokerConfigTitle")).toBeTruthy();
	});

	it("renders the payloadTitle key", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
		expect(screen.getByText("payloadTitle")).toBeTruthy();
	});

	it("renders the sensorsTitle key", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
		expect(screen.getByText("sensorsTitle")).toBeTruthy();
	});

	it("renders the lifecycleTitle key", async () => {
		const jsx = await DocsMqtt();
		render(jsx);
		expect(screen.getByText("lifecycleTitle")).toBeTruthy();
	});
});
