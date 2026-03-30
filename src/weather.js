function toggleLoading(el) {
  el.classList.toggle("loading");

  if (el.classList.contains("loading")) {
    el.innerHTML = "Loading...";
  }
}

function toggleLoadings() {
  toggleLoading(document.querySelector("#next-hours"));
  toggleLoading(document.querySelector("#now"));
  toggleLoading(document.querySelector("#next-days"));
}

function renderForecast(parentEl, timeIcon, { time, precipProb, temperature }) {
  const forecastDiv = document.createElement("div");
  forecastDiv.classList = "forecast";
  forecastDiv.innerHTML = `
  <div>${timeIcon} ${time}</div>
  <div>💧 ${precipProb}%</div>
  <div>🌡️ ${temperature}°</div>
  `;
  parentEl.appendChild(forecastDiv);

  const dividerDiv = document.createElement("div");
  dividerDiv.classList = "divider";
  parentEl.appendChild(dividerDiv);
}

function renderNextHours(nextHours) {
  const nextHoursDiv = document.querySelector("#next-hours");

  nextHoursDiv.innerHTML = "";

  let isFirstLoop = true;
  for (const hour of nextHours) {
    const formattedForecast = {
      time: isFirstLoop ? "Now" : hour.datetime.slice(0, -3),
      precipProb: Math.round(hour.precipprob),
      temperature: Math.round(hour.temp),
    };

    renderForecast(nextHoursDiv, "🕓", formattedForecast);

    isFirstLoop = false;
  }
}

function renderNextDays(nextDays) {
  const nextDaysDiv = document.querySelector("#next-days");

  nextDaysDiv.innerHTML = "";

  let isFirstLoop = true;
  for (const day of nextDays) {
    const formattedForecast = {
      time: isFirstLoop
        ? "Today"
        : new Date(day.datetime).toLocaleDateString("en-US", { weekday: "short" }),
      precipProb: Math.round(day.precipprob),
      temperature: Math.round(day.temp),
    };

    renderForecast(nextDaysDiv, "🗓️", formattedForecast);

    isFirstLoop = false;
  }
}

function renderNow(gifUrl, address, { temp, precipprob, windspeed, conditions }) {
  document.querySelector("#now").innerHTML = `
  <div class="weather-bg" style="background-image: url(${gifUrl});"></div>
  <div class="bg-filter"></div>
  <div class="weather-info">
    <div class="location">${address.split(",")[0]}</div>
    <div class="temperature">${Math.round(temp)}<span class="temp-unit">℃</span></div>
    <div class="condition">${conditions}</div>
    <div class="other-metrics">
      <span >💧 ${precipprob}%</span>
      <span >💨 ${windspeed}</span>
    </div>
  </div>
  `;
}

export { toggleLoadings, renderNextHours, renderNextDays, renderNow };
