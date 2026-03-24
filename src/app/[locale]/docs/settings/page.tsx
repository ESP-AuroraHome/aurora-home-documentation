import { ArrowRight, Bell, Sliders, ToggleLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import SettingsPreview from "@/components/demos/SettingsPreview";

export default async function DocsSettings() {
  const t = await getTranslations("settingsDoc");
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

      {/* ── Interactive preview ── */}
      <div className="mb-12">
        <SettingsPreview />
      </div>

      {/* ── Access ── */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{t("accessTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
            <Sliders className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">{t("accessCardTitle")}</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">{t("accessCardDesc")}</p>
          </div>
        </div>
      </div>

      {/* ── Notification preferences ── */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("notifTitle")}</h2>
        <p className="text-neutral-400 mb-6">{t("notifIntro")}</p>
        <div className="grid gap-4">
          {[
            { icon: ToggleLeft, color: "green", title: t("notifToggleTitle"), desc: t("notifToggleDesc") },
            { icon: Bell,       color: "yellow", title: t("notifSeverityTitle"), desc: t("notifSeverityDesc") },
            { icon: Bell,       color: "purple", title: t("notifQuietTitle"), desc: t("notifQuietDesc") },
          ].map(({ icon: Icon, color, title, desc }) => (
            <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] flex items-start gap-4">
              <div className={`p-2.5 rounded-lg bg-${color}-500/10 flex-shrink-0`}>
                <Icon className={`w-5 h-5 text-${color}-400`} />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{title}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Thresholds ── */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("threshTitle")}</h2>
        <p className="text-neutral-400 mb-6">{t("threshIntro")}</p>
        <div className="rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="text-left px-4 py-3 text-neutral-300 font-semibold">{t("threshColSensor")}</th>
                <th className="text-left px-4 py-3 text-neutral-300 font-semibold">{t("threshColHigh")}</th>
                <th className="text-left px-4 py-3 text-neutral-300 font-semibold">{t("threshColLow")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { sensor: "Temperature", high: "28°C", low: "14°C" },
                { sensor: "Humidity",    high: "70%",  low: "25%" },
                { sensor: "Pressure",    high: "—",    low: "970 hPa" },
                { sensor: "CO₂",         high: "800 ppm", low: "—" },
                { sensor: "Light",       high: "—",    low: "—" },
              ].map((row, i) => (
                <tr key={row.sensor} className={i < 4 ? "border-b border-white/5" : ""}>
                  <td className="px-4 py-3 text-white font-medium">{row.sensor}</td>
                  <td className="px-4 py-3 text-neutral-400">{row.high}</td>
                  <td className="px-4 py-3 text-neutral-400">{row.low}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-neutral-500 mt-3">{t("threshNote")}</p>
      </div>

    </div>
  );
}
