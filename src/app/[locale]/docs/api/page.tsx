import { ArrowRight, Server, Zap, Globe, Info } from "lucide-react";

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

export default function DocsApi() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Technique</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">API REST</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">API REST</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Les routes API exposées par l'application Next.js Aurora Home.
        </p>
      </div>

      <div className="mb-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5" />
          <p className="text-sm text-blue-200/70">
            L'API est conçue pour un usage interne. Elle n'est pas publique et ne requiert pas
            d'authentification explicite pour le stream SSE (accessible depuis le dashboard connecté
            uniquement). L'auth utilisateur passe par les cookies Better Auth.
          </p>
        </div>
      </div>

      <div className="mb-12 mt-8">
        <h2 className="text-2xl font-bold mb-6">Endpoints</h2>

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
            Connexion Server-Sent Events (SSE) en temps réel. Le serveur envoie un événement à
            chaque nouveau message MQTT reçu, ainsi qu'un ping keepalive toutes les 15 secondes pour
            maintenir la connexion ouverte.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <p className="text-neutral-500 mb-1">Content-Type</p>
              <code className="text-green-400">text/event-stream</code>
            </div>
            <div>
              <p className="text-neutral-500 mb-1">Cache-Control</p>
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
            Route catch-all gérée par Better Auth. Prend en charge toutes les opérations
            d'authentification : création de session, vérification OTP, récupération de session,
            déconnexion.
          </p>
          <div className="grid gap-2">
            {[
              { path: "/api/auth/sign-in/email-otp", desc: "Initie l'envoi du code OTP" },
              { path: "/api/auth/email-otp/verify-otp", desc: "Vérifie le code OTP saisi" },
              { path: "/api/auth/get-session", desc: "Récupère la session courante" },
              { path: "/api/auth/sign-out", desc: "Invalide la session et supprime le cookie" },
            ].map((endpoint) => (
              <div
                key={endpoint.path}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5"
              >
                <code className="text-xs text-neutral-400 flex-1">{endpoint.path}</code>
                <span className="text-xs text-neutral-600">{endpoint.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SSE alert_created */}
        <div className="mb-4 p-4 rounded-lg bg-white/[0.02] border border-white/5">
          <p className="text-xs text-neutral-500 mb-2">Le stream SSE envoie également les événements d'alertes :</p>
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
            Met à jour la préférence de langue de l'utilisateur. La valeur est sauvegardée dans un
            cookie <code className="px-1.5 py-0.5 bg-white/5 rounded">locale</code> et utilisée par
            next-intl pour charger les traductions FR ou EN.
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
        {/* Dev inject-sensor */}
        <div className="mb-8 p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-3 mb-4">
            <MethodBadge method="POST" />
            <code className="text-sm text-neutral-300">/api/dev/inject-sensor</code>
            <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-medium">dev only</span>
          </div>
          <p className="text-sm text-neutral-400 mb-4">
            Endpoint de développement pour simuler des données capteurs sans ESP32 physique.
            Retourne <code className="px-1.5 py-0.5 bg-white/5 rounded">403</code> si{" "}
            <code className="px-1.5 py-0.5 bg-white/5 rounded">NODE_ENV !== "development"</code>.
            Crée les DataPoints, lance la détection d'anomalies et émet les événements SSE.
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
        <h2 className="text-2xl font-bold mb-6">Gestion des erreurs</h2>
        <div className="grid gap-3">
          {[
            { code: "200", color: "green", desc: "Succès" },
            { code: "400", color: "yellow", desc: "Requête invalide (body malformé, paramètre manquant)" },
            { code: "401", color: "orange", desc: "Non authentifié (session absente ou expirée)" },
            { code: "500", color: "red", desc: "Erreur serveur interne" },
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
            <h3 className="font-semibold mb-2">Route handlers Next.js App Router</h3>
            <p className="text-sm text-neutral-400">
              Toutes les routes API utilisent le système de route handlers de Next.js App Router
              (fichiers <code className="px-1.5 py-0.5 bg-white/5 rounded">route.ts</code> dans le
              dossier <code className="px-1.5 py-0.5 bg-white/5 rounded">app/api/</code>). Elles
              s'exécutent côté serveur et ont accès à l'ensemble des ressources Node.js.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
