let timeSecond = 5;
const timeH = document.querySelector('h1');

displayTime(5);

const countDown = setInterval(()=>{
  timeSecond--;
  displayTime(timeSecond);
  if(timeSecond == 0 || timeSecond < 1){
    endCount();
    clearInterval(countDown);
  }
}, 1000);

function displayTime(second){
  const min = Math.floor(second / 60);
  const sec = Math.floor(second % 60);
  timeH.innerHTML = `
  ${(min < 10) ? '0' : ''}${min}:${(sec < 10) ? '0' : ''}${sec}
  `; 
}

function endCount(){
  timeH.innerHTML = 'Time out';
}