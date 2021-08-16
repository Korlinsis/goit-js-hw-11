
const refs = {
  body: document.querySelector('body'),
  startButton: document.querySelector('[data-start]'),
  stopButton: document.querySelector('[data-stop]'),
};

refs.startButton.addEventListener('click', onStartButtonClick);
refs.stopButton.addEventListener('click', onStopButtonClick);

let timer = null;

function onStartButtonClick() {
  refs.startButton.setAttribute('disabled', '');
  refs.startButton.classList.add('is-active');

  timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick() {
  clearInterval(timer);
  refs.startButton.removeAttribute('disabled');
  refs.startButton.classList.remove('is-active');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
