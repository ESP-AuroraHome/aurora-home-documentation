import { ArrowRight, KeyRound, Monitor, ShieldCheck, Home, LogOut, HelpCircle, Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import AuthPreview from "@/components/demos/AuthPreview";

export default async function DocsAuth() {
  const t = await getTranslations("auth");
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
        <AuthPreview />
      </div>

      {/* --- Comment ça marche --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("howToTitle")}</h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              icon: Mail,
              color: "blue",
              label: t("step1Label"),
              title: t("step1Title"),
              desc: t("step1Desc"),
            },
            {
              step: "2",
              icon: Monitor,
              color: "purple",
              label: t("step2Label"),
              title: t("step2Title"),
              desc: t("step2Desc"),
            },
            {
              step: "3",
              icon: ShieldCheck,
              color: "green",
              label: t("step3Label"),
              title: t("step3Title"),
              desc: t("step3Desc"),
            },
            {
              step: "4",
              icon: Home,
              color: "orange",
              label: t("step4Label"),
              title: t("step4Title"),
              desc: t("step4Desc"),
            },
          ].map((item) => (
            <div
              key={item.step}
              className="flex items-start gap-4 p-6 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className={`p-3 rounded-lg bg-${item.color}-500/10 flex-shrink-0`}>
                <item.icon className={`w-5 h-5 text-${item.color}-400`} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-mono px-2 py-0.5 rounded bg-${item.color}-500/10 text-${item.color}-400`}>
                    {item.label}
                  </span>
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <p className="text-sm text-neutral-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Rester connecté --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("stayLoggedTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-3">{t("stayLoggedCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                {t("stayLoggedDesc")}
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("stayLoggedExpiry")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Se déconnecter --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("logoutTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-500/10 flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("logoutCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("logoutDesc")}{" "}
                <strong className="text-white">{t("logoutButton")}</strong> {t("logoutDesc2")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAQ --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("faqTitle")}</h2>
        <div className="grid gap-4">
          {[
            { q: t("faq1Q"), a: t("faq1A") },
            { q: t("faq2Q"), a: t("faq2A") },
            { q: t("faq3Q"), a: t("faq3A") },
            { q: t("faq4Q"), a: t("faq4A") },
          ].map((item) => (
            <div key={item.q} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-2">{item.q}</h3>
                  <p className="text-sm text-neutral-400">{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
