import {
	ArrowRight,
	Bot,
	GitBranch,
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

function Section({
	icon: Icon,
	title,
	description,
	children,
	iconColor = "text-blue-400",
	bgColor = "bg-blue-500/10",
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	children?: React.ReactNode;
	iconColor?: string;
	bgColor?: string;
}) {
	return (
		<div className="mb-10 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
			<div className="flex items-start gap-4 mb-4">
				<div className={`p-3 rounded-lg ${bgColor} shrink-0`}>
					<Icon className={`w-5 h-5 ${iconColor}`} />
				</div>
				<div>
					<h2 className="text-xl font-bold mb-1">{title}</h2>
					<p className="text-neutral-400 text-sm">{description}</p>
				</div>
			</div>
			{children && <div className="space-y-4 mt-4">{children}</div>}
		</div>
	);
}

export default async function DocsCiCd() {
	const t = await getTranslations("ciCd");

	return (
		<div>
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

			<Section
				icon={Zap}
				title={t("ciTitle")}
				description={t("ciDescription")}
				iconColor="text-yellow-400"
				bgColor="bg-yellow-500/10"
			>
				<div className="grid sm:grid-cols-2 gap-4">
					<div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
						<p className="text-sm font-medium text-neutral-300 mb-2">Next.js</p>
						<p className="text-xs text-neutral-500">{t("ciNextjs")}</p>
						<CodeBlock title="biome">{`npx biome check .`}</CodeBlock>
					</div>
					<div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
						<p className="text-sm font-medium text-neutral-300 mb-2">Nuxt</p>
						<p className="text-xs text-neutral-500">{t("ciNuxt")}</p>
						<CodeBlock title="eslint">{`npx eslint .`}</CodeBlock>
					</div>
				</div>
			</Section>

			<Section
				icon={Shield}
				title={t("coverageTitle")}
				description={t("coverageDescription")}
				iconColor="text-green-400"
				bgColor="bg-green-500/10"
			>
				<p className="text-sm text-neutral-400">{t("coverageThresholds")}</p>
				<p className="text-sm text-neutral-400">{t("coverageComment")}</p>
				<CodeBlock title="Coverage comment format">{`| Status | Category   | Percentage 🎯 | Change | Covered/Total |
|--------|------------|---------------|--------|---------------|
| 🔵     | Statements | 82.5%         | 🟢 +2% | 165/200       |
| 🔵     | Branches   | 78.0%         | 🟰 0%  | 78/100        |
| 🔴     | Functions  | 65.0%         | 🔴 -1% | 52/80         |`}</CodeBlock>
			</Section>

			<Section
				icon={Bot}
				title={t("prAgentTitle")}
				description={t("prAgentDescription")}
				iconColor="text-purple-400"
				bgColor="bg-purple-500/10"
			>
				<p className="text-sm text-neutral-400">{t("prAgentSetup")}</p>
				<p className="text-sm text-neutral-400">
					{t("prAgentSecret")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-purple-300">
						GH_MODELS_TOKEN
					</code>
				</p>
				<CodeBlock title=".github/workflows/pr-agent.yml">{`on:
  pull_request:
    types: [opened, reopened]

jobs:
  pr-agent:
    if: github.event.pull_request.body == ''
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        env:
          GH_MODELS_TOKEN: \${{ secrets.GH_MODELS_TOKEN }}
        with:
          script: |
            // Call GitHub Models API (gpt-4o-mini)
            // and update PR body`}</CodeBlock>
			</Section>

			<Section
				icon={Zap}
				title={t("vercelTitle")}
				description={t("vercelDescription")}
				iconColor="text-blue-400"
				bgColor="bg-blue-500/10"
			>
				<div className="grid sm:grid-cols-2 gap-4">
					<div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
						<p className="text-sm font-medium text-neutral-300 mb-1">
							{t("vercelPreview")}
						</p>
						<p className="text-xs text-neutral-500">
							Every PR → unique preview URL
						</p>
					</div>
					<div className="p-4 rounded-lg bg-white/[0.03] border border-white/5">
						<p className="text-sm font-medium text-neutral-300 mb-1">
							{t("vercelProd")}
						</p>
						<p className="text-xs text-neutral-500">
							Merge to main → production
						</p>
					</div>
				</div>
			</Section>

			<Section
				icon={Bot}
				title={t("coderabbitTitle")}
				description={t("coderabbitDescription")}
				iconColor="text-orange-400"
				bgColor="bg-orange-500/10"
			>
				<p className="text-sm text-neutral-400">{t("coderabbitConfig")}</p>
				<CodeBlock title=".coderabbit.yaml">{`reviews:
  profile: chill
  path_instructions:
    - path: "src/app/**"
      instructions: "Focus on Next.js best practices"
    - path: "*.test.tsx"
      instructions: "Ensure test coverage is meaningful"`}</CodeBlock>
			</Section>

			<Section
				icon={ShieldCheck}
				title={t("branchTitle")}
				description={t("branchDescription")}
				iconColor="text-red-400"
				bgColor="bg-red-500/10"
			>
				<p className="text-sm text-neutral-400">{t("branchChecks")}</p>
				<p className="text-sm text-neutral-400">{t("branchBypass")}</p>
				<div className="flex flex-wrap gap-2 mt-2">
					{["CI", "Coverage", "Vercel"].map((check) => (
						<span
							key={check}
							className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300"
						>
							{check}
						</span>
					))}
				</div>
			</Section>

			<Section
				icon={Terminal}
				title={t("precommitTitle")}
				description={t("precommitDescription")}
				iconColor="text-cyan-400"
				bgColor="bg-cyan-500/10"
			>
				<div className="grid sm:grid-cols-2 gap-4">
					<div>
						<p className="text-sm font-medium text-neutral-300 mb-2">
							{t("precommitNextjs")}
						</p>
						<CodeBlock title=".husky/pre-commit (Next.js)">{`npx lint-staged
# lint-staged runs:
# npx biome check --write`}</CodeBlock>
					</div>
					<div>
						<p className="text-sm font-medium text-neutral-300 mb-2">
							{t("precommitNuxt")}
						</p>
						<CodeBlock title=".husky/pre-commit (Nuxt)">{`npx lint-staged
# lint-staged runs:
# eslint --fix
# prettier --write`}</CodeBlock>
					</div>
				</div>
			</Section>

			<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
				<div className="flex items-start gap-4">
					<div className="p-3 rounded-lg bg-green-500/10 shrink-0">
						<GitBranch className="w-5 h-5 text-green-400" />
					</div>
					<div>
						<h3 className="font-semibold mb-2">{t("branchTitle")}</h3>
						<p className="text-sm text-neutral-400">{t("branchDescription")}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
