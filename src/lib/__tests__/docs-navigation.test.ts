import { describe, expect, it } from "vitest";
import { allPages, navigation } from "../docs-navigation";

describe("navigation", () => {
	it("has 4 sections", () => {
		expect(navigation).toHaveLength(4);
	});

	it("every section has a titleKey and items", () => {
		for (const section of navigation) {
			expect(section.titleKey).toBeTruthy();
			expect(section.items.length).toBeGreaterThan(0);
		}
	});

	it("every item has titleKey, href and icon", () => {
		for (const section of navigation) {
			for (const item of section.items) {
				expect(item.titleKey).toBeTruthy();
				expect(item.href).toMatch(/^\/docs/);
				expect(item.icon).toBeTruthy();
			}
		}
	});

	it("all hrefs are unique", () => {
		const hrefs = navigation.flatMap((s) => s.items.map((i) => i.href));
		expect(new Set(hrefs).size).toBe(hrefs.length);
	});
});

describe("allPages", () => {
	it("flattens all items from all sections", () => {
		const total = navigation.reduce((acc, s) => acc + s.items.length, 0);
		expect(allPages).toHaveLength(total);
	});

	it("contains the introduction page", () => {
		expect(allPages.some((p) => p.href === "/docs")).toBe(true);
	});
});
