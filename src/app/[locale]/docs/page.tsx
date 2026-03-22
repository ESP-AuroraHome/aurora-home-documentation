import { Cpu, Wifi, BarChart3, Shield, ArrowRight, Zap, Database, Monitor } from "lucide-react";
import Link from "next/link";

export default function DocsIntroduction() {
  return (
    <div>
      <div className="mb-12">
        <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4">
          <span>Docs</span>
          <ArrowRight className="w-3 h-3" />
          <span className="text-white">Introduction</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Documentation Aurora Home</h1>
        <p className="text-xl text-neutral-400 leading-relaxed">
          Aurora Home est une plateforme domotique complète combinant un firmware ESP32 et une
          application web Next.js pour surveiller 5 capteurs environnementaux en temps réel.
        </p>
      </div>

      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-neutral-300 leading-relaxed">
          Le système repose sur deux composants indépendants : un microcontrôleur ESP32 qui collecte
          les données de capteurs environnementaux et les publie via MQTT, et une application web
          Next.js qui consomme ces données, les stocke en base de données SQLite et les affiche sur
          un dashboard en temps réel avec mise à jour via Server-Sent Events.
        </p>
      </div>

      <div className="grid gap-4 mb-12">
        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-blue-500/10">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Firmware ESP32</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Microcontrôleur ESP32 avec 3 capteurs I2C : SCD30 (CO₂, température, humidité),
                BME280 (température, humidité, pression) et BH1750 (luminosité). Fonctionne en mode
                point d'accès WiFi autonome.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-purple-500/10">
              <Wifi className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Communication MQTT</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                L'ESP32 crée son propre réseau WiFi (AP mode) et publie les données toutes les ~10
                secondes sur le topic <code className="px-1.5 py-0.5 bg-white/5 rounded text-purple-300">sensor/data</code> via
                un broker Mosquitto sur Orange Pi 3 LTS.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-green-500/10">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Dashboard Temps Réel</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Application Next.js avec mise à jour instantanée via Server-Sent Events, graphiques
                Recharts pour l'historique, stockage SQLite via Prisma et support PWA pour
                installation mobile.
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-orange-500/10">
              <Shield className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Authentification OTP</h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Système d'authentification sans mot de passe via Better Auth : l'utilisateur reçoit
                un code OTP à 6 chiffres par email (ou sur afficheur I2C en mode hardware).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-12">
        <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">5</div>
          <div className="text-xs text-neutral-500">Types de capteurs</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">SSE</div>
          <div className="text-xs text-neutral-500">Mise à jour temps réel</div>
        </div>
        <div className="text-center p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="text-3xl font-bold text-white mb-1">PWA</div>
          <div className="text-xs text-neutral-500">Installable sur mobile</div>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold mb-1">Prêt à commencer ?</h3>
            <p className="text-sm text-neutral-400">
              Suivez le guide d'installation pour démarrer en quelques minutes.
            </p>
          </div>
          <Link
            href="/docs/installation"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors whitespace-nowrap"
          >
            Installation App
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Architecture du système</h2>
        <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-2">
                <Cpu className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">ESP32</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-2">
                <Wifi className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">MQTT Broker</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-2">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Next.js App</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center mb-2">
                <Database className="w-6 h-6 text-yellow-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">SQLite DB</span>
            </div>

            <ArrowRight className="w-4 h-4 text-neutral-600 flex-shrink-0" />

            <div className="flex flex-col items-center min-w-[80px]">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-2">
                <Monitor className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-xs text-neutral-400 text-center">Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
