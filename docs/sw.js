// src: https://github.com/chetanmishra8660/chetanmishra8660.github.io/blob/master/service-worker.js
self.addEventListener('install', (event) => {
	console.log('YY', 'install', event)
	self.skipWaiting()
})

self.addEventListener('activate', (event) => {
	console.log('YY', 'activate', event)
	return self.clients.claim()
})

self.addEventListener('fetch', function (event) {
	// console.log('YY', 'fetch', event);
	event.respondWith(fetch(event.request))
})
