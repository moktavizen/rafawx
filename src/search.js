import { fetchGif, fetchWeather } from "./apis.js";
import { renderNextDays, renderNextHours, renderNow, renderLoadingCards } from "./weather.js";

async function searchLocationWeather(location) {
  try {
    renderLoadingCards("Loading...");
    const weather = await fetchWeather(location);
    const gifUrl = await fetchGif(weather.now.icon);

    renderNextHours(weather.nextHours);
    renderNextDays(weather.nextDays);
    renderNow(gifUrl, weather.address, weather.now);
  } catch {
    renderLoadingCards(`No result for "${location}"<br />Try longer description`);
  }
}

function setupSearch(inputEl) {
  searchLocationWeather("Miami");

  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchLocationWeather(inputEl.value);
    }
  });
}

export { setupSearch };
