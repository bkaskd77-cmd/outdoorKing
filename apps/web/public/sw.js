/* OutdoorKing offline trek info. Precaches published itineraries and rescue copy. */
const CACHE = "ok-offline-v3";
const PRECACHE = ["/", "/offline.html", "/api/offline/catalog"];

function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  // Staff admin stays a normal browser page. Do not handle it here.
  if (isAdminPath(url.pathname)) return;

  if (url.pathname === "/api/offline/catalog") {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(async () => {
        const cached = await caches.match("/offline.html");
        return cached ?? Response.error();
      }),
    );
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    void updateCache(request);
    return cached;
  }
  return updateCache(request);
}

async function updateCache(request) {
  const response = await fetch(request);
  if (response.ok) {
    const copy = response.clone();
    const cache = await caches.open(CACHE);
    await cache.put(request, copy);
  }
  return response;
}
