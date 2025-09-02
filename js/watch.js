const TIMEZONE = 'Europe/Kyiv';
const clockEl = document.getElementById('digitalClock');
const dateEl = document.getElementById('digitalDate');
const speakBtn = document.getElementById('speakBtn');

function pad(n){ return n.toString().padStart(2,'0'); }

function update(){
  const now=new Date();
  const formatter=new Intl.DateTimeFormat('uk-UA',{timeZone:TIMEZONE,hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false});
  const parts=formatter.formatToParts(now);
  const h=parts.find(p=>p.type==='hour').value;
  const m=parts.find(p=>p.type==='minute').value;
  const s=parts.find(p=>p.type==='second').value;
  clockEl.textContent=`${h}:${m}:${s}`;
  const dateFormatter=new Intl.DateTimeFormat('uk-UA',{timeZone:TIMEZONE,day:'2-digit',month:'2-digit',year:'numeric'});
  dateEl.textContent=dateFormatter.format(now);
}
update();
setInterval(update,1000);

function getKyivParts(){
  const now=new Date();
  const formatter=new Intl.DateTimeFormat('uk-UA',{timeZone:TIMEZONE,hour:'numeric',minute:'numeric',second:'numeric',hour12:false});
  const parts=formatter.formatToParts(now);
  return{
    h:parseInt(parts.find(p=>p.type==='hour').value,10),
    m:parseInt(parts.find(p=>p.type==='minute').value,10),
    s:parseInt(parts.find(p=>p.type==='second').value,10)
  };
}

function speakTime(){
  const {h,m,s}=getKyivParts();
  const hoursWord=(h%10===1 && h%100!==11)?'година':(h%10>=2 && h%10<=4 && (h%100<10 || h%100>=20))?'години':'годин';
  const minutesWord=(m%10===1 && m%100!==11)?'хвилина':(m%10>=2 && m%10<=4 && (m%100<10 || m%100>=20))?'хвилини':'хвилин';
  const secondsWord=(s%10===1 && s%100!==11)?'секунда':(s%10>=2 && s%10<=4 && (s%100<10 || s%100>=20))?'секунди':'секунд';
  const text=`Зараз ${h} ${hoursWord} ${m} ${minutesWord} ${s} ${secondsWord}.`;
  const u=new SpeechSynthesisUtterance(text);

  // Выбираем украинский голос, если есть
  const voices=speechSynthesis.getVoices();
  const ukVoice=voices.find(v=>v.lang.startsWith('uk'));
  if(ukVoice) u.voice=ukVoice;
  u.lang='uk-UA';

  if(window.speechSynthesis.speaking) window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

// Для Android и всех устройств: активируем после первого взаимодействия
function enableSpeech(){
  speakBtn.disabled=false;
  speakBtn.addEventListener('click', speakTime);
  speakBtn.removeEventListener('click', enableSpeech);
}

document.body.addEventListener('click', enableSpeech, {once:true});
document.body.addEventListener('touchstart', enableSpeech, {once:true});