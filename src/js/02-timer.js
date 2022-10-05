// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    btnStart: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
let selectedDateTimestamp = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDateTimestamp = Date.parse(selectedDates[0]);
        
        if(selectedDateTimestamp < Date.now()){
            Notify.failure('Please choose a date in the future');
            selectedDateTimestamp = null;
        }else{
            refs.btnStart.disabled = false;
        }
    },
};

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

  function addLeadingZero(value) {
    return value.toString().padStart(2, 0);
  }

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', startTimer);

let interval = null;

function startTimer(event) {
    interval = setInterval(() => {
        const { days, hours, minutes, seconds } = convertMs(selectedDateTimestamp - Date.now());
        refs.days.textContent = addLeadingZero(days);
        refs.hours.textContent = addLeadingZero(hours);
        refs.minutes.textContent = addLeadingZero(minutes);
        refs.seconds.textContent = addLeadingZero(seconds);

        if(days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(interval);
        }
    }, 1000);
}

flatpickr('input#datetime-picker', options)