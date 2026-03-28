// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
	getTranslations: vi.fn(async () => (key: string) => key),
}));

import DocsCiCd from "../[locale]/docs/ci-cd/page";

describe("DocsCiCd page", () => {
	it("renders without crashing", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
	});

	it("renders breadcrumb keys", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("breadcrumbDocs")).toBeTruthy();
		expect(screen.getByText("breadcrumbSection")).toBeTruthy();
		expect(screen.getByText("breadcrumbCurrent")).toBeTruthy();
	});

	it("renders the page title and description", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("title")).toBeTruthy();
		expect(screen.getByText("description")).toBeTruthy();
	});

	it("renders the pipeline diagram section", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("pipelineTitle")).toBeTruthy();
		expect(screen.getByText("Pull Request")).toBeTruthy();
		expect(screen.getByText("CI")).toBeTruthy();
		expect(screen.getByText("Coverage")).toBeTruthy();
		expect(screen.getByText("PR Agent")).toBeTruthy();
		expect(screen.getByText("Merge")).toBeTruthy();
	});

	it("does not show Vercel in the pipeline diagram", async () => {
		const jsx = await DocsCiCd();
		const { container } = render(jsx);
		const diagram = container.querySelector(".overflow-x-auto");
		expect(diagram?.textContent).not.toContain("Vercel");
	});

	it("renders the CI section with Next.js and Nuxt subsections", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("ciTitle")).toBeTruthy();
		expect(screen.getByText("Next.js")).toBeTruthy();
		expect(screen.getByText("Nuxt")).toBeTruthy();
		expect(screen.getByText("npx biome check .")).toBeTruthy();
		expect(screen.getByText("npx eslint .")).toBeTruthy();
	});

	it("renders the coverage section with table and thresholds", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("coverageTitle")).toBeTruthy();
		expect(screen.getByText("coverageCommentTitle")).toBeTruthy();
		expect(screen.getByText("coverageThresholdsNextjsTitle")).toBeTruthy();
		expect(screen.getByText("coverageThresholdsNuxtTitle")).toBeTruthy();
	});

	it("renders the PR Agent section with workflow code", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("prAgentTitle")).toBeTruthy();
		expect(screen.getByText("prAgentHowTitle")).toBeTruthy();
		expect(screen.getByText("GH_MODELS_TOKEN")).toBeTruthy();
	});

	it("renders the Vercel section with scope note", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("vercelTitle")).toBeTruthy();
		expect(screen.getByText("vercelScope")).toBeTruthy();
		expect(screen.getByText("vercelPreviewTitle")).toBeTruthy();
		expect(screen.getByText("vercelProdTitle")).toBeTruthy();
	});

	it("renders the CodeRabbit section with config", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("coderabbitTitle")).toBeTruthy();
		expect(screen.getByText("coderabbitConfigTitle")).toBeTruthy();
		expect(screen.getByText(/profile: chill/)).toBeTruthy();
	});

	it("renders the branch protection section with required checks", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("branchTitle")).toBeTruthy();
		expect(screen.getByText("branchRulesTitle")).toBeTruthy();
		expect(screen.getByText("Lint & Build")).toBeTruthy();
		expect(screen.getByText("Run Tests & Post Coverage")).toBeTruthy();
		expect(screen.getByText("Vercel")).toBeTruthy();
	});

	it("renders the pre-commit section with Biome and ESLint+Prettier", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("precommitTitle")).toBeTruthy();
		expect(screen.getByText("Next.js — Biome")).toBeTruthy();
		expect(screen.getByText("Nuxt — ESLint + Prettier")).toBeTruthy();
		expect(screen.getByText("biome check --write")).toBeTruthy();
		expect(screen.getByText("eslint --fix")).toBeTruthy();
	});

	it("renders the summary card", async () => {
		const jsx = await DocsCiCd();
		render(jsx);
		expect(screen.getByText("summaryTitle")).toBeTruthy();
		expect(screen.getByText("summaryDesc")).toBeTruthy();
	});
});
