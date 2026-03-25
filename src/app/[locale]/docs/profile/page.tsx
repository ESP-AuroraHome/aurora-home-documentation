import { ArrowRight, UserCircle, Palette, Globe, Mail, Pencil, Save, CheckCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ProfilePreview from "@/components/demos/ProfilePreview";

export default async function DocsProfile() {
  const t = await getTranslations("profile");
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

      {/* ── Interactive preview ── */}
      <div className="mb-12">
        <ProfilePreview />
      </div>

      {/* --- Open profile --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("accessTitle")}</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
              <UserCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">{t("accessCardTitle")}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                {t("accessDesc")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- What you can change --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("editTitle")}</h2>
        <div className="grid gap-4">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
                <Palette className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("avatarTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t("avatarDesc")}{" "}
                  <strong className="text-white">{t("avatarStrong")}</strong> {t("avatarDesc2")}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["adventurer", "avataaars", "bottts", "fun-emoji", "identicon", "lorelei", "micah", "miniavs", "open-peeps", "personas", "pixel-art", "shapes", "thumbs"].map((style) => (
                    <span key={style} className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-500">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
                <Pencil className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("nameTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t("nameDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("emailTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t("emailDesc")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10 flex-shrink-0">
                <Globe className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t("langTitle")}</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {t("langDesc")}{" "}
                  <strong className="text-white">{t("langFr")}</strong> {t("langOr")}{" "}
                  <strong className="text-white">{t("langEn")}</strong>{t("langDesc2")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Save --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("saveTitle")}</h2>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <Save className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-2">{t("saveCardTitle")}</h3>
                <p className="text-sm text-neutral-400">
                  {t("saveDesc")}
                  <strong className="text-white"> {t("saveButton")}</strong> {t("saveDesc2")}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-2">{t("langAutoSaveTitle")}</h3>
                <p className="text-sm text-neutral-400">
                  {t("langAutoSaveDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
