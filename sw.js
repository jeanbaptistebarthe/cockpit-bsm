/* BSM Cockpit — service worker (mode hors-ligne).
   Stratégie : NETWORK-FIRST pour l'app (index.html) → toujours la dernière version en ligne
   après un re-upload ; le cache ne sert QUE de secours hors-ligne. Assets statiques en
   stale-while-revalidate. La constante CACHE est ré-estampillée à chaque build (voir build.js),
   ce qui invalide automatiquement l'ancien cache. Actif uniquement en https (GitHub Pages, Vercel…). */
const CACHE = "bsm-cockpit-20260818-msylbac2";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest", "./icon.svg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return; // le reste passe au réseau

  const isDoc = e.request.mode === "navigate" || url.pathname === "/" ||
                url.pathname.endsWith("/") || url.pathname.endsWith("index.html");

  if (isDoc) {
    // NETWORK-FIRST : on tente le réseau (dernière version), on met à jour le cache,
    // et on ne retombe sur le cache QUE si le réseau échoue (hors-ligne).
    e.respondWith(
      fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put("./index.html", copy));
        return resp;
      }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Assets statiques : STALE-WHILE-REVALIDATE (rapide + se met à jour en arrière-plan).
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(resp => {
        const copy = resp.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return resp;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
