import { fetchGif, fetchWeather } from "./apis.js";
import { renderNextDays, renderNextHours, renderNow, toggleLoadings } from "./weather.js";

async function searchLocationWeather(location) {
  toggleLoadings();

  const weather = await fetchWeather(location);
  const gifUrl = await fetchGif(weather.now.icon);

  toggleLoadings();

  renderNextHours(weather.nextHours);
  renderNextDays(weather.nextDays);
  renderNow(gifUrl, weather.address, weather.now);
}

function setupSearch(inputEl) {
  searchLocationWeather("Greenwich");

  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchLocationWeather(inputEl.value);
    }
  });
}

export { setupSearch };
