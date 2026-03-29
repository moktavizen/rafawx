function extractWeather(weather) {
  if (!weather) return;

  const currHour = new Date().getUTCHours() + weather.tzoffset;
  const nextHours = [...weather.days[0].hours, ...weather.days[1].hours].slice(
    currHour,
    currHour + 7,
  );

  // `weather.currentConditions` is often older than current hour.
  // We replace it with weather from current hour so its more accurate and consistent.
  const now = nextHours[0];

  const nextDays = weather.days.slice(0, 7);

  return {
    address: weather.resolvedAddress,
    now: now,
    nextHours: nextHours,
    nextDays: nextDays,
  };
}

async function fetchWeather(location) {
  const VISUAL_CROSSING_KEY = "4PD92DUXQVGHDSV7Q3YAAF24J";
  const queryUrl =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?` +
    "unitGroup=metric" +
    "&include=days%2Chours" +
    `&key=${VISUAL_CROSSING_KEY}` +
    "&contentType=json";

  try {
    const response = await fetch(queryUrl);
    if (!response.ok) throw new Error(`HTTP status: ${response.status}`);

    const rawWeather = await response.json();
    console.log(rawWeather);

    const weather = extractWeather(rawWeather);
    return weather;
  } catch (err) {
    console.error(err);
    return "";
  }
}

async function fetchGif() {
  // eydeltGdzzaOcLjID6BA86tbMcqrr0Zh
  const GIPHY_KEY = "";
  const queryUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${searchParam}`;

  try {
    const response = await fetch(queryUrl);
    if (!response.ok) throw new Error(`HTTP status: ${response.status}`);
    const gifs = response.json();
    return gifs;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export { fetchWeather, fetchGif };
