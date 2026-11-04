// Generated from this build. No personal data is cached here.
const PREFIX = 'traeningslog:' + self.registration.scope + ':';
const CACHE = PREFIX + "traeningslog-252bbc7fd12cbc9a";
const ASSETS = ["./apple-touch-icon.png","./assets/index-C5JLFvEX.js","./assets/index-DuyCdKrZ.css","./icon-192.png","./icon-512.png","./icon.svg","./index.html","./manifest.webmanifest","./version.json"];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(ASSETS);
    // Activate only after the whole offline build is safely cached. Do not
    // wait forever for Safari or another app window to close.
    await self.skipWaiting();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'ACTIVATE_UPDATE') event.waitUntil(self.skipWaiting());
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    // Old cache names lacked a scope. Leave them and other apps' caches alone.
    // Personal records are in localStorage and are never changed here.
    caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE).map(key => caches.delete(key)))),
    self.clients.claim()
  ]));
});
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== self.location.origin || !url.href.startsWith(self.registration.scope)) return;
  const relative = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (relative === 'version.json') {
    // A version check must reach the server; cached metadata is not proof of
    // the current deployment. The UI handles an offline/failed check.
    event.respondWith(fetch(event.request, { cache: 'no-store' }));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (event.request.mode === 'navigate' && (relative === '' || relative === 'index.html')) return await cache.match('./index.html') || fetch(event.request);
    // These are public static assets. Preview servers may add Vary: Origin;
    // a module's Origin header must not prevent a precached asset from matching.
    return await cache.match(event.request, { ignoreVary: true }) || fetch(event.request);
  }));
});
