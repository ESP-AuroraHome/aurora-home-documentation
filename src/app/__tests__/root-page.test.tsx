// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

import { redirect } from "next/navigation";
import RootPage from "../page";

describe("RootPage", () => {
	it("calls redirect with /docs", () => {
		vi.mocked(redirect).mockClear();
		RootPage();
		expect(redirect).toHaveBeenCalledWith("/docs");
	});

	it("calls redirect exactly once", () => {
		vi.mocked(redirect).mockClear();
		RootPage();
		expect(redirect).toHaveBeenCalledTimes(1);
	});
});
