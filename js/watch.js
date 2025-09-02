const TIMEZONE = 'Europe/Kyiv';
const clockEl = document.getElementById('digitalClock');
const dateEl = document.getElementById('digitalDate');

function pad(n) {
  return n.toString().padStart(2, '0');
}

function update() {
  const now = new Date();
  const date = new Date(now.toLocaleString('en-US', { timeZone: TIMEZONE }));
  const h = pad(date.getHours());
  const m = pad(date.getMinutes());
  const s = pad(date.getSeconds());
  clockEl.textContent = `${h}:${m}:${s}`;

  const day = pad(date.getDate());
  const month = pad(date.getMonth()+1);
  const year = date.getFullYear();
  dateEl.textContent = `${day}.${month}.${year}`;
}

update();
setInterval(update, 1000);

function getKyivParts() {
  const now = new Date();
  const date = new Date(now.toLocaleString('en-US', { timeZone: TIMEZONE }));
  return {
    h: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds()
  };
}

// Озвучка українською при кліку
function speakTime() {
  const { h, m, s } = getKyivParts();

  const hoursWord = (h%10===1 && h%100!==11) ? 'година' : (h%10>=2 && h%10<=4 && (h%100<10 || h%100>=20)) ? 'години' : 'годин';
  const minutesWord = (m%10===1 && m%100!==11) ? 'хвилина' : (m%10>=2 && m%10<=4 && (m%100<10 || m%100>=20)) ? 'хвилини' : 'хвилин';
  const secondsWord = (s%10===1 && s%100!==11) ? 'секунда' : (s%10>=2 && s%10<=4 && (s%100<10 || s%100>=20)) ? 'секунди' : 'секунд';

  const text = `Зараз ${h} ${hoursWord} ${m} ${minutesWord} ${s} ${secondsWord}.`;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'uk-UA';
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  window.speechSynthesis.speak(u);
}

clockEl.addEventListener('click', speakTime);
clockEl.addEventListener('keydown', (e)=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); speakTime(); } });
clockEl.setAttribute('tabindex','0');
