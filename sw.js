/* BSM Cockpit — service worker (mode hors-ligne).
   Stratégie : NETWORK-FIRST pour l'app (index.html) → toujours la dernière version en ligne
   après un re-upload ; le cache ne sert QUE de secours hors-ligne. Assets statiques en
   stale-while-revalidate. La constante CACHE est ré-estampillée à chaque build (voir build.js),
   ce qui invalide automatiquement l'ancien cache. Actif en https et sur localhost (le serveur du cabinet). */
const CACHE = "bsm-cockpit-20261022-mvja19ed";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg",
                "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  // Un fichier manquant ne doit pas empêcher la mise à jour : sinon l'ANCIEN service worker reste en place, avec ses anciens caches (APP-05, 25/09/2026).
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(a => c.add(a)))).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      // Aucune réponse de données ne survit dans le cache courant, quelle que soit son origine (APP-05).
      .then(() => caches.open(CACHE)).then(c => c.keys().then(reqs => Promise.all(reqs.filter(r => /\/api\//.test(r.url)).map(r => c.delete(r)))))
      .then(() => self.clients.claim())
  );
});

// 📲 WEB PUSH : notification reçue du serveur (Supabase send-push) — MÊME APP FERMÉE.
self.addEventListener("push", e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = { body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "BSM Cockpit", {
    body: String(d.body || "").slice(0, 240),
    icon: (typeof d.icon === "string" && /^data:image\/png;base64,[A-Za-z0-9+\/=]+$/.test(d.icon) && d.icon.length <= 4000) ? d.icon : "icon-192.png", badge: "icon-192.png",   // patch 179 : le picto du Cockpit en icône
    tag: d.tag || "bsm-push", renotify: true,
    vibrate: [180, 90, 180],
    data: { url: d.url || "./index.html" }
  }));
});

// Toucher une notification ramène au Cockpit (fenêtre existante sinon nouvelle).
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const target = (e.notification.data && e.notification.data.url) || "./index.html";
  e.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then(list => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      if (clients.openWindow) return clients.openWindow(target);
    })
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // le reste passe au réseau
  // 🛑 DONNÉES SERVEUR : /api/* ne passe JAMAIS par le cache — ni servi, ni stocké.
  // (Défaut confirmé par audit 26/08, reproduit sur banc : un /api/data servi périmé par le
  // stale-while-revalidate réinstallait l'instantané du chargement précédent dans localStorage,
  // que serverPush repoussait ensuite au serveur = écrasement de saisies. Et les /api/file
  // re-remplissaient le quota navigateur que kbOffloadBig venait justement de libérer.)
  if (url.pathname.startsWith("/api/")) return;
  // Liste fermée (25/09/2026) : seuls les fichiers de l'application passent par le cache. Tout le reste va au réseau,
  // sans rien laisser derrière lui — y compris les adresses sensibles que l'autodiagnostic sonde (APP-05).
  const FICHIERS_APP = ["", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "apple-touch-icon.png", "simulateur.html", "simulateur_perimetre.html"];
  if (FICHIERS_APP.indexOf(url.pathname.split("/").pop()) < 0) return;

  const isDoc = e.request.mode === "navigate" || url.pathname === "/" ||
                url.pathname.endsWith("/") || url.pathname.endsWith("index.html");

  if (isDoc) {
    // NETWORK-FIRST : on tente le réseau (dernière version), on met à jour le cache,
    // et on ne retombe sur le cache QUE si le réseau échoue (hors-ligne).
    // cache:"reload" = on ignore le cache HTTP du navigateur (GitHub Pages envoie max-age=600 :
    // sans ça, le « réseau » pouvait renvoyer une page vieille de 10 minutes).
    let netReq; try { netReq = new Request(e.request.url, { cache: "reload", credentials: "same-origin" }); } catch (_) { netReq = e.request; }
    e.respondWith(
      fetch(netReq).then(resp => {
        const copy = resp.clone();
        if (resp.ok) caches.open(CACHE).then(c => c.put("./index.html", copy));   // une erreur ne remplace jamais la page hors-ligne
        return resp;
      }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Assets statiques : STALE-WHILE-REVALIDATE (rapide + se met à jour en arrière-plan).
  // ignoreSearch UNIQUEMENT pour les icônes/manifeste : le manifeste les demande en « ?v=2 »
  // (cache-busting de l'icône d'accueil) et doit quand même les trouver hors-ligne.
  // Surtout PAS globalement : une réponse d'API avec paramètres serait servie périmée.
  const isIconish = /\.(png|svg|webmanifest)$/i.test(url.pathname);
  e.respondWith(
    caches.match(e.request, isIconish ? { ignoreSearch: true } : undefined).then(cached => {
      const net = fetch(e.request).then(resp => {
        const copy = resp.clone();
        if (resp.ok) caches.open(CACHE).then(c => c.put(e.request, copy));   // une réponse d'erreur ne se met pas en cache
        return resp;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
