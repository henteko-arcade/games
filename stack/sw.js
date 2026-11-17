// 以前の版で使っていた Service Worker。
// 今はサイト全体の sw.js（ひとつ上のフォルダ）に任せるので、自分を解除する。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('stack-tower')).map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
  );
});
