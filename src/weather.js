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
    const hourForecast = {
      time: isFirstLoop ? "Now" : hour.datetime.slice(0, -3),
      precipProb: Math.round(hour.precipprob),
      temperature: Math.round(hour.temp),
    };

    renderForecast(nextHoursDiv, "🕓", hourForecast);

    isFirstLoop = false;
  }
}

function renderNextDays(nextDays) {
  const nextDaysDiv = document.querySelector("#next-days");

  nextDaysDiv.innerHTML = "";

  let isFirstLoop = true;
  for (const day of nextDays) {
    const dayForecast = {
      time: isFirstLoop
        ? "Today"
        : new Date(day.datetime).toLocaleDateString("en-US", { weekday: "short" }),
      precipProb: Math.round(day.precipprob),
      temperature: Math.round(day.temp),
    };

    renderForecast(nextDaysDiv, "🗓️", dayForecast);

    isFirstLoop = false;
  }
}

function renderNow(gifUrl, address, { temp, conditions }) {
  document.querySelector("#now").innerHTML = `
  <div id="weather-bg" class="weather-bg"></div>
  <div class="bg-filter"></div>
  <div class="weather-info">
    <div id="location" class="location">London</div>
    <div id="temperature" class="temperature">29°</div>
    <div id="condition" class="condition">Cloudy</div>
  </div>
  `;

  const formattedAddress = address.split(",")[0];
  const temperature = Math.round(temp);
  // const precipProb = Math.fround(precipprob);

  document.querySelector("#weather-bg").style.backgroundImage = `url(${gifUrl})`;
  document.querySelector("#location").textContent = formattedAddress;
  document.querySelector("#temperature").textContent = temperature + "°";
  document.querySelector("#condition").textContent = conditions;
}

export { toggleLoadings, renderNextHours, renderNextDays, renderNow };
