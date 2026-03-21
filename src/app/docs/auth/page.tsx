import { ArrowRight, KeyRound, Monitor, ShieldCheck, Home, LogOut, HelpCircle, Mail } from "lucide-react";

export default function DocsAuth() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Utilisateur</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Authentification</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Se connecter à Aurora Home</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Aurora Home n'utilise pas de mot de passe. À la place, un code à 6 chiffres s'affiche
          sur l'écran du boîtier à chaque connexion — c'est plus simple et plus sécurisé.
        </p>
      </div>

      {/* --- Comment ça marche --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Comment se connecter</h2>
        <div className="space-y-4">
          {[
            {
              step: "1",
              icon: Mail,
              color: "blue",
              title: "Entrez votre adresse email",
              desc: "Sur la page de connexion, tapez l'adresse email que vous utilisez pour Aurora Home. Si c'est la toute première fois, vous pouvez aussi indiquer votre prénom pour personnaliser votre compte.",
            },
            {
              step: "2",
              icon: Monitor,
              color: "purple",
              title: "Regardez l'écran du boîtier",
              desc: "Un code à 6 chiffres s'affiche sur l'écran du boîtier Aurora Home. Ce code n'est valable que quelques minutes, donc soyez rapide !",
            },
            {
              step: "3",
              icon: ShieldCheck,
              color: "green",
              title: "Entrez le code",
              desc: "Revenez sur Aurora Home et saisissez le code à 6 chiffres affiché sur le boîtier. Si le code est correct, vous êtes connecté.",
            },
            {
              step: "4",
              icon: Home,
              color: "orange",
              title: "Vous êtes connecté",
              desc: "Vous arrivez directement sur le tableau de bord. Votre session reste active — vous n'aurez pas besoin de vous reconnecter à chaque visite.",
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
                    Étape {item.step}
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
        <h2 className="text-2xl font-bold mb-6">Rester connecté</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-3">Une session sécurisée</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-3">
                Une fois connecté, votre session est mémorisée. Vous pouvez fermer l'onglet et
                revenir plus tard — vous serez toujours connecté, sans avoir besoin de ressaisir
                un code.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                La session expire automatiquement après une longue période d'inactivité. Vous
                serez alors renvoyé vers la page de connexion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Se déconnecter --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Se déconnecter</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-500/10 flex-shrink-0">
              <LogOut className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Déconnexion depuis le profil</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Pour vous déconnecter, cliquez sur votre avatar en haut à droite du tableau de bord
                pour ouvrir le panneau de profil. Vous trouverez le bouton{" "}
                <strong className="text-white">Se déconnecter</strong> en haut du panneau. Votre
                session est immédiatement invalidée et vous êtes redirigé vers la page de connexion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- FAQ --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Questions fréquentes</h2>
        <div className="grid gap-4">
          {[
            {
              q: "Aucun code n'apparaît sur le boîtier, que faire ?",
              a: "Vérifiez que le boîtier Aurora Home est bien allumé et que son écran fonctionne. Retournez ensuite sur la page de connexion et recommencez — chaque tentative génère un nouveau code.",
            },
            {
              q: "Le code ne fonctionne pas.",
              a: "Le code n'est valable que quelques minutes. S'il est expiré, retournez sur la page de connexion pour en générer un nouveau qui s'affichera sur le boîtier. Vérifiez aussi que vous saisissez bien le code actuellement affiché.",
            },
            {
              q: "Dois-je créer un compte ?",
              a: "Non. La première fois que vous entrez votre email, le compte est créé automatiquement. Vous pouvez éventuellement indiquer votre prénom pour personnaliser votre profil.",
            },
            {
              q: "Mes informations de connexion sont-elles sécurisées ?",
              a: "Oui. Il n'y a aucun mot de passe stocké — il n'y a donc rien à voler. Seul un code temporaire à usage unique est utilisé à chaque connexion.",
            },
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
