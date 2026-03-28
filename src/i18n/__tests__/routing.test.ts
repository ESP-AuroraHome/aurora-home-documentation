import { describe, expect, it } from "vitest";
import { routing } from "../routing";

describe("routing config", () => {
	it("has a locales array", () => {
		expect(Array.isArray(routing.locales)).toBe(true);
	});

	it("includes fr, en, es, zh", () => {
		expect(routing.locales).toContain("fr");
		expect(routing.locales).toContain("en");
		expect(routing.locales).toContain("es");
		expect(routing.locales).toContain("zh");
	});

	it("has defaultLocale set to fr", () => {
		expect(routing.defaultLocale).toBe("fr");
	});

	it("defaultLocale is included in locales", () => {
		expect(routing.locales).toContain(routing.defaultLocale);
	});
});
