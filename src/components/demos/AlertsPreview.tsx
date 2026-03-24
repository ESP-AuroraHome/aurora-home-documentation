"use client";

import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Cloud,
  Droplet,
  Gauge,
  House,
  Sun,
  Thermometer,
  X,
} from "lucide-react";
import { useState } from "react";

// ── Mock alerts ───────────────────────────────────────────────────────────────
const MOCK_ALERTS = [
  {
    id: "1",
    type: "THRESHOLD_HIGH",
    severity: "HIGH",
    sensorType: "TEMPERATURE",
    value: 33.2,
    threshold: 32,
    message: "Température élevée : 33.2°C (seuil : 32°C)",
    suggestion: "Activez la climatisation ou un ventilateur",
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
    suggestion: "Ouvrez une fenêtre pour aérer la pièce",
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
    suggestion: "Vérifiez si un appareil produisant de la vapeur est allumé",
    read: true,
    resolvedAt: null,
    createdAt: "Il y a 22 min",
  },
];

const SEVERITY_STYLES: Record<string, { container: string; icon: string; badge: string; dot: string; label: string }> = {
  CRITICAL: {
    container: "bg-red-500/40 border-red-400/60",
    icon: "text-red-300",
    badge: "bg-red-400/20 text-red-200",
    dot: "bg-red-500",
    label: "Urgent",
  },
  HIGH: {
    container: "bg-orange-500/40 border-orange-400/60",
    icon: "text-orange-300",
    badge: "bg-orange-400/20 text-orange-200",
    dot: "bg-orange-500",
    label: "Problème",
  },
  WARNING: {
    container: "bg-yellow-500/30 border-yellow-400/50",
    icon: "text-yellow-300",
    badge: "bg-yellow-400/20 text-yellow-200",
    dot: "bg-yellow-500",
    label: "Attention",
  },
};

function SensorIcon({ type }: { type: string }) {
  const props = { size: 14, strokeWidth: 1.5, color: "#000" };
  const bg: Record<string, string> = {
    TEMPERATURE: "#facc15",
    HUMIDITY: "#60a5fa",
    PRESSURE: "#4ade80",
    CO2: "#9ca3af",
    LIGHT: "#fb923c",
  };
  const Icon = {
    TEMPERATURE: Thermometer,
    HUMIDITY: Droplet,
    PRESSURE: Gauge,
    CO2: Cloud,
    LIGHT: Sun,
  }[type] ?? Thermometer;
  return (
    <div style={{ background: bg[type] ?? "#888", borderRadius: "50%", padding: 4, display: "flex", flexShrink: 0 }}>
      <Icon {...props} />
    </div>
  );
}

// ── Dashboard banner with active alerts ───────────────────────────────────────
function DashboardBannerDemo() {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const active = MOCK_ALERTS.filter((a) => !a.resolvedAt && !dismissed.has(a.id));
  const allDismissed = active.length === 0 && MOCK_ALERTS.filter((a) => !a.resolvedAt).length > 0;

  if (allDismissed) {
    return (
      <div
        style={{
          display: "flex", alignItems: "center", gap: 12,
          borderRadius: 16, padding: "12px 16px",
          background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fb923c", flexShrink: 0 }} />
        <div>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, fontWeight: 500, margin: 0 }}>
            Surveillance en cours
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>
            {MOCK_ALERTS.filter((a) => !a.resolvedAt).length} anomalie(s) active(s) en cours
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {active.map((alert) => {
        const style = SEVERITY_STYLES[alert.severity];
        return (
          <div
            key={alert.id}
            style={{
              display: "flex", alignItems: "flex-start", gap: 10,
              borderRadius: 16, padding: "12px 14px",
              border: `1px solid`,
            }}
            className={`${style.container} border`}
          >
            <AlertTriangle size={15} className={`${style.icon} flex-shrink-0 mt-0.5`} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                <p style={{ color: "#fff", fontSize: 12, fontWeight: 600, margin: 0 }}>{alert.message}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${style.badge}`}>
                  {style.label}
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, margin: 0 }}>{alert.suggestion}</p>
            </div>
            <button
              type="button"
              onClick={() => setDismissed((prev) => new Set([...prev, alert.id]))}
              style={{ color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}
            >
              <X size={13} />
            </button>
          </div>
        );
      })}
    </div>
  );
}

// ── Notification sheet panel ──────────────────────────────────────────────────
type Tab = "all" | "unread" | "resolved";

function NotificationPanel() {
  const [tab, setTab] = useState<Tab>("all");
  const [resolved, setResolved] = useState<Set<string>>(new Set());
  const [read, setRead] = useState<Set<string>>(new Set());

  const filtered = MOCK_ALERTS.filter((a) => {
    const isResolved = resolved.has(a.id);
    const isRead = read.has(a.id) || a.read;
    if (tab === "resolved") return isResolved;
    if (tab === "unread") return !isRead && !isResolved;
    return !isResolved;
  });

  const unreadCount = MOCK_ALERTS.filter((a) => !read.has(a.id) && !a.read && !resolved.has(a.id)).length;
  const activeCount = MOCK_ALERTS.filter((a) => !resolved.has(a.id)).length;
  const resolvedCount = resolved.size;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "all", label: "Alertes", count: activeCount },
    { key: "unread", label: "Non lues", count: unreadCount },
    { key: "resolved", label: "Résolues", count: resolvedCount },
  ];

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(24px)",
        borderRadius: 20,
        border: "1px solid rgba(255,255,255,0.1)",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        minWidth: 300,
      }}
    >
      {/* Header */}
      <div style={{ padding: "16px 20px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ color: "#fff", fontWeight: 600, fontSize: 15 }}>État de la maison</span>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={() => setResolved(new Set(MOCK_ALERTS.map((a) => a.id)))}
              style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, background: "none", border: "none", cursor: "pointer" }}
            >
              Tout marquer résolu
            </button>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, paddingBottom: 12 }}>
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
                border: "none", cursor: "pointer",
              }}
            >
              {t.label}
              {t.count > 0 && (
                <span
                  style={{
                    fontSize: 10, padding: "1px 6px", borderRadius: 99,
                    background: tab === t.key ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                    color: tab === t.key ? "#fff" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alert list */}
      <div style={{ padding: "10px 12px 12px", display: "flex", flexDirection: "column", gap: 8, maxHeight: 340, overflowY: "auto" }}>
        {filtered.length === 0 ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 16px", gap: 12, textAlign: "center" }}>
            <div style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: 16, padding: 12 }}>
              <CheckCircle2 size={28} color="#34d399" />
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, margin: 0 }}>
                {tab === "resolved" ? "Aucune alerte résolue" : "Tout est normal"}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "4px 0 0" }}>
                {tab === "resolved"
                  ? "Les alertes résolues apparaîtront ici."
                  : "Aucune anomalie active sur vos capteurs."}
              </p>
            </div>
          </div>
        ) : (
          filtered.map((alert) => {
            const style = SEVERITY_STYLES[alert.severity];
            const isRead = read.has(alert.id) || alert.read;
            return (
              <div
                key={alert.id}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: 14,
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  cursor: "pointer",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
                onClick={() => setRead((prev) => new Set([...prev, alert.id]))}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                  <SensorIcon type={alert.sensorType} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                      <span style={{ color: "#fff", fontSize: 12, fontWeight: isRead ? 400 : 600 }}>{alert.message}</span>
                      {!isRead && (
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff", flexShrink: 0 }} />
                      )}
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, margin: 0 }}>{alert.suggestion}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${style.badge}`}>
                    {style.label}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 10 }}>{alert.createdAt}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setResolved((prev) => new Set([...prev, alert.id]));
                    }}
                    style={{
                      fontSize: 10, padding: "3px 8px", borderRadius: 6,
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.5)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                    }}
                  >
                    Marquer résolu
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function AlertsPreview() {
  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0c1a22 0%, #0e2a1e 50%, #081510 100%)",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "24px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      {/* Section 1 — Dashboard banner */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Bell size={14} color="rgba(255,255,255,0.5)" />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Bannière de statut
          </span>
        </div>
        <DashboardBannerDemo />
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />

      {/* Section 2 — Notification panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <House size={14} color="rgba(255,255,255,0.5)" />
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Panneau de notifications
          </span>
        </div>
        <NotificationPanel />
      </div>
    </div>
  );
}
