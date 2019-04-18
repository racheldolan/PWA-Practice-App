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


