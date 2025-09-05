//* --- Target the form using its id--- *//
const form = document.getElementById("weatherForm");
//* --- Function to get the weather information --- *//
function getWeatherinfo() {
  //* --- Target the input field and get the city name --- *//
  const inputref = document.getElementById("city");
  const city = inputref.value;
  //* --- Target the div to display the message --- *//
  const divref = document.getElementById("message");
  //*  --- Handle the case when the input field is empty --- *//
  if (city === "") {
    divref.innerHTML = "Please enter a city name";
    return;
  }
 
  //* --- Make an API call using axios --- *//
  axios
    .get(`https://p2pclouds.up.railway.app/v1/learn/weather?city=${city}`)
    //* --- Handle the response and display the weather information --- *//
    .then((res) => {
      if (!res.data.current || !res.data.current.feelslike_c) {
        divref.innerHTML = `The city "${city}" does not exist in the world.`;
        return;
      }
      //* --- Update the div with the weather details --- *//
      divref.innerHTML =
        `Temperature ${res.data.current.feelslike_c}°C <br/>
          Humidity ${res.data.current.humidity}% <br/>` +
        `Wind Speed ${res.data.current.wind_kph} kph <br/> ` +
        `Condition ${res.data.current.condition.text} <br/>` +
        `<img src=${res.data.current.condition.icon} />`;
    });
}
//* --- Add an event listener to the form to handle submission --- *//
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeatherinfo();
});
