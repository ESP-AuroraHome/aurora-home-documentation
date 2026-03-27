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
import { Check, LogOut, SquarePen, X } from "lucide-react";
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

/**
 * Interactive profile management demo with inline editing for name, email, language, and avatar picker.
 */
export default function ProfilePreview() {
	const SEED = "aurora-demo";

	const avatarOptions = useMemo(
		() =>
			AVATAR_STYLES.map((style) => ({
				style: style.name,
				// biome-ignore lint/suspicious/noExplicitAny: dicebear generator type
				url: createAvatar(style.generator as any, {
					seed: SEED,
					size: 128,
				}).toDataUri(),
			})),
		[],
	);

	const defaultAvatar = avatarOptions[0]?.url ?? "";

	const [name, setName] = useState("Marie Dupont");
	const [email, setEmail] = useState("marie@example.com");
	const [savedEmail, setSavedEmail] = useState("marie@example.com");
	const [editEmailVal, setEditEmailVal] = useState(email);
	const [locale, setLocale] = useState<"fr" | "en">("fr");
	const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
	const [savedAvatar, setSavedAvatar] = useState(defaultAvatar);
	const [savedName, setSavedName] = useState("Marie Dupont");
	const [savedLocale, setSavedLocale] = useState<"fr" | "en">("fr");

	const [pickingAvatar, setPickingAvatar] = useState(false);
	const [editingField, setEditingField] = useState<
		"name" | "email" | "locale" | null
	>(null);
	const [editNameVal, setEditNameVal] = useState(name);
	const [saveSuccess, setSaveSuccess] = useState(false);

	const hasChanges =
		selectedAvatar !== savedAvatar ||
		name !== savedName ||
		locale !== savedLocale ||
		email !== savedEmail;

	const handleSave = () => {
		setSavedAvatar(selectedAvatar);
		setSavedName(name);
		setSavedLocale(locale);
		setSavedEmail(email);
		setSaveSuccess(true);
		setTimeout(() => setSaveSuccess(false), 1800);
	};

	const ff = "var(--font-geist-sans), system-ui, -apple-system, sans-serif";

	return (
		<IPhoneShell>
			<div
				style={{
					position: "relative",
					width: "100%",
					height: "100%",
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

				{/* Scrollable content */}
				<div
					style={{
						position: "relative",
						zIndex: 10,
						height: "100%",
						overflowY: "auto",
						padding: "16px 16px 24px",
						display: "flex",
						flexDirection: "column",
						gap: 12,
						fontFamily: ff,
					}}
				>
					{/* ── Identity card ── */}
					<div
						style={{
							background: "rgba(0,0,0,0.20)",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
							borderRadius: 24,
							overflow: "hidden",
						}}
					>
						{pickingAvatar ? (
							/* Avatar picker */
							<div style={{ padding: "20px 20px 20px" }}>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										marginBottom: 16,
									}}
								>
									<span
										style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}
									>
										Choisir un avatar
									</span>
									<button
										type="button"
										onClick={() => setPickingAvatar(false)}
										style={{
											background: "none",
											border: "none",
											cursor: "pointer",
											padding: 2,
											color: "rgba(255,255,255,0.4)",
										}}
									>
										<X size={16} style={{ color: "rgba(255,255,255,0.4)" }} />
									</button>
								</div>
								<div
									style={{
										display: "grid",
										gridTemplateColumns: "repeat(5, 1fr)",
										gap: 8,
									}}
								>
									{avatarOptions.map((opt) => {
										const isSel = selectedAvatar === opt.url;
										return (
											<button
												key={opt.style}
												type="button"
												onClick={() => {
													setSelectedAvatar(opt.url);
													setPickingAvatar(false);
												}}
												style={{
													position: "relative",
													aspectRatio: "1/1",
													borderRadius: "50%",
													overflow: "hidden",
													border: isSel
														? "2px solid #fff"
														: "2px solid rgba(255,255,255,0.10)",
													boxShadow: isSel
														? "0 0 0 2px rgba(255,255,255,0.3)"
														: "none",
													transform: isSel ? "scale(1.05)" : "scale(1)",
													transition: "all 0.15s ease",
													background: "rgba(255,255,255,0.05)",
													cursor: "pointer",
													padding: 0,
												}}
											>
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={opt.url}
													alt={opt.style}
													style={{
														width: "100%",
														height: "100%",
														objectFit: "cover",
														padding: 2,
														boxSizing: "border-box",
													}}
												/>
												{isSel && (
													<div
														style={{
															position: "absolute",
															inset: 0,
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															background: "rgba(0,0,0,0.4)",
															borderRadius: "50%",
														}}
													>
														<Check size={12} style={{ color: "#fff" }} />
													</div>
												)}
											</button>
										);
									})}
								</div>
							</div>
						) : (
							/* Normal identity */
							<div
								style={{
									padding: "28px 20px",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									gap: 10,
								}}
							>
								{/* Avatar button */}
								<button
									type="button"
									onClick={() => setPickingAvatar(true)}
									style={{
										position: "relative",
										background: "none",
										border: "none",
										cursor: "pointer",
										padding: 0,
									}}
								>
									<div
										style={{
											width: 80,
											height: 80,
											borderRadius: "50%",
											overflow: "hidden",
											border: "2px solid rgba(255,255,255,0.15)",
										}}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={selectedAvatar}
											alt={name}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
										/>
									</div>
									<div
										style={{
											position: "absolute",
											inset: 0,
											borderRadius: "50%",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											background: "rgba(0,0,0,0)",
											transition: "background 0.15s",
										}}
									>
										<SquarePen
											size={18}
											style={{
												color: "rgba(255,255,255,0)",
												transition: "color 0.15s",
											}}
										/>
									</div>
									{/* Edit hint overlay — always slightly visible */}
									<div
										style={{
											position: "absolute",
											bottom: 0,
											right: 0,
											width: 24,
											height: 24,
											borderRadius: "50%",
											background: "rgba(0,0,0,0.6)",
											border: "1.5px solid rgba(255,255,255,0.2)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<SquarePen
											size={11}
											style={{ color: "rgba(255,255,255,0.7)" }}
										/>
									</div>
								</button>

								{/* Editable name */}
								{editingField === "name" ? (
									<div
										style={{
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											gap: 4,
											width: "100%",
											maxWidth: 200,
										}}
									>
										<input
											type="text"
											value={editNameVal}
											onChange={(e) => setEditNameVal(e.target.value)}
											onBlur={() => {
												setName(editNameVal.trim() || name);
												setEditingField(null);
											}}
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													setName(editNameVal.trim() || name);
													setEditingField(null);
												}
											}}
											style={{
												width: "100%",
												boxSizing: "border-box",
												background: "rgba(255,255,255,0.10)",
												border: "1px solid rgba(255,255,255,0.20)",
												borderRadius: 10,
												padding: "6px 12px",
												color: "#fff",
												fontSize: 15,
												textAlign: "center",
												outline: "none",
												fontFamily: ff,
											}}
										/>
									</div>
								) : (
									<button
										type="button"
										onClick={() => {
											setEditNameVal(name);
											setEditingField("name");
										}}
										style={{
											display: "flex",
											alignItems: "center",
											gap: 6,
											background: "none",
											border: "none",
											cursor: "pointer",
											padding: 0,
										}}
									>
										<span
											style={{ color: "#fff", fontSize: 17, fontWeight: 600 }}
										>
											{name}
										</span>
										<SquarePen
											size={13}
											style={{ color: "rgba(255,255,255,0.22)" }}
										/>
									</button>
								)}
							</div>
						)}
					</div>

					{/* ── Settings card ── */}
					<div
						style={{
							background: "rgba(0,0,0,0.20)",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
							borderRadius: 24,
							overflow: "hidden",
						}}
					>
						{/* Email row */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								padding: "14px 20px",
								borderBottom: "1px solid rgba(255,255,255,0.05)",
							}}
						>
							<span
								style={{
									color: "rgba(255,255,255,0.50)",
									fontSize: 13,
									width: 72,
									flexShrink: 0,
								}}
							>
								Email
							</span>
							{editingField === "email" ? (
								<div style={{ flex: 1, minWidth: 0 }}>
									<input
										type="email"
										value={editEmailVal}
										onChange={(e) => setEditEmailVal(e.target.value)}
										onBlur={() => {
											setEmail(editEmailVal.trim() || email);
											setEditingField(null);
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												setEmail(editEmailVal.trim() || email);
												setEditingField(null);
											}
										}}
										style={{
											width: "100%",
											boxSizing: "border-box",
											background: "rgba(255,255,255,0.10)",
											border: "1px solid rgba(255,255,255,0.20)",
											borderRadius: 8,
											padding: "4px 10px",
											color: "#fff",
											fontSize: 13,
											outline: "none",
											fontFamily: ff,
										}}
									/>
								</div>
							) : (
								<div
									style={{
										display: "flex",
										flex: 1,
										alignItems: "center",
										justifyContent: "flex-end",
										gap: 8,
										minWidth: 0,
									}}
								>
									<span
										style={{
											color: "#fff",
											fontSize: 13,
											overflow: "hidden",
											textOverflow: "ellipsis",
											whiteSpace: "nowrap",
										}}
									>
										{email}
									</span>
									<button
										type="button"
										onClick={() => {
											setEditEmailVal(email);
											setEditingField("email");
										}}
										style={{
											background: "none",
											border: "none",
											cursor: "pointer",
											padding: 0,
											flexShrink: 0,
										}}
									>
										<SquarePen
											size={13}
											style={{ color: "rgba(255,255,255,0.25)" }}
										/>
									</button>
								</div>
							)}
						</div>

						{/* Language row */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								padding: "14px 20px",
								borderBottom: "1px solid rgba(255,255,255,0.05)",
							}}
						>
							<span
								style={{
									color: "rgba(255,255,255,0.50)",
									fontSize: 13,
									width: 72,
									flexShrink: 0,
								}}
							>
								Langue
							</span>
							{editingField === "locale" ? (
								<div
									style={{
										flex: 1,
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									<select
										value={locale}
										onChange={(e) => {
											setLocale(e.target.value as "fr" | "en");
											setEditingField(null);
										}}
										onBlur={() => setEditingField(null)}
										style={{
											background: "rgba(255,255,255,0.10)",
											border: "1px solid rgba(255,255,255,0.20)",
											borderRadius: 8,
											padding: "4px 8px",
											color: "#fff",
											fontSize: 13,
											outline: "none",
											fontFamily: ff,
											cursor: "pointer",
										}}
									>
										<option value="fr" style={{ background: "#1a1a1e" }}>
											Français
										</option>
										<option value="en" style={{ background: "#1a1a1e" }}>
											English
										</option>
									</select>
								</div>
							) : (
								<div
									style={{
										display: "flex",
										flex: 1,
										alignItems: "center",
										justifyContent: "flex-end",
										gap: 8,
									}}
								>
									<span style={{ color: "#fff", fontSize: 13 }}>
										{locale === "fr" ? "Français" : "English"}
									</span>
									<button
										type="button"
										onClick={() => setEditingField("locale")}
										style={{
											background: "none",
											border: "none",
											cursor: "pointer",
											padding: 0,
											flexShrink: 0,
										}}
									>
										<SquarePen
											size={13}
											style={{ color: "rgba(255,255,255,0.25)" }}
										/>
									</button>
								</div>
							)}
						</div>

						{/* Email verified row */}
						<div
							style={{
								display: "flex",
								alignItems: "center",
								gap: 12,
								padding: "14px 20px",
							}}
						>
							<span
								style={{
									color: "rgba(255,255,255,0.50)",
									fontSize: 13,
									width: 72,
									flexShrink: 0,
								}}
							>
								Vérification
							</span>
							<div
								style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
							>
								<span
									style={{
										display: "flex",
										alignItems: "center",
										gap: 5,
										fontSize: 11,
										fontWeight: 500,
										color: "#34d399",
										background: "rgba(52,211,153,0.10)",
										padding: "4px 10px",
										borderRadius: 20,
									}}
								>
									<Check size={11} style={{ color: "#34d399" }} />
									Vérifiée
								</span>
							</div>
						</div>
					</div>

					{/* ── Save card (only when changes) ── */}
					{hasChanges && (
						<div
							style={{
								background: "rgba(0,0,0,0.20)",
								backdropFilter: "blur(12px)",
								WebkitBackdropFilter: "blur(12px)",
								borderRadius: 24,
								padding: 14,
							}}
						>
							<button
								type="button"
								onClick={handleSave}
								style={{
									width: "100%",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: 8,
									background: "rgba(255,255,255,0.12)",
									border: "1px solid rgba(255,255,255,0.15)",
									borderRadius: 14,
									padding: "11px 0",
									cursor: "pointer",
									color: "#fff",
									fontSize: 14,
									fontWeight: 500,
									fontFamily: ff,
									backdropFilter: "blur(8px)",
								}}
							>
								{saveSuccess ? (
									<>
										<Check size={15} style={{ color: "#34d399" }} />
										<span style={{ color: "#34d399" }}>Enregistré</span>
									</>
								) : (
									"Enregistrer"
								)}
							</button>
						</div>
					)}

					{/* ── Sign out card ── */}
					<div
						style={{
							background: "rgba(0,0,0,0.20)",
							backdropFilter: "blur(12px)",
							WebkitBackdropFilter: "blur(12px)",
							borderRadius: 24,
							padding: "14px 20px",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<div>
							<p
								style={{
									color: "#fff",
									fontSize: 13,
									fontWeight: 500,
									margin: 0,
								}}
							>
								Se déconnecter
							</p>
							<p
								style={{
									color: "rgba(255,255,255,0.35)",
									fontSize: 11,
									margin: "3px 0 0",
								}}
							>
								Fermer la session en cours
							</p>
						</div>
						<button
							type="button"
							style={{
								display: "flex",
								alignItems: "center",
								gap: 6,
								padding: "6px 12px",
								borderRadius: 8,
								background: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.15)",
								color: "rgba(255,255,255,0.65)",
								fontSize: 13,
								cursor: "pointer",
								fontFamily: ff,
							}}
						>
							<LogOut size={14} style={{ color: "rgba(255,255,255,0.65)" }} />
							<span style={{ color: "rgba(255,255,255,0.65)" }}>Quitter</span>
						</button>
					</div>
				</div>
			</div>
		</IPhoneShell>
	);
}
