// 'self' is the serviceworker instance

// fires only when the service worker file is found to be new: either different to an existing sw (look for changes in bytes), 
// or the first sw registered on a site. Best practice to cache static files here so the app won't download these again unless they're updated
self.addEventListener("install", event => {
  const urlsToCache = [
  "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status",
  "/logo.png"
]
  event.waitUntil(
    cacheData(urlsToCache)
  )
});

const cacheData = async (urlsToCache) => {
  const cache = await caches.open("status")
  return cache.addAll(urlsToCache)
}

self.addEventListener('activate', event => {
  event.waitUntil(async () => {
    const cache = caches.open("status")
    const cacheNames = cache.keys()
    return Promise.all(cacheNames.filter(cacheName => cacheNames.indexOf(cacheName) === -1).map(cacheName => caches.delete(cacheName)))
  })
}) 

self.addEventListener('fetch', async event => {
  event.respondWith(event.request.destination === "image" ? fetchDataCacheFirst(event) : fetchDataNetworkFirst(event));
})


const fetchDataNetworkFirst = async event => {
  try {
    return await fetch(event.request);
  } catch (err) {
    return caches.match(event.request);
  }
}

const fetchDataCacheFirst = async event => {
  try {
    return caches.match(event.request)
  } catch (err) {
    return await fetch(event.request)
  }
}

self.addEventListener('sync', event => {
  const urlsToCache = ["https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status"]
  event.waitUntil(cacheData(urlsToCache))
})


