import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "@/components/ThemeProvider";
import { routing } from "@/i18n/routing";

export const metadata: Metadata = {
	title: "Aurora Home — Documentation",
	description: "Documentation Aurora Home",
};

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	// biome-ignore lint/suspicious/noExplicitAny: next-intl locale typing requires any cast
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<Script
					id="theme-init"
					strategy="beforeInteractive"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: intentional inline theme-init script to prevent flash
					dangerouslySetInnerHTML={{
						__html: `try{var t=localStorage.getItem('theme')||'dark';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}`,
					}}
				/>
			</head>
			<body className="antialiased">
				<NextIntlClientProvider messages={messages}>
					<ThemeProvider>{children}</ThemeProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
