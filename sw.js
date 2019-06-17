self.addEventListener('install', function (event) {
    console.log('SW Installed');
    event.waitUntil(
      caches.open('staticaasd')
        .then(function (cache) {
          // cache.add('/');
          // cache.add('/index.html');
          // cache.add('/src/js/app.js');
          cache.addAll([
            '/',
            '/index.html',
            '/style.css',
            '/img/logo.jpeg',
            '/img/petra.jpg',
          ]);
        })
    );
  });
  
  self.addEventListener('activate', function () {
    console.log('SW Activated');
  });
  
  addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open('staticaasd')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open('staticaasd')
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
}); 