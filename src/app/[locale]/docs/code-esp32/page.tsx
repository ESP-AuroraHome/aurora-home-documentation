import { ArrowRight, FileCode, AlertTriangle, Terminal } from "lucide-react";
import { TreeView, type TreeItem } from "@/components/TreeView";

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

const esp32Tree: TreeItem[] = [
  {
    name: "aurora-home-esp32",
    type: "folder",
    children: [
      {
        name: "platformio_IDE",
        type: "folder",
        comment: "Build principal",
        children: [
          { name: "platformio.ini", type: "file", comment: "Configuration build & dépendances" },
          {
            name: "src",
            type: "folder",
            children: [
              { name: "main.cpp", type: "file", comment: "Code source unique (~217 lignes)" },
            ],
          },
          { name: "include", type: "folder", comment: "Headers (.h)" },
          { name: "lib", type: "folder", comment: "Librairies locales" },
          { name: "test", type: "folder", comment: "Tests unitaires" },
        ],
      },
      {
        name: "arduino_IDE",
        type: "folder",
        comment: "Exemples par capteur",
        children: [
          {
            name: "BH1750",
            type: "folder",
            children: [{ name: "BH1750.ino", type: "file", comment: "Test luminosité seul" }],
          },
          {
            name: "SCD30",
            type: "folder",
            children: [{ name: "SCD30.ino", type: "file", comment: "Test CO₂ seul" }],
          },
          {
            name: "BMP-E_280",
            type: "folder",
            children: [{ name: "BMP-E_280.ino", type: "file", comment: "Test pression seul" }],
          },
          {
            name: "sensor_fusion",
            type: "folder",
            children: [{ name: "sensor_fusion.ino", type: "file", comment: "Fusion multi-capteurs (~360 lignes)" }],
          },
        ],
      },
    ],
  },
];

export default function DocsCodeEsp32() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Pour les développeurs</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Conventions ESP32</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Conventions — Firmware ESP32</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Standards de code C++ utilisés dans le projet{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">aurora-home-esp32</code>.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Conventions de nommage</h2>
        <div className="grid gap-4">
          {[
            {
              rule: "snake_case",
              scope: "Fonctions & variables",
              color: "blue",
              examples: ["scd30_init()", "publish_data()", "mqtt_port", "ssid", "avg_temp"],
            },
            {
              rule: "UPPER_SNAKE_CASE",
              scope: "Constantes & macros",
              color: "yellow",
              examples: ["NO_ERROR", "MQTT_PORT", "SCD30_I2C_ADDR_61"],
            },
            {
              rule: "camelCase",
              scope: "Objets globaux",
              color: "purple",
              examples: ["espClient", "scd30", "bme280", "lightMeter"],
            },
          ].map((item) => (
            <div key={item.rule} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <FileCode className={`w-4 h-4 text-${item.color}-400`} />
                <code className={`text-sm font-bold text-${item.color}-400`}>{item.rule}</code>
                <span className="text-sm text-neutral-500">— {item.scope}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {item.examples.map((ex) => (
                  <code key={ex} className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-400">
                    {ex}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Structure du projet</h2>
        <TreeView items={esp32Tree} title="aurora-home-esp32/" />
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Organisation de main.cpp</h2>
        <p className="text-neutral-400 mb-4">
          Le firmware est organisé en sections délimitées par des séparateurs commentés :
        </p>
        <CodeBlock title="platformio_IDE/src/main.cpp">{`// --- Configuration ---
// Constantes réseau et MQTT

// --- Global Objects ---
// Instances capteurs et client WiFi

// ==========================================
// --- SENSOR FUNCTIONS ---
// ==========================================
// bool scd30_init() / bool scd30_read()
// bool bh1750_read()
// bool bme280_init() / bool bme280_read()

// ==========================================
// --- MQTT & NETWORK LOGIC ---
// ==========================================
// void reconnect()
// void publish_data()

// ==========================================
// --- SETUP ---
// ==========================================
// void setup()

// ==========================================
// --- LOOP ---
// ==========================================
// void loop()`}</CodeBlock>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pattern init / read</h2>
        <p className="text-neutral-400 mb-4">
          Chaque capteur a deux fonctions dédiées retournant un{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">bool</code> :
        </p>
        <CodeBlock title="Pattern de fonction capteur">{`// Initialisation — retourne true si OK
bool bme280_init(Adafruit_BME280 &bme) {
    if (!bme.begin(0x76)) {   // Essai adresse principale
        if (!bme.begin(0x77)) return false;  // Fallback
    }
    bme.setSampling(...);
    return true;
}

// Lecture — retourne true UNIQUEMENT si données disponibles
bool scd30_read(SensirionI2cScd30 &scd30, float &co2, float &temp, float &hum) {
    uint16_t dataReady = 0;
    scd30.getDataReady(dataReady);
    if (dataReady) {
        scd30.readMeasurementData(co2, temp, hum);
        return true;
    }
    return false;
}`}</CodeBlock>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Gestion des erreurs</h2>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-2 text-red-300">Erreur critique (setup)</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Si un capteur obligatoire (SCD30, BME280) échoue à l'initialisation, blocage
                  indéfini :
                </p>
                <CodeBlock>{`if (!scd30_init(scd30)) {
    Serial.println("SCD30 ERROR");
    while(1) delay(1000);  // Redémarrage manuel requis
}`}</CodeBlock>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-2 text-yellow-300">Erreur non-critique (loop)</h3>
                <p className="text-sm text-neutral-400 mb-3">
                  Les erreurs de lecture dans la boucle sont loguées mais n'interrompent pas le
                  cycle :
                </p>
                <CodeBlock>{`if (!bme280_read(bme280, bme_temp, bme_hum, pres))
    Serial.println("Warn: BME280 fail");

if (!bh1750_read(bh1750, light))
    Serial.println("Warn: BH1750 fail");`}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Boucle non-bloquante</h2>
        <CodeBlock title="void loop()">{`void loop() {
  if (WiFi.softAPgetStationNum() == 0) {
      delay(1000); return;  // Attendre client WiFi
  }

  if (!client.connected()) reconnect();
  client.loop();

  float co2 = 0, scd_temp = 0, scd_hum = 0;
  if (scd30_read(scd30, co2, scd_temp, scd_hum)) {
      // Données prêtes → lire les autres et publier
      float bme_temp = 0, bme_hum = 0, pres = 0, light = 0;
      bme280_read(bme280, bme_temp, bme_hum, pres);
      bh1750_read(bh1750, light);

      float avg_temp = (scd_temp + bme_temp) / 2.0;
      float avg_hum  = (scd_hum  + bme_hum)  / 2.0;
      publish_data(avg_temp, avg_hum, pres, co2, light);
      delay(10000);  // 10s avant prochain cycle
  }
  delay(10);  // Éviter saturation CPU
}`}</CodeBlock>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Configuration I2C</h2>
        <CodeBlock title="setup()">{`Wire.begin(21, 22);       // SDA=GPIO21, SCL=GPIO22
Wire.setClock(50000);     // 50 kHz (SCD30 recommande ≤100 kHz)
Wire.setTimeOut(3000);    // 3000ms pour clock stretching SCD30`}</CodeBlock>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
            <Terminal className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-3">Commandes PlatformIO</h3>
            <div className="grid gap-2">
              {[
                { cmd: "platformio run -e esp32dev", desc: "Compiler" },
                { cmd: "platformio run -e esp32dev -t upload", desc: "Compiler + Flasher" },
                { cmd: "platformio device monitor --baud 115200", desc: "Moniteur série" },
                { cmd: "platformio run -e esp32dev -t clean", desc: "Nettoyer le build" },
              ].map((item) => (
                <div
                  key={item.cmd}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
                >
                  <code className="text-xs text-green-400">{item.cmd}</code>
                  <span className="text-xs text-neutral-500 hidden sm:block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
