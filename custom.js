var time = 30;
const keywordsList = [
    "繪畫", "橋樑", "文化", "時間", "宇宙", "冒險", "愛情", "武器", "體育", "夢想", 
    "運動", "經驗", "美食", "文學", "風景", "火焰", "雨水", "自然", "奶昔", "猴子", 
    "太空", "火雞", "眼鏡", "自行車", "香蕉", "獅子", "潛水艇", "飛碟", "鯨魚", 
    "假鬍子", "狗屋", "機器人", "洗碗機", "卡通人物", "手槍", "陀螺", "象棋", "奶酪", 
    "汽油", "鴨子", "眼罩", "蠟燭", "馬戲團", "木偶"
  ];

let currentKeywords = ["繪畫", "橋樑", "文化"]; // initial keywords

$(document).ready(function() {
    // Initialize game on page load
    initializeGame();
});

  function initializeGame() {
    generateKeywords();
    updateCards();
    updateTimer();
    const display = document.querySelector('#timer');
    startTimer(time, display);
  }
  
  function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
      seconds = parseInt(timer % 60, 10);  
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.textContent = seconds;  
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }
  
  function generateKeywords() {
    let newKeywords = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * keywordsList.length);
      newKeywords.push(keywordsList[randomIndex]);
    }
    currentKeywords = newKeywords;
  }
  
  function updateCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card, index) => {
      card.innerHTML = currentKeywords[index];
    });
  }
  
  function updateTimer() {
    const timer = document.querySelector("#timer");
    timer.innerHTML = "00";
  }
  
  function initializeGame() {
    generateKeywords();
    updateCards();
    updateTimer();
    const display = document.querySelector('#timer');
    startTimer(time, display);
  }
  
  // Handle next button click
  const nextButton = document.querySelector("#next-btn");
  nextButton.addEventListener("click", () => {
    generateKeywords();
    updateCards();
    const display = document.querySelector('#timer');
    startTimer(time, display);
  });
  
  // Show/hide settings form
  const settingsButton = document.querySelector("#settings-button");
  const settingsForm = document.querySelector("#settings-form");
  settingsButton.addEventListener("click", () => {
    settingsForm.classList.toggle("hidden");
  });
  
  
  