import { Eye, Github, Lock, Mail, Server } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Privacy Policy — Aurora Home",
	description: "Privacy policy for the Aurora Home documentation site.",
};

const DATA_ITEMS = [
	{
		icon: Eye,
		color: "text-purple-400",
		bg: "bg-purple-500/10",
		title: "No tracking or analytics",
		desc: "This site does not use cookies, tracking pixels, or any analytics tool. No data about your browsing is collected or stored.",
	},
	{
		icon: Server,
		color: "text-blue-400",
		bg: "bg-blue-500/10",
		title: "GitHub API — contributors page",
		desc: "The Contribution page fetches public contributor data from the GitHub API (read-only, no authentication required from you). Only publicly available information is displayed.",
	},
	{
		icon: Github,
		color: "text-neutral-400",
		bg: "bg-white/5",
		title: "Hosting",
		desc: "This site is hosted on Vercel. Vercel may collect standard server logs (IP address, request path, timestamp) as part of their infrastructure. Refer to Vercel's privacy policy for details.",
	},
];

export default function PrivacyPage() {
	return (
		<div className="space-y-12">
			<div>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-purple-500/10">
						<Lock className="w-5 h-5 text-purple-400" />
					</div>
					<h1 className="text-3xl font-bold">Privacy Policy</h1>
				</div>
				<p className="text-[var(--text-secondary)] leading-relaxed">
					Aurora Home is an open-source project. This documentation site is a
					static resource — we do not collect, sell, or share your personal
					data.
				</p>
				<p className="text-xs text-[var(--text-muted)] mt-3">
					Last updated: April 2026
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">What we collect</h2>
				<div className="space-y-4">
					{DATA_ITEMS.map(({ icon: Icon, color, bg, title, desc }) => (
						<div
							key={title}
							className="flex items-start gap-4 p-5 rounded-xl border border-[var(--border-subtle)] bg-white/[0.02]"
						>
							<div className={`p-2 rounded-lg ${bg} flex-shrink-0`}>
								<Icon className={`w-4 h-4 ${color}`} />
							</div>
							<div>
								<h3 className="font-medium mb-1">{title}</h3>
								<p className="text-sm text-[var(--text-secondary)]">{desc}</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Local storage</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					This site stores a single preference in your browser&apos;s{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-xs">
						localStorage
					</code>
					: your selected theme (
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-xs">
						light
					</code>{" "}
					or{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-xs">dark</code>
					). This data never leaves your device.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Third-party links</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					This site links to GitHub repositories and external resources. We are
					not responsible for the privacy practices of those third-party sites.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Aurora Home software</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					The Aurora Home firmware (ESP32) and application process environmental
					sensor data locally on your own hardware. No data is sent to external
					servers by default. Refer to the{" "}
					<a
						href="/docs/architecture"
						className="text-purple-400 hover:underline"
					>
						architecture documentation
					</a>{" "}
					for details.
				</p>
			</section>

			<section className="space-y-3">
				<h2 className="text-xl font-semibold">Contact</h2>
				<p className="text-[var(--text-secondary)] text-sm">
					For any privacy-related questions:
				</p>
				<a
					href="mailto:security@aurora-home.dev"
					className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-mono text-purple-400 hover:bg-white/[0.06] transition-colors"
				>
					<Mail className="w-4 h-4" />
					security@aurora-home.dev
				</a>
			</section>
		</div>
	);
}
