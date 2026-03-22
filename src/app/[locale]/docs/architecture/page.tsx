import { ArrowRight, Cpu, Wifi, Zap, Database, Monitor, Layers } from "lucide-react";
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

export default async function DocsArchitecture() {
  const t = await getTranslations("architecture");
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>{t("breadcrumbDocs")}</span>
          <ArrowRight className="w-3 h-3" />
          <span>{t("breadcrumbSection")}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">{t("breadcrumbCurrent")}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("schemaTitle")}</h2>
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
        <h2 className="text-2xl font-bold mb-6">{t("layersTitle")}</h2>
        <div className="grid gap-4">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Cpu className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-3">{t("esp32LayerTitle")}</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    {t("esp32Li1")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    {t("esp32Li2")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    {t("esp32Li3")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    {t("esp32Li4")} <code className="px-1.5 py-0.5 bg-white/5 rounded">sensor/data</code> {t("esp32Li4b")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 mt-1.5 flex-shrink-0" />
                    {t("esp32Li5")}
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
                <h3 className="font-semibold mb-3">{t("serverLayerTitle")}</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">instrumentation.ts</code> {t("serverLi1")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">lib/mqtt-client.ts</code> {t("serverLi2")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">lib/sensor-emitter.ts</code> {t("serverLi3")} <code className="px-1.5 py-0.5 bg-white/5 rounded">sensor_update</code> {t("serverLi3b")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    <code className="px-1.5 py-0.5 bg-white/5 rounded">api/sensor-stream/route.ts</code> {t("serverLi4")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-1.5 flex-shrink-0" />
                    {t("serverLi5")}
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
                <h3 className="font-semibold mb-3">{t("frontendLayerTitle")}</h3>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    {t("frontendLi1")} <code className="px-1.5 py-0.5 bg-white/5 rounded">useSensorData</code> {t("frontendLi1b")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    {t("frontendLi2")} <code className="px-1.5 py-0.5 bg-white/5 rounded">getInitialDataPoints</code>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    {t("frontendLi3")} <code className="px-1.5 py-0.5 bg-white/5 rounded">useAnimatedValue</code> {t("frontendLi3b")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    {t("frontendLi4")}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-1.5 flex-shrink-0" />
                    {t("frontendLi5")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("mqttPayloadTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("mqttPayloadDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">sensor/data</code> {t("mqttPayloadDesc2")}
        </p>
        <CodeBlock title="Payload MQTT (topic: sensor/data)">{`{
  "temperature": "22.50 °C",
  "humidity": "55.10 %",
  "pressure": "1013.25 hPa",
  "co2": "650 ppm",
  "light": "320 lx"
}`}</CodeBlock>
        <p className="mt-4 text-sm text-neutral-500">
          {t("mqttPayloadNote")}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("decisionsTitle")}</h2>
        <div className="grid gap-4">
          {[
            {
              title: t("decision1Title"),
              color: "blue",
              desc: t("decision1Desc"),
            },
            {
              title: t("decision2Title"),
              color: "purple",
              desc: t("decision2Desc"),
            },
            {
              title: t("decision3Title"),
              color: "green",
              desc: t("decision3Desc"),
            },
            {
              title: t("decision4Title"),
              color: "orange",
              desc: t("decision4Desc"),
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
