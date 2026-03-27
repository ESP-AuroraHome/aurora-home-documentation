"use client";

import { useState } from "react";

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

function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: 24,
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
					gap: 0,
				}}
			>
				{children}
			</div>
		</div>
	);
}

function AuthCard({ children }: { children: React.ReactNode }) {
	return (
		<div
			style={{
				width: "100%",
				background: "rgba(0,0,0,0.20)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderRadius: 24,
				border: "none",
				boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
}

function LiquidGlassButton({
	children,
	onClick,
	disabled,
}: {
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			style={{
				width: "100%",
				padding: "10px 0",
				borderRadius: 12,
				background: "rgba(255,255,255,0.12)",
				border: "1px solid rgba(255,255,255,0.15)",
				color: "#fff",
				fontSize: 14,
				fontWeight: 500,
				cursor: disabled ? "not-allowed" : "pointer",
				opacity: disabled ? 0.5 : 1,
				fontFamily: "inherit",
				letterSpacing: "0.01em",
			}}
		>
			{children}
		</button>
	);
}

function TextInput({
	value,
	onChange,
	placeholder,
	type = "text",
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
	type?: string;
}) {
	return (
		<input
			type={type}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			autoComplete="off"
			style={{
				width: "100%",
				height: 40,
				background: "rgba(255,255,255,0.10)",
				backdropFilter: "blur(4px)",
				WebkitBackdropFilter: "blur(4px)",
				border: "1px solid rgba(255,255,255,0.20)",
				borderRadius: 8,
				padding: "0 12px",
				color: "#fff",
				fontSize: 14,
				fontFamily: "inherit",
				outline: "none",
				boxSizing: "border-box",
				transition: "background 0.15s, border-color 0.15s",
			}}
			onFocus={(e) => {
				e.target.style.background = "rgba(255,255,255,0.15)";
				e.target.style.borderColor = "rgba(255,255,255,0.40)";
			}}
			onBlur={(e) => {
				e.target.style.background = "rgba(255,255,255,0.10)";
				e.target.style.borderColor = "rgba(255,255,255,0.20)";
			}}
		/>
	);
}

/**
 * Six-digit OTP input with per-slot focus management and backspace navigation.
 *
 * @param value - Current OTP string (up to 6 digits)
 * @param onChange - Callback fired with the updated OTP string on each keystroke
 */
function OtpInput({
	value,
	onChange,
}: {
	value: string;
	onChange: (v: string) => void;
}) {
	const digits = value.split("").concat(Array(6).fill("")).slice(0, 6);

	const handleInput = (i: number, char: string) => {
		const clean = char.replace(/\D/g, "").slice(-1);
		const arr = digits.map((d) => d);
		arr[i] = clean;
		const next = arr.join("");
		onChange(next);
		// Auto-focus next
		if (clean && i < 5) {
			const el = document.getElementById(`otp-slot-${i + 1}`);
			el?.focus();
		}
	};

	const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
		if (e.key === "Backspace" && !digits[i] && i > 0) {
			const arr = digits.map((d) => d);
			arr[i - 1] = "";
			onChange(arr.join(""));
			document.getElementById(`otp-slot-${i - 1}`)?.focus();
		}
	};

	return (
		<div
			style={{
				display: "flex",
				gap: 4,
				justifyContent: "center",
				width: "100%",
			}}
		>
			{digits.map((digit, i) => (
				<input
					key={i}
					id={`otp-slot-${i}`}
					type="text"
					inputMode="numeric"
					maxLength={1}
					value={digit}
					onChange={(e) => handleInput(i, e.target.value)}
					onKeyDown={(e) => handleKeyDown(i, e)}
					style={{
						width: 34,
						height: 34,
						flexShrink: 0,
						borderRadius: 8,
						background: digit
							? "rgba(255,255,255,0.15)"
							: "rgba(255,255,255,0.10)",
						backdropFilter: "blur(4px)",
						border: `1px solid ${digit ? "rgba(255,255,255,0.40)" : "rgba(255,255,255,0.20)"}`,
						color: "#fff",
						fontSize: 18,
						fontWeight: 600,
						textAlign: "center",
						fontFamily: "inherit",
						outline: "none",
						transition: "background 0.1s, border-color 0.1s",
						boxSizing: "border-box",
					}}
					onFocus={(e) => {
						e.target.style.background = "rgba(255,255,255,0.15)";
						e.target.style.borderColor = "rgba(255,255,255,0.40)";
					}}
					onBlur={(e) => {
						if (!digit) {
							e.target.style.background = "rgba(255,255,255,0.10)";
							e.target.style.borderColor = "rgba(255,255,255,0.20)";
						}
					}}
				/>
			))}
		</div>
	);
}

function Logo() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				marginBottom: 24,
			}}
		>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src="/logo-black.png"
				alt="AuroraHome"
				style={{ width: 56, height: 56, objectFit: "contain" }}
			/>
		</div>
	);
}

function LoginScreen({ onSubmit }: { onSubmit: (email: string) => void }) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = () => {
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			setError("Adresse email invalide.");
			return;
		}
		setError("");
		onSubmit(email);
	};

	return (
		<AuthLayout>
			<Logo />
			<AuthCard>
				{/* CardHeader — p-6 */}
				<div style={{ padding: 24, paddingBottom: 0 }}>
					<h1
						style={{
							color: "#fff",
							fontSize: 22,
							fontWeight: 600,
							textAlign: "center",
							margin: 0,
						}}
					>
						Connexion
					</h1>
				</div>
				{/* CardContent — p-6 pt-0 → pt-4 */}
				<div
					style={{
						padding: "16px 24px 24px",
						display: "flex",
						flexDirection: "column",
						gap: 20,
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
						<label style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
							Email
						</label>
						<TextInput
							type="email"
							value={email}
							onChange={(v) => {
								setEmail(v);
								setError("");
							}}
							placeholder="jean.dupont@email.com"
						/>
						{error && (
							<p style={{ color: "#fca5a5", fontSize: 11, margin: 0 }}>
								{error}
							</p>
						)}
					</div>
					<LiquidGlassButton onClick={handleSubmit}>
						Se connecter
					</LiquidGlassButton>
				</div>
			</AuthCard>
		</AuthLayout>
	);
}

function OtpScreen({
	email,
	onBack,
	onVerify,
}: {
	email: string;
	onBack: () => void;
	onVerify: () => void;
}) {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState("");

	const handleVerify = () => {
		if (otp.length < 6) {
			setError("Le code doit contenir 6 chiffres.");
			return;
		}
		setError("");
		onVerify();
	};

	return (
		<AuthLayout>
			<Logo />
			<AuthCard>
				{/* CardHeader */}
				<div style={{ padding: 24, paddingBottom: 0 }}>
					<h1
						style={{
							color: "#fff",
							fontSize: 22,
							fontWeight: 600,
							textAlign: "center",
							margin: 0,
							marginBottom: 10,
						}}
					>
						Vérification
					</h1>
					<p
						style={{
							color: "rgba(255,255,255,0.6)",
							fontSize: 13,
							textAlign: "center",
							margin: 0,
							fontWeight: 300,
							lineHeight: "1.5",
						}}
					>
						Un code à 6 chiffres a été envoyé à{" "}
						<span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500 }}>
							{email}
						</span>
					</p>
				</div>
				{/* CardContent */}
				<div
					style={{
						padding: "16px 24px 24px",
						display: "flex",
						flexDirection: "column",
						gap: 20,
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 12,
						}}
					>
						<label style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>
							Code de vérification
						</label>
						<OtpInput
							value={otp}
							onChange={(v) => {
								setOtp(v);
								setError("");
							}}
						/>
						{error && (
							<p style={{ color: "#fca5a5", fontSize: 11, margin: 0 }}>
								{error}
							</p>
						)}
					</div>
					<LiquidGlassButton onClick={handleVerify} disabled={otp.length < 6}>
						Vérifier
					</LiquidGlassButton>
					<button
						type="button"
						onClick={onBack}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(255,255,255,0.4)",
							fontSize: 12,
							fontFamily: "inherit",
							textAlign: "center",
						}}
					>
						← Changer d&apos;adresse email
					</button>
				</div>
			</AuthCard>
		</AuthLayout>
	);
}

function SuccessScreen({ onReset }: { onReset: () => void }) {
	return (
		<AuthLayout>
			<Logo />
			<AuthCard>
				<div
					style={{
						padding: "28px 24px",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 16,
						textAlign: "center",
					}}
				>
					<div
						style={{
							width: 56,
							height: 56,
							borderRadius: "50%",
							background: "rgba(52,211,153,0.15)",
							border: "1px solid rgba(52,211,153,0.3)",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#34d399"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<polyline points="20 6 9 17 4 12" />
						</svg>
					</div>
					<div>
						<p
							style={{
								color: "#fff",
								fontSize: 17,
								fontWeight: 600,
								margin: 0,
								marginBottom: 6,
							}}
						>
							Connexion réussie !
						</p>
						<p
							style={{
								color: "rgba(255,255,255,0.5)",
								fontSize: 13,
								margin: 0,
							}}
						>
							Vous êtes maintenant connecté à AuroraHome.
						</p>
					</div>
					<button
						type="button"
						onClick={onReset}
						style={{
							marginTop: 4,
							background: "none",
							border: "none",
							cursor: "pointer",
							color: "rgba(255,255,255,0.4)",
							fontSize: 12,
							fontFamily: "inherit",
						}}
					>
						Recommencer la démo
					</button>
				</div>
			</AuthCard>
		</AuthLayout>
	);
}

type Screen = "login" | "otp" | "success";

/**
 * Interactive authentication flow demo cycling through login, OTP verification, and success screens.
 */
export default function AuthPreview() {
	const [screen, setScreen] = useState<Screen>("login");
	const [email, setEmail] = useState("");

	return (
		<IPhoneShell>
			{screen === "login" && (
				<LoginScreen
					onSubmit={(mail) => {
						setEmail(mail);
						setScreen("otp");
					}}
				/>
			)}
			{screen === "otp" && (
				<OtpScreen
					email={email}
					onBack={() => setScreen("login")}
					onVerify={() => setScreen("success")}
				/>
			)}
			{screen === "success" && (
				<SuccessScreen
					onReset={() => {
						setEmail("");
						setScreen("login");
					}}
				/>
			)}
		</IPhoneShell>
	);
}
