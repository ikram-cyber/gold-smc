// Menginstal Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Aplikasi siap di-install!');
});

// Mengambil data (Dibiarkan kosong dulu untuk dasar)
self.addEventListener('fetch', (e) => {
    // Mesin dibiarkan berjalan normal
});
