import { ArrowRight, UserCircle, Palette, Globe, Mail, Pencil, Save, CheckCircle } from "lucide-react";

export default function DocsProfile() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Utilisateur</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Profil</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Votre profil</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Depuis votre profil, vous pouvez personnaliser votre avatar, modifier votre nom
          et changer la langue de l'interface.
        </p>
      </div>

      {/* --- Ouvrir le profil --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Accéder à votre profil</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
              <UserCircle className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Cliquez sur votre avatar</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Sur le tableau de bord, votre avatar est affiché en haut à droite de l'écran.
                Cliquez dessus pour ouvrir un panneau latéral avec toutes vos informations
                et les options de personnalisation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Ce que vous pouvez faire --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Ce que vous pouvez modifier</h2>
        <div className="grid gap-4">
          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
                <Palette className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Choisir un avatar</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Survolez votre avatar actuel avec la souris (ou appuyez dessus sur mobile)
                  pour voir un icône de modification apparaître. Cliquez dessus pour ouvrir
                  une galerie de <strong className="text-white">13 styles d'avatars</strong> générés
                  automatiquement à partir de votre nom d'utilisateur. Cliquez sur celui qui
                  vous plaît pour le sélectionner.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {["adventurer", "avataaars", "bottts", "fun-emoji", "identicon", "lorelei", "micah", "miniavs", "open-peeps", "personas", "pixel-art", "shapes", "thumbs"].map((style) => (
                    <span key={style} className="text-xs px-2 py-0.5 rounded bg-white/5 text-neutral-500">
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
                <Pencil className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Modifier votre nom</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Votre nom est affiché dans le profil. Cliquez sur l'icône de modification
                  à côté de votre nom pour passer en mode édition, tapez le nouveau nom puis
                  cliquez en dehors du champ pour confirmer.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Adresse email</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Votre email est affiché à titre informatif. C'est l'adresse sur laquelle
                  vous recevez les codes de connexion. Elle ne peut pas être changée depuis
                  l'interface.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-orange-500/10 flex-shrink-0">
                <Globe className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Langue de l'interface</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Cliquez sur l'icône de modification à côté de la langue actuelle pour
                  afficher un menu déroulant. Sélectionnez{" "}
                  <strong className="text-white">Français</strong> ou{" "}
                  <strong className="text-white">English</strong>. Le changement s'applique
                  immédiatement à toute l'interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Enregistrer --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Enregistrer les modifications</h2>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <Save className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-2">Bouton "Enregistrer" visible si vous avez fait des changements</h3>
                <p className="text-sm text-neutral-400">
                  Dès que vous modifiez votre nom, votre avatar ou votre langue, un bouton
                  <strong className="text-white"> Enregistrer</strong> apparaît en bas du panneau.
                  Cliquez dessus pour sauvegarder. Si vous fermez le panneau sans enregistrer,
                  vos modifications sont perdues.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sm mb-2">La langue se sauvegarde automatiquement</h3>
                <p className="text-sm text-neutral-400">
                  Exception : lorsque vous changez la langue via le menu déroulant, la
                  modification est appliquée et sauvegardée immédiatement — pas besoin de
                  cliquer sur "Enregistrer".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
