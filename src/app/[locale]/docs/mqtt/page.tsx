import { ArrowRight, Wifi, Cpu, Zap, AlertTriangle } from "lucide-react";
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

export default async function DocsMqtt() {
  const t = await getTranslations("mqtt");
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
        <h2 className="text-2xl font-bold mb-6">{t("brokerConfigTitle")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { label: t("brokerLabel"), value: "Mosquitto (Orange Pi 3 LTS)" },
            { label: t("ipLabel"), value: "192.168.4.2" },
            { label: t("portLabel"), value: "1883" },
            { label: t("protocolLabel"), value: "MQTT 3.1.1" },
            { label: t("topicLabel"), value: "sensor/data" },
            { label: t("qosLabel"), value: "0 (fire and forget)" },
          ].map((item) => (
            <div key={item.label} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
              <p className="text-xs text-neutral-500 mb-1">{item.label}</p>
              <code className="text-sm text-green-400">{item.value}</code>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-200/70">
            {t("brokerNote")}{" "}
            <code className="px-1.5 py-0.5 bg-blue-500/20 rounded">MQTT_BROKER_URL</code> {t("brokerNote2")}{" "}
            <code className="px-1.5 py-0.5 bg-blue-500/20 rounded">.env</code>{t("brokerNote3")}
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("payloadTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("payloadDesc")}
        </p>
        <CodeBlock title="Payload MQTT — topic: sensor/data">{`{
  "temperature": "22.50 °C",
  "humidity": "55.10 %",
  "pressure": "1013.25 hPa",
  "co2": "650 ppm",
  "light": "320 lx"
}`}</CodeBlock>
        <p className="mt-4 text-sm text-neutral-500">
          {t("payloadNote")}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("sensorsTitle")}</h2>
        <div className="grid gap-4">
          {[
            {
              name: "SCD30 (Sensirion)",
              addr: "0x61",
              color: "blue",
              library: t("scd30Library"),
              measures: ["CO₂ (ppm)", "Température (°C)", "Humidité (%)"],
              notes: t("scd30Notes"),
              wire: "SDA: GPIO21, SCL: GPIO22, VCC: 3.3V",
            },
            {
              name: "BME280 (Bosch)",
              addr: "0x76 / 0x77",
              color: "purple",
              library: t("bme280Library"),
              measures: ["Température (°C)", "Humidité (%)", "Pression (hPa)"],
              notes: t("bme280Notes"),
              wire: "SDA: GPIO21, SCL: GPIO22, VCC: 3.3V",
            },
            {
              name: "BH1750",
              addr: "0x23",
              color: "yellow",
              library: t("bh1750Library"),
              measures: ["Luminosité (lux)"],
              notes: t("bh1750Notes"),
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
                    <span className="text-neutral-500">{t("libraryLabel")}</span>{" "}
                    <code>{sensor.library}</code>
                  </div>
                  <div className="text-xs text-neutral-600 mt-1">
                    <span className="text-neutral-500">{t("wiringLabel")}</span>{" "}
                    <code>{sensor.wire}</code>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("fusionTitle")}</h2>
        <div className="p-6 rounded-xl bg-orange-500/5 border border-orange-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-300 mb-2">{t("fusionCardTitle")}</h3>
              <p className="text-sm text-orange-200/70 mb-4">
                {t("fusionDesc")}
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
        <h2 className="text-2xl font-bold mb-6">{t("lifecycleTitle")}</h2>
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="space-y-3 text-sm">
            {[
              { step: "1", label: t("lc1Label"), code: "instrumentation.ts", desc: t("lc1Desc") },
              { step: "2", label: t("lc2Label"), code: "lib/mqtt-client.ts", desc: t("lc2Desc") },
              { step: "3", label: t("lc3Label"), code: "client.on('message')", desc: t("lc3Desc") },
              { step: "4", label: t("lc4Label"), code: "dataPointRepository.create()", desc: t("lc4Desc") },
              { step: "5", label: t("lc5Label"), code: "sensorEmitter.emit('sensor_update')", desc: t("lc5Desc") },
              { step: "6", label: t("lc6Label"), code: "useSensorData hook", desc: t("lc6Desc") },
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
            <h3 className="font-semibold mb-2">{t("reconnectTitle")}</h3>
            <p className="text-sm text-neutral-400">
              {t("reconnectDesc")}
              <code className="px-1.5 py-0.5 bg-white/5 rounded">reconnectPeriod: 5000ms</code>,{" "}
              <code className="px-1.5 py-0.5 bg-white/5 rounded">connectTimeout: 10000ms</code>{t("reconnectDesc2")}
              <code className="px-1.5 py-0.5 bg-white/5 rounded">reconnect()</code> {t("reconnectDesc3")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
