"use client";

import {
	ArrowLeft,
	Bell,
	Cloud,
	Droplet,
	Gauge,
	Minus,
	Plus,
	RotateCcw,
	Settings,
	Sun,
	Thermometer,
} from "lucide-react";
import { useState } from "react";

type SensorType = "TEMPERATURE" | "HUMIDITY" | "PRESSURE" | "CO2" | "LIGHT";
type Severity = "WARNING" | "HIGH" | "CRITICAL";

const DATA_TYPES: SensorType[] = [
	"TEMPERATURE",
	"HUMIDITY",
	"PRESSURE",
	"CO2",
	"LIGHT",
];

const SENSOR_META: Record<
	SensorType,
	{ label: string; unit: string; iconBg: string; Icon: React.ElementType }
> = {
	TEMPERATURE: {
		label: "Température",
		unit: "°C",
		iconBg: "#facc15",
		Icon: Thermometer,
	},
	HUMIDITY: { label: "Humidité", unit: "%", iconBg: "#60a5fa", Icon: Droplet },
	PRESSURE: { label: "Pression", unit: "hPa", iconBg: "#4ade80", Icon: Gauge },
	CO2: { label: "CO₂", unit: "ppm", iconBg: "#9ca3af", Icon: Cloud },
	LIGHT: { label: "Luminosité", unit: "lx", iconBg: "#fb923c", Icon: Sun },
};

const DEFAULTS: Record<SensorType, { high?: number; low?: number }> = {
	TEMPERATURE: { high: 28, low: 14 },
	HUMIDITY: { high: 70, low: 25 },
	PRESSURE: { low: 970 },
	CO2: { high: 800 },
	LIGHT: {},
};

const SEVERITY_LABELS: Record<Severity, string> = {
	WARNING: "Attention",
	HIGH: "Problème",
	CRITICAL: "Urgent",
};

function Switch({
	checked,
	onCheckedChange,
}: {
	checked: boolean;
	onCheckedChange: (v: boolean) => void;
}) {
	return (
		<button
			type="button"
			role="switch"
			aria-checked={checked}
			onClick={() => onCheckedChange(!checked)}
			style={{
				width: 44,
				height: 24,
				borderRadius: 12,
				flexShrink: 0,
				background: checked ? "#000" : "rgba(255,255,255,0.15)",
				border: "none",
				cursor: "pointer",
				position: "relative",
				transition: "background 0.2s",
				padding: 0,
			}}
		>
			<div
				style={{
					position: "absolute",
					top: 3,
					left: checked ? 23 : 3,
					width: 18,
					height: 18,
					borderRadius: "50%",
					background: "#fff",
					transition: "left 0.15s",
					boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
				}}
			/>
		</button>
	);
}

function SeveritySelect({
	value,
	onChange,
	disabled = false,
}: {
	value: Severity | "";
	onChange: (v: string) => void;
	disabled?: boolean;
}) {
	return (
		<select
			value={value}
			onChange={(e) => onChange(e.target.value)}
			disabled={disabled}
			style={{
				height: 32,
				flex: 1,
				background: "rgba(255,255,255,0.10)",
				border: "1px solid rgba(255,255,255,0.10)",
				borderRadius: 8,
				padding: "0 8px",
				color: disabled ? "rgba(255,255,255,0.3)" : "#fff",
				fontSize: 11,
				cursor: disabled ? "not-allowed" : "pointer",
				fontFamily: "inherit",
				outline: "none",
				opacity: disabled ? 0.4 : 1,
			}}
		>
			{(Object.keys(SEVERITY_LABELS) as Severity[]).map((s) => (
				<option key={s} value={s} style={{ background: "#111", color: "#fff" }}>
					{SEVERITY_LABELS[s]}
				</option>
			))}
		</select>
	);
}

function NumberInput({
	value,
	onChange,
	placeholder,
	unit,
	step = 1,
}: {
	value: string;
	onChange: (v: string) => void;
	placeholder: string;
	unit: string;
	step?: number;
}) {
	const numeric = value !== "" ? parseFloat(value) : parseFloat(placeholder);
	const display = value !== "" ? value : placeholder;

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				height: 32,
				borderRadius: 12,
				overflow: "hidden",
				border: "1px solid rgba(255,255,255,0.10)",
				background: "rgba(255,255,255,0.10)",
				flexShrink: 0,
			}}
		>
			<button
				type="button"
				onClick={() => onChange(String(Number((numeric - step).toFixed(2))))}
				style={{
					padding: "0 7px",
					height: "100%",
					background: "transparent",
					border: "none",
					color: "rgba(255,255,255,0.5)",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Minus size={10} />
			</button>
			<span
				style={{
					padding: "0 4px",
					color: "#fff",
					fontSize: 11,
					fontWeight: 500,
					minWidth: 28,
					textAlign: "center",
					userSelect: "none",
					whiteSpace: "nowrap",
				}}
			>
				{display}
				<span
					style={{
						color: "rgba(255,255,255,0.4)",
						fontSize: 10,
						marginLeft: 1,
					}}
				>
					{unit}
				</span>
			</span>
			<button
				type="button"
				onClick={() => onChange(String(Number((numeric + step).toFixed(2))))}
				style={{
					padding: "0 7px",
					height: "100%",
					background: "transparent",
					border: "none",
					color: "rgba(255,255,255,0.5)",
					cursor: "pointer",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Plus size={10} />
			</button>
		</div>
	);
}

function SaveButton({ onClick }: { onClick: () => void }) {
	return (
		<div
			style={{
				background: "rgba(0,0,0,0.20)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderRadius: 24,
				padding: 16,
			}}
		>
			<button
				type="button"
				onClick={onClick}
				style={{
					width: "100%",
					padding: "10px 0",
					borderRadius: 12,
					background: "rgba(255,255,255,0.12)",
					border: "1px solid rgba(255,255,255,0.15)",
					color: "#fff",
					fontSize: 13,
					fontWeight: 500,
					cursor: "pointer",
					fontFamily: "inherit",
				}}
			>
				Sauvegarder
			</button>
		</div>
	);
}

/**
 * Card for configuring per-sensor notification preferences, including enabled state,
 * minimum severity level, and optional quiet hours.
 */
function NotificationPrefsCard() {
	const [prefs, setPrefs] = useState<
		Record<SensorType, { enabled: boolean; minSeverity: Severity }>
	>(
		Object.fromEntries(
			DATA_TYPES.map((t) => [
				t,
				{ enabled: true, minSeverity: "WARNING" as Severity },
			]),
		) as Record<SensorType, { enabled: boolean; minSeverity: Severity }>,
	);
	const [quietEnabled, setQuietEnabled] = useState(false);
	const [saved, setSaved] = useState(true);

	const setChanged = () => setSaved(false);

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			{/* Section label */}
			<h2
				style={{
					color: "rgba(255,255,255,0.6)",
					fontSize: 11,
					fontWeight: 600,
					textTransform: "uppercase",
					letterSpacing: "0.08em",
					margin: 0,
					padding: "0 4px",
				}}
			>
				Préférences de notification
			</h2>

			{/* Per-sensor rows */}
			<div
				style={{
					background: "rgba(0,0,0,0.20)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					borderRadius: 24,
					overflow: "hidden",
				}}
			>
				{DATA_TYPES.map((type, i) => {
					const meta = SENSOR_META[type];
					const pref = prefs[type];
					return (
						<div
							key={type}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 8,
								padding: "10px 16px",
								borderBottom:
									i < DATA_TYPES.length - 1
										? "1px solid rgba(255,255,255,0.05)"
										: "none",
							}}
						>
							{/* Icon */}
							<span
								style={{
									color: "rgba(255,255,255,0.6)",
									display: "flex",
									flexShrink: 0,
								}}
							>
								<meta.Icon size={14} strokeWidth={1.5} />
							</span>
							{/* Label */}
							<span
								style={{
									color: "#fff",
									fontSize: 13,
									flex: 1,
									minWidth: 0,
									overflow: "hidden",
									textOverflow: "ellipsis",
									whiteSpace: "nowrap",
								}}
							>
								{meta.label}
							</span>
							{/* Min severity select */}
							<div style={{ width: 80, flexShrink: 0 }}>
								<SeveritySelect
									value={pref.minSeverity}
									onChange={(v) => {
										setPrefs((p) => ({
											...p,
											[type]: { ...p[type], minSeverity: v as Severity },
										}));
										setChanged();
									}}
									disabled={!pref.enabled}
								/>
							</div>
							{/* Toggle */}
							<Switch
								checked={pref.enabled}
								onCheckedChange={(v) => {
									setPrefs((p) => ({
										...p,
										[type]: { ...p[type], enabled: v },
									}));
									setChanged();
								}}
							/>
						</div>
					);
				})}
			</div>

			{/* Quiet hours */}
			<div
				style={{
					background: "rgba(0,0,0,0.20)",
					backdropFilter: "blur(12px)",
					WebkitBackdropFilter: "blur(12px)",
					borderRadius: 24,
					overflow: "hidden",
				}}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "12px 16px",
						borderBottom: quietEnabled
							? "1px solid rgba(255,255,255,0.05)"
							: "none",
					}}
				>
					<div>
						<p
							style={{
								color: "#fff",
								fontSize: 13,
								fontWeight: 600,
								margin: 0,
							}}
						>
							Heures silencieuses
						</p>
						<p
							style={{
								color: "rgba(255,255,255,0.4)",
								fontSize: 11,
								margin: "2px 0 0",
							}}
						>
							Aucune alerte pendant ces heures
						</p>
					</div>
					<Switch
						checked={quietEnabled}
						onCheckedChange={(v) => {
							setQuietEnabled(v);
							setChanged();
						}}
					/>
				</div>
				{quietEnabled && (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "12px 16px",
						}}
					>
						<div
							style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}
						>
							<span
								style={{
									color: "rgba(255,255,255,0.5)",
									fontSize: 11,
									flexShrink: 0,
								}}
							>
								De
							</span>
							<select
								style={{
									flex: 1,
									height: 32,
									background: "rgba(255,255,255,0.10)",
									border: "1px solid rgba(255,255,255,0.10)",
									color: "#fff",
									borderRadius: 8,
									padding: "0 8px",
									fontSize: 11,
									fontFamily: "inherit",
									outline: "none",
								}}
							>
								{Array.from({ length: 24 }, (_, h) => (
									<option key={h} value={h} style={{ background: "#111" }}>
										{String(h).padStart(2, "0")}:00
									</option>
								))}
							</select>
						</div>
						<div
							style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}
						>
							<span
								style={{
									color: "rgba(255,255,255,0.5)",
									fontSize: 11,
									flexShrink: 0,
								}}
							>
								À
							</span>
							<select
								defaultValue="7"
								style={{
									flex: 1,
									height: 32,
									background: "rgba(255,255,255,0.10)",
									border: "1px solid rgba(255,255,255,0.10)",
									color: "#fff",
									borderRadius: 8,
									padding: "0 8px",
									fontSize: 11,
									fontFamily: "inherit",
									outline: "none",
								}}
							>
								{Array.from({ length: 24 }, (_, h) => (
									<option key={h} value={h} style={{ background: "#111" }}>
										{String(h).padStart(2, "0")}:00
									</option>
								))}
							</select>
						</div>
					</div>
				)}
			</div>

			{!saved && <SaveButton onClick={() => setSaved(true)} />}
		</div>
	);
}

type LocalThreshold = {
	highValue: string;
	highSeverity: Severity;
	lowValue: string;
	lowSeverity: Severity;
};

/**
 * Card for adjusting per-sensor detection thresholds (high/low values) and their associated severity levels.
 */
function ThresholdsCard() {
	const [values, setValues] = useState<Record<SensorType, LocalThreshold>>(
		Object.fromEntries(
			DATA_TYPES.map((t) => {
				const d = DEFAULTS[t];
				return [
					t,
					{
						highValue: d.high != null ? String(d.high) : "",
						highSeverity: "WARNING" as Severity,
						lowValue: d.low != null ? String(d.low) : "",
						lowSeverity: "WARNING" as Severity,
					},
				];
			}),
		) as Record<SensorType, LocalThreshold>,
	);
	const [saved, setSaved] = useState(true);

	const update = (
		type: SensorType,
		field: keyof LocalThreshold,
		val: string,
	) => {
		setValues((p) => ({ ...p, [type]: { ...p[type], [field]: val } }));
		setSaved(false);
	};

	const reset = (type: SensorType) => {
		const d = DEFAULTS[type];
		setValues((p) => ({
			...p,
			[type]: {
				highValue: d.high != null ? String(d.high) : "",
				highSeverity: "WARNING",
				lowValue: d.low != null ? String(d.low) : "",
				lowSeverity: "WARNING",
			},
		}));
		setSaved(false);
	};

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
			{/* Section label */}
			<h2
				style={{
					color: "rgba(255,255,255,0.6)",
					fontSize: 11,
					fontWeight: 600,
					textTransform: "uppercase",
					letterSpacing: "0.08em",
					margin: 0,
					padding: "0 4px",
				}}
			>
				Seuils de détection
			</h2>

			{DATA_TYPES.map((type) => {
				const meta = SENSOR_META[type];
				const def = DEFAULTS[type];
				const v = values[type];
				const hasHigh = def.high !== undefined;
				const hasLow = def.low !== undefined;
				if (!hasHigh && !hasLow) return null;

				return (
					<div
						key={type}
						style={{
							background: "rgba(0,0,0,0.20)",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
							borderRadius: 24,
							overflow: "hidden",
						}}
					>
						{/* Card header */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								padding: "12px 16px",
								borderBottom: "1px solid rgba(255,255,255,0.05)",
							}}
						>
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 8,
									color: "#fff",
									minWidth: 0,
								}}
							>
								<meta.Icon
									size={14}
									strokeWidth={1.5}
									style={{ flexShrink: 0 }}
								/>
								<span
									style={{
										fontSize: 13,
										fontWeight: 600,
										overflow: "hidden",
										textOverflow: "ellipsis",
										whiteSpace: "nowrap",
									}}
								>
									{meta.label}
								</span>
							</div>
							<button
								type="button"
								onClick={() => reset(type)}
								title="Réinitialiser"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									width: 28,
									height: 28,
									color: "rgba(255,255,255,0.3)",
									background: "rgba(255,255,255,0.05)",
									border: "none",
									borderRadius: 8,
									cursor: "pointer",
									flexShrink: 0,
								}}
							>
								<RotateCcw size={12} />
							</button>
						</div>

						{/* High threshold row */}
						{hasHigh && (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 6,
									padding: "9px 16px",
									borderBottom: hasLow
										? "1px solid rgba(255,255,255,0.05)"
										: "none",
								}}
							>
								<span
									style={{
										color: "rgba(255,255,255,0.5)",
										fontSize: 11,
										width: 28,
										flexShrink: 0,
									}}
								>
									Haut
								</span>
								<NumberInput
									value={v.highValue}
									onChange={(val) => update(type, "highValue", val)}
									placeholder={String(def.high)}
									unit={meta.unit}
									step={type === "CO2" ? 50 : 1}
								/>
								<SeveritySelect
									value={v.highSeverity}
									onChange={(val) => update(type, "highSeverity", val)}
								/>
							</div>
						)}

						{/* Low threshold row */}
						{hasLow && (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									gap: 6,
									padding: "9px 16px",
								}}
							>
								<span
									style={{
										color: "rgba(255,255,255,0.5)",
										fontSize: 11,
										width: 28,
										flexShrink: 0,
									}}
								>
									Bas
								</span>
								<NumberInput
									value={v.lowValue}
									onChange={(val) => update(type, "lowValue", val)}
									placeholder={String(def.low)}
									unit={meta.unit}
									step={type === "CO2" ? 50 : 1}
								/>
								<SeveritySelect
									value={v.lowSeverity}
									onChange={(val) => update(type, "lowSeverity", val)}
								/>
							</div>
						)}
					</div>
				);
			})}

			{!saved && <SaveButton onClick={() => setSaved(true)} />}
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

					{/* Scrollable content */}
					<div
						style={{
							height: 620,
							overflowY: "auto",
							overflowX: "hidden",
							scrollbarWidth: "none",
							position: "relative",
						}}
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

/**
 * Interactive settings demo displaying notification preferences and threshold configuration cards.
 */
export default function SettingsPreview() {
	return (
		<IPhoneShell>
			<div
				style={{
					position: "relative",
					minHeight: "100%",
					fontFamily:
						"var(--font-geist-sans), system-ui, -apple-system, sans-serif",
				}}
			>
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

				<div
					style={{
						position: "relative",
						zIndex: 10,
						padding: "16px 16px 32px",
						display: "flex",
						flexDirection: "column",
						gap: 20,
					}}
				>
					{/* Header — exact replica */}
					<header
						style={{
							display: "flex",
							alignItems: "center",
							gap: 12,
							padding: "8px 0",
						}}
					>
						<button
							type="button"
							style={{
								width: 56,
								height: 56,
								borderRadius: "50%",
								flexShrink: 0,
								padding: 0,
								border: "none",
								cursor: "pointer",
								overflow: "hidden",
								background: "transparent",
							}}
						>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/default-profil.jpg"
								alt="Jean Dupont"
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
									borderRadius: "50%",
								}}
							/>
						</button>
						<div style={{ flex: 1 }}>
							<p
								style={{
									color: "#cbd5e1",
									fontSize: 14,
									margin: 0,
									lineHeight: "150%",
								}}
							>
								Bonjour,
							</p>
							<p
								style={{
									color: "#fff",
									fontWeight: 600,
									fontSize: 22,
									margin: 0,
								}}
							>
								Jean Dupont
							</p>
						</div>
						<button
							type="button"
							style={{
								padding: 8,
								borderRadius: 12,
								background: "transparent",
								border: "none",
								cursor: "pointer",
							}}
						>
							<Settings size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
						</button>
						<button
							type="button"
							style={{
								padding: 8,
								borderRadius: 12,
								background: "transparent",
								border: "none",
								cursor: "pointer",
							}}
						>
							<Bell size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
						</button>
					</header>

					{/* Page title with back arrow */}
					<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
						<button
							type="button"
							style={{
								padding: 8,
								borderRadius: 12,
								background: "rgba(255,255,255,0.08)",
								border: "none",
								cursor: "pointer",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<ArrowLeft size={18} style={{ color: "rgba(255,255,255,0.7)" }} />
						</button>
						<div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
							<h1
								style={{
									color: "#fff",
									fontSize: 18,
									fontWeight: 600,
									margin: 0,
								}}
							>
								Paramètres
							</h1>
							<p
								style={{
									color: "rgba(255,255,255,0.4)",
									fontSize: 12,
									margin: 0,
								}}
							>
								Personnalisez les alertes et seuils
							</p>
						</div>
					</div>

					{/* Notification prefs */}
					<NotificationPrefsCard />

					{/* Thresholds */}
					<ThresholdsCard />
				</div>
			</div>
		</IPhoneShell>
	);
}
