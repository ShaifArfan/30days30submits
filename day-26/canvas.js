const canvas = document.querySelector('canvas');
const logo = document.querySelector('.logo');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const logoWidth = 200;
const logoHeight = 118;

let xSpeed = 2;
let ySpeed = 2;
let xPosition = 100;
let yPosition = 100;
 

const ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height); 
function draw(){
  ctx.fillStyle = 'f00';
  ctx.drawImage(logo, xPosition, yPosition, logoWidth, logoHeight)
}

function updateLogo(){
  if (xPosition + logoWidth >= window.innerWidth || xPosition <= 0) {
    xSpeed = -xSpeed;
    colorImage(logo, 'f00')
  }
  if (yPosition + logoHeight >= window.innerHeight || yPosition <= 0) {
    ySpeed = -ySpeed;
  }

  xPosition += xSpeed;
  yPosition += ySpeed;

  ctx.clearRect(0, 0, canvas.width, canvas.height);  

  draw();
  requestAnimationFrame(updateLogo);
}
requestAnimationFrame(updateLogo);
window.addEventListener('resize', () => {
  location.reload();
})
