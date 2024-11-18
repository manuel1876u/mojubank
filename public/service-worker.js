const CACHE_NAME = 'dbs-cache-v1';
const CACHE_FILES = [   
  '/IB/Welcome', 
  '/manifest.json', // Manifest file
  '/style.css',  
  '/styleb.css',
  '/script.js',  
  '/images/singerpaulfav.png', 
];
 


self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files...');
      return Promise.all(
        CACHE_FILES.map((file) => {
          return cache.add(file).catch((error) => {
            console.error(`Failed to cache ${file}:`, error);
          });
        })
      );
    })
  );
});




self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((error) => {
      console.error('Fetch failed:', error);
    })
  );
});
