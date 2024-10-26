const VERSION = 8;
// const CACHE_NAME = `talkhouse-${VERSION}`;
var isOnline = true;

/*
const APP_SHELL = [
  '/', // Cache your root URL (homepage)
  '/index.html', // Main HTML file
  '/assets/icons/icon-192x192.png',  // Add any other static assets you want to cache, like images, fonts, etc.
  '/assets/icons/icon-512x512.png',
  '/assets/icons/screenshot-1/png',
  '/assets/icons/screenshot-2/png',
];
*/

// Install event: Cache essential resources
self.addEventListener('install', (event) => {
  console.log(`Service Worker (v${VERSION}) installed`);
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event: Clean up old caches if needed
self.addEventListener('activate', (event) => {
  event.waitUntil(handleActivation());
});

async function handleActivation() {
  // clear old caches (any cache key that is not the current version) before activating the new
  // service worker version
  // We are clearing the old caches because we have been activated which lets us know that the old
  // service worker is no longer in use and is deactivated and no longer using any of those resources.
  // It'd be a really bad idea to delete the cache during installation because the old service worker
  // might still be using those resources and we could crash something.
  // await clearCaches();

  // cache the app shell (static assets) so that the app can work offline
  // await cacheAppShell();

  // take control of all clients(tabs) that are currently open and using the old service worker
  // This will cause the old service worker to be terminated and the new service worker to take over
  // This is done to ensure that the new service worker is in control of all the clients that are
  // currently open. This will fire the "controllerchange" event in the main thread.
  await clients.claim();
  console.log(`Service Worker (v${VERSION}) activated`);
}

// clear old caches (any cache key that is not the current version)
/*
async function clearCaches() {
  var cacheNames = await caches.keys();
  var oldCacheNames = cacheNames.filter(function matchOldCache(
    cacheName
  ) {
    // find the cache key that has the pattern of talkhouse-<number> and that number is not
    // the current version
    var [, cacheNameVersion] =
      cacheName.match(/^talkhouse-(\d+)$/) || [];
    cacheNameVersion =
      cacheNameVersion != null
        ? Number(cacheNameVersion)
        : cacheNameVersion;
    return cacheNameVersion > 0 && VERSION !== cacheNameVersion;
  });
  await Promise.all(
    oldCacheNames.map(function deleteCache(cacheName) {
      return caches.delete(cacheName);
    })
  );
}

async function cacheAppShell() {
  try {
    var cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
  } catch (error) {
    console.error('Caching app shell failed:', error);
  }
}

self.addEventListener('fetch', (event) => {
  event.respondWith(router(event.request));
});

async function router(request) {
  // const url = new URL(request.url);
  // var reqURL = url.pathname; // URL path only, like /about, /contact, /login, etc
  var cache = await caches.open(CACHE_NAME);

  // url.origin === location.origin && request.method === 'GET'
  if (request.method === 'GET') {
    // If it's a GET request, handle it and cache it
    // network-first
    try {
      // fetch the request from the network
      const fetchResponse = await fetch(request);
      if (fetchResponse.ok) {
        // if the fetch was successful, cache the response
        cache.put(request, fetchResponse.clone());

        return fetchResponse;
      }
    } catch (err) {
      // if the fetch failed, serve the cached response
      const cachedResponse = await cache.match(request);
      return cachedResponse || fetch(request);
    }
  } else {
    // Let the browser do its default thing
    return fetch(request);
  }
}


*/

self.addEventListener('push', (event) => {
  const data = event.data.json();
  console.info('New notification', data);
  const options = {
    icon: '/assets/icons/icon-192x192.png',
    badge: '/assets/icons/icon-36x36.png',
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
    body: data.body,
    vibrate: [100, 50, 100, 50, 100], // vibrate for 100ms, pause for 50ms, then vibrate for 100ms (Android only)
    tag: data.tag,
    requireInteraction: true,
    renotify: true,
    silent: false,
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  const clickedNotification = event.notification;
  console.log('Notification clicked', clickedNotification);
  clickedNotification.close();

  const url = new URL(self.location.origin);
  console.log('URL', url);
  if (event.action === 'close') {
    return;
  } else {
    const url = new URL(self.location.origin);
    const promiseChain = self.clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        let matchingClient = windowClients[0];
        if (matchingClient) {
          return matchingClient
            .navigate(url)
            .then((matchingClient) => matchingClient.focus());
        } else {
          return self.clients.openWindow(url);
        }
      });

    event.waitUntil(promiseChain);
  }
});

self.addEventListener('notificationclose', function (event) {
  console.log('Notification was closed', event);
});
