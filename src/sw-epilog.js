self.addEventListener("install", event => {
  event.waitUntil(() => {
    const cache = caches.open("tubeStatus");
    
    console.log('caches ', caches)
    console.log('cache ', cache)
    return cache.add(
      "https://api.tfl.gov.uk/line/mode/tube,overground,dlr,tflrail/status"
    );
  });
});

self.addEventListener('fetch', event => {
  console.log('in fetch try/catch ', event.request.url)
   event.respondWith(async () => {
  //  if(event.request.url.includes('api.tfl.gov.uk')){
    // try {
      console.log('making network request ', event.request.url)
      return await fetch(event.request.url, {mode: 'no-cors'})
    // } catch (err) {
    //   console.log('responding with cached data ', event.request.url)
    //   if(caches.match(event.request.url)) return caches.match(event.request.url)
    //   console.log('An Error Occurred');
    // }
  // }
  //   try {
  //     return caches.match(event.request)
  //   } catch (err) {
  //     return await fetch(event.request, {mode: 'no-cors'})
  //   }
  })
});

