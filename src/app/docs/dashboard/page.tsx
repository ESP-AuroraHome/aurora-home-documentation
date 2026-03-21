import { ArrowRight, Thermometer, Droplets, Gauge, Wind, Sun, MousePointer, Smartphone, RefreshCw, Info } from "lucide-react";

export default function DocsDashboard() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span>Documentation Utilisateur</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Tableau de bord</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Tableau de bord</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          C'est l'écran principal d'Aurora Home. Il affiche en temps réel les mesures de votre
          environnement : température, humidité, pression, CO₂ et luminosité.
        </p>
      </div>

      {/* --- Mise à jour en temps réel --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Mise à jour automatique</h2>
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10 flex-shrink-0">
              <RefreshCw className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Les données se mettent à jour toutes seules</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Vous n'avez rien à faire — les valeurs affichées se rafraîchissent automatiquement
                dès que le capteur envoie une nouvelle mesure. Environ toutes les 10 secondes,
                les chiffres se mettent à jour avec une animation fluide.
              </p>
              <p className="text-sm text-neutral-500 mt-2">
                Si votre connexion est coupée, le tableau de bord se reconnecte automatiquement
                au bout de quelques secondes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Les 5 capteurs --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Les 5 mesures affichées</h2>
        <p className="text-neutral-400 mb-6">
          Le tableau de bord affiche cinq cartes, une par type de donnée.
          Voici ce que chaque mesure représente et dans quelle unité elle s'exprime.
        </p>
        <div className="grid gap-4">
          {[
            {
              icon: Thermometer,
              color: "yellow",
              name: "Température",
              unit: "°C",
              desc: "La température ambiante de la pièce, mesurée par deux capteurs dont la valeur est moyennée pour plus de précision.",
              normal: "Entre 18 °C et 26 °C pour un intérieur confortable.",
            },
            {
              icon: Droplets,
              color: "blue",
              name: "Humidité",
              unit: "%",
              desc: "Le taux d'humidité relative de l'air, moyenné entre deux capteurs.",
              normal: "Entre 40 % et 60 % est idéal pour la santé et le confort.",
            },
            {
              icon: Gauge,
              color: "green",
              name: "Pression atmosphérique",
              unit: "hPa",
              desc: "La pression de l'air ambiant. Permet de suivre les variations météo.",
              normal: "La pression standard au niveau de la mer est 1013 hPa.",
            },
            {
              icon: Wind,
              color: "neutral",
              name: "CO₂",
              unit: "ppm",
              desc: "La concentration de dioxyde de carbone dans l'air. Indique la qualité de l'air et la ventilation de la pièce.",
              normal: "En dessous de 800 ppm : air sain. Au dessus de 1500 ppm : aérez la pièce.",
            },
            {
              icon: Sun,
              color: "orange",
              name: "Luminosité",
              unit: "lx",
              desc: "Le niveau de lumière ambiante mesuré par le capteur BH1750.",
              normal: "0 lx : obscurité totale. 500 lx : bonne lumière de bureau.",
            },
          ].map((s) => (
            <div key={s.name} className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg bg-${s.color}-500/10`}>
                  <s.icon className={`w-4 h-4 text-${s.color}-400`} />
                </div>
                <span className="font-semibold text-white">{s.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full bg-${s.color}-500/10 text-${s.color}-400`}>
                  {s.unit}
                </span>
              </div>
              <p className="text-sm text-neutral-400 mb-2">{s.desc}</p>
              <p className="text-xs text-neutral-500 flex items-center gap-1.5">
                <Info className="w-3 h-3 flex-shrink-0" />
                {s.normal}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* --- Interaction avec les cartes --- */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Interagir avec les cartes</h2>
        <div className="grid gap-4">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-purple-500/10 flex-shrink-0">
                <MousePointer className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Cliquer sur une carte pour voir le graphique</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Chaque carte affiche un mini graphique. Cliquez dessus pour l'agrandir et voir
                  l'historique des 20 dernières mesures avec la date, l'heure et la valeur exacte
                  pour chaque point.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-neutral-500/10 flex-shrink-0">
                <Info className="w-5 h-5 text-neutral-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Aucune donnée disponible</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Si le capteur ESP32 n'est pas allumé ou n'a pas encore envoyé de mesure,
                  la carte affiche <span className="text-white font-mono">-- °C</span> (ou l'unité
                  correspondante) et le graphique est vide. C'est normal — les données
                  apparaîtront dès que le capteur sera actif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PWA --- */}
      <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-500/10 flex-shrink-0">
            <Smartphone className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Installer l'application sur votre téléphone</h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Aurora Home peut s'installer comme une application native sur votre smartphone.
              Sur <strong className="text-white">Android</strong>, ouvrez le site dans Chrome et
              appuyez sur "Ajouter à l'écran d'accueil". Sur <strong className="text-white">iPhone</strong>,
              utilisez le bouton Partager dans Safari, puis "Sur l'écran d'accueil". L'application
              s'ouvre ensuite comme n'importe quelle autre app, sans barre de navigation du navigateur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
