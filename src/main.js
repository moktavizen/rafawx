import "./styles/reset.css";
import "./styles/style.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
<div class="container">
  <h1>Vanilla JS Template</h1>
  <button id="counter" type="button" class="counter"></button>
</div>
`;

setupCounter(document.querySelector("#counter"));
