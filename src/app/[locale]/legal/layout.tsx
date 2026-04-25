import { Github } from "lucide-react";
import Image from "next/image";
import { Link } from "@/lib/navigation";

export default function LegalLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
			<header className="border-b border-[var(--border-subtle)]">
				<div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
					<Link href="/docs" className="flex items-center gap-2.5">
						<Image
							src="/assets/logo.png"
							alt="Aurora Home"
							width={24}
							height={24}
							className="w-6 h-6 object-contain invert dark:invert-0"
						/>
						<span className="font-semibold">Aurora Home</span>
						<span className="text-[var(--text-muted)] text-sm">Docs</span>
					</Link>
					<a
						href="https://github.com/ESP-AuroraHome"
						target="_blank"
						rel="noopener noreferrer"
						className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
					>
						<Github className="w-4 h-4" />
					</a>
				</div>
			</header>

			<main className="max-w-3xl mx-auto px-6 py-16">{children}</main>

			<footer className="border-t border-[var(--border-subtle)]">
				<div className="max-w-3xl mx-auto px-6 py-6 flex flex-wrap gap-4 text-xs text-[var(--text-muted)]">
					<Link
						href="/legal/terms"
						className="hover:text-[var(--text-primary)] transition-colors"
					>
						Terms
					</Link>
					<Link
						href="/legal/privacy"
						className="hover:text-[var(--text-primary)] transition-colors"
					>
						Privacy
					</Link>
					<Link
						href="/legal/security"
						className="hover:text-[var(--text-primary)] transition-colors"
					>
						Security
					</Link>
					<span className="ml-auto">
						© {new Date().getFullYear()} Aurora Home — MIT License
					</span>
				</div>
			</footer>
		</div>
	);
}
