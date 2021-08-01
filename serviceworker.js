var staticCacheName = "pwa";

if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceworker.js')
    .then((reg)=> console.log('registered'))
    .catch((err)=>console.log('not registered'))

}

self.addEventListener("install", function (e) {
e.waitUntil(
	caches.open(staticCacheName).then(function (cache) {
	return cache.addAll(["/"]);
	})
);
});

self.addEventListener("fetch", function (event) {
console.log(event.request.url);

event.respondWith(
	caches.match(event.request).then(function (response) {
	return response || fetch(event.request);
	})
);
});
