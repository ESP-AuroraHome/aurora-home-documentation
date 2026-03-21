import { ArrowRight, GitBranch, CheckCircle2, Terminal, Package, Users } from "lucide-react";

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

export default function DocsContribution() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Pour les développeurs</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Contribuer</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Contribuer au projet</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Guide pour contribuer à Aurora Home — que ce soit sur l'application web Next.js ou le
          firmware ESP32.
        </p>
      </div>

      <div className="mb-12 p-6 rounded-xl bg-blue-500/5 border border-blue-500/20">
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Deux dépôts indépendants</h3>
            <p className="text-sm text-blue-800/70 dark:text-blue-200/70">
              Le projet Aurora Home est composé de deux dépôts Git séparés :{" "}
              <code className="px-1.5 py-0.5 bg-blue-500/20 rounded text-blue-900 dark:text-blue-200">aurora-home-app</code> (application
              Next.js) et{" "}
              <code className="px-1.5 py-0.5 bg-blue-500/20 rounded text-blue-900 dark:text-blue-200">aurora-home-esp32</code> (firmware
              PlatformIO). Les contributions peuvent cibler l'un ou l'autre indépendamment.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Workflow de contribution</h2>
        <div className="space-y-2">
          <Step number={1} title="Forker le dépôt">
            <p>
              Forkez le dépôt correspondant sur GitHub depuis votre compte.
            </p>
            <CodeBlock title="Terminal">{`git clone https://github.com/VOTRE_USERNAME/aurora-home-app.git
cd aurora-home-app`}</CodeBlock>
          </Step>

          <Step number={2} title="Créer une branche feature">
            <p>Créez une branche avec un nom descriptif depuis <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">main</code> :</p>
            <CodeBlock title="Terminal">{`git checkout -b feature/ma-fonctionnalite
# ou
git checkout -b fix/correction-bug
git checkout -b docs/mise-a-jour-doc`}</CodeBlock>
          </Step>

          <Step number={3} title="Développer en respectant les conventions">
            <p>Suivez les conventions de code du projet :</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>App Next.js : Biome pour le linting, kebab-case fichiers, PascalCase composants</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Firmware ESP32 : snake_case fonctions, UPPER_SNAKE_CASE constantes</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>TypeScript strict — pas de <code className="px-1.5 py-0.5 bg-white/5 rounded">any</code> explicite</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Logique métier dans des usecases — pas directement dans les Server Actions</span>
              </li>
            </ul>
          </Step>

          <Step number={4} title="Vérifier le code">
            <p>Avant de soumettre, vérifiez que le code passe toutes les validations :</p>
            <CodeBlock title="aurora-home-app">{`# Linting + formatting
npx biome check .

# Tests unitaires
npm run test

# Build de vérification
npm run build`}</CodeBlock>
            <CodeBlock title="aurora-home-esp32">{`# Compilation PlatformIO
platformio run -e esp32dev`}</CodeBlock>
          </Step>

          <Step number={5} title="Créer une Pull Request">
            <p>Poussez votre branche et ouvrez une PR sur GitHub :</p>
            <CodeBlock title="Terminal">{`git add .
git commit -m "feat: description courte de la fonctionnalité"
git push origin feature/ma-fonctionnalite`}</CodeBlock>
            <p>Dans la PR, décrivez :</p>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                Le problème résolu ou la fonctionnalité ajoutée
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                Les tests effectués
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-500" />
                Screenshots si changement visuel (App)
              </li>
            </ul>
          </Step>
        </div>
      </div>

      {/* --- Contributeurs --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Contributeurs</h2>
        <p className="text-neutral-400 mb-6">
          Personnes ayant contribué aux dépôts de l'organisation{" "}
          <a
            href="https://github.com/ESP-AuroraHome"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ESP-AuroraHome
          </a>{" "}
          sur GitHub.
        </p>

        <div className="grid gap-4">
          {[
            {
              login: "antoine-gourgue",
              name: "Antoine Gourgue",
              avatar: "https://avatars.githubusercontent.com/u/140335280?v=4",
              url: "https://github.com/antoine-gourgue",
              bio: "MSc2 - Epitech Rennes (promo 2026)",
              repos: [{ name: "aurora-home-app", count: 30 }],
            },
            {
              login: "Le22",
              name: "Louis-Étienne Girard",
              avatar: "https://avatars.githubusercontent.com/u/58168080?v=4",
              url: "https://github.com/Le22",
              bio: "Développeur full stack · TypeScript, React, Next.js, Node.js",
              repos: [{ name: "aurora-home-app", count: 9 }],
            },
            {
              login: "nathanCahgn",
              name: "nathanCahgn",
              avatar: "https://avatars.githubusercontent.com/u/101811360?v=4",
              url: "https://github.com/nathanCahgn",
              bio: null,
              repos: [{ name: "aurora-home-app", count: 7 }],
            },
            {
              login: "MarinCvl",
              name: "Marin.cvl",
              avatar: "https://avatars.githubusercontent.com/u/123023057?v=4",
              url: "https://github.com/MarinCvl",
              bio: null,
              repos: [{ name: "aurora-home-esp32", count: 7 }],
            },
            {
              login: "Doctormacfreeze",
              name: "Macfreeze",
              avatar: "https://avatars.githubusercontent.com/u/211643243?v=4",
              url: "https://github.com/Doctormacfreeze",
              bio: null,
              repos: [
                { name: "aurora-home-orange-pi", count: 1 },
                { name: "aurora-home-marketing", count: 1 },
              ],
            },
          ].map((contributor) => (
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
                      <span className="ml-1.5 text-neutral-600">{r.count} commits</span>
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
            <h3 className="font-semibold mb-4">Setup environnement de développement</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral-400 mb-2 font-medium">aurora-home-app</p>
                <CodeBlock>{`npm install
npx prisma db push
npm run dev  # http://localhost:3000`}</CodeBlock>
              </div>
              <div>
                <p className="text-sm text-neutral-400 mb-2 font-medium">aurora-home-esp32</p>
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
