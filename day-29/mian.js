const key =  '6a73ed993fb67076477df40767903d8a';
const formEl = document.querySelector('form');
const details = document.querySelector('.details')

formEl.addEventListener('submit', (e)=> {
  e.preventDefault();
  details.innerHTML = '<h1>Loading...</h1>';
  const location = e.target.location.value;
  weatherApp(location);
  formEl.reset();
  console.log(location)
})
async function weatherApp(location){
  const result = await fetchWeather(location);
  generateHTML(result);
  
}
async function fetchWeather(location){
  const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
  const res = await fetch(baseURL);
  const data = await res.json();
  console.log(data);
  return data;
}

function generateHTML(result){
  const html = `
  <div class="temp">${result.current.temperature}°c</div>
  <div class="status">${result.current.weather_descriptions.map(item => item).join(' ')}</div>
  <div class="more-info">
    <div>Humidity- ${result.current.humidity} %</div>
    <div>Wind Speed- ${result.current.wind_speed}km/h</div>
    <div>Pressure- ${result.current.pressure} MB</div>
    <div>Wind Dir- ${result.current.wind_dir}</div>
  </div>
  <div class="query">${result.request.query}</div>
  `
  details.innerHTML = html;
}
// fetchWeather('chittagong');