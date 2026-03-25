import { ArrowRight, Database, Table, GitBranch } from "lucide-react";
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

export default async function DocsDatabase() {
  const t = await getTranslations("database");
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
          {t("description")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">prisma/schema.prisma</code> {t("description2")}
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("modelsTitle")}</h2>
        <div className="grid gap-4">
          {[
            {
              name: "User",
              color: "blue",
              desc: t("userDesc"),
              fields: [
                { name: "id", type: "String", note: t("userIdNote") },
                { name: "name", type: "String?", note: t("userNameNote") },
                { name: "email", type: "String", note: t("userEmailNote") },
                { name: "emailVerified", type: "Boolean", note: "" },
                { name: "image", type: "String?", note: t("userImageNote") },
                { name: "createdAt", type: "DateTime", note: "" },
                { name: "updatedAt", type: "DateTime", note: "" },
              ],
            },
            {
              name: "Session",
              color: "purple",
              desc: t("sessionDesc"),
              fields: [
                { name: "id", type: "String", note: "CUID" },
                { name: "token", type: "String", note: t("sessionTokenNote") },
                { name: "expiresAt", type: "DateTime", note: t("sessionExpiresNote") },
                { name: "ipAddress", type: "String?", note: t("sessionIpNote") },
                { name: "userAgent", type: "String?", note: t("sessionUaNote") },
                { name: "userId", type: "String", note: t("sessionUserIdNote") },
              ],
            },
            {
              name: "Account",
              color: "green",
              desc: t("accountDesc"),
              fields: [
                { name: "id", type: "String", note: "" },
                { name: "providerId", type: "String", note: t("accountProviderNote") },
                { name: "accountId", type: "String", note: "" },
                { name: "accessToken", type: "String?", note: "" },
                { name: "refreshToken", type: "String?", note: "" },
                { name: "userId", type: "String", note: t("accountUserIdNote") },
              ],
            },
            {
              name: "Verification",
              color: "yellow",
              desc: t("verificationDesc"),
              fields: [
                { name: "id", type: "String", note: "" },
                { name: "identifier", type: "String", note: t("verificationIdentifierNote") },
                { name: "value", type: "String", note: t("verificationValueNote") },
                { name: "expiresAt", type: "DateTime", note: t("verificationExpiresNote") },
              ],
            },
            {
              name: "DataPoint",
              color: "orange",
              desc: t("dataPointDesc"),
              fields: [
                { name: "id", type: "String", note: t("dataPointIdNote") },
                { name: "type", type: "DataType", note: t("dataPointTypeNote") },
                { name: "value", type: "String", note: t("dataPointValueNote") },
                { name: "createdAt", type: "DateTime", note: t("dataPointCreatedNote") },
              ],
            },
            {
              name: "Alert",
              color: "red",
              desc: t("alertDesc"),
              fields: [
                { name: "id", type: "String", note: t("alertIdNote") },
                { name: "type", type: "AlertType", note: t("alertTypeNote") },
                { name: "severity", type: "Severity", note: t("alertSeverityNote") },
                { name: "sensorType", type: "DataType", note: t("alertSensorTypeNote") },
                { name: "value", type: "Float", note: t("alertValueNote") },
                { name: "threshold", type: "Float?", note: t("alertThresholdNote") },
                { name: "message", type: "String", note: t("alertMessageNote") },
                { name: "suggestions", type: "String", note: t("alertSuggestionsNote") },
                { name: "read", type: "Boolean", note: t("alertReadNote") },
                { name: "resolvedAt", type: "DateTime?", note: t("alertResolvedNote") },
                { name: "createdAt", type: "DateTime", note: "" },
              ],
            },
          ].map((model) => (
            <div key={model.name} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className={`px-6 py-4 bg-${model.color}-500/5 border-b border-white/5 flex items-center gap-3`}>
                <Table className={`w-4 h-4 text-${model.color}-400`} />
                <h3 className="font-semibold">{model.name}</h3>
                <span className="text-sm text-neutral-500">{model.desc}</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-sm min-w-[360px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-2 pr-4 text-neutral-500 font-medium">{t("tableFieldHeader")}</th>
                      <th className="text-left py-2 pr-4 text-neutral-500 font-medium">{t("tableTypeHeader")}</th>
                      <th className="text-left py-2 text-neutral-500 font-medium">{t("tableNotesHeader")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {model.fields.map((field) => (
                      <tr key={field.name} className="border-b border-white/5 last:border-0">
                        <td className="py-2 pr-4">
                          <code className="text-green-400">{field.name}</code>
                        </td>
                        <td className="py-2 pr-4">
                          <code className="text-blue-400 text-xs">{field.type}</code>
                        </td>
                        <td className="py-2 text-neutral-500 text-xs">{field.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Nouveaux modèles --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("newModelsTitle")}</h2>
        <div className="grid gap-4">
          {[
            {
              name: "SystemThreshold",
              color: "orange",
              desc: t("systemThresholdDesc"),
              fields: [
                { name: "id", type: "String", note: "CUID" },
                { name: "sensorType", type: "DataType", note: t("dataPointTypeNote") },
                { name: "highValue", type: "Float?", note: t("systemThresholdHighValueNote") },
                { name: "highSeverity", type: "Severity?", note: t("systemThresholdHighSeverityNote") },
                { name: "lowValue", type: "Float?", note: t("systemThresholdLowValueNote") },
                { name: "lowSeverity", type: "Severity?", note: t("systemThresholdLowSeverityNote") },
                { name: "updatedAt", type: "DateTime", note: "" },
              ],
            },
            {
              name: "SensorPreference",
              color: "purple",
              desc: t("sensorPreferenceDesc"),
              fields: [
                { name: "id", type: "String", note: "CUID" },
                { name: "sensorType", type: "DataType", note: t("dataPointTypeNote") },
                { name: "enabled", type: "Boolean", note: t("sensorPrefEnabledNote") },
                { name: "minSeverity", type: "Severity", note: t("sensorPrefMinSeverityNote") },
                { name: "updatedAt", type: "DateTime", note: "" },
              ],
            },
            {
              name: "NotificationSettings",
              color: "blue",
              desc: t("notificationSettingsDesc"),
              fields: [
                { name: "id", type: "String", note: t("notifSettingsIdNote") },
                { name: "quietStart", type: "Int?", note: t("notifSettingsQuietStartNote") },
                { name: "quietEnd", type: "Int?", note: t("notifSettingsQuietEndNote") },
                { name: "updatedAt", type: "DateTime", note: "" },
              ],
            },
          ].map((model) => (
            <div key={model.name} className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
              <div className={`px-6 py-4 bg-${model.color}-500/5 border-b border-white/5 flex items-center gap-3`}>
                <Table className={`w-4 h-4 text-${model.color}-400`} />
                <h3 className="font-semibold">{model.name}</h3>
                <span className="text-sm text-neutral-500">{model.desc}</span>
              </div>
              <div className="p-4 overflow-x-auto">
                <table className="w-full text-sm min-w-[360px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-2 pr-4 text-neutral-500 font-medium">{t("tableFieldHeader")}</th>
                      <th className="text-left py-2 pr-4 text-neutral-500 font-medium">{t("tableTypeHeader")}</th>
                      <th className="text-left py-2 text-neutral-500 font-medium">{t("tableNotesHeader")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {model.fields.map((field) => (
                      <tr key={field.name} className="border-b border-white/5 last:border-0">
                        <td className="py-2 pr-4">
                          <code className="text-green-400">{field.name}</code>
                        </td>
                        <td className="py-2 pr-4">
                          <code className="text-blue-400 text-xs">{field.type}</code>
                        </td>
                        <td className="py-2 text-neutral-500 text-xs">{field.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <CodeBlock title="prisma/schema.prisma — nouveaux modèles">{`model SystemThreshold {
  id           String    @id @default(cuid())
  sensorType   DataType  @unique
  highValue    Float?
  highSeverity Severity?
  lowValue     Float?
  lowSeverity  Severity?
  updatedAt    DateTime  @updatedAt
}

model SensorPreference {
  id          String   @id @default(cuid())
  sensorType  DataType @unique
  enabled     Boolean  @default(true)
  minSeverity Severity @default(WARNING)
  updatedAt   DateTime @updatedAt
}

model NotificationSettings {
  id         String   @id @default("default")
  quietStart Int?
  quietEnd   Int?
  updatedAt  DateTime @updatedAt
}`}</CodeBlock>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("enumsTitle")}</h2>
        <div className="grid gap-4">
          <CodeBlock title="DataType">{`enum DataType {
  TEMPERATURE
  HUMIDITY
  PRESSURE
  CO2
  LIGHT
}`}</CodeBlock>
          <CodeBlock title="AlertType">{`enum AlertType {
  THRESHOLD_HIGH   // Seuil haut dépassé
  THRESHOLD_LOW    // Seuil bas dépassé
  SUDDEN_CHANGE    // Variation brutale (± 25% de la moyenne glissante)
}`}</CodeBlock>
          <CodeBlock title="Severity">{`enum Severity {
  WARNING   // Attention — légèrement hors norme
  HIGH      // Problème — significativement hors norme
  CRITICAL  // Urgent — valeur dangereuse
}`}</CodeBlock>
        </div>
        <div className="mt-4 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <p className="text-sm text-orange-200/70">
            <strong className="text-orange-300">{t("enumNote")}</strong> {t("enumDesc")} <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">value</code> {t("enumDesc2")}
            <strong>{t("enumDesc3")}</strong> {t("enumDesc4")}{" "}
            <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">parseFloat()</code> {t("enumDesc5")}
            <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">suggestions</code> {t("enumDesc6")}
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("prismaCommandsTitle")}</h2>
        <div className="grid gap-3">
          {[
            { cmd: "npx prisma db push", desc: t("prismaCmd1Desc") },
            { cmd: "npx prisma migrate dev", desc: t("prismaCmd2Desc") },
            { cmd: "npx prisma studio", desc: t("prismaCmd3Desc") },
            { cmd: "npx tsx prisma/seedFakeData.ts", desc: t("prismaCmd4Desc") },
            { cmd: "npx tsx prisma/clearData.ts", desc: t("prismaCmd5Desc") },
          ].map((item) => (
            <div
              key={item.cmd}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <code className="text-sm text-green-400">{item.cmd}</code>
              <span className="text-sm text-neutral-500 hidden sm:block">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
            <GitBranch className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-2">{t("repositoryTitle")}</h3>
            <p className="text-sm text-neutral-400 mb-3">
              {t("repositoryDesc")}{" "}
              <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">UsecaseResult&lt;T&gt;</code> {t("repositoryDesc2")}
            </p>
            <CodeBlock title="Exemple">{`// features/datapoint/repository/dataPointRepository.ts
export const dataPointRepository = {
  findLatestByType: (type: DataType) =>
    prisma.dataPoint.findMany({ where: { type }, orderBy: { createdAt: 'desc' }, take: 20 }),

  create: (type: DataType, value: string) =>
    prisma.dataPoint.create({ data: { type, value } }),
};

// Retour usecase
type UsecaseResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
