let chart;
let watchlistCoins = [
    "bitcoin",
    "ethereum",
    "solana",
    "ripple",
    "sui"
];

async function getPrice() {

}
async function getPrice() {
    const coin = document.getElementById("coinInput").value.trim().toLowerCase();
    const alertPrice = Number(document.getElementById("alertPrice").value);
    console.log("Alert Price:", alertPrice);

    const url =
"https://pro-api.coingecko.com/api/v3/simple/price?ids=" +
coin +
"&vs_currencies=usd&include_24hr_change=true&include_market_cap=true";
        const response = await fetch(url, {
  headers: {
    "x-cg-pro-api-key": "addkeys"
  }
});
        const data = await response.json();
        console.log(data);

if (!data[coin]) {
  document.getElementById("result").textContent =
    "Coin not found!";
  return;
}
 const currentPrice = data[coin].usd;
 if (alertPrice > 0 && currentPrice >= alertPrice) {
    alert(
  "🚨 " +
  coin.toUpperCase() +
  " has reached your target price of $" +
  alertPrice.toLocaleString()
);
}
 
 const change = data[coin].usd_24h_change;
const marketCap = data[coin].usd_market_cap;
 let marketCapDisplay;

if (marketCap >= 1000000000000) {
    marketCapDisplay = (marketCap / 1000000000000).toFixed(2) + "T";
} else if (marketCap >= 1000000000) {
    marketCapDisplay = (marketCap / 1000000000).toFixed(2) + "B";
} else {
    marketCapDisplay = (marketCap / 1000000).toFixed(2) + "M";
}
 const color = change >= 0 ? "green" : "red";
 
document.getElementById("result").innerHTML =
  "<strong>" + coin.toUpperCase() + "</strong><br>" +
  "Price: $" + data[coin].usd.toLocaleString() + "<br>" +
  "Market Cap: $" + marketCapDisplay + "<br>" +
  "24h Change: <span style='color:" + color + "'>" +
  (change > 0 ? "📈 " : "📉 ") +
  change.toFixed(2) +
  "%</span>" +
  "<br><br><small>Updated: " +
  new Date().toLocaleTimeString() +
  "</small>";
} 
async function showTrendingCoins() {
  const url =
"https://pro-api.coingecko.com/api/v3/search/trending";
const response = await fetch(url, {
  headers: {
    "x-cg-pro-api-key": "addkeys"
  }
});
const data = await response.json();
let trendingList = "";

for (let i = 0; i < data.coins.length; i++) {

const coin = data.coins[i].item;

trendingList +=
'<div style="display:flex;justify-content:space-between;align-items:center;background:#334155;padding:15px;border-radius:12px;margin:10px 0;">' +

'<div style="display:flex;align-items:center;gap:12px;">' +

'<span style="font-weight:bold;">#' + (i + 1) + '</span>' +

'<img src="' + coin.small + '" width="40" height="40">' +

'<div>' +
'<strong>' + coin.name + '</strong><br>' +
'<small>' + coin.symbol.toUpperCase() + '</small>' +
'</div>' +

'</div>' +

'<div style="text-align:right;">' +
'<strong>Rank #' + coin.market_cap_rank + '</strong><br>' +
'<small>Score: ' + coin.score + '</small>' +
'</div>' +

'</div>';
}



    
document.getElementById("result").innerHTML =
    "<strong>Trending Coins</strong><br>" +
    trendingList;

}
  async function showWatchlist() {

    const coins = watchlistCoins;

    const url =
"https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=" +
coins.join(",");

    const response = await fetch(url, {
        headers: {
            "x-cg-pro-api-key": "Addkeys"
        }
    });

    const data = await response.json();

    let watchlist = "<h3>⭐ Watchlist</h3>";

    for (let i = 0; i < data.length; i++) {

const coin = data[i];

watchlist +=
'<div style="display:flex;justify-content:space-between;align-items:center;background:#334155;padding:15px;border-radius:12px;margin:10px 0;">' +

'<div style="display:flex;align-items:center;gap:10px;">' +

'<img src="' + coin.image + '" width="35">' +

'<div>' +
'<strong>' + coin.name + '</strong><br>' +
'$' + coin.current_price.toLocaleString() +
'</div>' +

'</div>' +

'<button onclick="removeCoin(\'' + coin.id + '\')">❌ Remove</button>' +

'</div>';

}

    document.getElementById("result").innerHTML =
        watchlist;
}
function addToWatchlist() {

    const coin =
        document.getElementById("coinInput")
        .value
        .trim()
        .toLowerCase();

    if (!coin) {
        alert("Enter a coin name");
        return;
    }

    if (watchlistCoins.includes(coin)) {
        alert("Coin already in watchlist");
        return;
    }

    watchlistCoins.push(coin);

    localStorage.setItem(
        "watchlistCoins",
        JSON.stringify(watchlistCoins)
    );

    alert(coin.toUpperCase() + " added!");
}
function removeCoin(coin) {

    watchlistCoins =
        watchlistCoins.filter(c => c !== coin);

    localStorage.setItem(
        "watchlistCoins",
        JSON.stringify(watchlistCoins)
    );

    showWatchlist();
}

    document.getElementById("result").innerHTML =
        "<h2>⭐ Watchlist Cleared</h2>";
      

        document.getElementById("getPriceBtn")
    .addEventListener("click", getPrice);
    document.getElementById("trendingBtn")
    .addEventListener("click", showTrendingCoins);
    document.getElementById("watchlistBtn")
    .addEventListener("click", showWatchlist);
    document.getElementById("addWatchlistBtn")
    .addEventListener("click", addToWatchlist);


  
    setInterval(function() {

    const coin =
        document.getElementById("coinInput")
        .value
        .trim();

    if (coin) {
        getPrice();
    }
}, 30000);