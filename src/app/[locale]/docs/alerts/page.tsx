import { ArrowRight, Bell, AlertTriangle, ShieldCheck, CheckCheck, Eye, Zap, House } from "lucide-react";
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

export default async function DocsAlerts() {
  const t = await getTranslations("alerts");
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

      {/* Banner dashboard */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("bannerTitle")}</h2>
        <p className="text-neutral-400 mb-6">
          {t("bannerIntro")}
        </p>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-3 mb-2">
              <House className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-emerald-300">{t("healthyTitle")}</h3>
            </div>
            <p className="text-sm text-neutral-400">
              {t("healthyDesc")}
            </p>
          </div>

          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-300" />
              <h3 className="font-semibold text-red-200">{t("activeAlertsTitle")}</h3>
            </div>
            <p className="text-sm text-neutral-400 mb-3">
              {t("activeAlertsDesc")}
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: t("severityUrgent"), color: "red" },
                { label: t("severityProblem"), color: "orange" },
                { label: t("severityWarning"), color: "yellow" },
              ].map((s) => (
                <span key={s.label} className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-500/20 text-${s.color}-300`}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <h3 className="font-semibold">{t("watchingTitle")}</h3>
            </div>
            <p className="text-sm text-neutral-400">
              {t("watchingDesc")}
            </p>
          </div>
        </div>
      </div>

      {/* Cloche */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("notifPanelTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("bellCta")} <strong className="text-white">{t("bellCtaStrong")}</strong>{t("bellCta2")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                {t("bellDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {[
            { icon: Bell, color: "blue", title: t("tabAlertsTitle"), desc: t("tabAlertsDesc") },
            { icon: Eye, color: "neutral", title: t("tabUnseenTitle"), desc: t("tabUnseenDesc") },
            { icon: CheckCheck, color: "green", title: t("tabResolvedTitle"), desc: t("tabResolvedDesc") },
          ].map((tab) => (
            <div key={tab.title} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className={`p-2 rounded-lg bg-${tab.color}-500/10 flex-shrink-0`}>
                <tab.icon className={`w-4 h-4 text-${tab.color}-400`} />
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">{tab.title}</h4>
                <p className="text-sm text-neutral-500">{tab.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("actionsTitle")}</h2>
        <div className="grid gap-3">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">{t("markSeenTitle")}</h3>
                <p className="text-sm text-neutral-400">
                  {t("markSeenDesc")}
                  <strong className="text-white"> {t("markSeenAll")}</strong> {t("markSeenDesc2")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <CheckCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">{t("markResolvedTitle")}</h3>
                <p className="text-sm text-neutral-400">
                  {t("markResolvedDesc")} <strong className="text-white">{t("markResolvedStrong")}</strong> {t("markResolvedDesc2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sévérités */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("severitiesTitle")}</h2>
        <div className="grid gap-3">
          {[
            { label: t("warningLabel"), color: "yellow", desc: t("warningDesc") },
            { label: t("highLabel"), color: "orange", desc: t("highDesc") },
            { label: t("criticalLabel"), color: "red", desc: t("criticalDesc") },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl border border-${s.color}-500/30 bg-${s.color}-500/5`}>
              <p className={`font-semibold text-sm text-${s.color}-300 mb-1`}>{s.label}</p>
              <p className="text-sm text-neutral-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seuils */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("thresholdsTitle")}</h2>
        <p className="text-neutral-400 mb-6">
          {t("thresholdsIntro")}
        </p>
        <div className="grid gap-4">
          {[
            {
              sensor: t("tempSensor"),
              unit: "°C",
              color: "yellow",
              thresholds: [
                { label: t("tempHot"), values: t("tempHotValues") },
                { label: t("tempCold"), values: t("tempColdValues") },
              ],
            },
            {
              sensor: t("humSensor"),
              unit: "%",
              color: "blue",
              thresholds: [
                { label: t("humHigh"), values: t("humHighValues") },
                { label: t("humLow"), values: t("humLowValues") },
              ],
            },
            {
              sensor: t("co2Sensor"),
              unit: "ppm",
              color: "neutral",
              thresholds: [
                { label: t("co2High"), values: t("co2HighValues") },
              ],
            },
            {
              sensor: t("pressSensor"),
              unit: "hPa",
              color: "green",
              thresholds: [
                { label: t("pressLow"), values: t("pressLowValues") },
              ],
            },
          ].map((s) => (
            <div key={s.sensor} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-500/10 text-${s.color}-400`}>{s.unit}</span>
                <h3 className="font-semibold">{s.sensor}</h3>
              </div>
              <div className="grid gap-2">
                {s.thresholds.map((threshold) => (
                  <div key={threshold.label} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">{threshold.label}</span>
                    <code className="text-neutral-300 text-xs">{threshold.values}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-200/70">
            <strong className="text-blue-300">{t("suddenChangeNote")}</strong> {t("suddenChangeDesc")}
          </p>
        </div>
      </div>

      {/* Anti-spam */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("antispamTitle")}</h3>
            <p className="text-sm text-neutral-400">
              {t("antispamDesc")} <strong className="text-white">{t("antispamTime")}</strong>{t("antispamDesc2")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
