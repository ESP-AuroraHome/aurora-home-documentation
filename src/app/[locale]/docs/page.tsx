import { Cpu, Wifi, BarChart3, Shield, ArrowRight, Zap, Database, Monitor } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function DocsIntroduction() {
  const t = await getTranslations("introduction");
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>{t("breadcrumbDocs")}</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">{t("breadcrumbCurrent")}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
        <p className="text-base sm:text-xl text-neutral-400 leading-relaxed">
          {t("description")}
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-neutral-300 leading-relaxed">
          {t("systemDescription")}
        </p>
      </div>

      <div className="grid gap-4 mb-12">
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("esp32CardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("esp32CardDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Wifi className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("mqttCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("mqttCardDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-purple-300">sensor/data</code> {t("mqttCardDesc2")}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("dashboardCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("dashboardCardDesc")}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("authCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("authCardDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">5</div>
          <div className="text-xs text-neutral-500">{t("statSensors")}</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">SSE</div>
          <div className="text-xs text-neutral-500">{t("statRealtime")}</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">PWA</div>
          <div className="text-xs text-neutral-500">{t("statPwa")}</div>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">{t("ctaTitle")}</h3>
            <p className="text-sm text-neutral-400">
              {t("ctaDesc")}
            </p>
          </div>
          <Link
            href="/docs/installation"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            {t("ctaButton")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">{t("architectureTitle")}</h2>
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">ESP32</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
                <Wifi className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">MQTT Broker</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Next.js App</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-2">
                <Database className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">SQLite DB</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-2">
                <Monitor className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
