(function() {
  const baseURL = 'https://opentdb.com/api.php?amount=1';
  const containerEl = document.querySelector('.container');
  const form = document.querySelector('#quiz_form');
  const qusEl = document.querySelector('.qus');
  const optionsEl = document.querySelector('.all_options');
  const buttonsEl = document.querySelector('.buttons');
  const scoreEl = document.querySelector('.scoreBoard .score-num');
  const answeredEl = document.querySelector('.scoreBoard .answered-num');

  let question, answer;
  let options = [];
  let score = 0;
  let answeredQus = 0;

  window.addEventListener('DOMContentLoaded', quizApp)

  async function quizApp() {
    updateScoreBoard();
    addPlaceholder();
    const data = await fetchQuiz();
    question = data[0].question;
    options = [];
    answer = data[0].correct_answer;
    data[0].incorrect_answers.map(item => options.push(item));
    options.splice(Math.floor(Math.random() * options.length + 1), 0, answer)
    // console.log(answer)
    generateTemplate(question, options, answer);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (e.target.quiz.value) {
      checkQuiz(e.target.quiz.value);
      e.target.querySelector('button').style.display = 'none';
      generateButtons();
    }else{
      return;
    }
  });

  async function fetchQuiz() {
    const response = await fetch(baseURL);
    const data = await response.json();
    // console.log(data.results)
    return data.results;
  }

  function generateTemplate(question, options, answer) {
    removePlaceHolder();
    optionsEl.innerHTML = '';
    qusEl.innerText = question;
    options.map((option, index) => {
      const item = document.createElement('div');
      item.classList.add('option');
      item.innerHTML = `
      <input type="radio" id="option${index + 1}" value="${option}" name="quiz">
      <label for="option${index + 1}">${option}</label>
    `
      optionsEl.appendChild(item);
    })
  }

  function checkQuiz(selected) {
    // console.log(selected, answer)
    answeredQus++;
    if (selected === answer) {
      score++;
    } 
    updateScoreBoard();
    form.quiz.forEach(input => {
      if (input.value === answer) {
        input.parentElement.classList.add('correct')
        // console.log(input)
      }
    })
  }

  function generateButtons() {
    const finishBtn = document.createElement('button');
    finishBtn.innerText = 'Finish';
    finishBtn.setAttribute('type', 'button')
    finishBtn.classList.add('finish-btn')
    buttonsEl.appendChild(finishBtn)

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next Qus';
    nextBtn.setAttribute('type', 'button')
    nextBtn.classList.add('next-btn')
    buttonsEl.appendChild(nextBtn)

    nextBtn.addEventListener('click', getNextQuiz);
    finishBtn.addEventListener('click', finishQuiz);
  }

  function getNextQuiz() {
    const nextBtn = document.querySelector('.next-btn');
    const finishBtn = document.querySelector('.finish-btn');

    buttonsEl.removeChild(nextBtn);
    buttonsEl.removeChild(finishBtn);

    buttonsEl.querySelector('button[type="submit"]').style.display = 'block';
    quizApp();

  }

  function finishQuiz() {

    const nextBtn = document.querySelector('.next-btn');
    const finishBtn = document.querySelector('.finish-btn');

    buttonsEl.removeChild(nextBtn);
    buttonsEl.removeChild(finishBtn);

    buttonsEl.querySelector('button[type="submit"]').style.display = 'block';

    const overlay = document.createElement('div');
    overlay.classList.add('result-overlay');
    overlay.innerHTML = `
    <div class="final-result">${score}/${answeredQus}</div>
    <button>Play Again</button>
  `
    containerEl.appendChild(overlay);
    document.querySelector('.result-overlay button')
      .addEventListener('click', () => {
        containerEl.removeChild(overlay);
        playAgain();
      })
    console.log(score)
  }

  function updateScoreBoard() {
    scoreEl.innerText = score;
    answeredEl.innerText = answeredQus;
  }

  function playAgain() {
    score = 0;
    answeredQus = 0;

    quizApp();
  }
  function addPlaceholder(){
    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder')
    containerEl.appendChild(placeholder);
  }

  function removePlaceHolder(){
    const placeholderEl = document.querySelector('.container .placeholder')
    containerEl.removeChild(placeholderEl);
  }
})();