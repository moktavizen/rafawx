function extractWeather(weather) {
  if (!weather) return;

  const nextDays = weather.days.slice(0, 7);

  const currHour = Number(
    new Date()
      .toLocaleTimeString("en-US", {
        timeZone: weather.timezone,
        hourCycle: "h23",
      })
      .split(":")[0],
  );
  const nextHours = [...nextDays[0].hours, ...nextDays[1].hours].slice(currHour, currHour + 7);

  // `weather.currentConditions` is often older than current hour.
  // We replace it with weather from current hour so its more accurate and consistent.
  const now = nextHours[0];

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
    console.log(weather);
    return weather;
  } catch (err) {
    console.error(err);
    return "";
  }
}

async function fetchGif(searchStr) {
  const searchParam = searchStr + "-sky";
  console.log(searchParam);
  const GIPHY_KEY = "eydeltGdzzaOcLjID6BA86tbMcqrr0Zh";
  const queryUrl = `https://api.giphy.com/v1/gifs/translate?api_key=${GIPHY_KEY}&s=${encodeURIComponent(searchParam)}`;

  try {
    const response = await fetch(queryUrl);
    if (!response.ok) throw new Error(`HTTP status: ${response.status}`);
    const gif = await response.json();
    const gifUrl = gif.data.images.original.url;
    console.log(gifUrl);
    return gifUrl;
  } catch (err) {
    console.error(err);
    return "./assets/cloudy.gif";
  }
}

export { fetchWeather, fetchGif };
