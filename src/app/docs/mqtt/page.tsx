import { ArrowRight, Wifi, Cpu, Zap, AlertTriangle } from "lucide-react";

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

export default function DocsMqtt() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Technique</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">MQTT & Capteurs</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">MQTT & Capteurs</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Communication en temps réel entre le firmware ESP32 et l'application Next.js via le
          protocole MQTT.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Configuration du broker</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { label: "Broker", value: "Mosquitto (Orange Pi 3 LTS)" },
            { label: "IP par défaut", value: "192.168.4.2" },
            { label: "Port", value: "1883" },
            { label: "Protocol", value: "MQTT 3.1.1" },
            { label: "Topic", value: "sensor/data" },
            { label: "QoS", value: "0 (fire and forget)" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <p className="text-xs text-neutral-500 mb-1">{item.label}</p>
              <code className="text-sm text-green-400">{item.value}</code>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-200/70">
            L'IP du broker est configurable via la variable d'environnement{" "}
            <code className="px-1.5 py-0.5 bg-blue-500/20 rounded">MQTT_BROKER_URL</code> dans le{" "}
            <code className="px-1.5 py-0.5 bg-blue-500/20 rounded">.env</code>. L'ESP32 scanne
            automatiquement les IPs 192.168.4.2 à 192.168.4.5 pour trouver le broker.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Format du payload</h2>
        <p className="text-neutral-400 mb-4">
          L'ESP32 publie un objet JSON à chaque cycle de lecture réussie (~toutes les 10 secondes) :
        </p>
        <CodeBlock title="Payload MQTT — topic: sensor/data">{`{
  "temperature": "22.50 °C",
  "humidity": "55.10 %",
  "pressure": "1013.25 hPa",
  "co2": "650 ppm",
  "light": "320 lx"
}`}</CodeBlock>
        <p className="mt-4 text-sm text-neutral-500">
          Les valeurs sont des chaînes de caractères incluant l'unité. Le serveur Next.js utilise une
          regex pour extraire la partie numérique avant stockage en base.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Les 3 capteurs I2C</h2>
        <div className="grid gap-4">
          {[
            {
              name: "SCD30 (Sensirion)",
              addr: "0x61",
              color: "blue",
              library: "Sensirion I2C SCD30@^1.0.0",
              measures: ["CO₂ (ppm)", "Température (°C)", "Humidité (%)"],
              notes: "Capteur NDIR pour CO₂. Adresse fixe. Déclencheur principal du cycle de publication — publie uniquement quand SCD30 signale 'data ready'.",
              wire: "SDA: GPIO21, SCL: GPIO22, VCC: 3.3V",
            },
            {
              name: "BME280 (Bosch)",
              addr: "0x76 / 0x77",
              color: "purple",
              library: "Adafruit BME280 Library@^2.3.0",
              measures: ["Température (°C)", "Humidité (%)", "Pression (hPa)"],
              notes: "Auto-détecté sur 0x76, puis 0x77 en fallback. Mode NORMAL avec oversampling. Température et humidité fusionnées avec SCD30.",
              wire: "SDA: GPIO21, SCL: GPIO22, VCC: 3.3V",
            },
            {
              name: "BH1750",
              addr: "0x23",
              color: "yellow",
              library: "claws/BH1750@^1.3.0",
              measures: ["Luminosité (lux)"],
              notes: "Mode CONTINUOUS_HIGH_RES_MODE. ADDR pin connecté à GND pour adresse 0x23. Non bloquant — lecture uniquement si measurementReady().",
              wire: "SDA: GPIO21, SCL: GPIO22, VCC: 3.3V, ADDR: GND",
            },
          ].map((sensor) => (
            <div key={sensor.name} className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-${sensor.color}-500/10`}>
                  <Cpu className={`w-5 h-5 text-${sensor.color}-400`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{sensor.name}</h3>
                    <code className={`text-xs px-2 py-0.5 rounded bg-${sensor.color}-500/10 text-${sensor.color}-400`}>
                      {sensor.addr}
                    </code>
                  </div>
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {sensor.measures.map((m) => (
                      <span key={m} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-neutral-400">
                        {m}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-400 mb-3">{sensor.notes}</p>
                  <div className="text-xs text-neutral-600">
                    <span className="text-neutral-500">Librairie :</span>{" "}
                    <code>{sensor.library}</code>
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">
                    <span className="text-neutral-500">Câblage :</span>{" "}
                    <code>{sensor.wire}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Fusion des données</h2>
        <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">Moyenne SCD30 + BME280</h3>
              <p className="text-sm text-orange-200/70 mb-4">
                La température et l'humidité sont mesurées par deux capteurs différents. Le firmware
                calcule la moyenne pour réduire les erreurs de mesure individuelles.
              </p>
              <CodeBlock title="src/main.cpp (fusion)">{`// Fusion des mesures
float avg_temp = (scd_temp + bme_temp) / 2.0;
float avg_hum  = (scd_hum  + bme_hum)  / 2.0;

// Pression uniquement BME280
// CO2 uniquement SCD30
// Lumière uniquement BH1750`}</CodeBlock>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Cycle de vie MQTT côté Next.js</h2>
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="space-y-3 text-sm">
            {[
              { step: "1", label: "Boot Next.js", code: "instrumentation.ts", desc: "startMqttClient() appelé au démarrage du serveur" },
              { step: "2", label: "Connexion MQTT", code: "lib/mqtt-client.ts", desc: "client.on('connect') → subscribe('sensor/data')" },
              { step: "3", label: "Message reçu", code: "client.on('message')", desc: "Parse JSON, extrait les 5 valeurs numériques" },
              { step: "4", label: "Stockage DB", code: "dataPointRepository.create()", desc: "5 enregistrements DataPoint créés en SQLite" },
              { step: "5", label: "Broadcast SSE", code: "sensorEmitter.emit('sensor_update')", desc: "EventEmitter notifie tous les streams SSE actifs" },
              { step: "6", label: "Dashboard mis à jour", code: "useSensorData hook", desc: "React re-render avec les nouvelles valeurs" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-mono flex-shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-white font-medium">{item.label}</span>
                    <code className="text-xs text-neutral-500 bg-white/5 px-1.5 py-0.5 rounded">
                      {item.code}
                    </code>
                  </div>
                  <p className="text-neutral-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10">
            <Zap className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Reconnexion automatique</h3>
            <p className="text-sm text-neutral-400">
              Le client MQTT Next.js se reconnecte automatiquement en cas de déconnexion (
              <code className="px-1.5 py-0.5 bg-white/5 rounded">reconnectPeriod: 5000ms</code>,{" "}
              <code className="px-1.5 py-0.5 bg-white/5 rounded">connectTimeout: 10000ms</code>). Côté
              ESP32, la fonction <code className="px-1.5 py-0.5 bg-white/5 rounded">reconnect()</code> re-scanne
              les IPs du réseau AP en cas de perte de connexion broker.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
