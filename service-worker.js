const CACHE_NAME = 'myFirstPWA-v1';
const ASSETS = [
  '/myFirstPWA/',
  '/myFirstPWA/index.html',
  '/myFirstPWA/manifest.json',
  '/myFirstPWA/icons/icon-192.png',
  '/myFirstPWA/icons/icon-512.png',
  '/myFirstPWA/paginas/home.html',
  '/myFirstPWA/paginas/sobre.html',
  '/myFirstPWA/paginas/contato.html',
  '/myFirstPWA/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(async () => {
        const cached = await caches.match(event.request);
        return cached || caches.match('/myFirstPWA/offline.html');
      })
  );
});
