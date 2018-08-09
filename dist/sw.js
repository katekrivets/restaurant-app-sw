'use strict';

var staticCacheNames = "restaurant-v1";
var urlsToCache = ['./', './index.html', './restaurant.html', './js/dbhelper.js', './js/main.js', './js/restaurant_info.js', './css/styles.css', './img/1.jpg', './img/2.jpg', './img/3.jpg', './img/4.jpg', './img/5.jpg', './img/6.jpg', './img/7.jpg', './img/8.jpg', './img/9.jpg', './img/10.jpg', './data/restaurants.json'];
self.addEventListener('install', function (event) {

    event.waitUntil(function () {
        caches.open(staticCacheNames).then(function (cache) {
            return cache.addAll(urlsToCache);
        }).then(self.skipWaiting());
    });
});

self.addEventListener('activate', function (event) {
    event.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.map(function (cache) {
            if (cache !== staticCacheNames) {
                console.log("removing cached files from ", cache);
                return caches.delete(cache);
            }
        }));
    }));
});

self.addEventListener('fetch', function (event) {
    console.log(event.request);

    event.respondWith(caches.match(event.request).then(function (response) {
        if (response) {
            return response;
        }
        return fetch(event.request);
    }));
});