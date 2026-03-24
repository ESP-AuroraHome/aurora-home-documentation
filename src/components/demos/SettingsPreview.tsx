"use client";

import {
  ArrowLeft,
  Bell,
  CheckCircle2,
  Cloud,
  Droplet,
  Gauge,
  Minus,
  Plus,
  Settings,
  Sun,
  Thermometer,
} from "lucide-react";
import { useState } from "react";

// ── Sensor metadata ───────────────────────────────────────────────────────────
const SENSORS = [
  { type: "TEMPERATURE", Icon: Thermometer, iconBg: "#facc15", label: "Température" },
  { type: "HUMIDITY", Icon: Droplet, iconBg: "#60a5fa", label: "Humidité" },
  { type: "PRESSURE", Icon: Gauge, iconBg: "#4ade80", label: "Pression" },
  { type: "CO2", Icon: Cloud, iconBg: "#9ca3af", label: "CO₂" },
  { type: "LIGHT", Icon: Sun, iconBg: "#fb923c", label: "Luminosité" },
];

// ── Threshold defaults (mirrors anomaly-detector.ts) ─────────────────────────
const THRESHOLD_DEFAULTS: Record<string, { high?: number; low?: number; unit: string }> = {
  TEMPERATURE: { high: 28, low: 14, unit: "°C" },
  HUMIDITY:    { high: 70, low: 25, unit: "%" },
  PRESSURE:    { low: 970, unit: "hPa" },
  CO2:         { high: 800, unit: "ppm" },
  LIGHT:       { unit: "lx" },
};

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      style={{
        width: 42, height: 24, borderRadius: 12, flexShrink: 0,
        background: checked ? "#22c55e" : "rgba(255,255,255,0.15)",
        border: "none", cursor: "pointer", position: "relative",
        transition: "background 0.2s",
      }}
    >
      <div
        style={{
          position: "absolute", top: 3,
          left: checked ? 21 : 3,
          width: 18, height: 18, borderRadius: "50%",
          background: "#fff",
          transition: "left 0.2s",
        }}
      />
    </button>
  );
}

// ── Severity select ───────────────────────────────────────────────────────────
function SeveritySelect({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  const opts = ["WARNING", "HIGH", "CRITICAL"];
  const labels: Record<string, string> = { WARNING: "Attention", HIGH: "Problème", CRITICAL: "Urgent" };
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: disabled ? "rgba(255,255,255,0.3)" : "#fff",
        borderRadius: 8, padding: "4px 8px",
        fontSize: 12, cursor: disabled ? "not-allowed" : "pointer",
        width: 110,
      }}
    >
      {opts.map((o) => (
        <option key={o} value={o} style={{ background: "#1a2a1e", color: "#fff" }}>
          {labels[o]}
        </option>
      ))}
    </select>
  );
}

// ── Number input ──────────────────────────────────────────────────────────────
function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const num = parseFloat(value) || 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      <button
        type="button"
        onClick={() => onChange(String(Math.max(0, num - 1)))}
        style={{
          width: 24, height: 24, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.07)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}
      >
        <Minus size={10} />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: 56, textAlign: "center", background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6,
          color: "#fff", fontSize: 12, padding: "3px 4px",
        }}
      />
      <button
        type="button"
        onClick={() => onChange(String(num + 1))}
        style={{
          width: 24, height: 24, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.07)", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
        }}
      >
        <Plus size={10} />
      </button>
    </div>
  );
}

// ── NotificationPrefsCard ─────────────────────────────────────────────────────
function NotificationPrefsCard() {
  const [prefs, setPrefs] = useState(
    Object.fromEntries(
      SENSORS.map((s) => [s.type, { enabled: true, minSeverity: "WARNING" }]),
    ),
  );
  const [quietEnabled, setQuietEnabled] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", paddingLeft: 4 }}>
        Préférences de notification
      </span>

      {/* Per-sensor rows */}
      <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, overflow: "hidden" }}>
        {SENSORS.map((s, i) => {
          const pref = prefs[s.type];
          return (
            <div
              key={s.type}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 18px",
                borderBottom: i < SENSORS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              <div style={{ background: s.iconBg, borderRadius: "50%", padding: 4, display: "flex" }}>
                <s.Icon size={12} strokeWidth={2} color="#000" />
              </div>
              <span style={{ color: "#fff", fontSize: 13, flex: 1 }}>{s.label}</span>
              <SeveritySelect
                value={pref.minSeverity}
                onChange={(v) => { setPrefs((p) => ({ ...p, [s.type]: { ...p[s.type], minSeverity: v } })); setSaved(false); }}
                disabled={!pref.enabled}
              />
              <Toggle
                checked={pref.enabled}
                onChange={(v) => { setPrefs((p) => ({ ...p, [s.type]: { ...p[s.type], enabled: v } })); setSaved(false); }}
              />
            </div>
          );
        })}
      </div>

      {/* Quiet hours */}
      <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: quietEnabled ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <div>
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 600, margin: 0 }}>Heures silencieuses</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: "2px 0 0" }}>
              Aucune alerte créée pendant ces heures
            </p>
          </div>
          <Toggle checked={quietEnabled} onChange={(v) => { setQuietEnabled(v); setSaved(false); }} />
        </div>
        {quietEnabled && (
          <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>De</span>
              <select style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, padding: "4px 8px", fontSize: 12, flex: 1 }}>
                <option value="23" style={{ background: "#1a2a1e" }}>23:00</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: 1 }}>
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>À</span>
              <select style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 8, padding: "4px 8px", fontSize: 12, flex: 1 }}>
                <option value="7" style={{ background: "#1a2a1e" }}>07:00</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Save button */}
      {!saved && (
        <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, padding: 16 }}>
          <button
            type="button"
            onClick={() => setSaved(true)}
            style={{
              width: "100%", padding: "10px 0", borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
          >
            Sauvegarder
          </button>
        </div>
      )}
      {saved && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 4px" }}>
          <CheckCircle2 size={14} color="#34d399" />
          <span style={{ color: "#34d399", fontSize: 12 }}>Préférences sauvegardées</span>
        </div>
      )}
    </div>
  );
}

// ── ThresholdsCard ────────────────────────────────────────────────────────────
function ThresholdsCard() {
  const [values, setValues] = useState(
    Object.fromEntries(
      SENSORS.map((s) => {
        const d = THRESHOLD_DEFAULTS[s.type];
        return [s.type, {
          highValue: d.high !== undefined ? String(d.high) : "",
          highSeverity: "WARNING",
          lowValue: d.low !== undefined ? String(d.low) : "",
          lowSeverity: "WARNING",
        }];
      }),
    ),
  );
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", paddingLeft: 4 }}>
        Seuils de détection
      </span>
      <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, overflow: "hidden" }}>
        {SENSORS.map((s, i) => {
          const v = values[s.type];
          const d = THRESHOLD_DEFAULTS[s.type];
          return (
            <div
              key={s.type}
              style={{
                padding: "12px 18px",
                borderBottom: i < SENSORS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
              }}
            >
              {/* Sensor label */}
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <div style={{ background: s.iconBg, borderRadius: "50%", padding: 4, display: "flex" }}>
                  <s.Icon size={12} strokeWidth={2} color="#000" />
                </div>
                <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginLeft: "auto" }}>{d.unit}</span>
              </div>

              {/* High threshold */}
              {(d.high !== undefined || v.highValue) && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, width: 40 }}>Haut</span>
                  <NumberInput
                    value={v.highValue}
                    onChange={(val) => { setValues((p) => ({ ...p, [s.type]: { ...p[s.type], highValue: val } })); setSaved(false); }}
                    placeholder={d.high ? String(d.high) : "—"}
                  />
                  <SeveritySelect
                    value={v.highSeverity}
                    onChange={(val) => { setValues((p) => ({ ...p, [s.type]: { ...p[s.type], highSeverity: val } })); setSaved(false); }}
                    disabled={false}
                  />
                </div>
              )}

              {/* Low threshold */}
              {(d.low !== undefined || v.lowValue) && (
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, width: 40 }}>Bas</span>
                  <NumberInput
                    value={v.lowValue}
                    onChange={(val) => { setValues((p) => ({ ...p, [s.type]: { ...p[s.type], lowValue: val } })); setSaved(false); }}
                    placeholder={d.low ? String(d.low) : "—"}
                  />
                  <SeveritySelect
                    value={v.lowSeverity}
                    onChange={(val) => { setValues((p) => ({ ...p, [s.type]: { ...p[s.type], lowSeverity: val } })); setSaved(false); }}
                    disabled={false}
                  />
                </div>
              )}

              {(!d.high && !d.low) && (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, margin: 0 }}>Aucun seuil défini</p>
              )}
            </div>
          );
        })}
      </div>

      {!saved && (
        <div style={{ background: "rgba(0,0,0,0.25)", borderRadius: 20, padding: 16 }}>
          <button
            type="button"
            onClick={() => setSaved(true)}
            style={{
              width: "100%", padding: "10px 0", borderRadius: 12,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer",
            }}
          >
            Sauvegarder les seuils
          </button>
        </div>
      )}
      {saved && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 4px" }}>
          <CheckCircle2 size={14} color="#34d399" />
          <span style={{ color: "#34d399", fontSize: 12 }}>Seuils sauvegardés</span>
        </div>
      )}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function SettingsPreview() {
  return (
    <div
      style={{
        background: "linear-gradient(160deg, #0c1a22 0%, #0e2a1e 50%, #081510 100%)",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ padding: "24px 20px 32px", display: "flex", flexDirection: "column", gap: 20 }}>

        {/* Header */}
        <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.15)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 18, fontWeight: 600 }}>J</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "rgba(203,213,225,0.8)", fontSize: 13, margin: 0 }}>Bonjour,</p>
            <p style={{ color: "#fff", fontWeight: 600, fontSize: 20, margin: 0 }}>Jean Dupont</p>
          </div>
          <div style={{ padding: 8, borderRadius: 10, color: "rgba(255,255,255,0.5)", display: "flex" }}>
            <Settings size={18} />
          </div>
          <div style={{ padding: 8, borderRadius: 10, color: "rgba(255,255,255,0.5)", display: "flex" }}>
            <Bell size={18} />
          </div>
        </header>

        {/* Page title */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ padding: 8, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", cursor: "pointer" }}>
            <ArrowLeft size={16} color="rgba(255,255,255,0.7)" />
          </div>
          <div>
            <h1 style={{ color: "#fff", fontWeight: 600, fontSize: 18, margin: 0 }}>Paramètres</h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>
              Personnalisez les alertes et seuils
            </p>
          </div>
        </div>

        {/* Cards */}
        <NotificationPrefsCard />
        <ThresholdsCard />

      </div>
    </div>
  );
}
