/* Offline shell for Hours of Freedom.
   Paths are relative to this file so the scope stays inside /hours-of-freedom/. */
const CACHE = 'hof-shell-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.ico',
  './og.png',
  './icons/favicon-32.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './fonts/inter-latin-400.woff2',
  './fonts/inter-latin-500.woff2',
  './fonts/inter-latin-600.woff2',
  './fonts/inter-latin-700.woff2',
  './fonts/jetbrains-mono-latin-300.woff2',
  './fonts/jetbrains-mono-latin-400.woff2',
  './fonts/jetbrains-mono-latin-500.woff2',
  './fonts/jetbrains-mono-latin-600.woff2'
];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(ASSETS.map(async (path) => {
      const response = await fetch(new Request(path, { cache: 'reload' }));
      if (!response.ok) throw new Error('Precache failed for ' + path);
      await cache.put(path, response);
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const response = await fetch(request);
      if (response && (response.ok || response.type === 'opaque') && !response.redirected) {
        try { await cache.put(request, response.clone()); } catch (e) {}
      }
      return response;
    } catch (error) {
      const cached = await caches.match(request);
      if (cached) return cached;
      if (request.mode === 'navigate') {
        const shell = await caches.match('./index.html') || await caches.match('./');
        if (shell) return shell;
      }
      throw error;
    }
  })());
});
