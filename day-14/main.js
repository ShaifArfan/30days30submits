const clockEl = document.querySelector('.clock');
const buttons = document.querySelectorAll('.format button')
const intervalID = setInterval( generateTime, 1000)

// console.log(date)
function generateTime (){
  const format = clockEl.getAttribute('data-format');
  const date = new Date;
  let hour = date.getHours();
  let timeStatus;
  const min = date.getMinutes();
  const sec = date.getSeconds();
  timeStatus = (hour > 12) ? 'PM' : 'AM';
  if (format === '12') {
    hour = (hour > 12) ? hour % 12 : hour;
  }
  clockEl.innerHTML = `<h1>${hour} : ${min} : ${sec} ${timeStatus}</h1>`
}

buttons.forEach((button)=>{
  button.addEventListener('click', ()=>{
    const format = button.getAttribute('data-format');
    clockEl.setAttribute('data-format', format);
    generateTime();
  })
})