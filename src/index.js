//index.html

function showTime() {
  let nameTimeZone = zoneSelect.value;
  if (nameTimeZone === "Current Location") {
    nameTimeZone = moment.tz.guess();
  }
  let zone = document.querySelector("#display");
  zone.innerHTML = `<div
          class="row border border-secondary pt-4 rounded-3 m-3" style="background-color: #d5e9f7"
        ><div class="col-md-6 text-center ">
            <h2>${nameTimeZone}</h2>
            <p> ${moment().tz(nameTimeZone).format("MMMM Do, YYYY")}</p>
          </div>
          <div class=" col-md-6 text-center time">
            <h1>
              <span class="fw-bold" > ${moment()
                .tz(nameTimeZone)
                .format("hh:mm:ss")}</span
              ><span class="fs-3 align-top" >${moment()
                .tz(nameTimeZone)
                .format("A")}</span>
            </h1>
          </div></div>`;
}
setInterval(showTime, 1000);
let zoneSelect = document.querySelector("#time-zones");

zoneSelect.addEventListener("change", showTime);


