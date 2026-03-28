// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
	redirect: vi.fn(),
}));

import { redirect } from "next/navigation";
import LocaleRootPage from "../[locale]/page";

describe("LocaleRootPage", () => {
	it("calls redirect with /docs", () => {
		vi.mocked(redirect).mockClear();
		LocaleRootPage();
		expect(redirect).toHaveBeenCalledWith("/docs");
	});

	it("calls redirect exactly once", () => {
		vi.mocked(redirect).mockClear();
		LocaleRootPage();
		expect(redirect).toHaveBeenCalledTimes(1);
	});
});
