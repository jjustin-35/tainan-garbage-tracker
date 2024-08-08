const CACHE_NAME = 'tainan-trash-tracker-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/global.css',
  '/build/bundle.js',
  '/build/bundle.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});