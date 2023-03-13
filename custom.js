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
    if (timeLeft <= 0) {
      clearInterval(downloadTimer);
      document.getElementById("timer").innerHTML = "Time's up!";
      document.body.classList.add("timer-ended");
    }
});

  function initializeGame() {
    generateKeywords();
    updateCards();
    updateTimer();
    const display = document.querySelector('#timer');
    startTimer(time, display);
  }  
  
  function startTimer(duration, display) {
    let timer = duration * 1000;
    let interval = setInterval(function() {
      let minutes = Math.floor(timer / (60 * 1000));
      let seconds = Math.floor((timer % (60 * 1000)) / 1000);
      let milliseconds = Math.floor(timer % 1000);
      
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      milliseconds = milliseconds < 10 ? milliseconds : milliseconds < 100 ? "" + milliseconds : milliseconds;
      
      // display.textContent = minutes + ":" + seconds + ":" + milliseconds;
      display.textContent = seconds + ":" + milliseconds;
      
      if (timer <= 0) {
        clearInterval(interval);
        display.textContent = "Time's up!";
        document.body.classList.add("timer-ended");
        document.body.classList.add("flash"); // add flash class
        setTimeout(() => {
          document.body.classList.remove("flash"); // remove flash class after 1 second
        }, 1000);
      }
      
      timer -= 10;
    }, 10);
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
    const cards = document.querySelectorAll(".keyword");
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
  // const nextButton = document.querySelector("#next-btn");
  // nextButton.addEventListener("click", () => {
  //   generateKeywords();
  //   updateCards();
  //   const display = document.querySelector('#timer');
  //   startTimer(time, display);
  // });

  document.addEventListener("click", function() {
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
  
  
  
  