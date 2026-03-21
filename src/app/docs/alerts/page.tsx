import { ArrowRight, Bell, AlertTriangle, ShieldCheck, CheckCheck, Eye, Zap, House } from "lucide-react";

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

export default function DocsAlerts() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Utilisateur</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Alertes & Anomalies</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Alertes & Anomalies</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Aurora Home analyse en continu les données de vos capteurs et vous alerte
          dès qu'une valeur sort des normes ou évolue de façon anormale.
        </p>
      </div>

      {/* Banner dashboard */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Bannière sur le tableau de bord</h2>
        <p className="text-neutral-400 mb-6">
          Au-dessus des cartes capteurs, une bannière indique en permanence l'état de votre maison.
          Elle a trois états possibles :
        </p>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
            <div className="flex items-center gap-3 mb-2">
              <House className="w-4 h-4 text-emerald-400" />
              <h3 className="font-semibold text-emerald-300">Maison en bonne santé</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Tous les capteurs sont dans les normes — aucune alerte active non résolue.
              La bannière est verte avec l'icône maison.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/10">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-300" />
              <h3 className="font-semibold text-red-200">Alertes actives</h3>
            </div>
            <p className="text-sm text-neutral-400 mb-3">
              Une bannière colorée par capteur en anomalie. Chaque alerte affiche :
              le message, le badge de sévérité et la première suggestion.
              Vous pouvez fermer individuellement chaque bannière avec le ×.
            </p>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "Urgent", color: "red" },
                { label: "Problème", color: "orange" },
                { label: "Attention", color: "yellow" },
              ].map((s) => (
                <span key={s.label} className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-500/20 text-${s.color}-300`}>
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <h3 className="font-semibold">Surveillance en cours</h3>
            </div>
            <p className="text-sm text-neutral-400">
              Vous avez fermé toutes les bannières d'alerte mais les anomalies n'ont pas encore
              été résolues. Le système surveille toujours — la bannière verte n'apparaît que
              lorsque les capteurs reviennent effectivement dans les normes.
            </p>
          </div>
        </div>
      </div>

      {/* Cloche */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Panneau de notifications</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
              <Bell className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Accéder aux alertes depuis le header</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                La cloche en haut à droite affiche un badge coloré dès qu'une alerte non lue existe.
                La couleur reflète la sévérité la plus haute : rouge (Urgent), orange (Problème), jaune (Attention).
              </p>
              <p className="text-sm text-neutral-400">
                Cliquez sur la cloche pour ouvrir le panneau <strong className="text-white">État de la maison</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3">
          {[
            { icon: Bell, color: "blue", title: "Onglet Alertes", desc: "Toutes les alertes actives (non résolues), triées par date." },
            { icon: Eye, color: "neutral", title: "Onglet Non vues", desc: "Alertes actives que vous n'avez pas encore lues." },
            { icon: CheckCheck, color: "green", title: "Onglet Résolues", desc: "Historique des alertes marquées comme résolues." },
          ].map((t) => (
            <div key={t.title} className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className={`p-2 rounded-lg bg-${t.color}-500/10 flex-shrink-0`}>
                <t.icon className={`w-4 h-4 text-${t.color}-400`} />
              </div>
              <div>
                <h4 className="font-medium text-sm mb-1">{t.title}</h4>
                <p className="text-sm text-neutral-500">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Actions disponibles sur une alerte</h2>
        <div className="grid gap-3">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <Eye className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Marquer comme vue</h3>
                <p className="text-sm text-neutral-400">
                  Cliquez sur une alerte pour la marquer comme lue. Le point blanc en haut à droite
                  disparaît et le badge de la cloche se décrémente. Vous pouvez aussi cliquer
                  <strong className="text-white"> Tout marquer comme vu</strong> pour traiter toutes les alertes d'un coup.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <CheckCheck className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-1">Marquer comme résolu</h3>
                <p className="text-sm text-neutral-400">
                  Cliquez sur <strong className="text-white">Marquer comme résolu</strong> en bas de la carte pour
                  archiver l'alerte. Elle passe dans l'onglet "Résolues". La bannière du tableau de bord
                  se met à jour instantanément — si c'était la dernière anomalie, la bannière verte
                  "Votre maison est en bonne santé" réapparaît.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sévérités */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Niveaux de sévérité</h2>
        <div className="grid gap-3">
          {[
            { label: "WARNING — Attention", color: "yellow", desc: "Valeur légèrement hors norme. Pas urgent mais à surveiller." },
            { label: "HIGH — Problème", color: "orange", desc: "Valeur significativement hors norme. Intervention recommandée." },
            { label: "CRITICAL — Urgent", color: "red", desc: "Valeur dangereuse. Agissez rapidement." },
          ].map((s) => (
            <div key={s.label} className={`p-4 rounded-xl border border-${s.color}-500/30 bg-${s.color}-500/5`}>
              <p className={`font-semibold text-sm text-${s.color}-300 mb-1`}>{s.label}</p>
              <p className="text-sm text-neutral-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Seuils */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Seuils de détection</h2>
        <p className="text-neutral-400 mb-6">
          Les seuils utilisés par le détecteur d'anomalies pour chaque capteur :
        </p>
        <div className="grid gap-4">
          {[
            {
              sensor: "Température",
              unit: "°C",
              color: "yellow",
              thresholds: [
                { label: "Trop chaud", values: "> 28 (WARNING), > 32 (HIGH), > 38 (CRITICAL)" },
                { label: "Trop froid", values: "< 14 (WARNING), < 10 (HIGH), < 5 (CRITICAL)" },
              ],
            },
            {
              sensor: "Humidité",
              unit: "%",
              color: "blue",
              thresholds: [
                { label: "Trop humide", values: "> 70 (WARNING), > 80 (HIGH), > 90 (CRITICAL)" },
                { label: "Trop sec", values: "< 25 (WARNING), < 18 (HIGH), < 10 (CRITICAL)" },
              ],
            },
            {
              sensor: "CO₂",
              unit: "ppm",
              color: "neutral",
              thresholds: [
                { label: "Trop élevé", values: "> 800 (WARNING), > 1500 (HIGH), > 2000 (CRITICAL)" },
              ],
            },
            {
              sensor: "Pression",
              unit: "hPa",
              color: "green",
              thresholds: [
                { label: "Trop basse", values: "< 970 (WARNING), < 960 (HIGH)" },
              ],
            },
          ].map((s) => (
            <div key={s.sensor} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-500/10 text-${s.color}-400`}>{s.unit}</span>
                <h3 className="font-semibold">{s.sensor}</h3>
              </div>
              <div className="grid gap-2">
                {s.thresholds.map((t) => (
                  <div key={t.label} className="flex items-center justify-between text-sm">
                    <span className="text-neutral-500">{t.label}</span>
                    <code className="text-neutral-300 text-xs">{t.values}</code>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-blue-200/70">
            <strong className="text-blue-300">Variation soudaine :</strong> En plus des seuils fixes,
            le système détecte les variations brutales — si une valeur s'écarte de plus de 25% de la
            moyenne des 5 dernières mesures, une alerte est générée même si les seuils absolus ne sont
            pas atteints. La luminosité n'est pas soumise à ce contrôle.
          </p>
        </div>
      </div>

      {/* Anti-spam */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Protection anti-spam</h3>
            <p className="text-sm text-neutral-400">
              Pour éviter une avalanche de notifications, le système n'envoie pas de nouvelle alerte
              pour un même capteur et un même type de problème si une alerte similaire non résolue
              existe déjà dans les <strong className="text-white">30 dernières minutes</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
