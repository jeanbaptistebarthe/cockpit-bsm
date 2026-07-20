# Mettre le BSM Cockpit en ligne — guide pas à pas

Le dépôt est déjà préparé (git initialisé + premier commit). Il ne reste qu'à l'**envoyer sur GitHub** puis à l'**héberger**. Méthode recommandée : **GitHub Desktop** (aucune ligne de commande).

---

## Étape 1 — Installer GitHub Desktop (une seule fois)
1. Télécharger : https://desktop.github.com
2. Installer, puis **se connecter avec ton compte GitHub**.

## Étape 2 — Ajouter ce dossier
1. Menu **File → Add local repository**.
2. Choisir le dossier : `Desktop\BSM A&C\PROJETS\Cockpit BSM`.
3. GitHub Desktop détecte le dépôt déjà prêt (avec son commit).

## Étape 3 — Publier sur GitHub
1. Cliquer **Publish repository** (en haut).
2. Nom suggéré : **`bsm-cockpit`**.
3. Cocher **Keep this code private** si tu veux un dépôt **privé** (recommandé pour un outil interne).
4. Cliquer **Publish repository**.

➡️ Ton code est maintenant sur GitHub. Pour toute mise à jour future : je modifie les fichiers → tu cliques **Push origin** dans GitHub Desktop.

---

## Étape 4 — Héberger l'application (l'ouvrir depuis une URL)

### Option A — Dépôt PRIVÉ → hébergement Vercel (gratuit, recommandé)
1. Aller sur https://vercel.com → **Sign up with GitHub**.
2. **Add New → Project** → choisir le dépôt `bsm-cockpit`.
3. Laisser les réglages par défaut → **Deploy**.
4. Après ~1 min, tu obtiens une URL (ex. `bsm-cockpit.vercel.app`) — accessible partout, installable comme application.

### Option B — Dépôt PUBLIC → GitHub Pages (gratuit)
1. Sur GitHub, ouvrir le dépôt → **Settings → Pages**.
2. **Source** : branche `main`, dossier `/ (root)` → **Save**.
3. Après quelques minutes, l'URL s'affiche (ex. `ton-compte.github.io/bsm-cockpit`).
> ⚠️ Pages gratuit = dépôt **public** (le code est visible ; **pas** tes données, qui restent dans le navigateur / la future base).

---

## Étape 5 — Récupérer tes données de test
Sur la version hébergée (nouvelle adresse = stockage neuf) :
1. Dans ta version locale actuelle : bouton **⬇ Sauvegarde**.
2. Sur la version en ligne : bouton **⬆ Restaurer** → choisir le fichier.

---

## Besoin d'aide ?
Dis-moi quand ton dépôt est publié (ou colle-moi son URL) : je vérifie que tout est correct et je t'aide pour l'hébergement.
