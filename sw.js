const CACHE_NAME = 'calidef-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/scripts.js',
    '/images/gpk-hero.jpg'
];

// Install the service worker and cache the essential files
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Serve files from the cache
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});
