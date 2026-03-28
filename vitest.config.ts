import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		include: ["**/*.test.ts", "**/*.test.tsx"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json-summary", "json"],
			reportsDirectory: "./coverage",
			reportOnFailure: true,
			all: true,
			include: [
				"src/lib/docs-navigation.ts",
				"src/components/ThemeProvider.tsx",
				"src/components/ThemeToggle.tsx",
				"src/components/TreeView.tsx",
			],
			exclude: ["**/__tests__/**", "**/*.test.ts", "**/*.test.tsx"],
			thresholds: {
				lines: 80,
				statements: 80,
				functions: 80,
				branches: 70,
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
