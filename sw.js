// Generated from this build. No personal data is cached here.
const CACHE = "traeningslog-1e93c3158e68167f";
const ASSETS = ["./apple-touch-icon.png","./assets/index-DFb9kPyI.css","./assets/index-DMaMfl6E.js","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest","./version.json"];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('traeningslog-') && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (event.request.mode === 'navigate') return await cache.match('./index.html') || fetch(event.request);
    // These are public static assets. Preview servers may add Vary: Origin;
    // a module's Origin header must not prevent a precached asset from matching.
    return await cache.match(event.request, { ignoreVary: true }) || fetch(event.request);
  }));
});
