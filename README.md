# Aurora Home — Documentation

Documentation complète du projet Aurora Home, couvrant l'application web Next.js, le firmware ESP32 et le site marketing.

Construite avec Next.js 15 (App Router), Tailwind CSS v4, déployée en statique.

---

## Structure de la documentation

| Section | Pages |
|---|---|
| Pour commencer | Introduction, Installation App, Installation ESP32 |
| Documentation Utilisateur | Tableau de bord, Alertes & Anomalies, Authentification, Onboarding, Profil |
| Documentation Technique | Architecture, API REST, Base de données, MQTT & Capteurs |
| Pour les développeurs | Simulateur de capteurs, Conventions App, Conventions ESP32, Site Marketing, Contribuer |

---

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000/docs](http://localhost:3000/docs).

### Variable d'environnement

Pour afficher les contributeurs GitHub (fetch au build time) :

```bash
# .env.local
GITHUB_TOKEN=ghp_...
```

Token classique avec les scopes `repo` et `read:org` sur l'organisation [ESP-AuroraHome](https://github.com/ESP-AuroraHome).

---

## Build

```bash
npm run build
```

Génère les pages statiques dans `.next/`.

---

## Dépôts liés

- [`aurora-home-app`](https://github.com/ESP-AuroraHome/aurora-home-app) — Application web Next.js
- [`aurora-home-esp32`](https://github.com/ESP-AuroraHome/aurora-home-esp32) — Firmware ESP32 PlatformIO
- [`aurora-home-marketing`](https://github.com/ESP-AuroraHome/aurora-home-marketing) — Site vitrine Vue 3
- [`aurora-home-orange-pi`](https://github.com/ESP-AuroraHome/aurora-home-orange-pi) — Backend Orange Pi
