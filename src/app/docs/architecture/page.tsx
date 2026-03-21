import { ArrowRight, Cpu, Wifi, Zap, Database, Monitor, Layers } from "lucide-react";

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

export default function DocsArchitecture() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Technique</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Architecture</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Architecture du système</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Vue d'ensemble de la communication entre l'ESP32, le broker MQTT et l'application web
          Next.js.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Schéma global</h2>
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 mb-6">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">ESP32</span>
              <span className="text-xs text-neutral-600 text-center">AP WiFi</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
                <Wifi className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Orange Pi</span>
              <span className="text-xs text-neutral-600 text-center">Broker MQTT</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Next.js</span>
              <span className="text-xs text-neutral-600 text-center">API + SSE</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-2">
                <Database className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">SQLite</span>
              <span className="text-xs text-neutral-600 text-center">Prisma ORM</span>
            </div>
            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-2">
                <Monitor className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Dashboard</span>
              <span className="text-xs text-neutral-600 text-center">SSE Client</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Les 3 couches du système</h2>
        <div className="grid gap-4">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-3">Couche ESP32 — Collecte des données</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    Crée un réseau WiFi en mode Access Point (SSID: "ESP32-AP-Broker")
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    Lit les capteurs I2C : SCD30 (CO₂/temp/hum), BME280 (temp/hum/pres), BH1750 (lumière)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    Fusionne temp et humidité (moyenne SCD30 + BME280) pour plus de précision
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    Publie un payload JSON sur topic <code className="px-1.5 py-0.5 bg-white/5 rounded">sensor/data</code> toutes ~10s (déclenché par SCD30 data-ready)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    Scanne les IPs 192.168.4.2–5 pour trouver le broker MQTT automatiquement
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-3">Couche Serveur — Next.js App</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">instrumentation.ts</code> démarre le client MQTT au boot du serveur Next.js
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">lib/mqtt-client.ts</code> parse les messages, extrait les valeurs numériques, sauvegarde en DB
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">lib/sensor-emitter.ts</code> émet un événement <code className="px-1.5 py-0.5 bg-white/5 rounded">sensor_update</code> via EventEmitter
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">api/sensor-stream/route.ts</code> stream les mises à jour aux clients SSE connectés
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    Authentification Better Auth, gestion des sessions et profils utilisateurs
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Monitor className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-3">Couche Frontend — Dashboard React</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    Hook <code className="px-1.5 py-0.5 bg-white/5 rounded">useSensorData</code> ouvre une connexion SSE et maintient l'état React
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    Les données initiales sont chargées côté serveur via <code className="px-1.5 py-0.5 bg-white/5 rounded">getInitialDataPoints</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    Hook <code className="px-1.5 py-0.5 bg-white/5 rounded">useAnimatedValue</code> pour les transitions numériques fluides
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    Recharts AreaChart pour les graphiques historiques
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    Application PWA installable via next-pwa + service worker
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Format du payload MQTT</h2>
        <p className="text-neutral-400 mb-4">
          L'ESP32 publie sur le topic <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">sensor/data</code> un
          message JSON avec les valeurs brutes incluant leurs unités :
        </p>
        <CodeBlock title="Payload MQTT (topic: sensor/data)">{`{
  "temperature": "22.50 °C",
  "humidity": "55.10 %",
  "pressure": "1013.25 hPa",
  "co2": "650 ppm",
  "light": "320 lx"
}`}</CodeBlock>
        <p className="mt-4 text-sm text-neutral-500">
          Note : les valeurs sont des chaînes avec unité. Le serveur Next.js extrait la partie
          numérique avant de stocker dans la base de données.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Décisions architecturales clés</h2>
        <div className="grid gap-4">
          {[
            {
              title: "ESP32 en mode Access Point",
              color: "blue",
              desc: "L'ESP32 crée son propre réseau WiFi plutôt que de se connecter au WiFi domestique. Cela simplifie la configuration initiale : aucune saisie de credentials WiFi nécessaire, l'Orange Pi se connecte directement à l'ESP32.",
            },
            {
              title: "Fusion des capteurs température/humidité",
              color: "purple",
              desc: "La température et l'humidité sont mesurées par deux capteurs (SCD30 et BME280) puis moyennées. Cela réduit l'erreur de mesure individuelle et offre une redondance en cas de défaillance d'un capteur.",
            },
            {
              title: "instrumentation.ts pour le démarrage MQTT",
              color: "green",
              desc: "Next.js 14+ propose instrumentation.ts comme point d'entrée pour les effets de démarrage côté serveur. C'est l'endroit idéal pour initialiser la connexion MQTT sans avoir besoin d'un serveur Node.js séparé.",
            },
            {
              title: "EventEmitter + SSE pour le temps réel",
              color: "orange",
              desc: "Au lieu de WebSockets, le projet utilise Server-Sent Events (unidirectionnel serveur → client). Le broker interne EventEmitter découple la réception MQTT de la diffusion SSE, permettant plusieurs clients simultanés.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <h3 className={`font-semibold mb-2 text-${item.color}-300`}>{item.title}</h3>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
