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
							rule: "snake_case",
							scopeKey: "snakeCaseScope",
							color: "blue",
							examples: [
								"scd30_init()",
								"publish_data()",
								"mqtt_port",
								"ssid",
								"avg_temp",
							],
						},
						{
							rule: "UPPER_SNAKE_CASE",
							scopeKey: "upperSnakeCaseScope",
							color: "yellow",
							examples: ["NO_ERROR", "MQTT_PORT", "SCD30_I2C_ADDR_61"],
						},
						{
							rule: "camelCase",
							scopeKey: "camelCaseScope",
							color: "purple",
							examples: ["espClient", "scd30", "bme280", "lightMeter"],
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
				<h2 className="text-2xl font-bold mb-6">{t("patternTitle")}</h2>
				<p className="text-neutral-400 mb-4">
					{t("patternDesc")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">
						bool
					</code>{" "}
					{t("patternDesc2")}
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
								<CodeBlock>{`if (!scd30_init(scd30)) {
    Serial.println("SCD30 ERROR");
    while(1) delay(1000);  // Redémarrage manuel requis
}`}</CodeBlock>
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
				<h2 className="text-2xl font-bold mb-6">{t("nonBlockingTitle")}</h2>
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
				<h2 className="text-2xl font-bold mb-6">{t("i2cConfigTitle")}</h2>
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
