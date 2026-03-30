function renderLoading(el, msg) {
  el.classList.add("loading");

  el.innerHTML = msg;
}

function renderLoadingCards(msg) {
  renderLoading(document.querySelector("#next-hours"), msg);
  renderLoading(document.querySelector("#now"), msg);
  renderLoading(document.querySelector("#next-days"), msg);
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
  nextHoursDiv.classList = "card list";
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
  nextDaysDiv.classList = "card list";
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
  const nowDiv = document.querySelector("#now");
  nowDiv.classList = "card main-weather";

  nowDiv.innerHTML = `
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

export { renderLoadingCards, renderNextHours, renderNextDays, renderNow };
