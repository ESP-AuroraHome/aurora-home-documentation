import {
	AlertCircle,
	ArrowRight,
	CheckCircle2,
	Cpu,
	Terminal,
} from "lucide-react";
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

export default async function DocsInstallationEsp32() {
	const t = await getTranslations("installationEsp32");
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

			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-6">{t("hardwarePrereqTitle")}</h2>
				<div className="grid gap-3">
					{[
						{ name: t("hw1Name"), desc: t("hw1Desc"), required: true },
						{ name: t("hw2Name"), desc: t("hw2Desc"), required: true },
						{ name: t("hw3Name"), desc: t("hw3Desc"), required: true },
						{ name: t("hw4Name"), desc: t("hw4Desc"), required: true },
						{ name: t("hw5Name"), desc: t("hw5Desc"), required: true },
						{ name: t("hw6Name"), desc: t("hw6Desc"), required: true },
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
				<h2 className="text-2xl font-bold mb-6">{t("softwarePrereqTitle")}</h2>
				<div className="grid gap-3">
					{[
						{ name: t("sw1Name"), desc: t("sw1Desc"), required: true },
						{ name: t("sw2Name"), desc: t("sw2Desc"), required: true },
						{ name: t("sw3Name"), desc: t("sw3Desc"), required: false },
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
				<h2 className="text-2xl font-bold mb-6">{t("wiringTitle")}</h2>
				<div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 mb-4">
					<p className="text-sm text-neutral-400 mb-4">
						{t("wiringDesc")}{" "}
						<strong className="text-white">GPIO21 (SDA)</strong>{" "}
						{t("wiringDesc2")}{" "}
						<strong className="text-white">GPIO22 (SCL)</strong>.{" "}
						{t("wiringDesc3")}
					</p>
					<div className="overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-white/10">
									<th className="text-left py-2 pr-6 text-neutral-400 font-medium">
										{t("tableHeaderSensor")}
									</th>
									<th className="text-left py-2 pr-6 text-neutral-400 font-medium">
										{t("tableHeaderAddr")}
									</th>
									<th className="text-left py-2 pr-6 text-neutral-400 font-medium">
										{t("tableHeaderVcc")}
									</th>
									<th className="text-left py-2 text-neutral-400 font-medium">
										{t("tableHeaderNotes")}
									</th>
								</tr>
							</thead>
							<tbody className="text-neutral-300">
								<tr className="border-b border-white/5">
									<td className="py-3 pr-6">SCD30 (Sensirion)</td>
									<td className="py-3 pr-6 font-mono text-blue-400">0x61</td>
									<td className="py-3 pr-6">3.3V</td>
									<td className="py-3 text-neutral-500">{t("scd30Note")}</td>
								</tr>
								<tr className="border-b border-white/5">
									<td className="py-3 pr-6">BME280 (Bosch)</td>
									<td className="py-3 pr-6 font-mono text-purple-400">
										0x76 / 0x77
									</td>
									<td className="py-3 pr-6">3.3V</td>
									<td className="py-3 text-neutral-500">{t("bme280Note")}</td>
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
				<h2 className="text-2xl font-bold mb-8">{t("stepsTitle")}</h2>

				<div className="space-y-2">
					<Step number={1} title={t("step1Title")}>
						<p>{t("step1Desc")}</p>
						<CodeBlock title="Terminal">{`git clone https://github.com/antoinegourgue/aurora-home-esp32.git
cd aurora-home-esp32`}</CodeBlock>
					</Step>

					<Step number={2} title={t("step2Title")}>
						<p>
							{t("step2Desc")}{" "}
							<code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">
								include/Config.h.example
							</code>{" "}
							{t("step2Desc2")}
						</p>
						<CodeBlock title="Terminal">{`cp include/Config.h.example include/Config.h`}</CodeBlock>
						<CodeBlock title="include/Config.h">{`#define AURORA_WIFI_AP_SSID     "ESP32-AP-Broker"
#define AURORA_WIFI_AP_PASSWORD "password123"

#define AURORA_MQTT_PORT           1883
#define AURORA_MQTT_TOPIC_DATA     "sensor/data"

#define AURORA_PUBLISH_INTERVAL_MS 30000  // 30s entre chaque publication
#define AURORA_WATCHDOG_TIMEOUT_S  30`}</CodeBlock>
						<div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
							<div className="flex items-start gap-3">
								<Terminal className="w-4 h-4 text-orange-400 mt-0.5" />
								<div className="text-sm">
									<p className="text-orange-300 font-medium">
										{t("apModeTitle")}
									</p>
									<p className="text-orange-200/70">
										{t("apModeDesc")} <strong>{t("apModeDesc2")}</strong>{" "}
										{t("apModeDesc3")}
									</p>
								</div>
							</div>
						</div>
					</Step>

					<Step number={3} title={t("step3Title")}>
						<p>{t("step3Desc")}</p>
						<CodeBlock title="Terminal">{`# Via CLI PlatformIO
platformio run -e esp32dev

# Ou via VS Code : cliquer sur ✓ Build dans la barre PlatformIO`}</CodeBlock>
					</Step>

					<Step number={4} title={t("step4Title")}>
						<p>{t("step4Desc")}</p>
						<CodeBlock title="Terminal">{`# Flash automatique (détecte le port USB)
platformio run -e esp32dev -t upload

# Si le port n'est pas détecté, spécifiez-le manuellement :
platformio run -e esp32dev -t upload --upload-port /dev/ttyUSB0`}</CodeBlock>
					</Step>

					<Step number={5} title={t("step5Title")}>
						<p>{t("step5Desc")}</p>
						<CodeBlock title="Terminal">{`platformio device monitor --baud 115200`}</CodeBlock>
						<p>{t("step5ExpectedOutput")}</p>
						<CodeBlock title="Sortie série">{`[INFO] --- 1. Sensor initialization ---
[INFO] BH1750: OK
[INFO] SCD30:  OK
[INFO] BME280: OK
[INFO] --- 2. Starting access point ---
[INFO] AP SSID: ESP32-AP-Broker
[INFO] ESP32 IP: 192.168.4.1
[INFO] mDNS responder up as esp32-aurora.local
[INFO] --- 3. Watchdog + waiting for client ---
[INFO] Client connected. IP: 192.168.4.2
[INFO] MQTT connected.
[INFO] MQTT publish [sensor/data]: {"temperature":"22.50","humidity":"55.10","pressure":"1013.25","co2":"650.00","light":"320.00"}`}</CodeBlock>
					</Step>
				</div>
			</div>

			<div className="mb-8">
				<h2 className="text-2xl font-bold mb-6">{t("depsTitle")}</h2>
				<p className="text-neutral-400 mb-4">
					{t("depsDesc")}{" "}
					<code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">
						platformio.ini
					</code>{" "}
					{t("depsDesc2")}
				</p>
				<CodeBlock title="platformio.ini">{`lib_deps =
    Wire
    sensirion/Sensirion I2C SCD30@^1.0.0
    claws/BH1750@^1.3.0
    adafruit/Adafruit BME280 Library@^2.3.0
    knolleary/PubSubClient@^2.8
    bblanchon/ArduinoJson@^7.2.0`}</CodeBlock>
			</div>

			<div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
				<h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
					<Cpu className="w-5 h-5" />
					{t("verificationTitle")}
				</h3>
				<p className="text-sm text-neutral-400">{t("verificationDesc")}</p>
			</div>
		</div>
	);
}
