const baseURL = 'https://opentdb.com/api.php?amount=1';
const form = document.querySelector('#quiz_form');
const qusEl = document.querySelector('.qus');
const optionsEl = document.querySelector('.all_options');
const buttonsEl = document.querySelector('.buttons');

let question, answer;
let options =[];

window.addEventListener('DOMContentLoaded', () => {
  quizApp();
})

async function quizApp(){
  const data = await fetchQuiz();
  question = data[0].question;
  options = [];
  answer = data[0].correct_answer;
  data[0].incorrect_answers.map(item => options.push(item));
  options.splice(Math.floor(Math.random()*options.length+1),0, answer)
  console.log(answer)
  generateTemplate(question, options, answer);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if(e.target.quiz.value){
    checkQuiz(e.target.quiz.value);
  }
  e.target.querySelector('button').style.display= 'none';
  generateButtons();
});

async function fetchQuiz(){
  const response = await fetch (baseURL);
  const data = await response.json();
  console.log(data.results)
  return data.results;
}

function generateTemplate(question, options, answer){
  optionsEl.innerHTML = '';
  qusEl.innerText = question;
  options.map( (option, index) => {
    const item = document.createElement('div');
    item.classList.add('option');
    item.innerHTML = `
      <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
      <label for="option${index+1}">${option}</label>
    `
    optionsEl.appendChild(item);
  })
}

function checkQuiz(selected){
  console.log(selected, answer)
  if(selected === answer){
    form.quiz.forEach(input => {
      if (input.value === answer){
        input.parentElement.classList.add('correct')
        console.log(input)
      }
    })
  }else{
    form.quiz.forEach(input => {
      if (input.value === answer) {
        input.parentElement.classList.add('correct')
        console.log(input)
      }
    })
  }
}

function generateButtons(){
  const finishBtn = document.createElement('button');
  finishBtn.innerText = 'Finish';
  finishBtn.classList.add('finish-btn')
  buttonsEl.appendChild(finishBtn)

  const nextBtn = document.createElement('button');
  nextBtn.innerText = 'Next Qus';
  nextBtn.classList.add('next-btn')
  buttonsEl.appendChild(nextBtn)

  nextBtn.addEventListener('click', getNextQuiz);
}

function getNextQuiz(){
  const nextBtn = document.querySelector('.next-btn');
  const finishBtn = document.querySelector('.finish-btn');

  buttonsEl.removeChild(nextBtn);
  buttonsEl.removeChild(finishBtn);

  buttonsEl.querySelector('button[type="submit"]').style.display = 'block';
  quizApp();

}