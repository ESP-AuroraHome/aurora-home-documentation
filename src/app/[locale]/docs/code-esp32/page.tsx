import { AlertTriangle, ArrowRight, FileCode, Terminal } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { type TreeItem, TreeView } from "@/components/TreeView";

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
				name: "platformio.ini",
				type: "file",
				comment: "Configuration build & dépendances",
			},
			{
				name: "include",
				type: "folder",
				comment: "Headers publics",
				children: [
					{
						name: "Config.h",
						type: "file",
						comment: "Paramètres firmware (gitignored)",
					},
					{
						name: "Config.h.example",
						type: "file",
						comment: "Template — cp → Config.h",
					},
					{
						name: "Logger.h",
						type: "file",
						comment: "Macros LOG_INFO / LOG_WARN / LOG_ERROR",
					},
					{ name: "sensors.h", type: "file", comment: "API capteurs I2C" },
					{
						name: "net.h",
						type: "file",
						comment: "API WiFi Soft-AP + MQTT + mDNS",
					},
					{
						name: "telemetry.h",
						type: "file",
						comment: "Sérialisation JSON (ArduinoJson)",
					},
					{
						name: "fusion.h",
						type: "file",
						comment: "Fusion capteurs (header-only)",
					},
				],
			},
			{
				name: "src",
				type: "folder",
				children: [
					{
						name: "main.cpp",
						type: "file",
						comment: "Orchestration setup() + loop()",
					},
					{
						name: "sensors.cpp",
						type: "file",
						comment: "Drivers BH1750 / SCD30 / BME280",
					},
					{
						name: "net.cpp",
						type: "file",
						comment: "Soft-AP WiFi, mDNS, MQTT, LWT",
					},
					{
						name: "telemetry.cpp",
						type: "file",
						comment: "Format JSON payload",
					},
				],
			},
			{
				name: "test",
				type: "folder",
				comment: "Tests Unity natifs (sans hardware)",
				children: [
					{
						name: "stubs",
						type: "folder",
						comment: "Stubs Arduino / WiFi / PubSubClient",
					},
					{ name: "test_native_fusion", type: "folder" },
					{ name: "test_native_contracts", type: "folder" },
					{ name: "test_native_net", type: "folder" },
					{ name: "test_native_telemetry", type: "folder" },
				],
			},
			{ name: "examples", type: "folder", comment: "Exemples par capteur" },
			{ name: "scripts", type: "folder", comment: "Scripts CI (coverage)" },
		],
	},
];

export default async function DocsCodeEsp32() {
	const t = await getTranslations("codeEsp32");

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
					{t("description")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">
						aurora-home-esp32
					</code>
					.
				</p>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("namingTitle")}</h2>
				<div className="grid gap-4">
					{[
						{
							rule: "camelCase + préfixe",
							scopeKey: "camelCasePrefixScope",
							color: "blue",
							examples: [
								"sensorsInitBh1750()",
								"sensorsReadScd30()",
								"netBegin()",
								"netMqttPublish()",
								"fusionAverage()",
							],
						},
						{
							rule: "AURORA_UPPER_SNAKE_CASE",
							scopeKey: "upperSnakeCaseScope",
							color: "yellow",
							examples: [
								"AURORA_MQTT_PORT",
								"AURORA_I2C_SDA",
								"AURORA_PUBLISH_INTERVAL_MS",
							],
						},
						{
							rule: "camelCase",
							scopeKey: "camelCaseScope",
							color: "purple",
							examples: ["co2Ppm", "avgTempC", "mqttBackoffMs", "haveScdData"],
						},
					].map(({ rule, scopeKey, color, examples }) => (
						<div
							key={rule}
							className="p-5 rounded-xl border border-white/10 bg-white/[0.02]"
						>
							<div className="flex items-center gap-3 mb-3">
								<FileCode className={`w-4 h-4 text-${color}-400`} />
								<code className={`text-sm font-bold text-${color}-400`}>
									{rule}
								</code>
								<span className="text-sm text-neutral-500">
									— {t(scopeKey)}
								</span>
							</div>
							<div className="flex gap-2 flex-wrap">
								{examples.map((ex) => (
									<code
										key={ex}
										className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-400"
									>
										{ex}
									</code>
								))}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("folderStructureTitle")}</h2>
				<TreeView items={esp32Tree} title="aurora-home-esp32/" />
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("mainCppTitle")}</h2>
				<p className="text-neutral-400 mb-4">{t("mainCppDesc")}</p>
				<CodeBlock title="src/main.cpp">{`#include "Config.h"
#include "Logger.h"
#include "fusion.h"
#include "net.h"
#include "sensors.h"
#include "telemetry.h"

// setup() — Wire.begin → sensorsInit*() → netBegin() → watchdog
void setup() { ... }

// loop() — netMqtt*() → sensorsRead*()
//         → fusionAverage() → telemetryFormat() → netMqttPublish()
void loop() { ... }`}</CodeBlock>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("patternTitle")}</h2>
				<p className="text-neutral-400 mb-4">
					{t("patternDesc")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">
						bool
					</code>{" "}
					{t("patternDesc2")}
				</p>
				<CodeBlock title="include/sensors.h">{`// Initialisation — retourne true si OK
bool sensorsInitBme280();   // essai 0x76 puis 0x77
bool sensorsInitScd30();    // reset + firmware check
bool sensorsInitBh1750();

// Lecture — retourne true UNIQUEMENT si données disponibles
bool sensorsReadScd30(float& co2Ppm, float& tempC, float& humPct);
bool sensorsReadBme280(float& tempC, float& humPct, float& pressureHpa);
bool sensorsReadBh1750(float& lux);`}</CodeBlock>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("errorHandlingTitle")}</h2>
				<div className="grid gap-4">
					<div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
						<div className="flex items-start gap-3">
							<AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold mb-2 text-red-300">
									{t("criticalErrorTitle")}
								</h3>
								<p className="text-sm text-neutral-400 mb-3">
									{t("criticalErrorDesc")}
								</p>
								<CodeBlock>{`if (!sensorsInitScd30()) fatalReboot("SCD30 init");
if (!sensorsInitBme280()) fatalReboot("BME280 init");

// fatalReboot() : LOG_ERROR → delay(2000) → ESP.restart()`}</CodeBlock>
							</div>
						</div>
					</div>

					<div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
						<div className="flex items-start gap-3">
							<AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
							<div className="flex-1 min-w-0">
								<h3 className="font-semibold mb-2 text-yellow-300">
									{t("nonCriticalErrorTitle")}
								</h3>
								<p className="text-sm text-neutral-400 mb-3">
									{t("nonCriticalErrorDesc")}
								</p>
								<CodeBlock>{`if (!sensorsReadBme280(bmeTempC, bmeHumPct, pressureHpa))
    LOG_WARN("BME280 read failed");

if (!sensorsReadBh1750(lux))
    LOG_WARN("BH1750 read failed");`}</CodeBlock>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("nonBlockingTitle")}</h2>
				<CodeBlock title="src/main.cpp — loop()">{`void loop() {
  esp_task_wdt_reset();
  const uint32_t now = millis();

  // 1. Attendre client WiFi
  if (!netHasClient()) { delay(500); return; }

  // 2. Reconnexion MQTT avec backoff exponentiel (1s → 60s)
  if (!netMqttConnected()) {
      if (now - mqttLastAttemptMs < mqttBackoffMs) { delay(50); return; }
      mqttLastAttemptMs = now;
      if (!netMqttTryConnect()) {  // mDNS d'abord, puis scan IPs
          mqttBackoffMs = min(mqttBackoffMs * 2, kMqttBackoffMaxMs);
          return;
      }
      mqttBackoffMs = kMqttBackoffInitialMs;
  }
  netMqttLoop();

  // 3. Lire SCD30 si donnée prête (~toutes les 2s, non-bloquant)
  float c = 0, t = 0, h = 0;
  if (sensorsReadScd30(c, t, h)) { co2Ppm = c; scdTempC = t; haveScdData = true; }

  // 4. Publier selon AURORA_PUBLISH_INTERVAL_MS (défaut 30s)
  if (!haveScdData || now - lastPublishMs < AURORA_PUBLISH_INTERVAL_MS) {
      delay(10); return;
  }
  lastPublishMs = now;
  sensorsReadBme280(bmeTempC, bmeHumPct, pressureHpa);
  sensorsReadBh1750(lux);
  const float avgTempC  = fusionAverage(scdTempC, bmeTempC);
  const float avgHumPct = fusionAverage(scdHumPct, bmeHumPct);
  telemetryFormat(payload, sizeof(payload), avgTempC, avgHumPct, ...);
  netMqttPublish(AURORA_MQTT_TOPIC_DATA, payload);
}`}</CodeBlock>
			</div>

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("i2cConfigTitle")}</h2>
				<CodeBlock title="src/main.cpp — setup()">{`Wire.begin(AURORA_I2C_SDA, AURORA_I2C_SCL);  // GPIO21 (SDA), GPIO22 (SCL)
// SCD30 : adresse 0x61 — BH1750 : 0x23 — BME280 : 0x76/0x77 (auto)`}</CodeBlock>
			</div>

			<div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
				<div className="flex items-start gap-4">
					<div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
						<Terminal className="w-5 h-5 text-green-400" />
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="font-semibold mb-3">{t("platformioTitle")}</h3>
						<div className="grid gap-2">
							{[
								{ cmd: "platformio run -e esp32dev", descKey: "cmdCompile" },
								{
									cmd: "platformio run -e esp32dev -t upload",
									descKey: "cmdUpload",
								},
								{
									cmd: "platformio device monitor --baud 115200",
									descKey: "cmdMonitor",
								},
								{
									cmd: "platformio run -e esp32dev -t clean",
									descKey: "cmdClean",
								},
							].map(({ cmd, descKey }) => (
								<div
									key={cmd}
									className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5"
								>
									<code className="text-xs text-green-400">{cmd}</code>
									<span className="text-xs text-neutral-500 hidden sm:block">
										{t(descKey)}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
