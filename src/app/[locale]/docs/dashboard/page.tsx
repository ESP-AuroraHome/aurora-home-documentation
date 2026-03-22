import { ArrowRight, Thermometer, Droplets, Gauge, Wind, Sun, MousePointer, Smartphone, RefreshCw, Info } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function DocsDashboard() {
  const t = await getTranslations("dashboard");
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

      {/* --- Mise à jour en temps réel --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t("realtimeTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("realtimeCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("realtimeCardDesc")}
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                {t("realtimeReconnect")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Les 5 capteurs --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("sensorsTitle")}</h2>
        <p className="text-neutral-400 mb-6">
          {t("sensorsIntro")}
        </p>
        <div className="grid gap-4">
          {[
            {
              icon: Thermometer,
              color: "yellow",
              name: t("tempName"),
              unit: "°C",
              desc: t("tempDesc"),
              normal: t("tempNormal"),
            },
            {
              icon: Droplets,
              color: "blue",
              name: t("humName"),
              unit: "%",
              desc: t("humDesc"),
              normal: t("humNormal"),
            },
            {
              icon: Gauge,
              color: "green",
              name: t("pressName"),
              unit: "hPa",
              desc: t("pressDesc"),
              normal: t("pressNormal"),
            },
            {
              icon: Wind,
              color: "neutral",
              name: t("co2Name"),
              unit: "ppm",
              desc: t("co2Desc"),
              normal: t("co2Normal"),
            },
            {
              icon: Sun,
              color: "orange",
              name: t("lightName"),
              unit: "lx",
              desc: t("lightDesc"),
              normal: t("lightNormal"),
            },
          ].map((s) => (
            <div key={s.name} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-${s.color}-500/10`}>
                  <s.icon className={`w-4 h-4 text-${s.color}-400`} />
                </div>
                <span className="font-semibold text-white">{s.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-500/10 text-${s.color}-400`}>
                  {s.unit}
                </span>
              </div>
              <p className="text-sm text-neutral-400 mb-2">{s.desc}</p>
              <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                <Info className="w-3 h-3 flex-shrink-0" />
                {s.normal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Interaction avec les cartes --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("interactTitle")}</h2>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                <MousePointer className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("clickCardTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t("clickCardDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-neutral-500/10 flex-shrink-0">
                <Info className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("noDataTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t("noDataDesc")} <span className="text-white font-mono">-- °C</span> {t("noDataDesc2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bannière d'état --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("bannerTitle")}</h2>
        <p className="text-neutral-400 mb-6">
          {t("bannerIntro")}
        </p>
        <div className="grid gap-3">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <p className="text-sm font-medium text-emerald-300 mb-1">{t("bannerHealthyTitle")}</p>
            <p className="text-sm text-neutral-400">{t("bannerHealthyDesc")}</p>
          </div>
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10">
            <p className="text-sm font-medium text-red-200 mb-1">{t("bannerAlertTitle")}</p>
            <p className="text-sm text-neutral-400">
              {t("bannerAlertDesc")}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
            <p className="text-sm font-medium text-white mb-1">{t("bannerWatchingTitle")}</p>
            <p className="text-sm text-neutral-400">
              {t("bannerWatchingDesc")}
            </p>
          </div>
        </div>
        <p className="text-sm text-neutral-500 mt-4">
          → {t("bannerLinkText")} <a href="/docs/alerts" className="text-blue-400 hover:underline">{t("bannerLinkLabel")}</a> {t("bannerLinkSuffix")}
        </p>
      </div>

      {/* --- PWA --- */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
            <Smartphone className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("pwaTitle")}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t("pwaDesc")} <strong className="text-white">{t("pwaAndroid")}</strong>{t("pwaDescMid")} <strong className="text-white">{t("pwaIphone")}</strong>{t("pwaDescEnd")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
