# BSM Cockpit — Mode d'emploi

Outil interne de pilotage de BSM Advisory & Consulting.
**Application locale** : rien à installer, aucune connexion, aucun compte.

---

## 1. Ouvrir l'outil
Double-cliquez sur **`BSM_Cockpit.html`** → il s'ouvre dans votre navigateur (Chrome, Edge…).
Créez un raccourci de ce fichier sur le bureau pour y accéder en un clic.

## 2. Vos données
- Elles sont **enregistrées automatiquement sur ce PC** (dans le navigateur), à chaque modification.
- **Important** : elles sont liées à *ce navigateur sur cet ordinateur*. Si vous changez de PC ou de navigateur, elles ne suivent pas automatiquement.
- **Faites régulièrement une sauvegarde** : bouton **⬇ Sauvegarde** en haut à droite → un fichier `.json` est téléchargé. Rangez-le (clé USB, cloud…).
- Pour récupérer une sauvegarde : bouton **⬆ Restaurer**.

## 3. Les onglets (regroupés)

**PILOTAGE**
| Onglet | À quoi ça sert |
|---|---|
| **Tableau de bord** | Vue d'ensemble : CA, solde, indicateurs R5, alertes, prochains événements. |
| **Clients** | Ajouter / suivre / archiver / supprimer clients et prospects. |
| **Agenda** | Dater audits, prospections, rendez-vous. Calendrier + liste. |
| **Budget** | Entrées, dépenses, prévisions, par mode de paiement (CB, Chèque, Mvola, Orange Money, Espèces, Virement). |
| **Chiffre d'affaires** | CA provisoire (à encaisser) vs effectif (encaissé), par mois et par client. |

**MÉTHODE R5®**
| Onglet | À quoi ça sert |
|---|---|
| **Missions** | Contrats et missions : phase R5, montant HT, acompte, solde, livrables (NDA/Contrat/Rapport). |
| **Matrice des risques** | Saisie des risques : Probabilité × Impact → score et niveau (CRITIQUE ≥15, HAUTE, MOYENNE, FAIBLE) calculés automatiquement. |
| **Cartographie** | Heatmap 5×5 automatique des risques + répartition par niveau et par famille. Cliquer un point ouvre le risque. |
| **Recommandations** | Plan d'action R5 : horizon, priorité, responsable, indicateur, avancement % (suivi intégré). |

**CABINET**
| Onglet | À quoi ça sert |
|---|---|
| **RH & équipe** | 4 sous-onglets : Personnel (poste, pôle, permission, contrat), Recrutement, Congés & absences, Activités. Tout modifiable/supprimable. |
| **Audit terrain** | Le formulaire d'audit Google intégré + bouton pour l'ouvrir. Les réponses arrivent dans ton Sheet R5, puis s'importent ici. |
| **Analyses & Conseils** | Alertes automatiques (retards, trésorerie, relances, **risques critiques, recommandations en retard, risques récurrents par secteur**) + conseils manuels. |

## 3bis. Importer depuis le Sheet R5 (bouton « ⇊ Importer R5 »)
- **Fichier CSV** : dans Google Sheets → Fichier → Télécharger → CSV (un onglet à la fois : CLIENTS, MATRICE DES RISQUES, MISSIONS, RECOMMANDATIONS), puis importer. Les colonnes sont reconnues automatiquement.
- **Live** : si tu « publies sur le web » ton Sheet, colle son URL + le nom de l'onglet pour une lecture directe (nécessite internet).
- ⚠️ L'écriture **en retour** dans le Google Sheet n'est pas possible depuis ce fichier local — le Cockpit devient ta référence de travail. Détails dans `ARCHITECTURE_SYSTEME_BSM.md`.

## 4. Principes clés
- **Tout est modifiable** : bouton ✎ pour éditer, 🗑 pour supprimer (avec confirmation).
- **Prévu vs Réalisé** : un mouvement « Prévu » alimente le CA *provisoire* ; « Réalisé » alimente le CA *effectif*. Le bouton ✓ passe un prévu en réalisé.
- **Multi-devise** : saisissez en Ariary ou en Euro ; les totaux sont convertis dans la devise principale. Réglez la devise et le taux (1 € = ? Ar) via ⚙ **Paramètres**.
- **Conseils éditables** : chaque alerte automatique peut être reformulée (✎) ou masquée (✕). Vous pouvez aussi ajouter vos propres conseils.

## 5. Les exemples fictifs
L'outil démarre avec 3 clients et quelques mouvements d'exemple (Groupe Meridian, Leader Price, BMOI). **Supprimez-les** quand vous saisissez vos vraies données, ou utilisez ⚙ → « Réinitialiser » pour repartir propre.

---

## Prochaines étapes prévues (à ta demande)
- **IA générative** : rédaction automatique de conseils et questions en langage naturel (dès qu'une clé API est fournie). L'emplacement est déjà prêt dans l'onglet Analyses.
- **Version web** : migration vers Supabase pour un accès multi-appareils / multi-utilisateurs quand l'équipe grandit. La structure des données est déjà alignée sur le schéma Risk Hub pour faciliter cette bascule.

Contact : BSM Advisory & Consulting — usage interne.
