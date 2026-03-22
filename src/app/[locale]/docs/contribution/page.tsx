import { ArrowRight, GitBranch, CheckCircle2, Terminal, Package } from "lucide-react";
import { getTranslations } from "next-intl/server";

const ORG = "ESP-AuroraHome";
const REPOS = ["aurora-home-app", "aurora-home-esp32", "aurora-home-orange-pi", "aurora-home-marketing", "aurora-home-documentation"];

type Contributor = {
  login: string;
  name: string;
  avatar: string;
  url: string;
  bio: string | null;
  repos: { name: string; count: number }[];
};

async function fetchContributors(): Promise<Contributor[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

  const repoContributors = await Promise.all(
    REPOS.map(async (repo) => {
      const res = await fetch(
        `https://api.github.com/repos/${ORG}/${repo}/contributors?per_page=100`,
        { headers, next: { revalidate: 3600 } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      return (data as { login: string; contributions: number }[]).map((c) => ({
        repo,
        login: c.login,
        count: c.contributions,
      }));
    })
  );

  const map = new Map<string, { repos: { name: string; count: number }[] }>();
  for (const entries of repoContributors) {
    for (const entry of entries) {
      if (!map.has(entry.login)) map.set(entry.login, { repos: [] });
      map.get(entry.login)!.repos.push({ name: entry.repo, count: entry.count });
    }
  }

  const contributors = await Promise.all(
    Array.from(map.entries()).map(async ([login, data]) => {
      const res = await fetch(`https://api.github.com/users/${login}`, {
        headers,
        next: { revalidate: 3600 },
      });
      const user = res.ok ? await res.json() : {};
      return {
        login,
        name: (user.name as string) || login,
        avatar: (user.avatar_url as string) || `https://avatars.githubusercontent.com/${login}`,
        url: `https://github.com/${login}`,
        bio: (user.bio as string | null) || null,
        repos: data.repos,
      } satisfies Contributor;
    })
  );

  return contributors.sort(
    (a, b) =>
      b.repos.reduce((s, r) => s + r.count, 0) -
      a.repos.reduce((s, r) => s + r.count, 0)
  );
}

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

export default async function DocsContribution() {
  const [contributors, t] = await Promise.all([
    fetchContributors(),
    getTranslations("contribution"),
  ]);

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
        <p className="text-xl text-neutral-400 leading-relaxed">{t("description")}</p>
      </div>

      <div className="mb-12 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">{t("twoReposTitle")}</h3>
            <p className="text-sm text-blue-800/70 dark:text-blue-200/70">
              {t("twoReposDesc")}{" "}
              <code className="px-1.5 py-0.5 bg-blue-500/20 rounded text-blue-900 dark:text-blue-200">aurora-home-app</code>{" "}
              {t("twoReposDesc2")}{" "}
              <code className="px-1.5 py-0.5 bg-blue-500/20 rounded text-blue-900 dark:text-blue-200">aurora-home-esp32</code>{" "}
              {t("twoReposDesc3")}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">{t("workflowTitle")}</h2>
        <div className="space-y-2">
          <Step number={1} title={t("step1Title")}>
            <p>{t("step1Desc")}</p>
            <CodeBlock title="Terminal">{`git clone https://github.com/VOTRE_USERNAME/aurora-home-app.git
cd aurora-home-app`}</CodeBlock>
          </Step>

          <Step number={2} title={t("step2Title")}>
            <p>{t("step2Desc")} <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">main</code> {t("step2Desc2")}</p>
            <CodeBlock title="Terminal">{`git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/correction-bug
git checkout -b docs/mise-a-jour-doc`}</CodeBlock>
          </Step>

          <Step number={3} title={t("step3Title")}>
            <p>{t("step3Desc")}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{t("step3Li1")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{t("step3Li2")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{t("step3Li3")} <code className="px-1.5 py-0.5 bg-white/5 rounded">any</code> {t("step3Li3b")}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>{t("step3Li4")}</span>
              </li>
            </ul>
          </Step>

          <Step number={4} title={t("step4Title")}>
            <p>{t("step4Desc")}</p>
            <CodeBlock title="aurora-home-app">{`# Linting + formatting
npx biome check .

# Tests unitaires
npm run test

# Build de vérification
npm run build`}</CodeBlock>
            <CodeBlock title="aurora-home-esp32">{`# Compilation PlatformIO
platformio run -e esp32dev`}</CodeBlock>
          </Step>

          <Step number={5} title={t("step5Title")}>
            <p>{t("step5Desc")}</p>
            <CodeBlock title="Terminal">{`git add .
git commit -m "feat: description courte de la fonctionnalité"
git push origin feature/ma-fonctionnalite`}</CodeBlock>
            <p>{t("step5DescribeTitle")}</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                {t("step5Li1")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                {t("step5Li2")}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                {t("step5Li3")}
              </li>
            </ul>
          </Step>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t("contributorsTitle")}</h2>
        <p className="text-neutral-400 mb-6">
          {t("contributorsDesc")}{" "}
          <a
            href="https://github.com/ESP-AuroraHome"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ESP-AuroraHome
          </a>{" "}
          {t("contributorsDesc2")}
        </p>

        <div className="grid gap-4">
          {contributors.map((contributor) => (
            <a
              key={contributor.login}
              href={contributor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all group"
            >
              <img
                src={contributor.avatar}
                alt={contributor.name}
                className="w-12 h-12 rounded-full flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                    {contributor.name}
                  </span>
                  <span className="text-xs text-neutral-500">@{contributor.login}</span>
                </div>
                {contributor.bio && (
                  <p className="text-xs text-neutral-500 mb-2 truncate">{contributor.bio}</p>
                )}
                <div className="flex flex-wrap gap-2">
                  {contributor.repos.map((r) => (
                    <span
                      key={r.name}
                      className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400"
                    >
                      {r.name}
                      <span className="ml-1.5 text-neutral-600">{r.count} {t("commitsLabel")}</span>
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10">
            <Terminal className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-4">{t("devSetupTitle")}</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-400 mb-2 font-medium">{t("devSetupAppLabel")}</p>
                <CodeBlock>{`npm install
npx prisma db push
npm run dev  # http://localhost:3000`}</CodeBlock>
              </div>
              <div>
                <p className="text-sm text-neutral-400 mb-2 font-medium">{t("devSetupEsp32Label")}</p>
                <CodeBlock>{`# Ouvrir platformio_IDE/ dans VS Code avec l'extension PlatformIO
# Build : Ctrl+Alt+B
# Upload : Ctrl+Alt+U
# Monitor : Ctrl+Alt+S`}</CodeBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
