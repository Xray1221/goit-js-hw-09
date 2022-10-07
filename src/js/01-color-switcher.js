function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
};
refs.btnStart.addEventListener('click', start);
refs.btnStop.addEventListener('click', stop);

let inteval = null;
function start(event) {
    inteval = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000)
};

function stop(event) {
    clearInterval(inteval);
};