import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from "notiflix";

const refs = {
  dateInput:document.querySelector ('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let isActiv = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
        refs.startButton.removeAttribute('disabled');
        Notiflix.Notify.success('Щоб розпочати відлік часу, натисність кнопку "START"!');
        selectedDate = selectedDates[0].getTime();
    } else {
        refs.startButton.setAttribute('disabled', '');
        Notiflix.Notify.failure('Виберіть дату, яка ще не настала!');
    }
  },
};

flatpickr(refs.dateInput, options)

refs.startButton.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  if (isActiv) {
    return;
  }
  
  let interval = null;
  let deltaDate = null;
 
  isActiv = true;

  interval = setInterval(() => {
    const currentDate = Date.now();
    deltaDate = selectedDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(deltaDate);
    refs.secondsField.textContent = seconds;
    refs.minutesField.textContent = minutes;
    refs.hoursField.textContent = hours;
    refs.daysField.textContent = days;
  }, 1000);
  
  // if (deltaDate === 0) {
  //   clearInterval(interval);
  // }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}