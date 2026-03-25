import { getTranslations } from "next-intl/server";
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

export default async function DocsSimulator() {
  const t = await getTranslations("simulator");

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

      <div className="mb-4 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-orange-200/70">
            {t("devOnlyNote")} <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">POST /api/dev/inject-sensor</code> {t("devOnlyNote2")} <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">development</code>{t("devOnlyNote3")}
          </p>
        </div>
      </div>

      {/* Commandes npm */}
      <div className="mb-12 mt-8">
        <h2 className="text-2xl font-bold mb-6">{t("npmCommandsTitle")}</h2>
        <div className="grid gap-3">
          {[
            { cmd: "npm run simulate", descKey: "cmdSimulateDesc", color: "green" },
            { cmd: "npm run simulate:co2", descKey: "cmdSimulateCo2Desc", color: "neutral" },
            { cmd: "npm run simulate:temp", descKey: "cmdSimulateTempDesc", color: "yellow" },
            { cmd: "npm run simulate:hum", descKey: "cmdSimulateHumDesc", color: "blue" },
            { cmd: "npm run simulate:sudden", descKey: "cmdSimulateSuddenDesc", color: "red" },
          ].map(({ cmd, descKey, color }) => (
            <div
              key={cmd}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <code className={`text-sm text-${color}-400`}>{cmd}</code>
              <span className="text-sm text-neutral-500 hidden sm:block">{t(descKey)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("advancedTitle")}</h2>
        <CodeBlock title="scripts/simulate-sensors.mjs">{`# Intervalle personnalisé (défaut : 3000ms)
node scripts/simulate-sensors.mjs --interval 2000

# URL personnalisée (défaut : http://localhost:3000)
node scripts/simulate-sensors.mjs --url http://localhost:3003

# Combinaison
node scripts/simulate-sensors.mjs --anomaly co2 --interval 1000`}</CodeBlock>
      </div>

      {/* Output */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("consoleOutputTitle")}</h2>
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
        <h2 className="text-2xl font-bold mb-6">{t("endpointTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("endpointDesc")}
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
            { step: "1", descKey: "step1Desc" },
            { step: "2", descKey: "step2Desc" },
            { step: "3", descKey: "step3Desc" },
            { step: "4", descKey: "step4Desc" },
            { step: "5", descKey: "step5Desc" },
          ].map(({ step, descKey }) => (
            <div key={step} className="flex items-start gap-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {step}
              </span>
              <p className="text-sm text-neutral-400">{t(descKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Anomaly modes */}
      <div className="mb-12 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-red-500/10 flex-shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("alertTestTitle")}</h3>
            <p className="text-sm text-neutral-400 mb-3">
              {t("alertTestDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded">--anomaly co2</code> {t("alertTestDesc2")}
            </p>
            <ul className="text-sm text-neutral-500 space-y-1">
              <li>{t("alertStep4")}</li>
              <li>{t("alertStep11")}</li>
              <li>{t("alertStep16")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Commandes de seeding */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("seedCommandsTitle")}</h2>
        <p className="text-neutral-400 mb-6">{t("seedCommandsIntro")}</p>
        <div className="grid gap-3">
          {[
            { cmd: "npm run seed:7days", descKey: "cmdSeed7daysDesc", color: "green" },
            { cmd: "npm run seed:7days:clear", descKey: "cmdSeed7daysClearDesc", color: "yellow" },
            { cmd: "npm run test:iaq", descKey: "cmdTestIaqDesc", color: "blue" },
            { cmd: "npm run test:iaq:excellent", descKey: "cmdTestIaqExcellentDesc", color: "emerald" },
            { cmd: "npm run test:iaq:good", descKey: "cmdTestIaqGoodDesc", color: "green" },
            { cmd: "npm run test:iaq:moderate", descKey: "cmdTestIaqModerateDesc", color: "yellow" },
            { cmd: "npm run test:iaq:poor", descKey: "cmdTestIaqPoorDesc", color: "red" },
          ].map(({ cmd, descKey, color }) => (
            <div
              key={cmd}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <code className={`text-sm text-${color}-400`}>{cmd}</code>
              <span className="text-sm text-neutral-500 hidden sm:block">{t(descKey)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
