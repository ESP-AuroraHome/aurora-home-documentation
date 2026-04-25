import { AlertTriangle, GitBranch, Mail, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Terms of Use — Aurora Home",
	description: "Terms of use for the Aurora Home project and documentation.",
};

const SECTIONS = [
	{
		title: "Open-source license",
		icon: GitBranch,
		color: "text-green-400",
		bg: "bg-green-500/10",
		content:
			"Aurora Home is released under the MIT License. You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, provided that the original copyright notice and this permission notice appear in all copies.",
	},
	{
		title: "No warranty",
		icon: AlertTriangle,
		color: "text-yellow-400",
		bg: "bg-yellow-500/10",
		content:
			'The software and documentation are provided "as is", without warranty of any kind, express or implied — including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors be liable for any claim, damages, or other liability arising from the use of the software.',
	},
];

export default function TermsPage() {
	return (
		<div className="space-y-12">
			<div>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-green-500/10">
						<Scale className="w-5 h-5 text-green-400" />
					</div>
					<h1 className="text-3xl font-bold">Terms of Use</h1>
				</div>
				<p className="text-[var(--text-secondary)] leading-relaxed">
					By using the Aurora Home software, firmware, or documentation, you
					agree to the following terms. Aurora Home is a community-driven
					open-source project with no commercial affiliation.
				</p>
				<p className="text-xs text-[var(--text-muted)] mt-3">
					Last updated: April 2026
				</p>
			</div>

			<div className="space-y-4">
				{SECTIONS.map(({ title, icon: Icon, color, bg, content }) => (
					<div
						key={title}
						className="flex items-start gap-4 p-6 rounded-xl border border-[var(--border-subtle)] bg-white/[0.02]"
					>
						<div className={`p-2 rounded-lg ${bg} flex-shrink-0`}>
							<Icon className={`w-4 h-4 ${color}`} />
						</div>
						<div>
							<h2 className="font-semibold mb-2">{title}</h2>
							<p className="text-sm text-[var(--text-secondary)] leading-relaxed">
								{content}
							</p>
						</div>
					</div>
				))}
			</div>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Documentation</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					The content of this documentation site is provided for informational
					purposes. While we strive for accuracy, the Aurora Home project makes
					no guarantee that the documentation is complete, error-free, or
					up-to-date. Contributions and corrections are welcome via GitHub.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Contributions</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					By submitting a pull request or contribution to any Aurora Home
					repository, you agree that your contribution will be licensed under
					the same MIT License as the project. You confirm that you have the
					right to submit the contribution.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Changes to these terms</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					We may update these terms at any time. Changes are tracked in the{" "}
					<a
						href="https://github.com/ESP-AuroraHome/aurora-home-documentation"
						target="_blank"
						rel="noopener noreferrer"
						className="text-green-400 hover:underline"
					>
						documentation repository
					</a>{" "}
					git history.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Contact</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					Questions about these terms:
				</p>
				<a
					href="mailto:security@aurora-home.dev"
					className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-mono text-green-400 hover:bg-white/[0.06] transition-colors"
				>
					<Mail className="w-4 h-4" />
					security@aurora-home.dev
				</a>
			</section>
		</div>
	);
}
