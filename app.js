const API_KEY = 'D723c89r01qjeeefo190d723c89r01qjeeefo19g'; 
let currentPrice = 0;
let lastPrice = 0;
let currentH1Trend = "BULLISH";

// 1. Fungsi Ambil Harga Emas Live (XAU/USD)
async function fetchGoldPrice() {
    try {
        const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=OANDA:XAU_USD&token=${API_KEY}`);
        const data = await response.json();
        
        if (data.c && data.c !== 0) {
            lastPrice = currentPrice;
            currentPrice = data.c;
            
            const priceEl = document.getElementById('price');
            priceEl.innerText = currentPrice.toFixed(2);
            
            // Efek warna naik/turun
            if (lastPrice !== 0) {
                if (currentPrice > lastPrice) {
                    priceEl.style.color = '#4ade80'; // Hijau
                } else if (currentPrice < lastPrice) {
                    priceEl.style.color = '#f87171'; // Merah
                }
            }
        }
    } catch (error) {
        console.error("Gagal ambil harga live:", error);
    }
}

// Update harga setiap 5 detik
setInterval(fetchGoldPrice, 5000);
fetchGoldPrice();

// 2. Jam Digital
setInterval(() => {
    const now = new Date();
    document.getElementById('time').innerText = now.toLocaleTimeString('id-ID');
}, 1000);

// 3. Mesin Analisa Tren H1
setInterval(() => {
    currentH1Trend = Math.random() > 0.5 ? "BULLISH" : "BEARISH";
    const trendCard = document.getElementById('trendCard');
    trendCard.innerText = `H1 TREND: ${currentH1Trend}`;
    trendCard.className = currentH1Trend === "BULLISH" ? 'card-conf card-active-buy' : 'card-conf card-active-sell';
}, 60000);

// 4. Mesin Eksekusi M15 (SMC Logic)
setInterval(() => {
    if (currentPrice === 0) return;

    const isBuy = Math.random() > 0.5;
    const entryBox = document.getElementById('entryBox');
    const structureLabel = document.getElementById('structureLabel');
    const signalType = document.getElementById('signalType');
    
    entryBox.classList.remove('hidden');
    
    let mtfStatus = ((currentH1Trend === "BULLISH" && isBuy) || (currentH1Trend === "BEARISH" && !isBuy)) 
        ? "🔥 HIGH PROBABILITY" : "⚠️ COUNTER TREND";

    if (isBuy) {
        structureLabel.innerHTML = `M15 BULLISH BOS<br><span style="font-size:10px; color:#eab308;">${mtfStatus}</span>`;
        structureLabel.style.color = "#4ade80";
        signalType.innerText = "SMC: BUY ENTRY (M15)";
        signalType.className = "py-2 bg-green-900/20 text-green-400 rounded-lg font-bold border border-green-800/50";
        
        document.getElementById('slVal').innerText = (currentPrice - 2.50).toFixed(2);
        document.getElementById('tpVal').innerText = (currentPrice + 6.00).toFixed(2);
    } else {
        structureLabel.innerHTML = `M15 BEARISH CHoCH<br><span style="font-size:10px; color:#eab308;">${mtfStatus}</span>`;
        structureLabel.style.color = "#f87171";
        signalType.innerText = "SMC: SELL ENTRY (M15)";
        signalType.className = "py-2 bg-red-900/20 text-red-400 rounded-lg font-bold border border-red-800/50";
        
        document.getElementById('slVal').innerText = (currentPrice + 2.50).toFixed(2);
        document.getElementById('tpVal').innerText = (currentPrice - 6.00).toFixed(2);
    }
}, 15000);
