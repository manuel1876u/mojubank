 
  
  self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('pwa-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/IB/Welcome',
          '/style.css', 
          '/styleb.css', 
          '/script.js',
          '/images/singerpaulfav.png',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });
  