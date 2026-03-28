import {
	ArrowRight,
	Bot,
	CheckCircle,
	GitBranch,
	GitPullRequest,
	Shield,
	ShieldCheck,
	Terminal,
	Zap,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

function CodeBlock({ children, title }: { children: string; title?: string }) {
	return (
		<div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
			{title && (
				<div className="px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-neutral-400">
					{title}
				</div>
			)}
			<pre className="p-4 overflow-x-auto">
				<code className="text-sm text-neutral-300">{children}</code>
			</pre>
		</div>
	);
}

export default async function DocsCiCd() {
	const t = await getTranslations("ciCd");

	return (
		<div>
			{/* Header */}
			<div className="mb-12">
				<div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
					<span>{t("breadcrumbDocs")}</span>
					<ArrowRight className="hidden sm:block w-3 h-3" />
					<span className="hidden sm:inline">{t("breadcrumbSection")}</span>
					<ArrowRight className="w-3 h-3" />
					<span className="text-white">{t("breadcrumbCurrent")}</span>
				</div>
				<h1 className="text-2xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
				<p className="text-base sm:text-xl text-neutral-400 leading-relaxed">
					{t("description")}
				</p>
			</div>

			{/* Pipeline flow diagram */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("pipelineTitle")}</h2>
				<div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
					<div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
						<div className="flex flex-col items-center min-w-[80px]">
							<div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
								<GitPullRequest className="w-6 h-6 text-blue-400" />
							</div>
							<span className="text-xs text-neutral-400 text-center">
								Pull Request
							</span>
							<span className="text-xs text-neutral-600 text-center">
								opened
							</span>
						</div>
						<ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
						<div className="flex flex-col items-center min-w-[80px]">
							<div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-2">
								<Zap className="w-6 h-6 text-yellow-400" />
							</div>
							<span className="text-xs text-neutral-400 text-center">CI</span>
							<span className="text-xs text-neutral-600 text-center">
								lint + build
							</span>
						</div>
						<ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
						<div className="flex flex-col items-center min-w-[80px]">
							<div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
								<Shield className="w-6 h-6 text-green-400" />
							</div>
							<span className="text-xs text-neutral-400 text-center">
								Coverage
							</span>
							<span className="text-xs text-neutral-600 text-center">
								Vitest + v8
							</span>
						</div>
						<ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
						<div className="flex flex-col items-center min-w-[80px]">
							<div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
								<Bot className="w-6 h-6 text-purple-400" />
							</div>
							<span className="text-xs text-neutral-400 text-center">
								PR Agent
							</span>
							<span className="text-xs text-neutral-600 text-center">
								auto-describe
							</span>
						</div>
						<ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
						<div className="flex flex-col items-center min-w-[80px]">
							<div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
								<CheckCircle className="w-6 h-6 text-blue-400" />
							</div>
							<span className="text-xs text-neutral-400 text-center">
								Vercel
							</span>
							<span className="text-xs text-neutral-600 text-center">
								preview
							</span>
						</div>
						<ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
						<div className="flex flex-col items-center min-w-[80px]">
							<div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
								<ShieldCheck className="w-6 h-6 text-green-400" />
							</div>
							<span className="text-xs text-neutral-400 text-center">
								Merge
							</span>
							<span className="text-xs text-neutral-600 text-center">
								all checks pass
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* CI Pipeline */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("ciTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("ciDescription")}</p>
				<div className="grid sm:grid-cols-2 gap-4">
					<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-lg bg-yellow-500/10 shrink-0">
								<Zap className="w-5 h-5 text-yellow-400" />
							</div>
							<div className="min-w-0">
								<h3 className="font-semibold mb-3">Next.js</h3>
								<ul className="space-y-2 text-sm text-neutral-400">
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 mt-1.5 shrink-0" />
										<span>
											{t("ciNextjsLi1")}{" "}
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												npx biome check .
											</code>
										</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 mt-1.5 shrink-0" />
										<span>
											{t("ciNextjsLi2")}{" "}
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												npx next build
											</code>
										</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 mt-1.5 shrink-0" />
										<span>{t("ciNextjsLi3")}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-lg bg-green-500/10 shrink-0">
								<Zap className="w-5 h-5 text-green-400" />
							</div>
							<div className="min-w-0">
								<h3 className="font-semibold mb-3">Nuxt</h3>
								<ul className="space-y-2 text-sm text-neutral-400">
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 shrink-0" />
										<span>
											{t("ciNuxtLi1")}{" "}
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												npx nuxt prepare
											</code>
										</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 shrink-0" />
										<span>
											{t("ciNuxtLi2")}{" "}
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												npx eslint .
											</code>
										</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 shrink-0" />
										<span>
											{t("ciNuxtLi3")}{" "}
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												npx nuxt typecheck
											</code>
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Coverage */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("coverageTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("coverageDescription")}</p>
				<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] mb-6">
					<div className="flex items-start gap-4">
						<div className="p-3 rounded-lg bg-green-500/10 shrink-0">
							<Shield className="w-5 h-5 text-green-400" />
						</div>
						<div className="min-w-0 w-full">
							<h3 className="font-semibold mb-3">
								{t("coverageCommentTitle")}
							</h3>
							<p className="text-sm text-neutral-400 mb-4">
								{t("coverageCommentDesc")}
							</p>
							<CodeBlock title="PR comment — coverage table">{`| Status | Category   | Percentage      | Change    | Covered / Total |
|--------|------------|-----------------|-----------|-----------------|
| 🔵     | Lines      | 84.20% (🎯 80%) | 🟢 +1.40% | 168 / 200       |
| 🔵     | Statements | 82.50% (🎯 80%) | 🟰 ±0%    | 165 / 200       |
| 🔴     | Functions  | 79.50% (🎯 80%) | 🔴 -0.50% | 63 / 80         |
| 🔵     | Branches   | 71.00% (🎯 70%) | 🟢 +2.00% | 71 / 100        |`}</CodeBlock>
						</div>
					</div>
				</div>
				<div className="grid sm:grid-cols-2 gap-4">
					<div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
						<h3 className="font-semibold mb-2 text-yellow-300">
							{t("coverageThresholdsNextjsTitle")}
						</h3>
						<ul className="space-y-1 text-sm text-neutral-400">
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 shrink-0" />
								{t("coverageLinesStmtFn")} 80%
							</li>
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-yellow-500/50 shrink-0" />
								{t("coverageBranches")} 70%
							</li>
						</ul>
					</div>
					<div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
						<h3 className="font-semibold mb-2 text-green-300">
							{t("coverageThresholdsNuxtTitle")}
						</h3>
						<ul className="space-y-1 text-sm text-neutral-400">
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-green-500/50 shrink-0" />
								{t("coverageLinesStmtFn")} 70%
							</li>
							<li className="flex items-center gap-2">
								<span className="w-1.5 h-1.5 rounded-full bg-green-500/50 shrink-0" />
								{t("coverageBranches")} 60%
							</li>
						</ul>
					</div>
				</div>
			</div>

			{/* PR Agent */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("prAgentTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("prAgentDescription")}</p>
				<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
					<div className="flex items-start gap-4">
						<div className="p-3 rounded-lg bg-purple-500/10 shrink-0">
							<Bot className="w-5 h-5 text-purple-400" />
						</div>
						<div className="min-w-0 w-full">
							<h3 className="font-semibold mb-3">{t("prAgentHowTitle")}</h3>
							<ul className="space-y-2 text-sm text-neutral-400 mb-4">
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 shrink-0" />
									<span>{t("prAgentLi1")}</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 shrink-0" />
									<span>
										{t("prAgentLi2")}{" "}
										<code className="px-1.5 py-0.5 bg-white/5 rounded text-purple-300">
											GH_MODELS_TOKEN
										</code>{" "}
										{t("prAgentLi2b")}
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 shrink-0" />
									<span>{t("prAgentLi3")}</span>
								</li>
							</ul>
							<CodeBlock title=".github/workflows/pr-agent.yml">{`on:
  pull_request:
    types: [opened, reopened]

jobs:
  describe:
    if: github.event.pull_request.body == ''
    steps:
      - uses: actions/github-script@v7
        env:
          GH_MODELS_TOKEN: \${{ secrets.GH_MODELS_TOKEN }}
        with:
          script: |
            // Calls GitHub Models API (gpt-4o-mini)
            // Updates PR body with generated description`}</CodeBlock>
						</div>
					</div>
				</div>
			</div>

			{/* Vercel */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("vercelTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("vercelDescription")}</p>
				<div className="grid sm:grid-cols-2 gap-4">
					<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-lg bg-blue-500/10 shrink-0">
								<GitPullRequest className="w-5 h-5 text-blue-400" />
							</div>
							<div>
								<h3 className="font-semibold mb-2">
									{t("vercelPreviewTitle")}
								</h3>
								<p className="text-sm text-neutral-400">
									{t("vercelPreviewDesc")}
								</p>
							</div>
						</div>
					</div>
					<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-lg bg-green-500/10 shrink-0">
								<CheckCircle className="w-5 h-5 text-green-400" />
							</div>
							<div>
								<h3 className="font-semibold mb-2">{t("vercelProdTitle")}</h3>
								<p className="text-sm text-neutral-400">
									{t("vercelProdDesc")}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* CodeRabbit */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("coderabbitTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("coderabbitDescription")}</p>
				<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
					<div className="flex items-start gap-4">
						<div className="p-3 rounded-lg bg-orange-500/10 shrink-0">
							<Bot className="w-5 h-5 text-orange-400" />
						</div>
						<div className="min-w-0 w-full">
							<h3 className="font-semibold mb-3">
								{t("coderabbitConfigTitle")}
							</h3>
							<ul className="space-y-2 text-sm text-neutral-400 mb-4">
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-1.5 shrink-0" />
									<span>
										{t("coderabbitLi1")}{" "}
										<code className="px-1.5 py-0.5 bg-white/5 rounded">
											profile: chill
										</code>
									</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-1.5 shrink-0" />
									<span>{t("coderabbitLi2")}</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-orange-500/50 mt-1.5 shrink-0" />
									<span>{t("coderabbitLi3")}</span>
								</li>
							</ul>
							<CodeBlock title=".coderabbit.yaml">{`language: "en"
reviews:
  profile: "chill"
  path_instructions:
    - path: "**/*.test.ts"
      instructions: "Check mocks are realistic and edge cases covered."
    - path: "src/components/**/*.tsx"
      instructions: "Check accessibility and props typing."
    - path: "src/lib/**/*.ts"
      instructions: "Check error handling and return types."`}</CodeBlock>
						</div>
					</div>
				</div>
			</div>

			{/* Branch protection */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("branchTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("branchDescription")}</p>
				<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
					<div className="flex items-start gap-4">
						<div className="p-3 rounded-lg bg-red-500/10 shrink-0">
							<ShieldCheck className="w-5 h-5 text-red-400" />
						</div>
						<div className="min-w-0 w-full">
							<h3 className="font-semibold mb-3">{t("branchRulesTitle")}</h3>
							<ul className="space-y-2 text-sm text-neutral-400 mb-4">
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1.5 shrink-0" />
									<span>{t("branchLi1")}</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1.5 shrink-0" />
									<span>{t("branchLi2")}</span>
								</li>
								<li className="flex items-start gap-2">
									<span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-1.5 shrink-0" />
									<span>{t("branchLi3")}</span>
								</li>
							</ul>
							<div className="flex flex-wrap gap-2">
								{["Lint & Build", "Run Tests & Post Coverage", "Vercel"].map(
									(check) => (
										<span
											key={check}
											className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
										>
											{check}
										</span>
									),
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Pre-commit */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("precommitTitle")}</h2>
				<p className="text-neutral-400 mb-6">{t("precommitDescription")}</p>
				<div className="grid sm:grid-cols-2 gap-4">
					<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-lg bg-cyan-500/10 shrink-0">
								<Terminal className="w-5 h-5 text-cyan-400" />
							</div>
							<div className="min-w-0 w-full">
								<h3 className="font-semibold mb-3">Next.js — Biome</h3>
								<ul className="space-y-2 text-sm text-neutral-400 mb-4">
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />
										<span>{t("precommitNextjsLi1")}</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 mt-1.5 shrink-0" />
										<code className="px-1.5 py-0.5 bg-white/5 rounded">
											biome check --write
										</code>
									</li>
								</ul>
								<CodeBlock title="package.json">{`"lint-staged": {
  "*.{ts,tsx,js,json}": [
    "biome check --write"
  ]
}`}</CodeBlock>
							</div>
						</div>
					</div>
					<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
						<div className="flex items-start gap-4">
							<div className="p-3 rounded-lg bg-violet-500/10 shrink-0">
								<Terminal className="w-5 h-5 text-violet-400" />
							</div>
							<div className="min-w-0 w-full">
								<h3 className="font-semibold mb-3">Nuxt — ESLint + Prettier</h3>
								<ul className="space-y-2 text-sm text-neutral-400 mb-4">
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 shrink-0" />
										<span>{t("precommitNuxtLi1")}</span>
									</li>
									<li className="flex items-start gap-2">
										<span className="w-1.5 h-1.5 rounded-full bg-violet-500/50 mt-1.5 shrink-0" />
										<span>
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												eslint --fix
											</code>{" "}
											+{" "}
											<code className="px-1.5 py-0.5 bg-white/5 rounded">
												prettier --write
											</code>
										</span>
									</li>
								</ul>
								<CodeBlock title="package.json">{`"lint-staged": {
  "*.{vue,ts,js,mjs}": [
    "eslint --fix",
    "prettier --write"
  ]
}`}</CodeBlock>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Summary card */}
			<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
				<div className="flex items-start gap-4">
					<div className="p-3 rounded-lg bg-green-500/10 shrink-0">
						<GitBranch className="w-5 h-5 text-green-400" />
					</div>
					<div>
						<h3 className="font-semibold mb-2">{t("summaryTitle")}</h3>
						<p className="text-sm text-neutral-400">{t("summaryDesc")}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
