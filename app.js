// Mendaftarkan aplikasi agar bisa di-install
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

let currentPrice = 2345.50; 
let currentH1Trend = "BULLISH"; // Tren besar awal

// 1. Jam Digital & Simulasi Harga Emas
setInterval(() => {
    const now = new Date();
    document.getElementById('time').innerText = now.toLocaleTimeString('id-ID');
}, 1000);

setInterval(() => {
    const change = (Math.random() * 2) - 1; 
    currentPrice += change;
    const priceEl = document.getElementById('price');
    priceEl.innerText = currentPrice.toFixed(2);
    priceEl.style.color = change >= 0 ? '#4ade80' : '#f87171';
}, 2000);

// 2. Mesin MTF (H1 Trend) - Berubah setiap 30 detik (Simulasi waktu lambat)
setInterval(() => {
    currentH1Trend = Math.random() > 0.5 ? "BULLISH" : "BEARISH";
    const trendCard = document.getElementById('trendCard');
    trendCard.innerText = `H1 TREND: ${currentH1Trend}`;
    
    // Ubah warna kartu tren MTF
    if(currentH1Trend === "BULLISH") {
        trendCard.className = 'card-conf card-active-buy';
    } else {
        trendCard.className = 'card-conf card-active-sell';
    }
}, 30000); // 30 detik

// 3. Mesin Eksekusi (M15 Signal) - Berubah setiap 15 detik
setInterval(() => {
    // Acak indikator lain (FVG, Liquidity, Volume)
    const cards = ['fvgCard', 'liqCard', 'volCard']; 
    cards.forEach(id => document.getElementById(id).className = 'card-conf');
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    const isBuy = Math.random() > 0.5;
    document.getElementById(randomCard).classList.add(isBuy ? 'card-active-buy' : 'card-active-sell');

    // Tampilkan Sinyal Entry
    const entryBox = document.getElementById('entryBox');
    const structureLabel = document.getElementById('structureLabel');
    const signalType = document.getElementById('signalType');
    
    entryBox.classList.remove('hidden');

    // CEK KESELARASAN MTF (H1 vs M15)
    let mtfStatus = "";
    if ((currentH1Trend === "BULLISH" && isBuy) || (currentH1Trend === "BEARISH" && !isBuy)) {
        mtfStatus = "🔥 HIGH PROBABILITY (H1 + M15 ALIGNED)";
    } else {
        mtfStatus = "⚠️ COUNTER TREND (RISKY)";
    }

    // Tampilkan Sinyal Berdasarkan M15
    if (isBuy) {
        // Gunakan innerHTML agar bisa pakai baris baru (<br>)
        structureLabel.innerHTML = `M15 BULLISH BOS<br><span class="text-[11px] text-yellow-500 font-normal tracking-widest">${mtfStatus}</span>`;
        structureLabel.style.color = "#4ade80";
        signalType.innerText = "SMC SIGNAL: BUY ENTRY (M15)";
        signalType.className = "py-2 bg-green-900/20 text-green-400 rounded-lg font-bold border border-green-800/50";
        document.getElementById('slVal').innerText = (currentPrice - 4.50).toFixed(2);
        document.getElementById('tpVal').innerText = (currentPrice + 12.00).toFixed(2);
    } else {
        structureLabel.innerHTML = `M15 BEARISH CHoCH<br><span class="text-[11px] text-yellow-500 font-normal tracking-widest">${mtfStatus}</span>`;
        structureLabel.style.color = "#f87171";
        signalType.innerText = "SMC SIGNAL: SELL ENTRY (M15)";
        signalType.className = "py-2 bg-red-900/20 text-red-400 rounded-lg font-bold border border-red-800/50";
        document.getElementById('slVal').innerText = (currentPrice + 4.50).toFixed(2);
        document.getElementById('tpVal').innerText = (currentPrice - 12.00).toFixed(2);
    }
}, 15000); // 15 detik
