import { ArrowRight, Database, Table, GitBranch } from "lucide-react";

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

export default function DocsDatabase() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Technique</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Base de données</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Base de données</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Aurora Home utilise Prisma ORM avec SQLite. Le schéma est défini dans{" "}
          <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">prisma/schema.prisma</code> à
          la racine du projet.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Modèles</h2>
        <div className="grid gap-4">
          {[
            {
              name: "User",
              color: "blue",
              desc: "Compte utilisateur de l'application.",
              fields: [
                { name: "id", type: "String", note: "CUID, clé primaire" },
                { name: "name", type: "String?", note: "Nom d'affichage" },
                { name: "email", type: "String", note: "Unique — identifiant de connexion" },
                { name: "emailVerified", type: "Boolean", note: "" },
                { name: "image", type: "String?", note: "URL avatar DiceBear" },
                { name: "createdAt", type: "DateTime", note: "" },
                { name: "updatedAt", type: "DateTime", note: "" },
              ],
            },
            {
              name: "Session",
              color: "purple",
              desc: "Session authentifiée — gérée par Better Auth.",
              fields: [
                { name: "id", type: "String", note: "CUID" },
                { name: "token", type: "String", note: "Unique — transmis via cookie" },
                { name: "expiresAt", type: "DateTime", note: "Expiration de la session" },
                { name: "ipAddress", type: "String?", note: "IP du client" },
                { name: "userAgent", type: "String?", note: "User-Agent du navigateur" },
                { name: "userId", type: "String", note: "FK → User" },
              ],
            },
            {
              name: "Account",
              color: "green",
              desc: "Compte lié à un provider OAuth (Better Auth).",
              fields: [
                { name: "id", type: "String", note: "" },
                { name: "providerId", type: "String", note: "ex: 'credential'" },
                { name: "accountId", type: "String", note: "" },
                { name: "accessToken", type: "String?", note: "" },
                { name: "refreshToken", type: "String?", note: "" },
                { name: "userId", type: "String", note: "FK → User" },
              ],
            },
            {
              name: "Verification",
              color: "yellow",
              desc: "Token de vérification OTP — généré à chaque demande de connexion.",
              fields: [
                { name: "id", type: "String", note: "" },
                { name: "identifier", type: "String", note: "Email de l'utilisateur" },
                { name: "value", type: "String", note: "Code OTP haché" },
                { name: "expiresAt", type: "DateTime", note: "Expiration du code" },
              ],
            },
            {
              name: "DataPoint",
              color: "orange",
              desc: "Relevé de capteur — créé à chaque message MQTT reçu.",
              fields: [
                { name: "id", type: "String", note: "CUID" },
                { name: "type", type: "DataType", note: "Enum : TEMPERATURE | HUMIDITY | PRESSURE | CO2 | LIGHT" },
                { name: "value", type: "String", note: "Valeur brute (ex: '22.50')" },
                { name: "createdAt", type: "DateTime", note: "Horodatage du relevé" },
              ],
            },
            {
              name: "Alert",
              color: "red",
              desc: "Anomalie détectée sur un capteur.",
              fields: [
                { name: "id", type: "String", note: "CUID" },
                { name: "type", type: "AlertType", note: "THRESHOLD_HIGH | THRESHOLD_LOW | SUDDEN_CHANGE" },
                { name: "severity", type: "Severity", note: "WARNING | HIGH | CRITICAL" },
                { name: "sensorType", type: "DataType", note: "Capteur concerné" },
                { name: "value", type: "Float", note: "Valeur mesurée au moment de l'alerte" },
                { name: "threshold", type: "Float?", note: "Seuil dépassé (null si variation soudaine)" },
                { name: "message", type: "String", note: "Message affiché à l'utilisateur" },
                { name: "suggestions", type: "String", note: "JSON stringifié — liste de suggestions" },
                { name: "read", type: "Boolean", note: "false par défaut" },
                { name: "resolvedAt", type: "DateTime?", note: "null tant que non résolue" },
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
              <div className="p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-2 pr-4 text-neutral-500 font-medium">Champ</th>
                      <th className="text-left py-2 pr-4 text-neutral-500 font-medium">Type</th>
                      <th className="text-left py-2 text-neutral-500 font-medium">Notes</th>
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

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Enums</h2>
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
            <strong className="text-orange-300">Note :</strong> Le champ <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">value</code> de DataPoint est
            stocké en <strong>String</strong> et non en Float. Le serveur extrait la valeur numérique avec{" "}
            <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">parseFloat()</code> avant de calculer ou afficher les graphiques.
            Le champ <code className="px-1.5 py-0.5 bg-orange-500/20 rounded">suggestions</code> d'Alert est un tableau JSON stringifié.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Commandes Prisma</h2>
        <div className="grid gap-3">
          {[
            { cmd: "npx prisma db push", desc: "Applique le schéma sans créer de migration" },
            { cmd: "npx prisma migrate dev", desc: "Crée et applique une migration versionnée" },
            { cmd: "npx prisma studio", desc: "Interface graphique pour explorer la DB" },
            { cmd: "npx tsx prisma/seedFakeData.ts", desc: "Remplit la DB avec des données de test (Faker.js)" },
            { cmd: "npx tsx prisma/clearData.ts", desc: "Vide toutes les tables de données" },
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
            <h3 className="font-semibold mb-2">Pattern Repository</h3>
            <p className="text-sm text-neutral-400 mb-3">
              Tous les accès à la base de données passent par des repositories dédiés qui encapsulent
              les requêtes Prisma. Les usecases retournent un type{" "}
              <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-300">UsecaseResult&lt;T&gt;</code> pour une
              gestion uniforme des erreurs.
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
