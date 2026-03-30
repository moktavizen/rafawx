import { fetchGif, fetchWeather } from "./apis.js";
import { renderNextDays, renderNextHours, renderNow, renderLoadingCards } from "./weather.js";

const state = {
  location: "",
  unit: "",
};

async function searchLocationWeather() {
  try {
    renderLoadingCards("Loading...");
    const weather = await fetchWeather(state.location, state.unit);
    const gifUrl = await fetchGif(weather.now.icon);

    renderNextHours(weather.nextHours);
    renderNextDays(weather.nextDays);
    renderNow(gifUrl, weather.address, state.unit, weather.now);
  } catch {
    renderLoadingCards(`No result for "${state.location}"<br />Try longer description`);
  }
}

function setupSearch(inputEl) {
  inputEl.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      state.location = inputEl.value;
      searchLocationWeather();
      inputEl.blur();
    }
  });

  const unitToggleBtn = document.querySelector("#unit-toggle");
  const celciusSpan = document.querySelector("#celcius");
  const fahrenheitSpan = document.querySelector("#fahrenheit");
  unitToggleBtn.addEventListener("click", () => {
    celciusSpan.classList.toggle("selected-unit");
    fahrenheitSpan.classList.toggle("selected-unit");

    if (celciusSpan.classList.contains("selected-unit")) {
      state.unit = "celcius";
    } else {
      state.unit = "fahrenheit";
    }

    searchLocationWeather();
  });

  state.location = "Miami";
  state.unit = "celcius";
  searchLocationWeather();
}

export { setupSearch };
