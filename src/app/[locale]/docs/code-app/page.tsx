import { getTranslations } from "next-intl/server";
import { ArrowRight, Code, FileCode, TestTube, Layers, GitBranch, Zap } from "lucide-react";
import { TreeView, type TreeItem } from "@/components/TreeView";

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

const appTree: TreeItem[] = [
  {
    name: "aurora-home-app",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        comment: "Next.js App Router",
        children: [
          {
            name: "api",
            type: "folder",
            children: [
              { name: "auth", type: "folder", children: [{ name: "[...all]", type: "folder", comment: "Better Auth catch-all" }] },
              { name: "sensor-stream", type: "folder", comment: "SSE temps réel" },
              { name: "locale", type: "folder", comment: "Préférence langue" },
            ],
          },
          {
            name: "(connected)",
            type: "folder",
            comment: "Routes protégées",
            children: [
              { name: "layout.tsx", type: "file", comment: "Vérification session" },
              { name: "page.tsx", type: "file", comment: "Dashboard principal" },
            ],
          },
          {
            name: "auth",
            type: "folder",
            children: [
              { name: "login", type: "folder" },
              { name: "otp", type: "folder" },
            ],
          },
          { name: "profile", type: "folder" },
          { name: "docs", type: "folder" },
        ],
      },
      {
        name: "features",
        type: "folder",
        comment: "Modules fonctionnels (Domain-Driven)",
        children: [
          {
            name: "auth",
            type: "folder",
            children: [
              { name: "components", type: "folder", comment: "LoginForm, OtpForm" },
              { name: "usecase", type: "folder", comment: "login, signInOtp, signOut" },
              { name: "repository", type: "folder", comment: "sessionRepository" },
            ],
          },
          {
            name: "datapoint",
            type: "folder",
            children: [
              { name: "components", type: "folder", comment: "ChartDatapoint, DatapointItem, DashboardDatapoints" },
              { name: "usecase", type: "folder", comment: "getInitialDataPoints" },
              { name: "repository", type: "folder", comment: "dataPointRepository" },
              { name: "utils", type: "folder", comment: "calculateChartDomain, toDataPoints" },
            ],
          },
          {
            name: "profile",
            type: "folder",
            children: [
              { name: "components", type: "folder", comment: "ProfileCard, AvatarSelector, EditableFields, SignOutButton" },
              { name: "hooks", type: "folder", comment: "useProfileSubmit" },
              { name: "repository", type: "folder", comment: "userRepository" },
              { name: "usecase", type: "folder", comment: "getUserProfile, updateUserProfile" },
              { name: "utils", type: "folder", comment: "profileSchema (Zod)" },
            ],
          },
        ],
      },
      {
        name: "lib",
        type: "folder",
        comment: "Utilitaires partagés",
        children: [
          { name: "auth.ts", type: "file", comment: "Config Better Auth" },
          { name: "auth-client.ts", type: "file", comment: "Méthodes client" },
          { name: "mqtt-client.ts", type: "file", comment: "Client MQTT + parsing" },
          { name: "sensor-emitter.ts", type: "file", comment: "EventEmitter interne" },
          { name: "prisma.ts", type: "file", comment: "Client Prisma singleton" },
          { name: "otp-display.ts", type: "file", comment: "Affichage OTP sur I2C / terminal" },
          { name: "usecase.ts", type: "file", comment: "HOF wrapper usecase" },
          { name: "utils.ts", type: "file", comment: "Helpers (cn, etc.)" },
        ],
      },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "ui", type: "folder", comment: "shadcn/ui (Radix UI)" },
          { name: "specific", type: "folder", comment: "Composants métier (ButtonForm, etc.)" },
        ],
      },
      {
        name: "hooks",
        type: "folder",
        children: [
          { name: "useAnimatedValue.ts", type: "file", comment: "Animation numérique easeOutCubic" },
          { name: "useSensorData.ts", type: "file", comment: "Hook SSE temps réel" },
        ],
      },
      {
        name: "messages",
        type: "folder",
        children: [
          { name: "fr.json", type: "file", comment: "Traductions françaises" },
          { name: "en.json", type: "file", comment: "Traductions anglaises" },
        ],
      },
      {
        name: "prisma",
        type: "folder",
        children: [
          { name: "schema.prisma", type: "file", comment: "Schéma base de données" },
          { name: "seedFakeData.ts", type: "file", comment: "Données de test Faker.js" },
          { name: "clearData.ts", type: "file", comment: "Vider toutes les tables" },
        ],
      },
    ],
  },
];

export default async function DocsCodeApp() {
  const t = await getTranslations("codeApp");

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
          {t("description")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">aurora-home-app</code>.
        </p>
      </div>

      {/* --- Stack --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("stackTitle")}</h2>
        <div className="grid gap-3">
          {[
            { name: "Next.js 15", descKey: "next15Desc" },
            { name: "React 19", descKey: "react19Desc" },
            { name: "TypeScript 5", descKey: "ts5Desc" },
            { name: "Tailwind CSS v4", descKey: "tailwindDesc" },
            { name: "Better Auth", descKey: "betterAuthDesc" },
            { name: "Prisma + SQLite", descKey: "prismaDesc" },
            { name: "next-intl", descKey: "nextIntlDesc" },
            { name: "Biome", descKey: "biomeDesc" },
            { name: "Vitest", descKey: "vitestDesc" },
            { name: "Recharts", descKey: "rechartsDesc" },
            { name: "shadcn/ui + Radix UI", descKey: "shadcnDesc" },
            { name: "react-hook-form + Zod", descKey: "rhfDesc" },
            { name: "@dicebear/collection", descKey: "dicebearDesc" },
          ].map(({ name, descKey }) => (
            <div
              key={name}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <code className="text-sm text-green-400 min-w-[160px]">{name}</code>
              <span className="text-sm text-neutral-500">{t(descKey)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- Structure --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("folderStructureTitle")}</h2>
        <TreeView items={appTree} title="aurora-home-app/" />
      </div>

      {/* --- Naming --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("namingTitle")}</h2>
        <div className="grid gap-4">
          {[
            {
              icon: FileCode,
              color: "blue",
              titleKey: "filesTitle",
              rule: "kebab-case",
              examples: ["mqtt-client.ts", "sensor-emitter.ts", "datapoint-item.tsx", "use-sensor-data.ts"],
            },
            {
              icon: Code,
              color: "purple",
              titleKey: "componentsTitle",
              rule: "PascalCase",
              examples: ["ChartDatapoint.tsx", "LoginForm.tsx", "ProfileSheet.tsx", "AvatarSelector.tsx"],
            },
            {
              icon: Code,
              color: "green",
              titleKey: "functionsTitle",
              rule: "camelCase",
              examples: ["parseNumericValue()", "getInitialDataPoints()", "sensorEmitter", "toDataPoints()"],
            },
          ].map((item) => (
            <div key={item.titleKey} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-${item.color}-500/10`}>
                  <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                </div>
                <div>
                  <span className="font-medium">{t(item.titleKey)}</span>
                  <code className={`ml-2 text-xs px-2 py-0.5 rounded bg-${item.color}-500/10 text-${item.color}-400`}>
                    {item.rule}
                  </code>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {item.examples.map((ex) => (
                  <code key={ex} className="text-xs px-2 py-1 rounded bg-white/5 text-neutral-400">
                    {ex}
                  </code>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Pattern usecase --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("usecaseTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("usecaseDesc")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">usecase(fn)</code>{" "}
          {t("usecaseDesc2")} <code className="px-1.5 py-0.5 bg-white/5 rounded">lib/usecase.ts</code> {t("usecaseDesc3")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">UsecaseResult&lt;T&gt;</code>.
        </p>
        <CodeBlock title="lib/usecase.ts">{`export default function usecase<TArgs, TResult>(
  fn: (args: TArgs) => Promise<TResult>
) {
  return async (args: TArgs): Promise<UsecaseResult<TResult>> => {
    try {
      const data = await fn(args);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: String(error) };
    }
  };
}

type UsecaseResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };`}</CodeBlock>
        <div className="mt-4">
          <CodeBlock title="Utilisation — Server Action">{`"use server";
import usecase from "@/lib/usecase";

const getInitialDataPoints = usecase(async () => {
  return await dataPointRepository.findLatestAll();
});

// Côté composant
const result = await getInitialDataPoints({});
if (result.success) {
  console.log(result.data);  // typé
} else {
  console.error(result.error); // string
}`}</CodeBlock>
        </div>
        <p className="text-sm text-neutral-500 mt-3">
          {t("usecaseNote")} (<code className="px-1.5 py-0.5 bg-white/5 rounded">"use server"</code>).
          {t("usecaseNote2")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded">result.error</code>.
        </p>
      </div>

      {/* --- Pattern Repository --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("repositoryTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("repositoryDesc")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded">prisma.*</code> {t("repositoryDesc2")}
        </p>
        <CodeBlock title="features/datapoint/repository/dataPointRepository.ts">{`export const dataPointRepository = {
  findLatestByType: (type: DataType, take = 20) =>
    prisma.dataPoint.findMany({
      where: { type },
      orderBy: { createdAt: "desc" },
      take,
    }),

  findLatestAll: () =>
    Promise.all(
      DATA_TYPES.map((type) =>
        dataPointRepository.findLatestByType(type)
      )
    ),

  create: (type: DataType, value: string) =>
    prisma.dataPoint.create({ data: { type, value } }),
};`}</CodeBlock>
        <div className="mt-4">
          <CodeBlock title="features/profile/repository/userRepository.ts">{`export const userRepository = {
  findById: (id: string) =>
    prisma.user.findUnique({ where: { id } }),

  findByEmail: (email: string) =>
    prisma.user.findUnique({ where: { email } }),

  update: (id: string, data: Partial<User>) =>
    prisma.user.update({ where: { id }, data }),
};`}</CodeBlock>
        </div>
      </div>

      {/* --- Server vs Client --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("serverVsClientTitle")}</h2>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-semibold mb-3 text-green-300">{t("serverComponentsTitle")}</h3>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />{t("serverLi1")} <code className="px-1.5 py-0.5 bg-white/5 rounded">"use client"</code>)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />{t("serverLi2")} <code className="px-1.5 py-0.5 bg-white/5 rounded">auth.api.*</code>{t("serverLi2b")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />{t("serverLi3")} (<code className="px-1.5 py-0.5 bg-white/5 rounded">useState</code>, <code className="px-1.5 py-0.5 bg-white/5 rounded">useEffect</code>)</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-green-500/50" />{t("serverLi4")} <code className="px-1.5 py-0.5 bg-white/5 rounded">app/(connected)/page.tsx</code>, <code className="px-1.5 py-0.5 bg-white/5 rounded">ProfileSheetProvider</code></li>
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <h3 className="font-semibold mb-3 text-blue-300">{t("clientComponentsTitle")}</h3>
            <ul className="space-y-1.5 text-sm text-neutral-400">
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />{t("clientLi1")} <code className="px-1.5 py-0.5 bg-white/5 rounded">"use client"</code> {t("clientLi1b")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />{t("clientLi2")}</li>
              <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />{t("clientLi3")} <code className="px-1.5 py-0.5 bg-white/5 rounded">ChartDatapoint</code>, <code className="px-1.5 py-0.5 bg-white/5 rounded">LoginForm</code>, <code className="px-1.5 py-0.5 bg-white/5 rounded">ProfileCard</code>, <code className="px-1.5 py-0.5 bg-white/5 rounded">AvatarSelector</code></li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- parseNumericValue --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("datapointUtilsTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("datapointUtilsDesc")} (<code className="px-1.5 py-0.5 bg-white/5 rounded">"22.50 °C"</code>).
          {t("datapointUtilsDesc2")}
        </p>
        <div className="grid gap-4">
          <CodeBlock title="features/datapoint/utils/parseNumericValue.ts">{`// Extrait la partie numérique d'une chaîne "22.50 °C" → 22.50
export function parseNumericValue(value: string): number {
  const match = value.match(/^([\d.]+)/);
  return match ? parseFloat(match[1]) : 0;
}`}</CodeBlock>
          <CodeBlock title="features/datapoint/utils/toDataPoints.ts">{`// Convertit SerializedDataPoint (createdAt: string) → DataPoint (createdAt: Date)
// Utilisé dans DashboardDatapoints avant de passer aux cartes enfants
export function toDataPoints(serialized: SerializedDataPoint[]): DataPoint[] {
  return serialized.map((dp) => ({
    ...dp,
    createdAt: new Date(dp.createdAt),
  }));
}`}</CodeBlock>
          <CodeBlock title="features/datapoint/utils/calculateChartDomain.ts">{`// Domaine Y du graphique par type
// Paramètres : type DataType, values: number[]
// Retour : [min: number, max: number] | ["auto", "auto"]

TEMPERATURE : [Math.floor(min - margin), Math.ceil(max + margin)]
              Constante → [value - 2, value + 2]
              Défaut    → [0, 30]

HUMIDITY    : [Math.max(0, floor(min - margin)), Math.min(100, ceil(max + margin))]
              Constante → [value - 1, value + 1] clampé [0, 100]
              Défaut    → [0, 100]

PRESSURE    : [Math.min(950, floor(min - margin)), Math.max(1050, ceil(max + margin))]
              Constante → [value - 10, value + 10]
              Défaut    → [950, 1050]

CO2         : [Math.max(300, floor(min - margin)), ceil(max + margin)]
              Constante → [value - 1, value + 1]
              Défaut    → [300, 2000]

LIGHT       : [Math.max(0, floor(min - margin)), ceil(max + margin)]
              Constante → [value - 1, value + 1]
              Défaut    → [0, 1000]

// margin = (max - min) * 0.1  (10% de la plage)`}</CodeBlock>
        </div>
      </div>

      {/* --- Flux auth détaillé --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("authFlowTitle")}</h2>
        <CodeBlock title="features/auth/usecase/login.ts — Schéma Zod">{`const loginSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),  // Optionnel — prénom pour premier compte
});

// Comportement
// 1. authClient.emailOtp.sendVerificationOtp({ email, type: "sign-in" })
// 2. store.set("otp_email", email)        // Cookie session
// 3. store.set("otp_name", name)          // Cookie si prénom fourni
// 4. Redirige vers /auth/otp?type=sign-in`}</CodeBlock>

        <div className="mt-4">
          <CodeBlock title="features/auth/usecase/signInOtp.ts — Vérification OTP">{`// 1. Récupère email depuis cookie "otp_email"
// 2. auth.api.signInEmailOTP({ body: { email, otp } })
// 3. store.delete("otp_email") + store.delete("otp_name")
// 4. clearScreen()  — efface l'écran OTP I2C si actif

// Génération avatar automatique à la première connexion
if (!user.image) {
  updates.image = createAvatar(adventurer, {
    seed: user.email || user.id,   // seed déterministe
    size: 128,
  }).toDataUri();                  // data:image/svg+xml;base64,...
}

// Extraction du nom depuis l'email si non défini
// "jean.dupont@example.com" → "Jean"
const extractNameFromEmail = (email: string): string => {
  const beforeAt = email.split("@")[0];     // "jean.dupont"
  const name = beforeAt.split(".")[0];      // "jean"
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(); // "Jean"
};`}</CodeBlock>
        </div>
      </div>

      {/* --- updateUserProfile --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("updateProfileTitle")}</h2>
        <CodeBlock title="features/profile/usecase/updateUserProfile.ts — Schéma Zod">{`const updateProfileSchema = z.object({
  name:  z.string().min(1, "Le nom est requis"),
  email: z.string().email().min(1),
  image: z.union([
    z.string().refine(
      (val) =>
        val.trim().length === 0 ||
        val.startsWith("data:") ||    // data URI (DiceBear SVG)
        val.startsWith("http://") ||
        val.startsWith("https://"),
      { message: "URL valide ou data URI requis" }
    ),
    z.null(),
  ]).optional().nullable()
   .transform((val) => (val === "" || val === null ? null : val)),
});

// Vérifications côté serveur
// 1. auth.api.getSession({ headers }) → session requise
// 2. updateProfileSchema.parse(data) → validation
// 3. userRepository.findByEmail(email) → unicité email
// 4. userRepository.update(session.user.id, { name, email, image })`}</CodeBlock>
      </div>

      {/* --- Hooks --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("hooksTitle")}</h2>
        <div className="grid gap-4">
          <CodeBlock title="hooks/useAnimatedValue.ts">{`// Anime une valeur numérique vers une cible avec easeOutCubic
useAnimatedValue(targetValue: number, duration: number = 800): number

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

// Comportement
// - requestAnimationFrame — pas de setInterval
// - Anime depuis la valeur précédente vers targetValue
// - cancelAnimationFrame au unmount (cleanup)
// - Si from === to : aucune animation, retourne la valeur directement
// - Résultat : utiliser .toFixed(2) pour l'affichage`}</CodeBlock>

          <CodeBlock title="hooks/useSensorData.ts">{`const MAX_POINTS_PER_TYPE = 20;

// Signature
useSensorData(
  initialData: Record<DataType, SerializedDataPoint[]>
): Record<DataType, SerializedDataPoint[]>

// Connexion SSE
const es = new EventSource("/api/sensor-stream");

// Message type "sensor_update" reçu
es.onmessage = (event) => {
  const msg: SensorUpdate = JSON.parse(event.data);
  if (msg.type === "sensor_update") {
    setData((prev) => ({
      ...prev,
      [key]: [newPoint, ...prev[key]].slice(0, MAX_POINTS_PER_TYPE),
    }));
  }
};

// Reconnexion automatique sur erreur — délai 3000ms
es.onerror = () => {
  es.close();
  setTimeout(connect, 3000);
};

// Cleanup au unmount : es.close() + clearTimeout`}</CodeBlock>
        </div>
      </div>

      {/* --- OTP Display --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("otpDisplayTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("otpDisplayDesc")}
        </p>
        <div className="grid gap-3 mb-4">
          {[
            { var: "DISPLAY_OTP_DEV_MODE=true", descKey: "otpDevModeDesc" },
            { var: "DISPLAY_OTP_ENABLED=true", descKey: "otpHardwareDesc" },
          ].map((item) => (
            <div key={item.var} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 text-sm">
              <code className="text-orange-400 block mb-1">{item.var}</code>
              <span className="text-neutral-400">{t(item.descKey)}</span>
            </div>
          ))}
        </div>
        <CodeBlock title="Sortie console DISPLAY_OTP_DEV_MODE=true">{`╔════════════════════════════════════╗
║  AuroraHome                        ║
║  Auth. code :                      ║
║                                    ║
║             483921                 ║
║                                    ║
║  Exp: 5 min                        ║
╚════════════════════════════════════╝`}</CodeBlock>
      </div>

      {/* --- TypeScript --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("tsConfigTitle")}</h2>
        <p className="text-neutral-400 mb-4">
          {t("tsConfigDesc")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">strict</code> {t("tsConfigDesc2")}{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded">tsconfig.json</code> :
        </p>
        <CodeBlock title="tsconfig.json">{`{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,           // Active toutes les vérifications strictes
    "noEmit": true,           // Next.js gère la compilation — TS vérifie seulement
    "module": "esnext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "isolatedModules": true,  // Chaque fichier est un module indépendant
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "incremental": true,
    "paths": { "@/*": ["./*"] }  // Alias import @/
  }
}`}</CodeBlock>

        <div className="mt-6">
          <h3 className="font-semibold mb-4 text-neutral-200">{t("strictImposes")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">strict: true</code> {t("strictImposes2")}</h3>
          <div className="grid gap-3">
            {[
              {
                flag: "strictNullChecks",
                descKey: "strictNullChecksDesc",
                example: "const name: string = user.name ?? \"\"  // pas juste user.name",
              },
              {
                flag: "noImplicitAny",
                descKey: "noImplicitAnyDesc",
                example: "function fn(x: number) {}  // pas function fn(x) {}",
              },
              {
                flag: "strictFunctionTypes",
                descKey: "strictFunctionTypesDesc",
                example: "",
              },
              {
                flag: "strictPropertyInitialization",
                descKey: "strictPropertyInitDesc",
                example: "",
              },
              {
                flag: "noImplicitThis",
                descKey: "noImplicitThisDesc",
                example: "",
              },
              {
                flag: "alwaysStrict",
                descKey: "alwaysStrictDesc",
                example: "",
              },
            ].map((item) => (
              <div key={item.flag} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-3">
                  <code className="text-xs text-blue-400 min-w-[220px] pt-0.5">{item.flag}</code>
                  <div>
                    <p className="text-sm text-neutral-400">{t(item.descKey)}</p>
                    {item.example && (
                      <code className="text-xs text-neutral-600 mt-1 block">{item.example}</code>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-4 text-neutral-200">{t("tsStyleRulesTitle")}</h3>
          <div className="grid gap-3">
            {[
              {
                rule: "import type",
                descKey: "importTypeDesc",
                example: "import type { User } from \"@prisma/client\";",
              },
              {
                rule: "Pas de any explicite",
                descKey: "noAnyDesc",
                example: "// ❌ (data: any)  ✓ (data: unknown)",
              },
              {
                rule: "Types de retour implicites",
                descKey: "implicitReturnDesc",
                example: "",
              },
              {
                rule: "Alias @/*",
                descKey: "aliasDesc",
                example: "import usecase from \"@/lib/usecase\";",
              },
              {
                rule: "isolatedModules",
                descKey: "isolatedModulesDesc",
                example: "",
              },
            ].map((item) => (
              <div key={item.rule} className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                <div className="flex items-start gap-3">
                  <code className="text-xs text-green-400 min-w-[180px] pt-0.5">{item.rule}</code>
                  <div>
                    <p className="text-sm text-neutral-400">{t(item.descKey)}</p>
                    {item.example && (
                      <code className="text-xs text-neutral-600 mt-1 block">{item.example}</code>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Tests et qualité --- */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
            <TestTube className="w-5 h-5 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold mb-2">{t("testsTitle")}</h3>
            <p className="text-sm text-neutral-400 mb-4">
              {t("testsDesc")} {t("testsDesc2")}
            </p>
            <CodeBlock>{`# Vérifier le code (lint + format)
npx biome check .

# Corriger automatiquement
npx biome check --write .

# Lancer les tests
npm run test

# Tests en mode watch
npm run test:watch`}</CodeBlock>
          </div>
        </div>
      </div>
    </div>
  );
}
