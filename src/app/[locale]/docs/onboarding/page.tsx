import { ArrowRight, UserPlus, User, Image, Globe, CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">
          {number}
        </div>
        <div className="w-px flex-1 bg-white/10 mt-2" />
      </div>
      <div className="pb-10 flex-1 min-w-0">
        <h3 className="font-semibold mb-2 mt-1">{title}</h3>
        <div className="text-sm text-neutral-400 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default async function DocsOnboarding() {
  const t = await getTranslations("onboarding");
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

      {/* Trigger */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("triggerTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
              <UserPlus className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("triggerCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("triggerDesc")}{" "}
                <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">onboardingCompleted</code>{" "}
                {t("triggerDesc2")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">true</code> {t("triggerDesc3")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">{t("stepsTitle")}</h2>
        <div>
          <Step number={1} title={t("step1Title")}>
            {t("step1Desc")}
          </Step>

          <Step number={2} title={t("step2Title")}>
            {t("step2Desc")}{" "}
            <strong className="text-white">{t("step2Strong")}</strong>{t("step2Desc2")}
            <div className="mt-3 flex flex-wrap gap-2">
              {["adventurer", "avataaars", "bottts", "fun-emoji", "identicon", "lorelei", "micah", "miniavs", "open-peeps", "personas", "pixel-art", "shapes", "thumbs"].map((style) => (
                <span key={style} className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-500 font-mono">
                  {style}
                </span>
              ))}
            </div>
          </Step>

          <Step number={3} title={t("step3Title")}>
            {t("step3Desc")}{" "}
            <strong className="text-white">{t("step3Lang1")}</strong> {t("step3Or")}{" "}
            <strong className="text-white">{t("step3Lang2")}</strong>.
            {t("step3Desc2")}
          </Step>
        </div>
      </div>

      {/* Validation */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("validationTitle")}</h2>
        <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-300 mb-2">{t("validationCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("validationDesc")}
                <code className="mx-1 px-1.5 py-0.5 bg-white/5 rounded text-green-400">onboardingCompleted</code>
                {t("validationDesc2")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">false</code>,
                {t("validationDesc3")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* After onboarding */}
      <div className="grid gap-4">
        {[
          {
            icon: Image,
            color: "blue",
            title: t("changeAvatarTitle"),
            desc: t("changeAvatarDesc"),
          },
          {
            icon: User,
            color: "green",
            title: t("changeNameTitle"),
            desc: t("changeNameDesc"),
          },
          {
            icon: Globe,
            color: "orange",
            title: t("changeLangTitle"),
            desc: t("changeLangDesc"),
          },
        ].map((item) => (
          <div key={item.title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg bg-${item.color}-500/10 flex-shrink-0`}>
                <item.icon className={`w-4 h-4 text-${item.color}-400`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
