/* Mi Rutina: service worker. Versión 32e2857840 (cambia sola cuando cambia la app). */
const CACHE='mi-rutina-32e2857840';
const SHELL=["./", "index.html", "manifest.webmanifest", "icon.svg", "icon-192.png", "icon-512.png", "maskable-512.png", "apple-touch-icon-180.png"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mi-rutina-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){e.respondWith(caches.match('index.html').then(c=>c||fetch(r)));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(c=>c||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CACHE).then(ca=>ca.put(r,cp))}return res})));
});
