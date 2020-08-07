const button = document.querySelector('button');
const h2El = document.querySelector('h2');
const bgEl = document.querySelector('section');

button.addEventListener('click', () => {
  let color = '#';
  color += Math.random().toString(16).slice(2, 8).toUpperCase();
  // for(i=0; i<6; i++){
  //   const number = Math.floor(Math.random()*hexColorEl.length);
  //   color += hexColorEl[number];
  // }
  // console.log(color)
  bgEl.style.backgroundColor = color;
  h2El.innerText = color
});
