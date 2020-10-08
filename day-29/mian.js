const key =  '6a73ed993fb67076477df40767903d8a';
const formEl = document.querySelector('form');
const details = document.querySelector('.details')

formEl.addEventListener('submit', (e)=> {
  e.preventDefault();
  details.innerHTML = '<h1>Loading...</h1>';
  const location = e.target.location.value;
  weatherApp(location);
  formEl.reset();
})
async function weatherApp(location){
  const result = await fetchAPI(location);
  generateHTML(result);
  
}
async function fetchAPI(location){
  const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;

  // Use this if you get any error with cors-anywhere
  // {headers: {
  //   'x-requested-with': 'text/plain'
  // }}

  const res = await fetch(baseURL, {
    headers: {
    'x-requested-with': 'text/plain'
  }});
  const data = await res.json();
  console.log(data);
  return data;
}

function generateHTML(data){
  const html = `
  <h1 class="temp">${data.current.temperature}°c</h1>
  <h1 class="status">${data.current.weather_descriptions.map(item => item).join(' ')}</h1>
  <div class="more-info">
    <p>Humidity- ${data.current.humidity}%</p>
    <p>Wind Speed- ${data.current.wind_speed}km/h</p>
    <p>Wind Dir- ${data.current.wind_dir}</p>
    <p>Pressure- ${data.current.pressure}MB</p>
  </div>
  <div class="query">${data.request.query}</div>
  `;
  details.innerHTML = html;
}