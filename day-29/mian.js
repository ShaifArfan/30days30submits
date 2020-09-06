const key =  '6a73ed993fb67076477df40767903d8a';


async function fetchWeather(location){
  const baseURL = `http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
  const res = await fetch(baseURL);
  const data = await res.json();
  console.log(data);
}

fetchWeather('chittagong');