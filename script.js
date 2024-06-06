// Working with date
let currentDate = new Date();

// Output the current date components to the console This line only to know
// what I get using the different methods
console.log(currentDate.getDate()); // Get the day of the month
console.log(currentDate.getMonth() + 1); // Get the month (months are zero-indexed, hence the +1)
console.log(currentDate.getFullYear()); // Get the year

// Creating the URL

const API_KEY = "051f70bf9f9445a2a4a92210242202";
const CITY = "Bristol";

const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=3&aqi=no&alerts=no`;

console.log(URL);
const getData = async (url) => {
  // Fetch weather data from the API
  // When we create the function url is a parameter, is generic.
  // When we create the function url is not URL. We pass URL when we use the function
  const response = await fetch(url);
  const data = await response.json(); // Convert response to JSON
  return data;
};

// This line adds an event listener that listens for the 'DOMContentLoaded' event,
//which indicates that the initial HTML document has been completely loaded and parsed.
// When this event occurs, the provided callback function is executed asynchronously.
document.addEventListener("DOMContentLoaded", async () => {
  let weatherData = await getData(URL); // Fetch weather data when the DOM content is loaded
  console.log(weatherData);

  // Reference the name of the city
  let cityName = document.querySelector(".city");

  // Reference the current image
  let displayCurrentWeather = document.querySelector("img");

  // Reference the temperatures -- Don't forget the dot
  let currentTemp = document.querySelector(".temperature-now");
  let feelTemp = document.querySelector(".temperature-low");

  // Reference the current weather conditions.
  let currentConditions = document.querySelector(".status");

  // Reference weather conditions
  let infoCondition = document.querySelectorAll(".value"); // returns an array
  console.log(infoCondition);

  // Reference for current day
  let currentDay = document.querySelector(".day");

  // Reference for date next days
  let daysDate = document.querySelectorAll(".name");

  // Reference icons next days
  let daysIcons = document.querySelectorAll(".img-forecast");

  // Reference condition next days
  let daysCondition = document.querySelectorAll(".forecast-status");

  // Reference temperarure next days
  let daysTemp = document.querySelectorAll(".temperature-avg");

  // Set the current city
  cityName.textContentc = weatherData.location.name;

  // Set the current weather icon
  displayCurrentWeather.src = weatherData.current.condition.icon;

  // Display the current date
  currentDay.textContent = `${currentDate.getDate()} / ${
    currentDate.getMonth() + 1
  } / ${currentDate.getFullYear()}`;

  // Display current temperature and feels like temperature
  currentTemp.textContent = `${weatherData.current.temp_c}°C/`;
  feelTemp.textContent = `${weatherData.current.feelslike_c}°C`;

  // Display current weather condition
  currentConditions.textContent = `${weatherData.current.condition.text}`;

  // Display information condition
  // Display wind information
  infoCondition[0].textContent = `${weatherData.current.wind_kph} km/h`;
  // Display precipitation information
  infoCondition[1].textContent = `${weatherData.current.precip_mm} mm`;
  // Display humidity information
  infoCondition[2].textContent = `${weatherData.current.humidity}%`;

  // Display the future days
  let index = 1;
  daysDate.forEach((day) => {
    day.textContent = `${currentDate.getDate() + index} / ${
      currentDate.getMonth() + 1
    } / ${currentDate.getFullYear()}`;
    index++;
  });

  // Display forecast weather condition
  // Initialize index variable to 1
  index = 1;

  // Loop through each element in the 'daysIcons' array
  daysIcons.forEach((day) => {
    // Set the src attribute of the current 'day' element to the icon URL corresponding to the weather forecast for the day at the current index
    day.src = `${weatherData.forecast.forecastday[index].day.condition.icon}`;

    // Increment the index
    index++;
  });

  // Reset index variable to 1
  index = 1;

  // Loop through each element in the 'daysCondition' array
  daysCondition.forEach((day) => {
    // Set the text content of the current 'day' element to the weather condition text corresponding to the weather forecast for the day at the current index
    day.textContent = `${weatherData.forecast.forecastday[index].day.condition.text}`;

    // Increment the index
    index++;
  });

  // Reset index variable to 1
  index = 1;

  // Loop through each element in the 'daysTemp' array
  daysTemp.forEach((day) => {
    // Set the text content of the current 'day' element to the average temperature corresponding to the weather forecast for the day at the current index, followed by '°C'
    day.textContent = `${weatherData.forecast.forecastday[index].day.avgtemp_c}°C`;

    // Increment the index
    index++;
  });
});

// const API_KEY = '051f70bf9f9445a2a4a92210242202'
// const CITY = 'albacete'

// const URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CITY}&days=3&aqi=no&alerts=no`

// async function getData() {
//     const response = await fetch(URL);
//     const data = await response.json();
//     return data
// }

// const weatherApp = async()=>{
//     let weather = await getData()
//     console.log(weather)
//     console.log(weather.location.name)
//     let cityName = document.querySelector('.city')
//     cityName.textContent = weather.location.name
//     let day = document.querySelector('.day')
//     day.textContent = weather.forecast.forecastday[0].date
//     let icon = document.getElementById('icon1')
//     icon.src = weather.current.condition.icon
//     let temperatureNow = document.querySelector('.temperature-now')
//     temperatureNow.textContent = weather.current.temp_c+'°C'+'/'
//     let temperatureLow = document.querySelector('.temperature-low')
//     temperatureLow.textContent = weather.forecast.forecastday[2].day.mintemp_c+'°C'
//     let status = document.querySelector('.status')
//     status.textContent = weather.current.condition.text
//     let wind = document.getElementById('wind')
//     wind.textContent = weather.current.wind_kph +'km/h'
//     let drop = document.getElementById('drop')
//     drop.textContent = weather.forecast.forecastday[0].day.totalprecip_mm+'mm'
//     let humidity = document.getElementById('humidity')
//     humidity.textContent = weather.current.humidity+'%'

// }
// weatherApp()
