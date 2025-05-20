//index.html

function showTime() {

  let nameTimeZone = zoneSelect.value;
  if (nameTimeZone === "Current Location") {
    nameTimeZone = moment.tz.guess();
  }
  let zoneName = document.querySelector("#zoneName");
  let zoneDate = document.querySelector("#zoneDate");
  let zoneTime = document.querySelector("#zoneTime");
  let amPm = document.querySelector("#amPm");
  zoneName.innerHTML = nameTimeZone;
  zoneDate.innerHTML = moment().tz(nameTimeZone).format("MMMM Do, YYYY");
  zoneTime.innerHTML = moment().tz(nameTimeZone).format("hh:mm:ss");
  amPm.innerHTML = moment().tz(nameTimeZone).format("A");
}
setInterval(showTime, 1000);
let zoneSelect = document.querySelector("#time-zones");

zoneSelect.addEventListener("change", showTime);
