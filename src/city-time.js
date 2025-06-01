// A bit strange, I know! I couldn't find a free API that included both city and timezone. So...
function showInfo() {
  let zone = document.querySelector("#display");
  zone.innerHTML = `<div
          class="row show-info border border-secondary pt-5 rounded-3 m-3" style="background-color: #d5e9f7"
        ><div class="col-md-6 text-center ">
            <h3 class="fst-italic"> ${
              searchInput.charAt(0).toUpperCase() + searchInput.slice(1)
            },${country} <br/><span class="fs-5">(${timeZone})</span></h3>
          </div>
          <div class=" col-md-6 text-center">
            <h1>
              <span class="fw-bold" > ${moment()
                .tz(timeZone)
                .format("hh:mm:ss")}</span
              ><span class="fs-3 align-top" >${moment()
                .tz(timeZone)
                .format("A")}</span>
            </h1>
<p> ${moment().tz(timeZone).format("MMMM Do, YYYY")}</p>
          </div></div>`;
}
setInterval(showInfo, 1000);
function findTimeZone(response) {
  timeZone = response.data.timeZone;
  showInfo();
}

function callTimeApi(response) {
  if (response.data.message === "City not found") {
    alert("Please enter correct city name!");
  } else {
    let latitude = response.data.coordinates.latitude;
    let longitude = response.data.coordinates.longitude;
    country = response.data.country;
  
    let apiUrl = `https://timeapi.io/api/time/current/coordinate?latitude=${latitude}&longitude=${longitude}`;
    axios.get(apiUrl).then(findTimeZone);
  }
}

function callWeatherApi(event) {
  event.preventDefault();
  searchInput = document.querySelector("#input-search").value;
  let apiKey = "71c9o8ef0370bd39a326b41301fb04bt";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInput}&key=${apiKey}`;
  axios.get(apiUrl).then(callTimeApi);
}

var searchInput = "";
var country = "";
var timeZone = "";
let formSubmit = document.querySelector("#formSubmit");
formSubmit.addEventListener("submit", callWeatherApi);
