let staticCacheNames = "restaurant-v1";
let urlsToCache = [
    './',
    './index.html',
    './restaurant.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './css/styles.css',
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/6.jpg',
    './img/7.jpg',
    './img/8.jpg',
    './img/9.jpg',
    './img/10.jpg',
    './data/restaurants.json'
];
self.addEventListener('install', (event) => {

    event.waitUntil(() => {
        caches.open(staticCacheNames)
            .then(cache => cache.addAll(urlsToCache))
            .then(self.skipWaiting());
    })
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => Promise.all(cacheNames.map(cache => {
            if (cache !== staticCacheNames) {
                console.log("removing cached files from ", cache);
                return caches.delete(cache);
            }
        })))
    )
});

self.addEventListener('fetch', event => {
    console.log(event.request)

    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })

    );
});