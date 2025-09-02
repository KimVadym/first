const words = ["папа", "мама", "Кіра", "дім",  "кіт", "рот", "мяч" , "Зуб"  ,"Рак" ,"Лук" ,"Мак" ,"Жук" , "гарбуз"];
const outputDiv = document.getElementById('output');

// Функция для озвучивания текста с использованием Web Speech API
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ru-RU'; // Устанавливаем язык на русский
  window.speechSynthesis.speak(utterance);
}

// Функция для отображения слова по буквам и произнесения
function displayWord(word) {
  const wordLine = document.createElement('div');
  wordLine.className = 'word-line';
  outputDiv.appendChild(wordLine);

  let letterIndex = 0;
  
  function displayNextLetter() {
    if (letterIndex < word.length) {
      const letter = word[letterIndex];
      const letterSpan = document.createElement('span');
      letterSpan.className = 'letter';
      letterSpan.textContent = letter;
      wordLine.appendChild(letterSpan);
      speakText(letter); // Озвучиваем букву
      letterIndex++;
      setTimeout(displayNextLetter, 1000); // Задержка 1 секунда между буквами
    } else {
      // После букв показываем и озвучиваем всё слово
      setTimeout(() => {
        wordLine.innerHTML = word;
        speakText(word); // Озвучиваем всё слово
      }, 2000);
    }
  }

  displayNextLetter();
}

// Запускаем отображение и озвучивание каждого слова с задержкой между словами
function displayAllWords() {
  words.forEach((word, index) => {
    setTimeout(() => {
      displayWord(word);
    }, index * 10000); // Задержка 10 секунды между словами
  });
}

// Начинаем показ слов
displayAllWords();