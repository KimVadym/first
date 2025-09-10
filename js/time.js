// script.js

const TIMEZONE = 'Europe/Kyiv';

const hourHand   = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const clock      = document.getElementById('clock');
 
// Рисуем цифры 1–12 и минутные подписи
(function drawNumbers() {
  const center = { x: 150, y: 150 };
  const radius = 140;
  const minuteLabels = [60, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  for (let i = 1; i <= 12; i++) {
    const angle = (Math.PI / 6) * (i - 3); // сдвиг, чтобы 12 было сверху
    const x = center.x + radius * Math.cos(angle);
    const y = center.y + radius * Math.sin(angle);

    const number = document.createElement('div');
    number.className = 'number';
    number.style.left = x + 'px';
    number.style.top = y + 'px';
    number.textContent = i;
    clock.appendChild(number);

    // Подписи минут
    const minuteX = center.x + (radius + 25) * Math.cos(angle);
    const minuteY = center.y + (radius + 25) * Math.sin(angle);

    const minuteLabel = document.createElement('div');
    minuteLabel.className = 'minute-label';
    minuteLabel.style.left = minuteX + 'px';
    minuteLabel.style.top = minuteY + 'px';
    minuteLabel.textContent = minuteLabels[i % 12];
    clock.appendChild(minuteLabel);
  }
})();

// Получение времени Киева
const kyivFormatter = new Intl.DateTimeFormat('en-GB', {
  timeZone: TIMEZONE,
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false
});

function getKyivHMS(date = new Date()) {
  const parts = kyivFormatter.formatToParts(date);
  const get = (type) => Number(parts.find(p => p.type === type).value);
  return {
    h: get('hour'),
    m: get('minute'),
    s: get('second')
  };
}

function updateClock() {
  const { h, m, s } = getKyivHMS();

  const secDeg  = s * 6;
  const minDeg  = m * 6 + s * 0.1;
  const hourDeg = (h % 12) * 30 + m * 0.5 + s * (0.5 / 60);

  hourHand.style.transform   = `translateX(-50%) rotate(${hourDeg}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
}

updateClock();
setInterval(updateClock, 1000);

