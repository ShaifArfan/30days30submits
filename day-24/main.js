const texts = document.querySelector('.texts');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');

recognition.addEventListener('result', (e)=>{
  texts.appendChild(p);
  const text = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  p.innerText = text;
  if(e.results[0].isFinal){
    if (text.includes('how are you')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'I am fine';
      texts.appendChild(p)
    }
    if (text.includes("what's your name") || text.includes('what is your name')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'My Name is Cifar';
      texts.appendChild(p)
    }
    if (text.includes('open my YouTube')) {
      p = document.createElement('p');
      p.classList.add('replay');
      p.innerText = 'opening youtube channel';
      texts.appendChild(p)
      console.log('opening youtube')
      window.open('https://www.youtube.com/channel/UCdxaLo9ALJgXgOUDURRPGiQ')
    }
    p = document.createElement('p');
  }
});


recognition.addEventListener('end', ()=>{
  recognition.start();
})

recognition.start();