"use client";

import {
	Bell,
	Cloud,
	Download,
	Droplet,
	Gauge,
	House,
	Minus,
	Settings,
	Sun,
	Thermometer,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
	Area,
	CartesianGrid,
	AreaChart as RechartsAreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

type Period = "live" | "1h" | "6h" | "24h" | "7j";

type ChartPoint = {
	value: number;
	timestamp: number;
	label: string;
	time: string;
	date: string;
};

const PERIOD_MS: Record<Period, number> = {
	live: 20 * 60 * 1000,
	"1h": 60 * 60 * 1000,
	"6h": 6 * 60 * 60 * 1000,
	"24h": 24 * 60 * 60 * 1000,
	"7j": 7 * 24 * 60 * 60 * 1000,
};

const PERIOD_POINTS: Record<Period, number> = {
	live: 20,
	"1h": 24,
	"6h": 30,
	"24h": 36,
	"7j": 42,
};
const PERIOD_VARIANCE: Record<Period, number> = {
	live: 0.01,
	"1h": 0.02,
	"6h": 0.04,
	"24h": 0.06,
	"7j": 0.08,
};

function generateTimeSeries(base: number, period: Period): ChartPoint[] {
	const now = Date.now();
	const spanMs = PERIOD_MS[period];
	const spanHours = spanMs / (1000 * 60 * 60);
	const length = PERIOD_POINTS[period];
	const variance = base * PERIOD_VARIANCE[period];
	const result: ChartPoint[] = [];
	let val = base;
	for (let i = 0; i < length; i++) {
		val += (Math.random() - 0.5) * variance;
		const ts = now - spanMs + (i / (length - 1)) * spanMs;
		const d = new Date(ts);
		const label =
			spanHours > 24
				? d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit" })
				: d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
		result.push({
			value: parseFloat(val.toFixed(2)),
			timestamp: ts,
			label,
			time: d.toLocaleTimeString("fr-FR", {
				hour: "2-digit",
				minute: "2-digit",
			}),
			date: d.toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
				year: "numeric",
			}),
		});
	}
	return result;
}

function calcDomain(type: string, values: number[]): [number, number] {
	if (values.length === 0) {
		const defaults: Record<string, [number, number]> = {
			TEMPERATURE: [0, 30],
			HUMIDITY: [0, 100],
			PRESSURE: [950, 1050],
			CO2: [300, 2000],
			LIGHT: [0, 1000],
		};
		return defaults[type] ?? [0, 100];
	}
	const mn = Math.min(...values),
		mx = Math.max(...values);
	const margin = (mx - mn) * 0.1 || 1;
	let lo = mn - margin,
		hi = mx + margin;
	if (type === "HUMIDITY") {
		lo = Math.max(lo, 0);
		hi = Math.min(hi, 100);
	}
	if (type === "PRESSURE") lo = Math.max(lo, 950);
	if (type === "CO2") lo = Math.max(lo, 300);
	if (type === "LIGHT") lo = Math.max(lo, 0);
	return [lo, hi];
}

function AreaChart({
	data,
	labels,
	height = 48,
	showAxes = false,
}: {
	data: number[];
	labels?: string[];
	height?: number;
	showAxes?: boolean;
}) {
	const W = 400;
	const H = height;
	const min = Math.min(...data);
	const max = Math.max(...data);
	const range = max - min || 1;
	const pad = showAxes ? 20 : 0;

	const toPoint = (v: number, i: number): [number, number] => [
		pad + (i / (data.length - 1)) * (W - pad),
		H - ((v - min) / range) * (H * 0.8) - H * 0.1,
	];

	const pts = data.map((v, i) => toPoint(v, i));
	const linePath = pts
		.map(
			([x, y], i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`,
		)
		.join(" ");
	const areaPath = `${linePath} L ${pts[pts.length - 1][0].toFixed(1)} ${H} L ${pts[0][0].toFixed(1)} ${H} Z`;
	const gradId = `grad-${data[0]}-${data.length}-${height}`;

	return (
		<svg
			viewBox={`0 0 ${W} ${H + (showAxes ? 18 : 0)}`}
			preserveAspectRatio="none"
			style={{ width: "100%", height }}
		>
			<defs>
				<linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
					<stop offset="5%" stopColor="white" stopOpacity={0.8} />
					<stop offset="95%" stopColor="white" stopOpacity={0.05} />
				</linearGradient>
			</defs>
			{showAxes &&
				[0.25, 0.5, 0.75].map((t) => (
					<line
						key={t}
						x1={pad}
						y1={H * t}
						x2={W}
						y2={H * t}
						stroke="rgba(255,255,255,0.08)"
						strokeDasharray="4 4"
					/>
				))}
			<path d={areaPath} fill={`url(#${gradId})`} fillOpacity={0.4} />
			<path
				d={linePath}
				fill="none"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			{showAxes &&
				labels?.map((label, i) => {
					if (!label) return null;
					const x = pad + (i / (labels.length - 1)) * (W - pad);
					return (
						<text
							key={i}
							x={x}
							y={H + 14}
							textAnchor="middle"
							fill="rgba(255,255,255,0.35)"
							fontSize={10}
						>
							{label}
						</text>
					);
				})}
		</svg>
	);
}

const SENSORS = [
	{
		type: "TEMPERATURE",
		label: "Température",
		value: 21.45,
		unit: "°C",
		trend: "stable" as const,
		data: [20.9, 21.1, 21.0, 21.3, 21.2, 21.4, 21.3, 21.5, 21.4, 21.45],
	},
	{
		type: "HUMIDITY",
		label: "Humidité",
		value: 45.2,
		unit: "%",
		trend: "down" as const,
		data: [47.0, 46.8, 46.5, 46.2, 45.9, 45.7, 45.6, 45.4, 45.3, 45.2],
	},
	{
		type: "PRESSURE",
		label: "Pression",
		value: 1013.2,
		unit: "hPa",
		trend: "stable" as const,
		data: [
			1013.0, 1013.1, 1013.0, 1013.2, 1013.1, 1013.3, 1013.2, 1013.1, 1013.2,
			1013.2,
		],
	},
	{
		type: "CO2",
		label: "CO2",
		value: 523.0,
		unit: "ppm",
		trend: "up" as const,
		data: [490, 495, 500, 505, 508, 512, 515, 519, 521, 523],
	},
	{
		type: "LIGHT",
		label: "Lumière",
		value: 285.0,
		unit: "lx",
		trend: "down" as const,
		data: [310, 305, 300, 298, 294, 292, 290, 288, 286, 285],
	},
];

function IconDataType({ type, size = 24 }: { type: string; size?: number }) {
	const cls = "p-[4px] rounded-full";
	switch (type) {
		case "TEMPERATURE":
			return (
				<Thermometer
					strokeWidth={2}
					size={size}
					className={cls}
					style={{ background: "#facc15" }}
				/>
			);
		case "HUMIDITY":
			return (
				<Droplet
					strokeWidth={1}
					size={size}
					className={cls}
					style={{ background: "#60a5fa" }}
				/>
			);
		case "PRESSURE":
			return (
				<Gauge
					strokeWidth={1}
					size={size}
					className={cls}
					style={{ background: "#4ade80" }}
				/>
			);
		case "CO2":
			return (
				<Cloud
					strokeWidth={1}
					size={size}
					className={cls}
					style={{ background: "#9ca3af" }}
				/>
			);
		case "LIGHT":
			return (
				<Sun
					strokeWidth={1}
					size={size}
					className={cls}
					style={{ background: "#fb923c" }}
				/>
			);
		default:
			return null;
	}
}

function TrendIndicator({ trend }: { trend: "up" | "down" | "stable" }) {
	if (trend === "up")
		return (
			<span
				style={{
					display: "flex",
					alignItems: "center",
					gap: 3,
					fontSize: 12,
					color: "#fdba74",
				}}
			>
				<TrendingUp size={14} />
				En hausse
			</span>
		);
	if (trend === "down")
		return (
			<span
				style={{
					display: "flex",
					alignItems: "center",
					gap: 3,
					fontSize: 12,
					color: "#6ee7b7",
				}}
			>
				<TrendingDown size={14} />
				En baisse
			</span>
		);
	return (
		<span
			style={{
				display: "flex",
				alignItems: "center",
				gap: 3,
				fontSize: 12,
				color: "rgba(255,255,255,0.3)",
			}}
		>
			<Minus size={14} />
			Stable
		</span>
	);
}

/**
 * Sensor summary card displaying the current value, trend indicator, and a mini area chart.
 *
 * @param sensor - Sensor data including type, label, value, unit, trend, and chart data points
 * @param onClick - Callback fired when the card is tapped to open the detail drawer
 */
function SensorCard({
	sensor,
	onClick,
}: {
	sensor: (typeof SENSORS)[0];
	onClick: () => void;
}) {
	return (
		<div
			onClick={onClick}
			style={{
				background: "rgba(0,0,0,0.20)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				borderRadius: 24,
				padding: 16,
				display: "flex",
				flexWrap: "wrap",
				gap: 16,
				cursor: "pointer",
			}}
		>
			<div
				style={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "flex-start",
					gap: 8,
				}}
			>
				{/* Left */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: 8,
						minWidth: 0,
						flex: 1,
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: 6 }}>
						<IconDataType type={sensor.type} />
						<p
							style={{
								fontWeight: 600,
								fontSize: 16,
								color: "#fff",
								margin: 0,
								whiteSpace: "nowrap",
							}}
						>
							{sensor.label}
						</p>
					</div>
					<p style={{ color: "#cbd5e1", fontSize: 12, margin: 0 }}>
						Jeu. 24 Mar 2026
					</p>
				</div>
				{/* Right */}
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
						gap: 4,
						flexShrink: 0,
					}}
				>
					<p
						style={{
							fontWeight: 700,
							fontSize: 22,
							color: "#fff",
							margin: 0,
							whiteSpace: "nowrap",
						}}
					>
						{sensor.value.toFixed(2)}{" "}
						<span style={{ fontWeight: 400, fontSize: 14 }}>{sensor.unit}</span>
					</p>
					<TrendIndicator trend={sensor.trend} />
				</div>
			</div>
			{/* Mini chart */}
			<div style={{ width: "100%" }}>
				<AreaChart data={sensor.data} height={48} />
			</div>
		</div>
	);
}

function DrawerChart({
	data,
	type,
	unit,
}: {
	data: ChartPoint[];
	type: string;
	unit: string;
}) {
	const domain = calcDomain(
		type,
		data.map((d) => d.value),
	);
	const uid = useMemo(() => `dg-${Math.random().toString(36).slice(2, 8)}`, []);

	return (
		<ResponsiveContainer width="100%" height={230}>
			<RechartsAreaChart
				data={data}
				margin={{ top: 10, right: 8, left: 0, bottom: 4 }}
			>
				<defs>
					<linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
						<stop offset="5%" stopColor="white" stopOpacity={0.8} />
						<stop offset="95%" stopColor="white" stopOpacity={0.1} />
					</linearGradient>
				</defs>
				<CartesianGrid
					strokeDasharray="3 3"
					vertical={false}
					stroke="rgba(255,255,255,0.10)"
				/>
				<XAxis
					dataKey="label"
					tickLine={false}
					axisLine={false}
					tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
					interval="preserveStartEnd"
				/>
				<YAxis
					tickLine={false}
					axisLine={false}
					tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
					width={38}
					tickFormatter={(v: number) => {
						const n = typeof v === "number" ? v : parseFloat(String(v));
						if (!Number.isFinite(n)) return "--";
						return n >= 1000 ? n.toFixed(0) : n.toFixed(1);
					}}
					domain={domain}
					interval="preserveStartEnd"
				/>
				<Tooltip
					content={({ active, payload }) => {
						if (!active || !payload?.length) return null;
						const pt = payload[0].payload as ChartPoint;
						return (
							<div
								style={{
									background: "rgba(0,0,0,0.90)",
									backdropFilter: "blur(4px)",
									border: "1px solid rgba(255,255,255,0.20)",
									borderRadius: 8,
									padding: "6px 10px",
									boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
								}}
							>
								<p style={{ color: "#fff", fontSize: 11, margin: "0 0 2px" }}>
									{pt.date} {pt.time}
								</p>
								<p
									style={{
										color: "#fff",
										fontWeight: 600,
										fontSize: 13,
										margin: 0,
									}}
								>
									{Number(payload[0].value).toFixed(2)}
									{unit ? ` ${unit}` : ""}
								</p>
							</div>
						);
					}}
				/>
				<Area
					dataKey="value"
					type="monotone"
					fill={`url(#${uid})`}
					fillOpacity={0.4}
					stroke="white"
					strokeWidth={2}
					dot={false}
					activeDot={{ r: 4, fill: "white", strokeWidth: 0 }}
					isAnimationActive
					animationDuration={800}
					animationEasing="ease-out"
				/>
			</RechartsAreaChart>
		</ResponsiveContainer>
	);
}

const DRAWER_PERIODS: { label: string; value: Period }[] = [
	{ label: "Live", value: "live" },
	{ label: "1h", value: "1h" },
	{ label: "6h", value: "6h" },
	{ label: "24h", value: "24h" },
	{ label: "7j", value: "7j" },
];

/**
 * Bottom-sheet overlay with a full Recharts time-series chart and period selector for a given sensor.
 *
 * @param sensor - The sensor data to display in detail
 * @param onClose - Callback fired when the user dismisses the drawer
 */
function SensorDetailDrawer({
	sensor,
	onClose,
}: {
	sensor: (typeof SENSORS)[0];
	onClose: () => void;
}) {
	const [period, setPeriod] = useState<Period>("live");
	const chartData = useMemo(
		() => generateTimeSeries(sensor.value, period),
		[sensor.value, period],
	);

	return (
		<div
			style={{
				position: "absolute",
				inset: 0,
				zIndex: 50,
				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-end",
			}}
		>
			{/* Scrim */}
			<div
				onClick={onClose}
				style={{
					position: "absolute",
					inset: 0,
					background: "rgba(0,0,0,0.6)",
					backdropFilter: "blur(2px)",
					WebkitBackdropFilter: "blur(2px)",
				}}
			/>

			{/* Bottom sheet */}
			<div
				style={{
					position: "relative",
					zIndex: 1,
					background: "rgba(0,0,0,0.20)",
					backdropFilter: "blur(20px)",
					WebkitBackdropFilter: "blur(20px)",
					borderRadius: "24px 24px 0 0",
					border: "1px solid rgba(255,255,255,0.08)",
					borderBottom: "none",
				}}
			>
				{/* Handle */}
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						paddingTop: 10,
						paddingBottom: 2,
					}}
				>
					<div
						style={{
							width: 36,
							height: 4,
							background: "rgba(255,255,255,0.20)",
							borderRadius: 2,
						}}
					/>
				</div>

				{/* Header — left: icon+title/date | right: value/trend */}
				<div
					style={{
						display: "flex",
						alignItems: "flex-start",
						justifyContent: "space-between",
						padding: "8px 20px 10px",
					}}
				>
					<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
						<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
							<IconDataType type={sensor.type} size={20} />
							<p
								style={{
									color: "#fff",
									fontWeight: 600,
									fontSize: 18,
									margin: 0,
								}}
							>
								{sensor.label}
							</p>
						</div>
						<p style={{ color: "#cbd5e1", fontSize: 13, margin: 0 }}>
							Jeu. 24 Mar 2026
						</p>
					</div>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "flex-end",
							gap: 3,
						}}
					>
						<p
							style={{
								fontWeight: 700,
								fontSize: 22,
								color: "#fff",
								margin: 0,
								whiteSpace: "nowrap",
							}}
						>
							{sensor.value.toFixed(2)}
							<span
								style={{
									fontWeight: 400,
									fontSize: 14,
									color: "rgba(255,255,255,0.6)",
									marginLeft: 4,
								}}
							>
								{sensor.unit}
							</span>
						</p>
						<TrendIndicator trend={sensor.trend} />
					</div>
				</div>

				{/* Body */}
				<div
					style={{
						padding: "0 16px 20px",
						display: "flex",
						flexDirection: "column",
						gap: 10,
					}}
				>
					{/* Period pills + Export */}
					<div style={{ display: "flex", alignItems: "center", gap: 4 }}>
						{DRAWER_PERIODS.map((p) => (
							<button
								key={p.value}
								type="button"
								onClick={() => setPeriod(p.value)}
								style={{
									padding: "4px 7px",
									borderRadius: 20,
									fontSize: 11,
									border:
										period === p.value
											? "1px solid rgba(255,255,255,0.20)"
											: "1px solid transparent",
									background:
										period === p.value
											? "rgba(255,255,255,0.20)"
											: "rgba(255,255,255,0.05)",
									color: period === p.value ? "#fff" : "rgba(255,255,255,0.50)",
									fontWeight: period === p.value ? 600 : 400,
									cursor: "pointer",
									flexShrink: 0,
									fontFamily: "inherit",
								}}
							>
								{p.label}
							</button>
						))}
						<button
							type="button"
							style={{
								marginLeft: "auto",
								display: "flex",
								alignItems: "center",
								gap: 4,
								padding: "4px 8px",
								borderRadius: 20,
								fontSize: 11,
								border: "1px solid transparent",
								background: "rgba(255,255,255,0.05)",
								color: "rgba(255,255,255,0.50)",
								cursor: "pointer",
								fontFamily: "inherit",
								flexShrink: 0,
							}}
						>
							<Download size={10} />
							Export
						</button>
					</div>

					{/* Recharts area chart */}
					<DrawerChart data={chartData} type={sensor.type} unit={sensor.unit} />
				</div>
			</div>
		</div>
	);
}

function IAQScore() {
	const score = 72;
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 16,
				borderRadius: 16,
				padding: "12px 16px",
				background: "rgba(0,0,0,0.20)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				border: "1px solid rgba(255,255,255,0.1)",
			}}
		>
			<div
				style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
			>
				<div
					style={{
						width: 8,
						height: 8,
						borderRadius: "50%",
						background: "#38bdf8",
						flexShrink: 0,
					}}
				/>
				<p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: 0 }}>
					Bon
				</p>
			</div>
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					gap: 4,
					minWidth: 0,
				}}
			>
				<div
					style={{
						width: "100%",
						height: 4,
						background: "rgba(255,255,255,0.1)",
						borderRadius: 2,
						overflow: "hidden",
					}}
				>
					<div
						style={{
							width: `${score}%`,
							height: "100%",
							background: "#38bdf8",
							borderRadius: 2,
						}}
					/>
				</div>
				<p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>
					La qualité de l&apos;air est satisfaisante
				</p>
			</div>
			<span
				style={{
					color: "#7dd3fc",
					fontWeight: 700,
					fontSize: 14,
					flexShrink: 0,
				}}
			>
				{score}
				<span
					style={{
						color: "rgba(255,255,255,0.3)",
						fontWeight: 400,
						fontSize: 11,
					}}
				>
					/100
				</span>
			</span>
		</div>
	);
}

function AlertBannerHealthy() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				gap: 12,
				borderRadius: 16,
				padding: "12px 16px",
				background: "rgba(0,0,0,0.20)",
				backdropFilter: "blur(12px)",
				WebkitBackdropFilter: "blur(12px)",
				border: "1px solid rgba(255,255,255,0.1)",
			}}
		>
			<House
				strokeWidth={1}
				size={24}
				style={{
					background: "#34d399",
					padding: 4,
					borderRadius: "50%",
					flexShrink: 0,
				}}
			/>
			<div style={{ flex: 1, minWidth: 0 }}>
				<p style={{ color: "#fff", fontSize: 14, fontWeight: 500, margin: 0 }}>
					Votre maison est en bonne santé
				</p>
				<p
					style={{
						color: "rgba(255,255,255,0.4)",
						fontSize: 12,
						margin: "2px 0 0",
					}}
				>
					Tous les capteurs sont dans les normes
				</p>
			</div>
		</div>
	);
}

function DashboardHeader() {
	return (
		<header
			style={{
				display: "flex",
				alignItems: "center",
				gap: 12,
				width: "100%",
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
						color: "#e2e8f0",
						fontSize: 14,
						margin: 0,
						lineHeight: "150%",
					}}
				>
					Bonjour,
				</p>
				<p style={{ color: "#fff", fontWeight: 600, fontSize: 22, margin: 0 }}>
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
	);
}

function IPhoneShell({
	children,
	drawer,
}: {
	children: React.ReactNode;
	drawer?: React.ReactNode;
}) {
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
				{/* Volume buttons */}
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
							boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
						}}
					/>
				))}
				{/* Power button */}
				<div
					style={{
						position: "absolute",
						right: -3,
						top: 100,
						width: 3,
						height: 64,
						background: "#3a3a3e",
						borderRadius: "0 2px 2px 0",
						boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
					}}
				/>

				{/* Screen bezel */}
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

					{/* Drawer overlay — absolute within bezel, outside the scroll area */}
					{drawer}

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
 * Interactive dashboard demo with sensor cards and a tappable detail drawer, inside an iPhone mockup.
 */
export default function DashboardPreview() {
	const [activeSensor, setActiveSensor] = useState<string | null>(null);
	const activeSensorData = SENSORS.find((s) => s.type === activeSensor) ?? null;

	return (
		<IPhoneShell
			drawer={
				activeSensorData ? (
					<SensorDetailDrawer
						sensor={activeSensorData}
						onClose={() => setActiveSensor(null)}
					/>
				) : undefined
			}
		>
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
						padding: "16px 20px 32px",
						display: "flex",
						flexDirection: "column",
						gap: 20,
					}}
				>
					<DashboardHeader />
					<h1
						style={{
							color: "#fff",
							fontWeight: 600,
							fontSize: 22,
							lineHeight: "150%",
							margin: 0,
						}}
					>
						Voici la santé de votre maison
					</h1>
					<AlertBannerHealthy />
					<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
						<IAQScore />
						<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
							{SENSORS.map((s) => (
								<SensorCard
									key={s.type}
									sensor={s}
									onClick={() => setActiveSensor(s.type)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</IPhoneShell>
	);
}
