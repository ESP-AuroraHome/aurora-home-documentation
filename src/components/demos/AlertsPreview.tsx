"use client";

import {
  AlertTriangle,
  Bell,
  CheckCheck,
  CheckCircle2,
  Cloud,
  Droplet,
  Gauge,
  House,
  Settings,
  Sun,
  Thermometer,
  X,
} from "lucide-react";
import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
type Severity = "WARNING" | "HIGH" | "CRITICAL";
type SensorType = "TEMPERATURE" | "HUMIDITY" | "PRESSURE" | "CO2" | "LIGHT";
type AlertType = "THRESHOLD_HIGH" | "THRESHOLD_LOW" | "SUDDEN_CHANGE";

interface MockAlert {
  id: string;
  type: AlertType;
  severity: Severity;
  sensorType: SensorType;
  value: number;
  threshold: number;
  message: string;
  suggestions: string[];
  read: boolean;
  resolvedAt: string | null;
  createdAt: string;
}

// ── Mock data ─────────────────────────────────────────────────────────────────
const INITIAL_ALERTS: MockAlert[] = [
  {
    id: "1",
    type: "THRESHOLD_HIGH",
    severity: "HIGH",
    sensorType: "TEMPERATURE",
    value: 33.2,
    threshold: 32,
    message: "Température élevée : 33.2°C (seuil : 32°C)",
    suggestions: [
      "Activez la climatisation ou un ventilateur.",
      "Fermez les volets pour limiter la chaleur solaire.",
      "Vérifiez la ventilation de la pièce.",
    ],
    read: false,
    resolvedAt: null,
    createdAt: "Il y a 3 min",
  },
  {
    id: "2",
    type: "THRESHOLD_HIGH",
    severity: "WARNING",
    sensorType: "CO2",
    value: 920,
    threshold: 800,
    message: "CO₂ élevé : 920 ppm (seuil : 800 ppm)",
    suggestions: [
      "Ouvrez une fenêtre pour aérer la pièce.",
      "Vérifiez si la VMC est en fonctionnement.",
    ],
    read: false,
    resolvedAt: null,
    createdAt: "Il y a 8 min",
  },
  {
    id: "3",
    type: "SUDDEN_CHANGE",
    severity: "WARNING",
    sensorType: "HUMIDITY",
    value: 68.5,
    threshold: 43,
    message: "Variation brutale d'Humidité : 68.5% (variation de 43%)",
    suggestions: [
      "Vérifiez si un appareil produisant de la vapeur est allumé.",
      "Contrôlez l'absence de fuite d'eau.",
    ],
    read: true,
    resolvedAt: null,
    createdAt: "Il y a 22 min",
  },
];

// ── Severity styles (all inline, no Tailwind color classes) ───────────────────
const SEV_STYLES: Record<Severity, {
  barColor: string;
  badgeBg: string;
  badgeColor: string;
  bannerBg: string;
  bannerBorder: string;
  iconColor: string;
  dotColor: string;
  label: string;
}> = {
  CRITICAL: {
    barColor: "#f87171",
    badgeBg: "rgba(239,68,68,0.15)",
    badgeColor: "#fca5a5",
    bannerBg: "rgba(239,68,68,0.4)",
    bannerBorder: "rgba(248,113,113,0.6)",
    iconColor: "#fca5a5",
    dotColor: "#f87171",
    label: "Urgent",
  },
  HIGH: {
    barColor: "#fb923c",
    badgeBg: "rgba(249,115,22,0.15)",
    badgeColor: "#fdba74",
    bannerBg: "rgba(249,115,22,0.4)",
    bannerBorder: "rgba(251,146,60,0.6)",
    iconColor: "#fdba74",
    dotColor: "#fb923c",
    label: "Problème",
  },
  WARNING: {
    barColor: "#facc15",
    badgeBg: "rgba(234,179,8,0.15)",
    badgeColor: "#fde047",
    bannerBg: "rgba(234,179,8,0.3)",
    bannerBorder: "rgba(250,204,21,0.5)",
    iconColor: "#fde047",
    dotColor: "#facc15",
    label: "Attention",
  },
};

const SEVERITY_ORDER: Record<Severity, number> = { CRITICAL: 0, HIGH: 1, WARNING: 2 };

// ── Sensor icons ──────────────────────────────────────────────────────────────
function SensorIcon({ type, badgeBg, badgeColor }: { type: SensorType; badgeBg: string; badgeColor: string }) {
  const Icon = { TEMPERATURE: Thermometer, HUMIDITY: Droplet, PRESSURE: Gauge, CO2: Cloud, LIGHT: Sun }[type];
  return (
    <div style={{ width: 32, height: 32, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: badgeBg, flexShrink: 0, marginTop: 2 }}>
      <Icon size={16} style={{ color: badgeColor }} />
    </div>
  );
}

// ── AlertCard (exact replica) ─────────────────────────────────────────────────
function AlertCard({
  alert,
  onRead,
  onResolve,
}: {
  alert: MockAlert;
  onRead: (id: string) => void;
  onResolve: (id: string) => void;
}) {
  const sev = SEV_STYLES[alert.severity];
  const isResolved = alert.resolvedAt !== null;

  return (
    <div
      onClick={() => !alert.read && onRead(alert.id)}
      style={{
        position: "relative",
        display: "flex",
        gap: 12,
        borderRadius: 16,
        padding: 16,
        background: !alert.read && !isResolved ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)",
        opacity: isResolved ? 0.5 : 1,
        cursor: !alert.read ? "pointer" : "default",
        overflow: "hidden",
      }}
    >
      {/* Left severity bar */}
      <div style={{ position: "absolute", left: 0, top: 12, bottom: 12, width: 2, borderRadius: 99, background: sev.barColor }} />

      {/* Sensor icon */}
      <SensorIcon type={alert.sensorType} badgeBg={sev.badgeBg} badgeColor={sev.badgeColor} />

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Message + time */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
          <p style={{ color: isResolved ? "rgba(255,255,255,0.4)" : "#fff", fontSize: 13, fontWeight: 500, lineHeight: "1.4", margin: 0, flex: 1 }}>
            {alert.message}
          </p>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, flexShrink: 0 }}>{alert.createdAt}</span>
        </div>

        {/* Severity badge */}
        <span style={{ display: "inline-block", fontSize: 10, padding: "2px 8px", borderRadius: 99, marginBottom: 8, background: sev.badgeBg, color: sev.badgeColor, fontWeight: 500 }}>
          {sev.label}
        </span>

        {/* Suggestions */}
        {!isResolved && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 }}>
            {alert.suggestions.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 6, color: "rgba(255,255,255,0.5)", fontSize: 11 }}>
                <span style={{ marginTop: 5, flexShrink: 0, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-block" }} />
                {s}
              </div>
            ))}
          </div>
        )}

        {/* Resolve button */}
        {!isResolved && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onResolve(alert.id); }}
            style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
          >
            <CheckCheck size={13} />
            Marquer résolu
          </button>
        )}
      </div>

      {/* Unread dot */}
      {!alert.read && !isResolved && (
        <div style={{ position: "absolute", top: 12, right: 12, width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.6)" }} />
      )}
    </div>
  );
}

// ── Notification sheet ────────────────────────────────────────────────────────
type Tab = "all" | "unread" | "resolved";

function NotificationSheet({
  alerts,
  onRead,
  onResolve,
  onResolveAll,
  onClose,
}: {
  alerts: MockAlert[];
  onRead: (id: string) => void;
  onResolve: (id: string) => void;
  onResolveAll: () => void;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<Tab>("all");

  const activeAlerts = alerts.filter((a) => !a.resolvedAt);
  const unreadCount = alerts.filter((a) => !a.read && !a.resolvedAt).length;
  const hasActiveIssues = activeAlerts.length > 0;

  const filtered = alerts.filter((a) => {
    if (tab === "unread")   return !a.read && !a.resolvedAt;
    if (tab === "resolved") return !!a.resolvedAt;
    return !a.resolvedAt;
  });

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all",      label: "Alertes",   count: activeAlerts.length },
    { key: "unread",   label: "Non lues",  count: unreadCount },
    { key: "resolved", label: "Résolues",  count: alerts.filter((a) => !!a.resolvedAt).length },
  ];

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 50, display: "flex", flexDirection: "column", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: "#fff", fontSize: 15, fontWeight: 600 }}>État de la maison</span>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {activeAlerts.length > 0 && (
              <button
                type="button"
                onClick={onResolveAll}
                style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}
              >
                Tout marquer résolu
              </button>
            )}
            <button
              onClick={onClose}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: 4, display: "flex" }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* All sensors healthy indicator */}
        {!hasActiveIssues && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, padding: "8px 12px", borderRadius: 12, background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.2)" }}>
            <House strokeWidth={1} size={20} style={{ background: "#34d399", padding: 2, borderRadius: "50%", flexShrink: 0 }} />
            <p style={{ color: "#6ee7b7", fontSize: 12, fontWeight: 500, margin: 0 }}>
              Tous les capteurs sont dans les normes
            </p>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, paddingBottom: 0 }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 12px", borderRadius: 8,
                fontSize: 12, fontWeight: 500,
                background: tab === t.key ? "rgba(255,255,255,0.15)" : "transparent",
                color: tab === t.key ? "#fff" : "rgba(255,255,255,0.4)",
                border: "none", cursor: "pointer", fontFamily: "inherit",
              }}
            >
              {t.label}
              {t.count > 0 && (
                <span style={{
                  fontSize: 10, padding: "1px 6px", borderRadius: 99,
                  background: tab === t.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                  color: tab === t.key ? "#fff" : "rgba(255,255,255,0.5)",
                }}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alert list */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: 16, padding: "40px 24px", textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CheckCircle2 size={28} color="#34d399" />
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0, marginBottom: 4 }}>
                {tab === "resolved" ? "Aucune alerte résolue" : "Tout est normal"}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0, lineHeight: "1.5" }}>
                {tab === "resolved"
                  ? "Les alertes résolues apparaîtront ici."
                  : "Aucune anomalie active sur vos capteurs."}
              </p>
            </div>
          </div>
        ) : (
          filtered.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onRead={onRead} onResolve={onResolve} />
          ))
        )}
      </div>
    </div>
  );
}

// ── Dashboard alert banner (exact replica) ────────────────────────────────────
function DashboardAlertBanner({
  alerts,
  onDismiss,
}: {
  alerts: MockAlert[];
  onDismiss: (id: string) => void;
}) {
  const unresolved = alerts.filter((a) => !a.resolvedAt && !a.read);
  const hasUnresolved = alerts.some((a) => !a.resolvedAt);
  const allDismissed = hasUnresolved && unresolved.length === 0;
  const isHealthy = !hasUnresolved;

  // Healthy
  if (isHealthy) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 16, padding: "12px 16px", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <House strokeWidth={1} size={24} style={{ background: "#34d399", padding: 4, borderRadius: "50%", flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>Votre maison est en bonne santé</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "2px 0 0" }}>Tous les capteurs sont dans les normes</p>
        </div>
      </div>
    );
  }

  // Monitoring (all dismissed visually)
  if (allDismissed) {
    const worst = alerts.filter((a) => !a.resolvedAt).sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity])[0];
    const dotColor = SEV_STYLES[worst?.severity ?? "WARNING"].dotColor;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12, borderRadius: 16, padding: "12px 16px", background: "rgba(0,0,0,0.2)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: dotColor, flexShrink: 0 }} />
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, margin: 0 }}>Surveillance en cours</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>
            {alerts.filter((a) => !a.resolvedAt).length} anomalie(s) active(s) en cours
          </p>
        </div>
      </div>
    );
  }

  // Active alerts
  const sorted = [...unresolved].sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {sorted.map((alert) => {
        const sev = SEV_STYLES[alert.severity];
        return (
          <div
            key={alert.id}
            style={{
              display: "flex", alignItems: "flex-start", gap: 12,
              borderRadius: 16, padding: "12px 16px",
              background: sev.bannerBg,
              border: `1px solid ${sev.bannerBorder}`,
            }}
          >
            <AlertTriangle size={14} style={{ color: sev.iconColor, flexShrink: 0, marginTop: 1 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 2 }}>
                <p style={{ color: "#fff", fontSize: 12, fontWeight: 600, margin: 0, flex: 1, lineHeight: "1.4" }}>{alert.message}</p>
                <span style={{ fontSize: 10, padding: "1px 6px", borderRadius: 99, background: sev.badgeBg, color: sev.badgeColor, fontWeight: 500, flexShrink: 0 }}>
                  {sev.label}
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, margin: 0 }}>{alert.suggestions[0]}</p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(alert.id)}
              style={{ color: "rgba(255,255,255,0.5)", background: "none", border: "none", cursor: "pointer", flexShrink: 0, padding: 0 }}
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── iPhone shell ──────────────────────────────────────────────────────────────
function IPhoneShell({ children, overlay }: { children: React.ReactNode; overlay?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "0 16px" }}>
      <div
        style={{
          position: "relative", width: 320, flexShrink: 0,
          background: "linear-gradient(160deg, #1a1a1e 0%, #2a2a2e 100%)",
          borderRadius: 52, padding: "14px 10px",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 0 0 2px #0a0a0a, 0 40px 100px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {[72, 116, 152].map((top, i) => (
          <div key={i} style={{ position: "absolute", left: -3, top, width: 3, height: i === 0 ? 28 : 44, background: "#3a3a3e", borderRadius: "2px 0 0 2px" }} />
        ))}
        <div style={{ position: "absolute", right: -3, top: 100, width: 3, height: 64, background: "#3a3a3e", borderRadius: "0 2px 2px 0" }} />

        <div style={{ borderRadius: 42, overflow: "hidden", position: "relative", background: "#000" }}>
          {/* Status bar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 24px 6px", background: "rgba(0,0,0,0.3)", position: "relative", zIndex: 20 }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "-0.3px" }}>9:41</span>
            <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 90, height: 26, background: "#000", borderRadius: 20 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none"><rect x="0" y="8" width="3" height="4" rx="0.5" fill="white" /><rect x="4.5" y="5" width="3" height="7" rx="0.5" fill="white" /><rect x="9" y="2" width="3" height="10" rx="0.5" fill="white" /><rect x="13.5" y="0" width="3" height="12" rx="0.5" fill="rgba(255,255,255,0.3)" /></svg>
              <svg width="15" height="12" viewBox="0 0 15 12" fill="white"><path d="M7.5 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" /><path d="M3.2 6.8a6.1 6.1 0 0 1 8.6 0l-1.5 1.5a4 4 0 0 0-5.6 0L3.2 6.8z" /><path d="M0 4a10.3 10.3 0 0 1 15 0l-1.5 1.5A8.2 8.2 0 0 0 1.5 5.5L0 4z" /></svg>
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none"><rect x="0.5" y="0.5" width="20" height="11" rx="3.5" stroke="white" strokeOpacity="0.35" /><rect x="21.5" y="3.5" width="2" height="5" rx="1.5" fill="white" fillOpacity="0.4" /><rect x="2" y="2" width="15" height="8" rx="2" fill="white" /></svg>
            </div>
          </div>

          {/* Scrollable content */}
          <div style={{ height: 620, overflowY: "auto", overflowX: "hidden", scrollbarWidth: "none", position: "relative" }}>
            {children}
          </div>

          {overlay}

          {/* Home indicator */}
          <div style={{ display: "flex", justifyContent: "center", padding: "8px 0 10px", background: "rgba(0,0,0,0.4)" }}>
            <div style={{ width: 100, height: 4, background: "rgba(255,255,255,0.35)", borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AlertsPreview() {
  const [alerts, setAlerts] = useState<MockAlert[]>(INITIAL_ALERTS);
  const [panelOpen, setPanelOpen] = useState(false);

  const unreadCount = alerts.filter((a) => !a.read && !a.resolvedAt).length;

  const bellBadgeColor = alerts.some((a) => !a.read && !a.resolvedAt && a.severity === "CRITICAL")
    ? "#ef4444"
    : alerts.some((a) => !a.read && !a.resolvedAt && a.severity === "HIGH")
      ? "#f97316"
      : "#eab308";

  const handleDismiss = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));

  const handleRead = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));

  const handleResolve = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, resolvedAt: new Date().toISOString(), read: true } : a)));

  const handleResolveAll = () =>
    setAlerts((prev) => prev.map((a) => ({ ...a, resolvedAt: new Date().toISOString(), read: true })));

  return (
    <IPhoneShell
      overlay={
        panelOpen ? (
          <NotificationSheet
            alerts={alerts}
            onRead={handleRead}
            onResolve={handleResolve}
            onResolveAll={handleResolveAll}
            onClose={() => setPanelOpen(false)}
          />
        ) : undefined
      }
    >
      <div style={{ position: "relative", minHeight: "100%", fontFamily: "var(--font-geist-sans), system-ui, -apple-system, sans-serif" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/background-main.jpg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />

        <div style={{ position: "relative", zIndex: 10, padding: "16px 20px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Header — exact replica of app header */}
          <header style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "8px 0" }}>
            <button type="button" style={{ width: 56, height: 56, borderRadius: "50%", flexShrink: 0, padding: 0, border: "none", cursor: "pointer", overflow: "hidden", background: "transparent" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/default-profil.jpg" alt="Jean Dupont" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            </button>
            <div style={{ flex: 1 }}>
              <p style={{ color: "#cbd5e1", fontSize: 14, margin: 0, lineHeight: "150%" }}>Bonjour,</p>
              <p style={{ color: "#fff", fontWeight: 600, fontSize: 22, margin: 0 }}>Jean Dupont</p>
            </div>
            {/* Settings */}
            <button type="button" style={{ padding: 8, borderRadius: 12, background: "transparent", border: "none", cursor: "pointer" }}>
              <Settings size={20} style={{ color: "rgba(255,255,255,0.6)" }} />
            </button>
            {/* Bell with badge */}
            <button
              type="button"
              onClick={() => setPanelOpen(true)}
              style={{ position: "relative", padding: 8, borderRadius: 12, background: "transparent", border: "none", cursor: "pointer" }}
            >
              <Bell size={20} style={{ color: unreadCount > 0 ? "#fff" : "rgba(255,255,255,0.6)" }} />
              {unreadCount > 0 && (
                <span style={{
                  position: "absolute", top: 2, right: 2,
                  minWidth: 16, height: 16, borderRadius: 99,
                  background: bellBadgeColor, color: "#fff",
                  fontSize: 9, fontWeight: 700,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  padding: "0 3px",
                }}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
          </header>

          <h1 style={{ color: "#fff", fontWeight: 600, fontSize: 22, lineHeight: "150%", margin: 0 }}>
            Voici la santé de votre maison
          </h1>

          {/* Alert banner */}
          <DashboardAlertBanner alerts={alerts} onDismiss={handleDismiss} />
        </div>
      </div>
    </IPhoneShell>
  );
}
