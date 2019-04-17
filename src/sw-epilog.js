self.addEventListener("install", event => {
  event.waitUntil(
    cacheData()
  )
});

const cacheData = () => {
  caches.open("status").then(cache => {
    return cache.add("https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status")
  })
}


self.addEventListener('fetch', async event => {
  event.respondWith(getData(event));
})


const getData = async event => {
  try {
    return await fetch(event.request);
  } catch (err) {
    return caches.match(event.request);
  }
}

self.addEventListener('sync', event => {
  event.waitUntil(cacheData())
})


