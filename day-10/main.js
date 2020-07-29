const displayKey = document.querySelector('.key h2');
const displayKeyCode = document.querySelector('.keyCode h2');
const keyCodeDiv = document.querySelector('.keyCode');
const overlay = document.querySelector('.overlay');

window.addEventListener('keydown',(e)=>{
  overlay.classList.add('hide');
  displayKey.innerHTML = e.key;
  displayKeyCode.innerHTML = e.keyCode;
  if(e.keyCode === 32){
    displayKey.innerHTML = `'space'`
  }
});

keyCodeDiv.addEventListener('click',(e)=>{
  const textArea = document.createElement('textarea');
  textArea.setAttribute('readonly', '');
  textArea.style.position = 'absolute';
  textArea.value = displayKeyCode.innerText;
  document.body.appendChild(textArea);
  textArea.select()
  document.execCommand('copy');
  document.body.removeChild(textArea);
  keyCodeDiv.querySelector('p').innerText = 'Copied'
  setTimeout(()=>{
   keyCodeDiv.querySelector('p').innerText = 'Click to Copy'
  },2000)
})