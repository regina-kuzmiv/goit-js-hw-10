import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.error({
  //   title: 'Error',
  message: 'Please choose a date in the future',
});

let userSelectedDate;

const startBtn = document.querySelector('[data-start]');
const dateTime = document.querySelector('#datetime-picker');

flatpickr(dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]);
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

// startBtn.addEventListener('click', () => {
//   const targetDate = new Date(userSelectedDate);

//   const intervalId = setInterval(() => {
//     const currentTime = new Date();
//     const diff = targetDate - currentTime;

//     const str = convertMs(diff);
//     const formatted = {
//       days: addLeadingZero(str.days),
//       hours: addLeadingZero(str.hours),
//       minutes: addLeadingZero(str.minutes),
//       seconds: addLeadingZero(str.seconds),
//     };

//     dateTime.value.innerHTML = str;
//   }, 1000);
// });
