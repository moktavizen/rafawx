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

export { toggleLoadings, renderNextHours, renderNextDays };
