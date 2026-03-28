import { fetchWeather } from "./apis.js";
import { renderNextDays, renderNextHours, toggleLoadings } from "./weather.js";

async function searchLocationWeather(location) {
  toggleLoadings();

  const weather = await fetchWeather(location);
  console.log(weather);

  toggleLoadings();

  renderNextHours(weather.nextHours);
  renderNextDays(weather.nextDays);
}

function setupSearch(inputEl) {
  searchLocationWeather("Manyar");

  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchLocationWeather(inputEl.value);
    }
  });
}

export { setupSearch };
