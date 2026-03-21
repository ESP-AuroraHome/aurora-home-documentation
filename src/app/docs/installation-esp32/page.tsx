import { ArrowRight, CheckCircle2, AlertCircle, Terminal, Cpu } from "lucide-react";

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

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-12 pb-8 border-l border-white/10 last:border-0 last:pb-0">
      <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-mono">
        {number}
      </div>
      <h3 className="font-semibold mb-3 text-lg">{title}</h3>
      <div className="space-y-4 text-neutral-400">{children}</div>
    </div>
  );
}

export default function DocsInstallationEsp32() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Pour commencer</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Installation ESP32</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Flash du firmware ESP32</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Guide complet pour compiler et flasher le firmware Aurora Home sur un ESP32 DevKit avec les
          capteurs environnementaux.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Prérequis matériels</h2>
        <div className="grid gap-3">
          {[
            { name: "ESP32 DevKit v1", desc: "ou tout board ESP32 compatible", required: true },
            { name: "Capteur SCD30 (Sensirion)", desc: "CO₂, température, humidité", required: true },
            { name: "Capteur BME280 (Bosch)", desc: "Température, humidité, pression", required: true },
            { name: "Capteur BH1750", desc: "Luminosité ambiante", required: true },
            { name: "Câble USB-C / micro-USB", desc: "Pour le flash et l'alimentation", required: true },
            { name: "Fils de connexion I2C", desc: "Jumper wires 4 fils (VCC, GND, SDA, SCL)", required: true },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3">
                {item.required ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
                <div>
                  <span className="font-medium text-sm">{item.name}</span>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Prérequis logiciels</h2>
        <div className="grid gap-3">
          {[
            { name: "PlatformIO IDE", desc: "Extension VS Code (recommandé) ou CLI", required: true },
            { name: "Python 3.8+", desc: "Requis par PlatformIO", required: true },
            { name: "Drivers USB-UART", desc: "CP2102 ou CH340 selon votre board", required: false },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3">
                {item.required ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
                <div>
                  <span className="font-medium text-sm">{item.name}</span>
                  <p className="text-xs text-neutral-500">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Câblage I2C</h2>
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
          <p className="text-sm text-neutral-400 mb-4">
            Les 3 capteurs utilisent le bus I2C sur les broches <strong className="text-white">GPIO21 (SDA)</strong> et{" "}
            <strong className="text-white">GPIO22 (SCL)</strong>. Tous les capteurs partagent les mêmes fils SDA/SCL.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 pr-6 text-neutral-400 font-medium">Capteur</th>
                  <th className="text-left py-2 pr-6 text-neutral-400 font-medium">Adresse I2C</th>
                  <th className="text-left py-2 pr-6 text-neutral-400 font-medium">VCC</th>
                  <th className="text-left py-2 text-neutral-400 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="text-neutral-300">
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-6">SCD30 (Sensirion)</td>
                  <td className="py-3 pr-6 font-mono text-blue-400">0x61</td>
                  <td className="py-3 pr-6">3.3V</td>
                  <td className="py-3 text-neutral-500">Adresse fixe</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 pr-6">BME280 (Bosch)</td>
                  <td className="py-3 pr-6 font-mono text-purple-400">0x76 / 0x77</td>
                  <td className="py-3 pr-6">3.3V</td>
                  <td className="py-3 text-neutral-500">Auto-détecté</td>
                </tr>
                <tr>
                  <td className="py-3 pr-6">BH1750</td>
                  <td className="py-3 pr-6 font-mono text-green-400">0x23</td>
                  <td className="py-3 pr-6">3.3V</td>
                  <td className="py-3 text-neutral-500">ADDR pin → GND</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <CodeBlock title="Connexions">{`ESP32 3V3  ──→  VCC  (tous les capteurs)
ESP32 GND  ──→  GND  (tous les capteurs)
ESP32 GPIO21 (SDA) ──→  SDA (tous les capteurs)
ESP32 GPIO22 (SCL) ──→  SCL (tous les capteurs)`}</CodeBlock>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Étapes d'installation</h2>

        <div className="space-y-2">
          <Step number={1} title="Cloner le dépôt">
            <p>Clonez le projet firmware depuis GitHub :</p>
            <CodeBlock title="Terminal">{`git clone https://github.com/antoinegourgue/aurora-home-esp32.git
cd aurora-home-esp32/platformio_IDE`}</CodeBlock>
          </Step>

          <Step number={2} title="Configurer le réseau WiFi">
            <p>
              Ouvrez <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">src/main.cpp</code> et
              modifiez les lignes de configuration (lignes 10-13) :
            </p>
            <CodeBlock title="src/main.cpp">{`// --- Configuration ---
const char *ssid = "ESP32-AP-Broker";  // Nom du réseau WiFi créé par l'ESP32
const char *password = "password123";  // Mot de passe WiFi
const int mqtt_port = 1883;
const char* mqtt_topic = "sensor/data";`}</CodeBlock>
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="flex items-start gap-3">
                <Terminal className="w-4 h-4 text-orange-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-orange-300 font-medium">Mode Access Point</p>
                  <p className="text-orange-200/70">
                    L'ESP32 <strong>crée son propre réseau WiFi</strong> (il n'est pas client d'un
                    routeur). L'Orange Pi doit se connecter à ce réseau "ESP32-AP-Broker" pour
                    accéder au broker MQTT.
                  </p>
                </div>
              </div>
            </div>
          </Step>

          <Step number={3} title="Compiler le firmware">
            <p>Compilez le projet avec PlatformIO :</p>
            <CodeBlock title="Terminal">{`# Via CLI PlatformIO
platformio run -e esp32dev

# Ou via VS Code : cliquer sur ✓ Build dans la barre PlatformIO`}</CodeBlock>
          </Step>

          <Step number={4} title="Flasher l'ESP32">
            <p>Connectez l'ESP32 via USB et flashez le firmware :</p>
            <CodeBlock title="Terminal">{`# Flash automatique (détecte le port USB)
platformio run -e esp32dev -t upload

# Si le port n'est pas détecté, spécifiez-le manuellement :
platformio run -e esp32dev -t upload --upload-port /dev/ttyUSB0`}</CodeBlock>
          </Step>

          <Step number={5} title="Surveiller la sortie série">
            <p>Ouvrez le moniteur série pour vérifier le démarrage :</p>
            <CodeBlock title="Terminal">{`platformio device monitor --baud 115200`}</CodeBlock>
            <p>Sortie attendue :</p>
            <CodeBlock title="Sortie série">{`--- 1. Sensor Initialization ---
BH1750 OK
SCD30 OK
BME280 OK

--- 2. Starting Access Point ---
AP Created. SSID: ESP32-AP-Broker
ESP32 IP: 192.168.4.1

--- 3. Waiting for Client Connection... ---
.....
✅ Client Connected! Starting Main Loop...
Publishing MQTT: {"temperature": "22.50 °C", "humidity": "55.10 %", "pressure": "1013.25 hPa", "co2": "650 ppm", "light": "320 lx"}`}</CodeBlock>
          </Step>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Dépendances PlatformIO</h2>
        <p className="text-neutral-400 mb-4">
          Les librairies sont installées automatiquement par PlatformIO depuis{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">platformio.ini</code> :
        </p>
        <CodeBlock title="platformio.ini">{`lib_deps =
    Wire
    sensirion/Sensirion I2C SCD30@^1.0.0
    claws/BH1750@^1.3.0
    adafruit/Adafruit BME280 Library@^2.3.0
    knolleary/PubSubClient@^2.8`}</CodeBlock>
      </div>

      <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
        <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
          <Cpu className="w-5 h-5" />
          Vérification
        </h3>
        <p className="text-sm text-neutral-400">
          Si vous voyez "Publishing MQTT" dans le moniteur série, le firmware fonctionne
          correctement. Connectez maintenant l'Orange Pi au réseau "ESP32-AP-Broker" et démarrez
          l'application web Aurora Home.
        </p>
      </div>
    </div>
  );
}
