const CACHE='mijn-cockpit-v6-20261106';
self.addEventListener('install',event=>{self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{for(const name of await caches.keys()){if(name.startsWith('mijn-cockpit-')&&name!==CACHE)await caches.delete(name)}await self.clients.claim()})())});
self.addEventListener('fetch',event=>{const url=new URL(event.request.url);if(event.request.method!=='GET'||url.origin!==location.origin)return;
// Never cache account/API data. For HTML prefer network to avoid old security code.
event.respondWith((async()=>{try{const response=await fetch(event.request);if(response.ok){const cache=await caches.open(CACHE);await cache.put(event.request,response.clone())}return response}catch(e){return (await caches.match(event.request))||Response.error()}})())});