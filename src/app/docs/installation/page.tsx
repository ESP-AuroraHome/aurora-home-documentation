import { ArrowRight, CheckCircle2, AlertCircle, Terminal } from "lucide-react";

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

export default function DocsInstallation() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Pour commencer</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Installation App</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Installation de l'application</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Guide complet pour installer et configurer l'application web Aurora Home sur votre machine.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Prérequis</h2>
        <div className="grid gap-3">
          {[
            { name: "Node.js", version: "18 ou supérieur", required: true },
            { name: "Git", version: "Dernière version", required: true },
            { name: "Un broker MQTT", version: "Mosquitto recommandé", required: true },
            { name: "npm ou pnpm", version: "Gestionnaire de paquets", required: true },
            { name: "Prisma CLI", version: "Inclus dans les dépendances", required: false },
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
        <h2 className="text-2xl font-bold mb-8">Étapes d'installation</h2>

        <div className="space-y-2">
          <Step number={1} title="Cloner le dépôt">
            <p>Clonez le projet depuis GitHub :</p>
            <CodeBlock title="Terminal">{`git clone https://github.com/antoinegourgue/aurora-home-app.git
cd aurora-home-app`}</CodeBlock>
          </Step>

          <Step number={2} title="Installer les dépendances">
            <p>Installez toutes les dépendances Node.js :</p>
            <CodeBlock title="Terminal">{`npm install`}</CodeBlock>
          </Step>

          <Step number={3} title="Configurer les variables d'environnement">
            <p>Créez un fichier <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">.env</code> à la racine du projet :</p>
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
                  <p className="text-blue-300 font-medium">Mode développement</p>
                  <p className="text-blue-200/70">
                    Avec <code className="px-1.5 py-0.5 bg-blue-500/20 rounded">DISPLAY_OTP_DEV_MODE=true</code>, le
                    code OTP s'affiche directement dans le terminal — aucune configuration email
                    nécessaire.
                  </p>
                </div>
              </div>
            </div>
          </Step>

          <Step number={4} title="Initialiser la base de données">
            <p>Générez le client Prisma et appliquez le schéma :</p>
            <CodeBlock title="Terminal">{`npx prisma db push`}</CodeBlock>
            <p>Optionnel — remplir la base avec des données de test :</p>
            <CodeBlock title="Terminal">{`npx tsx prisma/seedFakeData.ts`}</CodeBlock>
          </Step>

          <Step number={5} title="Lancer en développement">
            <p>Démarrez le serveur de développement Next.js :</p>
            <CodeBlock title="Terminal">{`npm run dev`}</CodeBlock>
            <p>
              L'application sera accessible sur{" "}
              <code className="px-2 py-1 bg-white/5 rounded text-green-400">
                http://localhost:3000
              </code>
            </p>
          </Step>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Commandes utiles</h2>
        <div className="grid gap-3">
          {[
            { cmd: "npm run dev", desc: "Serveur de développement (port 3000)" },
            { cmd: "npm run build", desc: "Build de production" },
            { cmd: "npm start", desc: "Serveur de production" },
            { cmd: "npm run lint", desc: "Vérification Biome" },
            { cmd: "npm run format", desc: "Formatage du code" },
            { cmd: "npm run test", desc: "Lancer les tests Vitest" },
            { cmd: "npx prisma studio", desc: "Interface graphique Prisma Studio" },
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
          Vérification
        </h3>
        <p className="text-sm text-neutral-400 mb-4">
          Naviguez sur <code className="px-2 py-1 bg-white/5 rounded text-green-400">http://localhost:3000</code>.
          Vous devriez voir la page de connexion. Entrez votre email, puis récupérez le code OTP
          dans le terminal (mode dev).
        </p>
      </div>
    </div>
  );
}
