import { ArrowRight, Terminal, Zap, AlertTriangle, Info } from "lucide-react";

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

export default function DocsSimulator() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Pour les développeurs</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Simulateur de capteurs</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Simulateur de capteurs</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Un script Node.js pour tester le système d'alertes et les mises à jour
          temps réel sans avoir de capteurs ESP32 physiques.
        </p>
      </div>

      <div className="mb-4 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-orange-200/70">
            Le simulateur utilise l'endpoint <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">POST /api/dev/inject-sensor</code> qui
            n'est disponible qu'en mode <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">development</code>. Il retourne 403 en production.
          </p>
        </div>
      </div>

      {/* Commandes npm */}
      <div className="mb-12 mt-8">
        <h2 className="text-2xl font-bold mb-6">Commandes npm</h2>
        <div className="grid gap-3">
          {[
            { cmd: "npm run simulate", desc: "Dérive naturelle — valeurs normales", color: "green" },
            { cmd: "npm run simulate:co2", desc: "Montée progressive du CO₂ (→ anomalie)", color: "neutral" },
            { cmd: "npm run simulate:temp", desc: "Montée de température (→ anomalie)", color: "yellow" },
            { cmd: "npm run simulate:hum", desc: "Humidité croissante (→ anomalie)", color: "blue" },
            { cmd: "npm run simulate:sudden", desc: "Pic brutal à l'étape 8 (CO₂ × 1.8, Temp × 1.4)", color: "red" },
          ].map((item) => (
            <div
              key={item.cmd}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <code className={`text-sm text-${item.color}-400`}>{item.cmd}</code>
              <span className="text-sm text-neutral-500 hidden sm:block">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Options avancées</h2>
        <CodeBlock title="scripts/simulate-sensors.mjs">{`# Intervalle personnalisé (défaut : 3000ms)
node scripts/simulate-sensors.mjs --interval 2000

# URL personnalisée (défaut : http://localhost:3000)
node scripts/simulate-sensors.mjs --url http://localhost:3003

# Combinaison
node scripts/simulate-sensors.mjs --anomaly co2 --interval 1000`}</CodeBlock>
      </div>

      {/* Output */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Sortie console</h2>
        <CodeBlock title="Terminal">{`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Aurora Home — Simulateur de capteurs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Mode     : anomalie "co2"
  Serveur  : http://localhost:3000
  Intervalle: 3000ms
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Ctrl+C pour arrêter

[10:32:01] step=  1 | T= 21.5°C  H= 55.0%  P= 1013.2hPa  CO₂= 530ppm  L= 312lx
[10:32:04] step=  2 | T= 21.6°C  H= 55.2%  P= 1013.1hPa  CO₂= 618ppm  L= 298lx
[10:32:07] step=  3 | T= 21.4°C  H= 55.1%  P= 1013.3hPa  CO₂= 712ppm  L= 321lx`}</CodeBlock>
      </div>

      {/* Endpoint dev */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Endpoint POST /api/dev/inject-sensor</h2>
        <p className="text-neutral-400 mb-4">
          Le simulateur poste vers cet endpoint à chaque intervalle. Pour chaque capteur fourni,
          le serveur crée un DataPoint, lance la détection d'anomalie et émet les événements SSE.
        </p>
        <CodeBlock title="Payload">{`{
  "temperature": "22.5",
  "humidity": "58.0",
  "pressure": "1013.2",
  "co2": "820",
  "light": "310"
}`}</CodeBlock>
        <div className="mt-4 grid gap-3">
          {[
            { step: "1", desc: "Crée un DataPoint en base pour chaque capteur" },
            { step: "2", desc: "Récupère les 6 derniers relevés pour calculer la moyenne glissante" },
            { step: "3", desc: "Appelle detectAnomaly() — vérifie seuils et variation soudaine" },
            { step: "4", desc: "Si anomalie détectée et aucune alerte récente → crée une Alert + émet alert_created via SSE" },
            { step: "5", desc: "Émet sensor_update via SSE pour mettre à jour les cartes du dashboard" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {item.step}
              </span>
              <p className="text-sm text-neutral-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Anomaly modes */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-red-500/10 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Tester le système d'alertes</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Les modes anomalie font monter les valeurs progressivement sur ~20 étapes jusqu'à
              dépasser les seuils WARNING puis HIGH. Exemple avec <code className="px-1.5 py-0.5 bg-white/5 rounded">--anomaly co2</code> :
            </p>
            <ul className="text-sm text-neutral-500 space-y-1">
              <li>→ Étape ~4 : CO₂ dépasse 800 ppm → alerte WARNING générée</li>
              <li>→ Étape ~11 : CO₂ dépasse 1500 ppm → alerte HIGH générée</li>
              <li>→ Étape ~16 : CO₂ dépasse 2000 ppm → alerte CRITICAL générée</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
