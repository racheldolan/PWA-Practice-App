self.addEventListener("install", event => {
  return event.waitUntil(() => {
    const cache = caches.open("tubeStatus");
    return cache.add(
      "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status"
    );
  });
});

self.addEventListener('fetch', event => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request);
    } catch (err) {
      return caches.match(event.request);
    }
  }());
});
