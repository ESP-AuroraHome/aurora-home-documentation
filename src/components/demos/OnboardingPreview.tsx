"use client";

import {
	adventurer,
	avataaars,
	bottts,
	funEmoji,
	identicon,
	lorelei,
	micah,
	miniavs,
	openPeeps,
	personas,
	pixelArt,
	shapes,
	thumbs,
} from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useMemo, useState } from "react";

const AVATAR_STYLES = [
	{ name: "adventurer", generator: adventurer },
	{ name: "avataaars", generator: avataaars },
	{ name: "bottts", generator: bottts },
	{ name: "fun-emoji", generator: funEmoji },
	{ name: "identicon", generator: identicon },
	{ name: "lorelei", generator: lorelei },
	{ name: "micah", generator: micah },
	{ name: "miniavs", generator: miniavs },
	{ name: "open-peeps", generator: openPeeps },
	{ name: "personas", generator: personas },
	{ name: "pixel-art", generator: pixelArt },
	{ name: "shapes", generator: shapes },
	{ name: "thumbs", generator: thumbs },
];

const STEPS = [
	{ label: "Bienvenue" },
	{ label: "Avatar" },
	{ label: "Langue" },
];

/**
 * Visual step progress indicator showing completed, active, and upcoming steps.
 *
 * @param currentStep - Zero-based index of the currently active step
 */
function Stepper({ currentStep }: { currentStep: number }) {
	return (
		<div style={{ display: "flex", alignItems: "center" }}>
			{STEPS.map((step, i) => (
				<div key={step.label} style={{ display: "flex", alignItems: "center" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 6,
						}}
					>
						{/* Circle */}
						<div
							style={{
								position: "relative",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{i === currentStep && (
								<div
									style={{
										position: "absolute",
										inset: 0,
										borderRadius: "50%",
										background: "rgba(255,255,255,0.2)",
										filter: "blur(6px)",
										transform: "scale(1.5)",
									}}
								/>
							)}
							<div
								style={{
									position: "relative",
									width: 36,
									height: 36,
									borderRadius: "50%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									fontSize: 13,
									fontWeight: 600,
									background:
										i <= currentStep ? "#fff" : "rgba(255,255,255,0.05)",
									color: i <= currentStep ? "#000" : "rgba(255,255,255,0.4)",
									border:
										i < currentStep
											? "none"
											: i === currentStep
												? "none"
												: "1px solid rgba(255,255,255,0.15)",
									boxShadow:
										i === currentStep
											? "0 0 0 4px rgba(255,255,255,0.15)"
											: "none",
								}}
							>
								{i < currentStep ? (
									<Check
										size={14}
										strokeWidth={2.5}
										style={{ color: "#000" }}
									/>
								) : (
									<span>{i + 1}</span>
								)}
							</div>
						</div>
						{/* Label */}
						<span
							style={{
								fontSize: 11,
								fontWeight: 500,
								letterSpacing: "0.03em",
								color:
									i === currentStep
										? "#fff"
										: i < currentStep
											? "rgba(255,255,255,0.6)"
											: "rgba(255,255,255,0.3)",
							}}
						>
							{step.label}
						</span>
					</div>

					{/* Connector */}
					{i < STEPS.length - 1 && (
						<div
							style={{
								position: "relative",
								width: 48,
								height: 1,
								margin: "0 8px 20px",
								overflow: "hidden",
							}}
						>
							<div
								style={{
									position: "absolute",
									inset: 0,
									background: "rgba(255,255,255,0.15)",
									borderRadius: 2,
								}}
							/>
							<div
								style={{
									position: "absolute",
									inset: 0,
									background: "#fff",
									borderRadius: 2,
									transformOrigin: "left",
									transform: `scaleX(${i < currentStep ? 1 : 0})`,
									transition: "transform 0.4s ease",
								}}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	);
}

function IPhoneShell({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}
		>
			<div
				style={{
					position: "relative",
					width: 320,
					flexShrink: 0,
					background: "linear-gradient(160deg, #1a1a1e 0%, #2a2a2e 100%)",
					borderRadius: 52,
					padding: "14px 10px",
					boxShadow:
						"0 0 0 1px rgba(255,255,255,0.08), 0 0 0 2px #0a0a0a, 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
				}}
			>
				{[72, 116, 152].map((top, i) => (
					<div
						key={i}
						style={{
							position: "absolute",
							left: -3,
							top,
							width: 3,
							height: i === 0 ? 28 : 44,
							background: "#3a3a3e",
							borderRadius: "2px 0 0 2px",
						}}
					/>
				))}
				<div
					style={{
						position: "absolute",
						right: -3,
						top: 100,
						width: 3,
						height: 64,
						background: "#3a3a3e",
						borderRadius: "0 2px 2px 0",
					}}
				/>

				<div
					style={{
						borderRadius: 42,
						overflow: "hidden",
						position: "relative",
						background: "#000",
					}}
				>
					{/* Status bar */}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							padding: "12px 24px 6px",
							background: "rgba(0,0,0,0.3)",
							position: "relative",
							zIndex: 20,
						}}
					>
						<span
							style={{
								color: "#fff",
								fontSize: 13,
								fontWeight: 600,
								letterSpacing: "-0.3px",
							}}
						>
							9:41
						</span>
						<div
							style={{
								position: "absolute",
								top: 10,
								left: "50%",
								transform: "translateX(-50%)",
								width: 90,
								height: 26,
								background: "#000",
								borderRadius: 20,
							}}
						/>
						<div style={{ display: "flex", alignItems: "center", gap: 5 }}>
							<svg width="16" height="12" viewBox="0 0 16 12" fill="none">
								<rect x="0" y="8" width="3" height="4" rx="0.5" fill="white" />
								<rect
									x="4.5"
									y="5"
									width="3"
									height="7"
									rx="0.5"
									fill="white"
								/>
								<rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" />
								<rect
									x="13.5"
									y="0"
									width="3"
									height="12"
									rx="0.5"
									fill="rgba(255,255,255,0.3)"
								/>
							</svg>
							<svg width="15" height="12" viewBox="0 0 15 12" fill="white">
								<path d="M7.5 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
								<path d="M3.2 6.8a6.1 6.1 0 0 1 8.6 0l-1.5 1.5a4 4 0 0 0-5.6 0L3.2 6.8z" />
								<path d="M0 4a10.3 10.3 0 0 1 15 0l-1.5 1.5A8.2 8.2 0 0 0 1.5 5.5L0 4z" />
							</svg>
							<svg width="24" height="12" viewBox="0 0 24 12" fill="none">
								<rect
									x="0.5"
									y="0.5"
									width="20"
									height="11"
									rx="3.5"
									stroke="white"
									strokeOpacity="0.35"
								/>
								<rect
									x="21.5"
									y="3.5"
									width="2"
									height="5"
									rx="1.5"
									fill="white"
									fillOpacity="0.4"
								/>
								<rect x="2" y="2" width="15" height="8" rx="2" fill="white" />
							</svg>
						</div>
					</div>

					{/* Screen */}
					<div
						style={{ height: 620, position: "relative", overflow: "hidden" }}
					>
						{children}
					</div>

					{/* Home indicator */}
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							padding: "8px 0 10px",
							background: "rgba(0,0,0,0.4)",
						}}
					>
						<div
							style={{
								width: 100,
								height: 4,
								background: "rgba(255,255,255,0.35)",
								borderRadius: 2,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

function _OnboardingLayout({
	children,
	step,
}: {
	children: React.ReactNode;
	step: number;
}) {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 20,
				fontFamily:
					"var(--font-geist-sans), system-ui, -apple-system, sans-serif",
			}}
		>
			{/* Background */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/background-main.jpg"
				alt=""
				aria-hidden="true"
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: "center",
				}}
			/>
			{/* Content */}
			<div
				style={{
					position: "relative",
					zIndex: 10,
					width: "100%",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 20,
				}}
			>
				{/* Logo */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/logo-black.png"
					alt="Aurora Home"
					style={{ width: 48, height: 48, objectFit: "contain" }}
				/>

				{/* Stepper */}
				<Stepper currentStep={step} />

				{/* Card */}
				<div
					style={{
						width: "100%",
						background: "rgba(0,0,0,0.35)",
						backdropFilter: "blur(20px)",
						WebkitBackdropFilter: "blur(20px)",
						borderRadius: 24,
						padding: 24,
						boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function StepWelcome({
	name,
	onChange,
	onNext,
}: {
	name: string;
	onChange: (v: string) => void;
	onNext: () => void;
}) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
			<div>
				<h1
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: 600,
						margin: "0 0 8px",
					}}
				>
					Bienvenue sur Aurora Home
				</h1>
				<p
					style={{
						color: "rgba(255,255,255,0.6)",
						fontSize: 12,
						lineHeight: 1.6,
						margin: 0,
					}}
				>
					Commençons par personnaliser votre espace. Comment souhaitez-vous être
					appelé ?
				</p>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
				<label
					style={{
						color: "rgba(255,255,255,0.7)",
						fontSize: 10,
						fontWeight: 600,
						textTransform: "uppercase",
						letterSpacing: "0.08em",
					}}
				>
					Votre prénom
				</label>
				<input
					type="text"
					value={name}
					onChange={(e) => onChange(e.target.value)}
					placeholder="Ex : Marie"
					onKeyDown={(e) => e.key === "Enter" && name.trim() && onNext()}
					style={{
						width: "100%",
						boxSizing: "border-box",
						background: "rgba(255,255,255,0.10)",
						border: "1px solid rgba(255,255,255,0.20)",
						borderRadius: 12,
						padding: "10px 14px",
						color: "#fff",
						fontSize: 14,
						outline: "none",
					}}
				/>
			</div>

			<button
				type="button"
				onClick={onNext}
				disabled={!name.trim()}
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					background: "#fff",
					color: "#000",
					fontWeight: 600,
					fontSize: 14,
					border: "none",
					borderRadius: 12,
					padding: "12px 0",
					cursor: name.trim() ? "pointer" : "not-allowed",
					opacity: name.trim() ? 1 : 0.3,
				}}
			>
				Continuer
				<ArrowRight size={15} />
			</button>
		</div>
	);
}

function StepAvatar({
	avatarOptions,
	selected,
	onSelect,
	onNext,
	onBack,
}: {
	avatarOptions: { style: string; url: string }[];
	selected: string | null;
	onSelect: (url: string) => void;
	onNext: () => void;
	onBack: () => void;
}) {
	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
			<div>
				<button
					type="button"
					onClick={onBack}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 4,
						color: "rgba(255,255,255,0.4)",
						fontSize: 11,
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: 0,
						marginBottom: 12,
					}}
				>
					<ArrowLeft size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
					<span style={{ color: "rgba(255,255,255,0.4)" }}>Retour</span>
				</button>
				<h2
					style={{
						color: "#fff",
						fontSize: 18,
						fontWeight: 600,
						margin: "0 0 6px",
					}}
				>
					Choisissez votre avatar
				</h2>
				<p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>
					Sélectionnez un style qui vous correspond.
				</p>
			</div>

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: 10,
					maxHeight: 240,
					overflowY: "auto",
					paddingRight: 2,
				}}
			>
				{avatarOptions.map((option) => {
					const isSelected = selected === option.url;
					return (
						<button
							key={option.style}
							type="button"
							onClick={() => onSelect(option.url)}
							style={{
								position: "relative",
								aspectRatio: "1/1",
								borderRadius: 14,
								overflow: "hidden",
								border: isSelected
									? "2px solid #fff"
									: "2px solid rgba(255,255,255,0.10)",
								boxShadow: isSelected
									? "0 0 0 2px rgba(255,255,255,0.4)"
									: "none",
								transform: isSelected ? "scale(1.05)" : "scale(1)",
								transition: "all 0.2s ease",
								background: "rgba(255,255,255,0.05)",
								cursor: "pointer",
								padding: 0,
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src={option.url}
								alt={option.style}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									padding: 4,
									boxSizing: "border-box",
								}}
							/>
							{isSelected && (
								<div
									style={{
										position: "absolute",
										inset: 0,
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
										background: "rgba(0,0,0,0.30)",
									}}
								>
									<Check size={16} style={{ color: "#fff" }} />
								</div>
							)}
						</button>
					);
				})}
			</div>

			<button
				type="button"
				onClick={onNext}
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					background: "#fff",
					color: "#000",
					fontWeight: 600,
					fontSize: 14,
					border: "none",
					borderRadius: 12,
					padding: "12px 0",
					cursor: "pointer",
				}}
			>
				Continuer
				<ArrowRight size={15} />
			</button>
		</div>
	);
}

function StepLocale({
	locale,
	onChange,
	onFinish,
	onBack,
}: {
	locale: "fr" | "en";
	onChange: (v: "fr" | "en") => void;
	onFinish: () => void;
	onBack: () => void;
}) {
	const languages: { code: "fr" | "en"; label: string }[] = [
		{ code: "fr", label: "Français" },
		{ code: "en", label: "English" },
	];

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
			<div>
				<button
					type="button"
					onClick={onBack}
					style={{
						display: "flex",
						alignItems: "center",
						gap: 4,
						color: "rgba(255,255,255,0.4)",
						fontSize: 11,
						background: "none",
						border: "none",
						cursor: "pointer",
						padding: 0,
						marginBottom: 12,
					}}
				>
					<ArrowLeft size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
					<span style={{ color: "rgba(255,255,255,0.4)" }}>Retour</span>
				</button>
				<h2
					style={{
						color: "#fff",
						fontSize: 18,
						fontWeight: 600,
						margin: "0 0 6px",
					}}
				>
					Quelle est votre langue ?
				</h2>
				<p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>
					L'interface sera affichée dans la langue choisie.
				</p>
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
				{languages.map((lang) => (
					<button
						key={lang.code}
						type="button"
						onClick={() => onChange(lang.code)}
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							padding: "14px 16px",
							borderRadius: 16,
							textAlign: "left",
							border:
								locale === lang.code
									? "2px solid #fff"
									: "2px solid rgba(255,255,255,0.10)",
							background:
								locale === lang.code ? "rgba(255,255,255,0.15)" : "transparent",
							cursor: "pointer",
							transition: "all 0.2s ease",
						}}
					>
						<span style={{ color: "#fff", fontWeight: 500, fontSize: 14 }}>
							{lang.label}
						</span>
						{locale === lang.code && (
							<Check size={14} style={{ color: "#fff", marginLeft: "auto" }} />
						)}
					</button>
				))}
			</div>

			<button
				type="button"
				onClick={onFinish}
				style={{
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					gap: 6,
					background: "#fff",
					color: "#000",
					fontWeight: 600,
					fontSize: 14,
					border: "none",
					borderRadius: 12,
					padding: "12px 0",
					cursor: "pointer",
				}}
			>
				Accéder au dashboard
				<ArrowRight size={15} />
			</button>
		</div>
	);
}

function SuccessScreen({
	selectedAvatar,
	name,
	onRestart,
}: {
	selectedAvatar: string | null;
	name: string;
	onRestart: () => void;
}) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				gap: 20,
				padding: "40px 24px",
				textAlign: "center",
			}}
		>
			<div style={{ position: "relative", display: "inline-block" }}>
				{selectedAvatar ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={selectedAvatar}
						alt="avatar"
						style={{
							width: 72,
							height: 72,
							borderRadius: "50%",
							border: "3px solid rgba(255,255,255,0.2)",
						}}
					/>
				) : (
					<div
						style={{
							width: 72,
							height: 72,
							borderRadius: "50%",
							background: "rgba(255,255,255,0.1)",
							border: "3px solid rgba(255,255,255,0.2)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<span style={{ color: "#fff", fontSize: 24 }}>👤</span>
					</div>
				)}
				<div
					style={{
						position: "absolute",
						bottom: -4,
						right: -4,
						width: 24,
						height: 24,
						borderRadius: "50%",
						background: "#22c55e",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						border: "2px solid rgba(0,0,0,0.5)",
					}}
				>
					<Check size={12} style={{ color: "#fff" }} />
				</div>
			</div>

			<div>
				<h2
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: 600,
						margin: "0 0 8px",
					}}
				>
					Bienvenue, {name || "chez vous"} !
				</h2>
				<p
					style={{
						color: "rgba(255,255,255,0.6)",
						fontSize: 13,
						margin: 0,
						lineHeight: 1.5,
					}}
				>
					Votre profil est prêt. Aurora Home est configuré pour vous.
				</p>
			</div>

			<button
				type="button"
				onClick={onRestart}
				style={{
					display: "flex",
					alignItems: "center",
					gap: 6,
					background: "rgba(255,255,255,0.12)",
					color: "#fff",
					fontSize: 13,
					fontWeight: 500,
					border: "1px solid rgba(255,255,255,0.15)",
					borderRadius: 12,
					padding: "10px 20px",
					cursor: "pointer",
				}}
			>
				Recommencer la démo
			</button>
		</div>
	);
}

/**
 * Interactive 3-step onboarding demo (welcome, avatar selection, language choice) inside an iPhone mockup.
 */
export default function OnboardingPreview() {
	const [step, setStep] = useState(0);
	const [name, setName] = useState("");
	const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
	const [locale, setLocale] = useState<"fr" | "en">("fr");
	const [finished, setFinished] = useState(false);

	const avatarOptions = useMemo(
		() =>
			AVATAR_STYLES.map((style) => ({
				style: style.name,
				// biome-ignore lint/suspicious/noExplicitAny: dicebear generator type
				url: createAvatar(style.generator as any, {
					seed: name || "aurora",
					size: 128,
				}).toDataUri(),
			})),
		[name],
	);

	const goNext = () => setStep((s) => s + 1);
	const goBack = () => setStep((s) => s - 1);

	const handleRestart = () => {
		setStep(0);
		setName("");
		setSelectedAvatar(null);
		setLocale("fr");
		setFinished(false);
	};

	return (
		<IPhoneShell>
			<div
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 20,
					fontFamily:
						"var(--font-geist-sans), system-ui, -apple-system, sans-serif",
					overflow: "hidden",
				}}
			>
				{/* Background */}
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/background-main.jpg"
					alt=""
					aria-hidden="true"
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
						objectFit: "cover",
						objectPosition: "center",
					}}
				/>

				{finished ? (
					<div style={{ position: "relative", zIndex: 10, width: "100%" }}>
						<SuccessScreen
							selectedAvatar={selectedAvatar}
							name={name}
							onRestart={handleRestart}
						/>
					</div>
				) : (
					<div
						style={{
							position: "relative",
							zIndex: 10,
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 16,
						}}
					>
						{/* Logo */}
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img
							src="/logo-black.png"
							alt="Aurora Home"
							style={{ width: 44, height: 44, objectFit: "contain" }}
						/>

						{/* Stepper */}
						<Stepper currentStep={step} />

						{/* Card */}
						<div
							style={{
								width: "100%",
								background: "rgba(0,0,0,0.35)",
								backdropFilter: "blur(20px)",
								WebkitBackdropFilter: "blur(20px)",
								borderRadius: 24,
								padding: 20,
								boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
							}}
						>
							{step === 0 && (
								<StepWelcome name={name} onChange={setName} onNext={goNext} />
							)}
							{step === 1 && (
								<StepAvatar
									avatarOptions={avatarOptions}
									selected={selectedAvatar}
									onSelect={setSelectedAvatar}
									onNext={goNext}
									onBack={goBack}
								/>
							)}
							{step === 2 && (
								<StepLocale
									locale={locale}
									onChange={setLocale}
									onFinish={() => setFinished(true)}
									onBack={goBack}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</IPhoneShell>
	);
}
