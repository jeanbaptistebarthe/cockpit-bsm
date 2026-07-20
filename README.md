# BSM Cockpit

Outil interne de pilotage de **BSM Advisory & Consulting** (Antananarivo, Madagascar).

Application web autonome : CRM clients, agenda, budget, chiffre d'affaires, méthode **R5®** (missions, matrice des risques, cartographie, recommandations), RH, et moteur d'analyses/conseils automatiques.

## Utilisation
- **En ligne** : ouvrir l'URL d'hébergement (GitHub Pages / Vercel). Installable comme application (PWA), fonctionne hors-ligne.
- **En local** : ouvrir `index.html` dans un navigateur (aucune installation).

Les données sont stockées **dans le navigateur** (localStorage). Utiliser le bouton **⬇ Sauvegarde** pour exporter un fichier de sauvegarde, **⬆ Restaurer** pour le recharger.

## Fichiers
| Fichier | Rôle |
|---|---|
| `index.html` | L'application complète (HTML/CSS/JS autonome) |
| `manifest.webmanifest` | Manifeste PWA (installation) |
| `sw.js` | Service worker (mode hors-ligne, https uniquement) |
| `icon.svg` | Icône de l'application |
| `MODE_EMPLOI.md` | Guide d'utilisation |
| `ARCHITECTURE_SYSTEME_BSM.md` | Architecture cible (PostgreSQL/Supabase, PWA, moteur d'analyse) |

## Hébergement (GitHub Pages)
1. Pousser ce dossier dans un dépôt GitHub.
2. Repo → **Settings → Pages** → Source : branche `main`, dossier `/root`.
3. L'application est publiée à l'URL indiquée (quelques minutes).

## Feuille de route
- Migration vers une base cloud (Supabase/PostgreSQL) avec synchronisation hors-ligne.
- Intégration d'une IA générative pour les conseils et l'analyse (après validation du socle).

---
© BSM Advisory & Consulting — usage interne.
