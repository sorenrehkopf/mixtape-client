self.addEventListener('install', event => {
	console.log('the install event', event, self);
});

self.addEventListener('fetch', event => {
	console.log(event);
	event.respondWith(
    caches.match(event.request).then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
    );
});

if ('actions' in navigator) {
	console.log('adding event listener!');
	navigator.actions.addEventListener('share', event => {
  	console.log('the event!', event)
	});
}