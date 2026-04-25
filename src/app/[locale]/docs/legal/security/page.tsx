import { CheckCircle2, Clock, Mail, ShieldCheck, XCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Security Policy — Aurora Home",
	description: "Responsible disclosure policy for the Aurora Home project.",
};

const SCOPES_IN = [
	"aurora-home-esp32 — ESP32 firmware",
	"aurora-home-app — Web & mobile application",
	"aurora-home-orange-pi — Orange Pi middleware",
	"aurora-home-documentation — This documentation site",
	"aurora-home-marketing — Marketing site",
];

const SCOPES_OUT = [
	"Third-party libraries (report to their maintainers)",
	"Denial-of-service attacks",
	"Social engineering or phishing",
	"Issues requiring physical access to a device you do not own",
];

const TIMELINE = [
	{ label: "Acknowledgement", delay: "48 hours" },
	{ label: "Initial assessment", delay: "7 days" },
	{
		label: "Patch / mitigation target",
		delay: "30 days (critical) · 90 days (others)",
	},
	{ label: "Public disclosure", delay: "After patch is released" },
];

export default function SecurityPage() {
	return (
		<div className="space-y-12">
			<div>
				<div className="flex items-center gap-3 mb-4">
					<div className="p-2 rounded-lg bg-blue-500/10">
						<ShieldCheck className="w-5 h-5 text-blue-400" />
					</div>
					<h1 className="text-3xl font-bold">Security Policy</h1>
				</div>
				<p className="text-[var(--text-secondary)] leading-relaxed">
					Aurora Home is an open-source project. We take security seriously and
					appreciate responsible disclosure. This page describes how to report
					vulnerabilities and what you can expect from us.
				</p>
				<p className="text-xs text-[var(--text-muted)] mt-3">
					Last updated: April 2026
				</p>
			</div>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold">Reporting a vulnerability</h2>
				<p className="text-[var(--text-secondary)]">
					Please{" "}
					<strong className="text-[var(--text-primary)]">
						do not open a public GitHub issue
					</strong>{" "}
					for security vulnerabilities. Instead, send a detailed report by
					email:
				</p>
				<a
					href="mailto:security@aurora-home.dev"
					className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-mono text-blue-400 hover:bg-white/[0.06] transition-colors"
				>
					<Mail className="w-4 h-4" />
					security@aurora-home.dev
				</a>
				<p className="text-sm text-[var(--text-secondary)]">
					Please include: a description of the vulnerability, steps to
					reproduce, potential impact, and any proof-of-concept code if
					applicable.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold flex items-center gap-2">
					<Clock className="w-5 h-5 text-[var(--text-muted)]" />
					Response timeline
				</h2>
				<div className="divide-y divide-[var(--border-subtle)] rounded-xl border border-[var(--border-subtle)] overflow-hidden">
					{TIMELINE.map(({ label, delay }) => (
						<div
							key={label}
							className="flex items-center justify-between px-5 py-3 bg-white/[0.02]"
						>
							<span className="text-sm text-[var(--text-secondary)]">
								{label}
							</span>
							<span className="text-sm font-mono text-[var(--text-primary)]">
								{delay}
							</span>
						</div>
					))}
				</div>
				<p className="text-sm text-[var(--text-muted)]">
					Timelines are best-effort. Complex issues may take longer; we will
					keep you informed throughout the process.
				</p>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold flex items-center gap-2">
					<CheckCircle2 className="w-5 h-5 text-green-400" />
					In scope
				</h2>
				<ul className="space-y-2">
					{SCOPES_IN.map((s) => (
						<li
							key={s}
							className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
						>
							<CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
							{s}
						</li>
					))}
				</ul>
			</section>

			<section className="space-y-4">
				<h2 className="text-xl font-semibold flex items-center gap-2">
					<XCircle className="w-5 h-5 text-red-400" />
					Out of scope
				</h2>
				<ul className="space-y-2">
					{SCOPES_OUT.map((s) => (
						<li
							key={s}
							className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
						>
							<XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
							{s}
						</li>
					))}
				</ul>
			</section>

			<section className="p-6 rounded-xl bg-blue-500/5 border border-blue-500/20 space-y-2">
				<h2 className="text-lg font-semibold text-blue-300">Our commitment</h2>
				<p className="text-sm text-[var(--text-secondary)]">
					We will not take legal action against researchers who act in good
					faith and follow this policy. We will acknowledge your contribution in
					the release notes (unless you prefer to remain anonymous).
				</p>
			</section>
		</div>
	);
}
