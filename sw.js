const CACHE = "nexora-v2";
const SHELL = ["./app.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  // Network-first for Firestore/Storage calls, cache-first for app shell
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const fetchPromise = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && e.request.url.startsWith(self.location.origin)) {
            const resClone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, resClone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
