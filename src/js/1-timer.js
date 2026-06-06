import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let intervalId = null;

const startBtn = document.querySelector('[data-start]');
const dateTime = document.querySelector('#datetime-picker');

const timer = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

flatpickr(dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const date = new Date();

    if (userSelectedDate <= date) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });

      userSelectedDate = null;
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
startBtn.disabled = true;

startBtn.addEventListener('click', () => {
  if (!userSelectedDate) return;

  dateTime.disabled = true;

  if (intervalId) {
    clearInterval(intervalId);
  }

  const initTime = userSelectedDate;
  startBtn.disabled = true;

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const diff = initTime - currentTime;

    if (diff <= 0) {
      clearInterval(intervalId);

      timer.daysEl.textContent = '00';
      timer.hoursEl.textContent = '00';
      timer.minutesEl.textContent = '00';
      timer.secondsEl.textContent = '00';

      startBtn.disabled = true;
      dateTime.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);

    timer.daysEl.textContent = addLeadingZero(days);
    timer.hoursEl.textContent = addLeadingZero(hours);
    timer.minutesEl.textContent = addLeadingZero(minutes);
    timer.secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});
