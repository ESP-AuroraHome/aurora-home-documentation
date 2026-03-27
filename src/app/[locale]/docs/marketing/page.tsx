import { ArrowRight, CreditCard, Globe, Package } from "lucide-react";
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

const STACK = [
	{ label: "Vue 3", desc: "Composition API" },
	{ label: "Vite", desc: "Build tool" },
	{ label: "Vue Router 4", desc: "Routing" },
	{ label: "Tailwind CSS", desc: "Styling" },
	{ label: "Three.js", desc: "3D viewer" },
	{ label: "Stripe", desc: "Payments" },
	{ label: "PWA", desc: "vite-plugin-pwa" },
];

export default async function DocsMarketing() {
	const t = await getTranslations("marketing");

	const routes = [
		{ path: "/", key: "route_home" },
		{ path: "/product", key: "route_product" },
		{ path: "/about", key: "route_about" },
		{ path: "/cart", key: "route_cart" },
		{ path: "/confirmation", key: "route_confirmation" },
		{ path: "/admin", key: "route_admin" },
	] as const;

	return (
		<div>
			<div className="mb-12">
				<div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
					<span>{t("breadcrumbDocs")}</span>
					<ArrowRight className="w-3 h-3" />
					<span>{t("breadcrumbSection")}</span>
					<ArrowRight className="w-3 h-3" />
					<span className="text-white">{t("breadcrumbCurrent")}</span>
				</div>
				<h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
				<p className="text-xl text-neutral-400 leading-relaxed">
					{t("description")}
				</p>
			</div>

			{/* Stack */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("stackTitle")}</h2>
				<div className="flex flex-wrap gap-2">
					{STACK.map((s) => (
						<div
							key={s.label}
							className="px-3 py-2 rounded-lg border border-white/10 bg-white/[0.02] text-sm"
						>
							<span className="font-medium text-white">{s.label}</span>
							<span className="text-neutral-500 ml-2">{s.desc}</span>
						</div>
					))}
				</div>
			</div>

			{/* Routes */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("routesTitle")}</h2>
				<div className="space-y-2">
					{routes.map((r) => (
						<div
							key={r.path}
							className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
						>
							<Globe className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
							<code className="text-sm text-green-400 shrink-0 w-32">
								{r.path}
							</code>
							<span className="text-sm text-neutral-400">{t(r.key)}</span>
						</div>
					))}
				</div>
			</div>

			{/* Stripe note */}
			<div className="mb-12 p-5 rounded-xl bg-purple-500/5 border border-purple-500/20">
				<div className="flex items-start gap-3">
					<CreditCard className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
					<div>
						<h3 className="font-semibold text-purple-300 mb-1">
							{t("noteTitleStripe")}
						</h3>
						<p className="text-sm text-purple-200/70">{t("noteDescStripe")}</p>
					</div>
				</div>
			</div>

			{/* Dev setup */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("setupTitle")}</h2>
				<CodeBlock title="aurora-home-marketing">{`npm install
npm run dev     # http://localhost:5173
npm run build`}</CodeBlock>
			</div>

			{/* GitHub link */}
			<div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
				<div className="flex items-start gap-4">
					<div className="p-3 rounded-lg bg-white/5 shrink-0">
						<Package className="w-5 h-5 text-neutral-400" />
					</div>
					<div className="min-w-0">
						<h3 className="font-semibold mb-1">aurora-home-marketing</h3>
						<a
							href="https://github.com/ESP-AuroraHome/aurora-home-marketing"
							target="_blank"
							rel="noopener noreferrer"
							className="text-sm text-blue-400 hover:text-blue-300 transition-colors break-all"
						>
							github.com/ESP-AuroraHome/aurora-home-marketing
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
