const form = document.querySelector('form');
const factDiv = document.querySelector('.number-fact');

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const baseURL = "http://numbersapi.com/";
  const number = e.target.querySelector('input[type="number"]').value;
  fetch(baseURL+number)
    .then(response=> response.text())
    .then(text => factDiv.innerHTML = text) ;
})