(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e){if(!e)return;let t=e.days.slice(0,7),n=Number(new Date().toLocaleTimeString(`en-US`,{timeZone:e.timezone,hourCycle:`h23`}).split(`:`)[0]),r=[...t[0].hours,...t[1].hours].slice(n,n+7),i=r[0];return{address:e.resolvedAddress,now:i,nextHours:r,nextDays:t}}async function t(t,n){let r=`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(t)}?unitGroup=${n===`celcius`?`metric`:`us`}&include=days%2Chours&key=4PD92DUXQVGHDSV7Q3YAAF24J&contentType=json`;try{let t=await fetch(r);if(!t.ok)throw Error(`HTTP status: ${t.status}`);return e(await t.json())}catch(e){return console.error(e),``}}async function n(e){let t=e+`-sky`,n=`https://api.giphy.com/v1/gifs/translate?api_key=eydeltGdzzaOcLjID6BA86tbMcqrr0Zh&s=${encodeURIComponent(t)}`;try{let e=await fetch(n);if(!e.ok)throw Error(`HTTP status: ${e.status}`);let t=await e.json();if(t.data.length===0)throw Error(`Empty data: ${JSON.stringify(gifData)}`);return t.data.images.original.url}catch(e){return console.error(e),`./assets/images/cloudy.gif`}}function r(e,t){e.classList.add(`loading`),e.innerHTML=t}function i(e){r(document.querySelector(`#next-hours`),e),r(document.querySelector(`#now`),e),r(document.querySelector(`#next-days`),e)}function a(e,t,{time:n,precipProb:r,temperature:i}){let a=document.createElement(`div`);a.classList=`forecast`,a.innerHTML=`
  <span>${t} ${n}</span><span>💧 ${r}%</span><span>🌡️ ${i}°</span>
  `,e.appendChild(a);let o=document.createElement(`div`);o.classList=`divider`,e.appendChild(o)}function o(e){let t=document.querySelector(`#next-hours`);t.classList=`card list`,t.innerHTML=``;let n=!0;for(let r of e)a(t,`🕓`,{time:n?`Now`:r.datetime.slice(0,-3),precipProb:Math.round(r.precipprob),temperature:Math.round(r.temp)}),n=!1}function s(e){let t=document.querySelector(`#next-days`);t.classList=`card list`,t.innerHTML=``;let n=!0;for(let r of e)a(t,`🗓️`,{time:n?`Today`:new Date(r.datetime).toLocaleDateString(`en-US`,{weekday:`short`}),precipProb:Math.round(r.precipprob),temperature:Math.round(r.temp)}),n=!1}function c(e,t,n,{temp:r,precipprob:i,windspeed:a,conditions:o}){let s=document.querySelector(`#now`);s.classList=`card main-weather`,s.innerHTML=`
  <div class="weather-bg" style="background-image: url(${e});"></div>
  <div class="bg-filter"></div>
  <div class="weather-info">
    <div class="location">${t.split(`,`)[0]}</div>
    <div class="temperature">${Math.round(r)}<span class="temp-unit">${n===`celcius`?`℃`:`℉`}</span></div>
    <div class="condition">${o}</div>
    <div class="other-metrics">
      <span >💧 ${i}%</span>
      <span >💨 ${a}</span>
    </div>
  </div>
  `}var l={location:``,unit:``};async function u(){try{i(`Loading...`);let e=await t(l.location,l.unit),r=await n(e.now.icon);o(e.nextHours),s(e.nextDays),c(r,e.address,l.unit,e.now)}catch{i(`No result for "${l.location}"<br />Try longer description`)}}function d(e){e.addEventListener(`keypress`,t=>{t.key===`Enter`&&(l.location=e.value,u(),e.blur())});let t=document.querySelector(`#unit-toggle`),n=document.querySelector(`#celcius`),r=document.querySelector(`#fahrenheit`);t.addEventListener(`click`,()=>{n.classList.toggle(`selected-unit`),r.classList.toggle(`selected-unit`),n.classList.contains(`selected-unit`)?l.unit=`celcius`:l.unit=`fahrenheit`,u()}),l.location=`Miami`,l.unit=`celcius`,u()}document.querySelector(`#app`).innerHTML=`
<header>
  <nav class="container">
    <a class="logo" href="#">🌦️ rafa<span class="logo-accent">wx</span></a>
    <div class="search-bar">
      <input
        id="search"
        class="search-input"
        type="text"
        placeholder="🔍 Search city or address"
      />
      <div class="unit-divider"></div>
      <button id="unit-toggle" class="unit-toggle">
        <span id="celcius" class="selected-unit">C</span> / <span id="fahrenheit">F</span>
      </button>
    </div>
    <a class="github-link" href="https://github.com/moktavizen/rafawx" target="_blank">
      <!-- prettier-ignore -->
      <svg class="icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    </a>
  </nav>
</header>
<div class="main">
  <div class="weather container">
    <div id="next-hours" class="card list"></div>
    <div id="now" class="card main-weather"></div>
    <div id="next-days" class="card list"></div>
  </div>
</div>
`,d(document.querySelector(`#search`));