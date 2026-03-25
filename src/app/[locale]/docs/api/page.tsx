import { ArrowRight, Server, Zap, Globe, Info } from "lucide-react";
import { getTranslations } from "next-intl/server";

function CodeBlock({ children, title }: { children: string; title?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0d0d0d]">
      {title && (
        <div className="px-4 py-2 bg-white/5 border-b border-white/5 text-xs text-neutral-400">
          {title}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm text-neutral-300">{children}</code>
      </pre>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "bg-blue-500/10 text-blue-400",
    POST: "bg-green-500/10 text-green-400",
    "GET|POST": "bg-purple-500/10 text-purple-400",
  };
  return (
    <span className={`text-xs font-mono px-2 py-1 rounded font-bold ${colors[method] ?? "bg-white/10 text-white"}`}>
      {method}
    </span>
  );
}

export default async function DocsApi() {
  const t = await getTranslations("api");
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>{t("breadcrumbDocs")}</span>
          <ArrowRight className="hidden sm:block w-3 h-3" />
          <span className="hidden sm:inline">{t("breadcrumbSection")}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">{t("breadcrumbCurrent")}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-base sm:text-xl text-neutral-400 leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5" />
          <p className="text-sm text-blue-200/70">
            {t("infoNote")}
          </p>
        </div>
      </div>

      <div className="mb-12 mt-8">
        <h2 className="text-2xl font-bold mb-6">{t("endpointsTitle")}</h2>

        {/* SSE Stream */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="GET" />
            <code className="text-sm text-neutral-300">/api/sensor-stream</code>
            <div className="p-1.5 rounded bg-green-500/10">
              <Zap className="w-3.5 h-3.5 text-green-400" />
            </div>
          </div>
          <p className="text-sm text-neutral-400 mb-4">
            {t("sseDesc")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-neutral-500 mb-1">{t("contentTypeLabel")}</p>
              <code className="text-green-400">text/event-stream</code>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">{t("cacheControlLabel")}</p>
              <code className="text-green-400">no-cache</code>
            </div>
          </div>
          <CodeBlock title="Format d'événement SSE">{`// Événement de mise à jour capteur
data: {
  "type": "sensor_update",
  "data": {
    "TEMPERATURE": {
      "id": "clxyz123",
      "type": "TEMPERATURE",
      "value": "22.50 °C",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    "HUMIDITY": { ... },
    "PRESSURE": { ... },
    "CO2": { ... },
    "LIGHT": { ... }
  }
}

// Keepalive (toutes les 15s)
: keepalive`}</CodeBlock>
        </div>

        {/* Better Auth */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="GET|POST" />
            <code className="text-sm text-neutral-300">/api/auth/[...all]</code>
          </div>
          <p className="text-sm text-neutral-400 mb-4">
            {t("authDesc")}
          </p>
          <div className="grid gap-2">
            {[
              { path: "/api/auth/sign-in/email-otp", desc: t("authEndpoint1Desc") },
              { path: "/api/auth/email-otp/verify-otp", desc: t("authEndpoint2Desc") },
              { path: "/api/auth/get-session", desc: t("authEndpoint3Desc") },
              { path: "/api/auth/sign-out", desc: t("authEndpoint4Desc") },
            ].map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <code className="text-xs text-neutral-400 flex-1 min-w-0 truncate">{endpoint.path}</code>
                <span className="text-xs text-neutral-600 hidden sm:block shrink-0">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SSE alert_created */}
        <div className="mb-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
          <p className="text-xs text-neutral-500 mb-2">{t("alertStreamNote")}</p>
          <CodeBlock title="Événement alert_created">{`data: {
  "type": "alert_created",
  "data": {
    "id": "clxyz456",
    "type": "THRESHOLD_HIGH",
    "severity": "HIGH",
    "sensorType": "CO2",
    "value": 1620,
    "threshold": 1500,
    "message": "CO₂ élevé détecté (1620 ppm)",
    "suggestions": ["Ouvrez une fenêtre", "Vérifiez la ventilation"],
    "read": false,
    "resolvedAt": null,
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
}`}</CodeBlock>
        </div>

        {/* Locale */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="POST" />
            <code className="text-sm text-neutral-300">/api/locale</code>
            <div className="p-1.5 rounded bg-orange-500/10">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
            </div>
          </div>
          <p className="text-sm text-neutral-400 mb-4">
            {t("localeDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded">locale</code> {t("localeDesc2")}
          </p>
          <CodeBlock title="Body (JSON)">{`{
  "locale": "fr"  // "fr" ou "en"
}`}</CodeBlock>
          <div className="mt-4">
            <CodeBlock title="Réponse">{`{
  "success": true
}`}</CodeBlock>
          </div>
        </div>
        {/* GET /api/datapoints */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="GET" />
            <code className="text-sm text-neutral-300">/api/datapoints</code>
          </div>
          <p className="text-sm text-neutral-400 mb-4">{t("datapointsEndpointDesc")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-neutral-500 mb-1">?type</p>
              <span className="text-neutral-400 text-xs">{t("datapointsParamType")}</span>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">?period</p>
              <span className="text-neutral-400 text-xs">{t("datapointsParamPeriod")}</span>
            </div>
          </div>
          <CodeBlock title="Exemple">{`GET /api/datapoints?type=CO2&period=6h`}</CodeBlock>
        </div>

        {/* GET|POST /api/thresholds */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="GET" />
            <code className="text-sm text-neutral-300">/api/thresholds</code>
          </div>
          <p className="text-sm text-neutral-400 mb-4">{t("thresholdsGetDesc")}</p>
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="POST" />
            <code className="text-sm text-neutral-300">/api/thresholds</code>
          </div>
          <p className="text-sm text-neutral-400 mb-4">{t("thresholdsPostDesc")}</p>
          <CodeBlock title={t("thresholdsPostBody")}>{`{
  "sensorType":    "CO2",          // DataType enum
  "highValue":     1500,           // Float ou null
  "highSeverity":  "HIGH",         // Severity ou null
  "lowValue":      null,
  "lowSeverity":   null
}`}</CodeBlock>
        </div>

        {/* GET|POST /api/preferences */}
        <div className="mb-8 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="GET" />
            <code className="text-sm text-neutral-300">/api/preferences</code>
          </div>
          <p className="text-sm text-neutral-400 mb-4">{t("preferencesGetDesc")}</p>
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="POST" />
            <code className="text-sm text-neutral-300">/api/preferences</code>
          </div>
          <p className="text-sm text-neutral-400 mb-4">{t("preferencesPostDesc")}</p>
          <CodeBlock title={t("preferencesPostBody")}>{`// Préférence capteur
{
  "type":        "sensor",
  "sensorType":  "TEMPERATURE",
  "enabled":     true,
  "minSeverity": "WARNING"
}

// Paramètres globaux
{
  "type":        "settings",
  "quietStart":  23,
  "quietEnd":    7
}`}</CodeBlock>
        </div>

        {/* Dev inject-sensor */}
        <div className="mb-8 p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="POST" />
            <code className="text-sm text-neutral-300">/api/dev/inject-sensor</code>
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-medium">dev only</span>
          </div>
          <p className="text-sm text-neutral-400 mb-4">
            {t("devEndpointDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded">403</code> {t("devEndpointDesc2")}{" "}
            <code className="px-1.5 py-0.5 bg-white/5 rounded">NODE_ENV !== "development"</code>{t("devEndpointDesc3")}
          </p>
          <CodeBlock title="Body (JSON)">{`{
  "temperature": "22.5",
  "humidity":    "58.0",
  "pressure":    "1013.2",
  "co2":         "820",
  "light":       "310"
}`}</CodeBlock>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("errorsTitle")}</h2>
        <div className="grid gap-3">
          {[
            { code: "200", color: "green", desc: t("err200Desc") },
            { code: "400", color: "yellow", desc: t("err400Desc") },
            { code: "401", color: "orange", desc: t("err401Desc") },
            { code: "500", color: "red", desc: t("err500Desc") },
          ].map((item) => (
            <div
              key={item.code}
              className={`flex items-center gap-4 p-4 rounded-lg bg-${item.color}-500/5 border border-${item.color}-500/20`}
            >
              <code className={`font-mono font-bold text-${item.color}-400`}>{item.code}</code>
              <span className="text-sm text-neutral-400">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10">
            <Server className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("routeHandlersTitle")}</h3>
            <p className="text-sm text-neutral-400">
              {t("routeHandlersDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded">route.ts</code> {t("routeHandlersDesc2")}
              <code className="px-1.5 py-0.5 bg-white/5 rounded">app/api/</code>{t("routeHandlersDesc3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
