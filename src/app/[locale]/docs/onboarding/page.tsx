import { ArrowRight, UserPlus, User, Image, Globe, CheckCircle2 } from "lucide-react";

function Step({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative flex gap-5">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 text-sm font-bold">
          {number}
        </div>
        <div className="w-px flex-1 bg-white/10 mt-2" />
      </div>
      <div className="pb-10 flex-1 min-w-0">
        <h3 className="font-semibold mb-2 mt-1">{title}</h3>
        <div className="text-sm text-neutral-400 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default function DocsOnboarding() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Utilisateur</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Onboarding</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Onboarding</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          À la première connexion, Aurora Home vous guide à travers un parcours
          de configuration en trois étapes pour personnaliser votre compte.
        </p>
      </div>

      {/* Déclenchement */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Quand s'affiche-t-il ?</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
              <UserPlus className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Première connexion uniquement</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                L'onboarding s'affiche automatiquement après votre première authentification par OTP,
                avant d'accéder au tableau de bord. Une fois complété, le champ{" "}
                <code className="px-1.5 py-0.5 bg-white/5 rounded text-green-400">onboardingCompleted</code>{" "}
                est mis à <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">true</code> en base
                et vous ne serez plus redirigé vers cette page.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Étapes */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8">Les 3 étapes</h2>
        <div>
          <Step number={1} title="Saisir votre nom">
            Entrez le nom qui sera affiché sur le tableau de bord dans le message de bienvenue
            et sur votre page de profil. Vous pourrez le modifier à tout moment depuis le profil.
          </Step>

          <Step number={2} title="Choisir un avatar">
            Sélectionnez un style d'avatar parmi les{" "}
            <strong className="text-white">13 styles DiceBear</strong> proposés.
            Chaque style génère un avatar unique à partir de votre nom d'utilisateur.
            L'avatar choisi sera affiché dans le header du tableau de bord et sur votre profil.
            <div className="mt-3 flex flex-wrap gap-2">
              {["adventurer", "avataaars", "bottts", "fun-emoji", "identicon", "lorelei", "micah", "miniavs", "open-peeps", "personas", "pixel-art", "shapes", "thumbs"].map((style) => (
                <span key={style} className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-500 font-mono">
                  {style}
                </span>
              ))}
            </div>
          </Step>

          <Step number={3} title="Choisir la langue">
            Sélectionnez la langue de l'interface :{" "}
            <strong className="text-white">Français</strong> ou{" "}
            <strong className="text-white">English</strong>.
            La préférence est sauvegardée dans un cookie et peut être changée depuis le profil à tout moment.
          </Step>
        </div>
      </div>

      {/* Validation */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Validation et redirection</h2>
        <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/10 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-emerald-300 mb-2">Accès au tableau de bord</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Une fois les 3 étapes complétées et le bouton "Terminer" cliqué,
                vos préférences sont sauvegardées et vous êtes redirigé automatiquement
                vers le tableau de bord. Le guard de session vérifie
                <code className="mx-1 px-1.5 py-0.5 bg-white/5 rounded text-green-400">onboardingCompleted</code>
                à chaque visite — si ce champ est <code className="px-1.5 py-0.5 bg-white/5 rounded text-blue-400">false</code>,
                vous serez renvoyé vers l'onboarding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modifier après */}
      <div className="grid gap-4">
        {[
          {
            icon: Image,
            color: "blue",
            title: "Changer d'avatar après l'onboarding",
            desc: "Ouvrez votre profil (avatar en haut à gauche), survolez l'avatar pour voir l'icône de modification, cliquez pour afficher la grille de sélection.",
          },
          {
            icon: User,
            color: "green",
            title: "Changer de nom après l'onboarding",
            desc: "Ouvrez votre profil, cliquez sur l'icône crayon à côté de votre nom, modifiez-le et sauvegardez.",
          },
          {
            icon: Globe,
            color: "orange",
            title: "Changer de langue après l'onboarding",
            desc: "Ouvrez votre profil, cliquez sur le sélecteur de langue dans les paramètres. Le changement s'applique immédiatement.",
          },
        ].map((item) => (
          <div key={item.title} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className={`p-2 rounded-lg bg-${item.color}-500/10 flex-shrink-0`}>
                <item.icon className={`w-4 h-4 text-${item.color}-400`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                <p className="text-sm text-neutral-500">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
