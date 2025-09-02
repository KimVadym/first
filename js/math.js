// Массив с математическими примерами для 1-го класса
const examples = [
    { question: "2 + 3", answer: 2 + 3 },
    { question: "4 + 1", answer: 4 + 1 },
    { question: "5 - 2", answer: 5 - 2 },
    { question: "3 + 3", answer: 3 + 3 },
    { question: "6 - 3", answer: 6 - 3 },
    { question: "7 - 4", answer: 7 - 4 },
    { question: "8 + 1", answer: 8 + 1 },
    { question: "9 - 2", answer: 9 - 2 },
    { question: "1 + 4", answer: 1 + 4 },
    { question: "3 + 2", answer: 3 + 2 },
    { question: "2 + 2", answer: 2 + 2 },
    { question: "5 + 0", answer: 5 + 0 },
    { question: "7 + 1", answer: 7 + 1 },
    { question: "6 + 2", answer: 6 + 2 },
    { question: "4 + 4", answer: 4 + 4 },
    { question: "10 - 5", answer: 10 - 5 },
    { question: "8 - 6", answer: 8 - 6 },
    { question: "9 - 1", answer: 9 - 1 },
    { question: "5 + 3", answer: 5 + 3 },
    { question: "3 + 4", answer: 3 + 4 }
  ];
  
  const ouDiv = document.getElementById('ou');
  
  // Функция для отображения примеров с задержкой на ответ
  function displayExamples() {
    examples.forEach((example, index) => {
      setTimeout(() => {
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'example';
        exampleDiv.innerHTML = `${example.question} = ?`;
        ouDiv.appendChild(exampleDiv);
        
        // Показываем ответ через 5 секунд
        setTimeout(() => {
          exampleDiv.innerHTML = `${example.question} = ${example.answer}`;
        }, 5000);
      }, index * 6000); // Интервал 6 секунд между примерами
    });
  }
  
  // Начинаем отображение примеров
  displayExamples();