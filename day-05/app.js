let timeSecond = 5;
const timeH = document.querySelector('h1');

displayTime(5);

const countDown = setInterval(timer, 1000);

function timer() {
  timeSecond--;
  console.log(timeSecond)
   displayTime(timeSecond);
  
   if(timeSecond == 0 || timeSecond < 1){
     endCount();
     clearInterval(countDown);
   }
}

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