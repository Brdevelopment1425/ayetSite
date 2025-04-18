const resultsContainer = document.getElementById("results");
const input = document.getElementById("search");

input.addEventListener("input", async () => {
  const query = input.value.trim().toLowerCase();
  if (!query) {
    resultsContainer.innerHTML = "";
    return;
  }

  resultsContainer.innerHTML = "<div class='loading'>Yükleniyor...</div>";

  try {
    const res = await fetch(`https://api.alquran.cloud/v1/search/${query}/all/tr.diyanet`);
    const data = await res.json();

    if (!data.data || data.data.count === 0) {
      resultsContainer.innerHTML = "<div class='no-results'>Sonuç bulunamadı.</div>";
      return;
    }

    const ayat = data.data.matches;
    resultsContainer.innerHTML = "";

    for (const item of ayat.slice(0, 20)) {
      const sura = item.surah;

      const card = document.createElement("div");
      card.className = "ayah";
      card.innerHTML = `
        <div class="surename">📖 ${sura.englishName} [${sura.number}:${item.numberInSurah}]</div>
        <div class="ar">${item.text}</div>
        <div class="tr">${item.translation}</div>
      `;
      resultsContainer.appendChild(card);
    }
  } catch (err) {
    resultsContainer.innerHTML = "<div class='no-results'>Hata oluştu. Lütfen tekrar deneyin.</div>";
    console.error("API Hatası:", err);
  }
});
