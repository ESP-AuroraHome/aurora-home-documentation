import { ArrowRight, CheckCircle2, AlertCircle, Terminal } from "lucide-react";
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

function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pl-12 pb-8 border-l border-white/10 last:border-0 last:pb-0">
      <div className="absolute left-0 -translate-x-1/2 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-mono">
        {number}
      </div>
      <h3 className="font-semibold mb-3 text-lg">{title}</h3>
      <div className="space-y-4 text-neutral-400">{children}</div>
    </div>
  );
}

export default async function DocsInstallation() {
  const t = await getTranslations("installation");
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
        <h2 className="text-2xl font-bold mb-6">{t("prereqTitle")}</h2>
        <div className="grid gap-3">
          {[
            { name: t("nodejs"), version: t("nodejsVersion"), required: true },
            { name: t("git"), version: t("gitVersion"), required: true },
            { name: t("mqttBroker"), version: t("mqttBrokerVersion"), required: true },
            { name: t("npmOrPnpm"), version: t("npmOrPnpmVersion"), required: true },
            { name: t("prismaCli"), version: t("prismaCliVersion"), required: false },
          ].map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-3">
                {item.required ? (
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                )}
                <span className="font-medium">{item.name}</span>
              </div>
              <span className="text-sm text-neutral-500">{item.version}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">{t("stepsTitle")}</h2>

        <div className="space-y-2">
          <Step number={1} title={t("step1Title")}>
            <p>{t("step1Desc")}</p>
            <CodeBlock title="Terminal">{`git clone https://github.com/antoinegourgue/aurora-home-app.git
cd aurora-home-app`}</CodeBlock>
          </Step>

          <Step number={2} title={t("step2Title")}>
            <p>{t("step2Desc")}</p>
            <CodeBlock title="Terminal">{`npm install`}</CodeBlock>
          </Step>

          <Step number={3} title={t("step3Title")}>
            <p>{t("step3Desc")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">.env</code> {t("step3Desc2")}</p>
            <CodeBlock title=".env">{`# Base de données SQLite
DATABASE_URL="file:./dev.db"

# Better Auth — générer avec: openssl rand -hex 32
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:3000"

# Broker MQTT (IP de l'Orange Pi ou du broker)
MQTT_BROKER_URL="mqtt://192.168.4.2:1883"
MQTT_TOPICS="sensor/data"

# Afficheur I2C OTP (optionnel — pour OrangePi 3 LTS)
DISPLAY_OTP_ENABLED="false"
DISPLAY_OTP_I2C_BUS="0"
DISPLAY_OTP_I2C_ADDRESS="0x3C"
DISPLAY_OTP_DEV_MODE="true"`}</CodeBlock>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="flex items-start gap-3">
                <Terminal className="w-4 h-4 text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="text-blue-300 font-medium">{t("devModeTitle")}</p>
                  <p className="text-blue-200/70">
                    {t("devModeDesc")} <code className="px-1.5 py-0.5 bg-blue-500/20 rounded">DISPLAY_OTP_DEV_MODE=true</code>{t("devModeDesc2")}
                  </p>
                </div>
              </div>
            </div>
          </Step>

          <Step number={4} title={t("step4Title")}>
            <p>{t("step4Desc")}</p>
            <CodeBlock title="Terminal">{`npx prisma db push`}</CodeBlock>
            <p>{t("step4Optional")}</p>
            <CodeBlock title="Terminal">{`npx tsx prisma/seedFakeData.ts`}</CodeBlock>
          </Step>

          <Step number={5} title={t("step5Title")}>
            <p>{t("step5Desc")}</p>
            <CodeBlock title="Terminal">{`npm run dev`}</CodeBlock>
            <p>
              {t("step5Accessible")}{" "}
              <code className="px-2 py-1 bg-white/5 rounded text-green-400">
                http://localhost:3000
              </code>
            </p>
          </Step>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">{t("commandsTitle")}</h2>
        <div className="grid gap-3">
          {[
            { cmd: "npm run dev", desc: t("cmdDevDesc") },
            { cmd: "npm run build", desc: t("cmdBuildDesc") },
            { cmd: "npm start", desc: t("cmdStartDesc") },
            { cmd: "npm run lint", desc: t("cmdLintDesc") },
            { cmd: "npm run format", desc: t("cmdFormatDesc") },
            { cmd: "npm run test", desc: t("cmdTestDesc") },
            { cmd: "npx prisma studio", desc: t("cmdPrismaDesc") },
          ].map((item) => (
            <div
              key={item.cmd}
              className="flex items-center justify-between p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <code className="text-sm text-green-400">{item.cmd}</code>
              <span className="text-sm text-neutral-500">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20">
        <h3 className="font-semibold text-green-400 mb-3 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          {t("verificationTitle")}
        </h3>
        <p className="text-sm text-neutral-400 mb-4">
          {t("verificationDesc")} <code className="px-2 py-1 bg-white/5 rounded text-green-400">http://localhost:3000</code>.
          {t("verificationDesc2")}
        </p>
      </div>
    </div>
  );
}
