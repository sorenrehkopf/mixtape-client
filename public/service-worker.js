const cacheName = 'mixtapeCache';
const cacheVersion = 1;

const acceptsHtml = (request) => {
  return request.headers.get('Accept')
    .split(',')
    .some(type => type == 'text/html');
};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(`${cacheName}${cacheVersion}`)
      .then(cache => cache.addAll([
        '/offline.html',
        '/favicon.ico'
      ]))
    );
});

self.addEventListener('fetch', (event) => {
  if (acceptsHtml(event.request)) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

if ('actions' in navigator) {
	console.log('adding event listener!');
	navigator.actions.addEventListener('share', event => {
  	console.log('the event!', event)
	});
}