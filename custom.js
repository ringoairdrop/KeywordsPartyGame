var time = 15;
let interval;
const keywordsList = [
    "時間", "宇宙", "冒險", "愛情", "武器", "體育", "夢想", 
    "運動", "經驗", "美食", "文學", "風景", "火焰", "雨水", "自然", "奶昔", "猴子", 
    "太空", "火雞", "眼鏡", "自行車", "香蕉", "獅子", "潛水艇", "飛碟", "鯨魚", 
    "假鬍子", "狗屋", "機器人", "洗碗機", "卡通人物", "手槍", "陀螺", "象棋", 
    "汽油", "鴨", "眼罩", "蠟燭", "馬戲團", "木偶", "蘋果", "麵包", "糖果", "咖啡", 
    "餅乾", "芝士", "巧克力", "餐具", "餐廳", "蛋糕", "餃子", "蛋", "漢堡", "冰淇淋",
    "橙", "檸檬", "麵", "花生", "南瓜", "醬料", "三明治", "酸奶", "茶", "雞蛋仔", "奶皇包", "檸檬茶", "煲仔飯", "牛腩麵", "叉燒飯", "香港", "廣東話", "飲茶", "牛肉腩", "豉油皇炒麵", "港式奶茶", "冰室",
    "窩蛋牛肉飯", "島嶼", "都市", "繁華", "摩天大樓", "茶餐廳", "地鐵", "購物", "龍舟", "舞獅", "藝術", "夜景", "傳統節日", "電影", "音樂會", "夜市", "茶文化", "風箏", "海港城", "太平山", "市集", "迪士尼", "極光", "冰球"
  ];

let currentKeywords = ["繪畫", "橋樑", "文化"]; // initial keywords

$(document).ready(function() {
  
  fetch('keywords.txt')
  .then(response => response.text())
  .then(text => $('#error').html(text))

  document.body.style.backgroundColor = "rgb(192,192,192)";
  const cards = document.querySelectorAll(".keyword");
  cards.forEach((card, index) => {
    card.innerHTML = currentKeywords[index];
  });

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

  function getTimeColor(timeLeft, totalTime) {
    const green = [0, 128, 0];
    const red = [255, 0, 0];
    const percentLeft = timeLeft / totalTime;
    const r = Math.round(green[0] + (red[0] - green[0]) * (1 - percentLeft));
    const g = Math.round(green[1] + (red[1] - green[1]) * (1 - percentLeft));
    const b = Math.round(green[2] + (red[2] - green[2]) * (1 - percentLeft));
    return `rgb(${r}, ${g}, ${b})`;
  }  
  
  function startTimer(duration, display) {
      duration = $('#seconds-input').val();
      let timer = duration * 1000;
      interval = setInterval(function() {
      let seconds = Math.floor((timer % (60 * 1000)) / 1000);
      let milliseconds = Math.floor(timer % 1000);
      
      seconds = seconds < 10 ? "0" + seconds : seconds;
      milliseconds = milliseconds < 10 ? milliseconds : milliseconds < 100 ? "" + milliseconds : milliseconds;
      display.textContent = seconds + ":" + milliseconds;

      var percent = (timer / duration)/1000;
      var r = percent < 0.5 ? 255 : Math.round(255 - (percent - 0.5) * 2 * 255);
      var g = percent > 0.5 ? 255 : Math.round(percent * 2 * 255);
      var b = 0;
      var bgColor = "rgb(" + r + "," + g + "," + b + ")";
      document.body.style.backgroundColor = bgColor;
      
      if (timer <= 0) {
        clearInterval(interval);
        display.textContent = "Time's up!";
        document.body.classList.add("flash");
        setTimeout(() => {
          document.body.classList.remove("flash");
        }, 1000);
      }
      
      timer -= 10;
    }, 10);
  }  
  
  function generateKeywords() {
    clearInterval(interval); // stop the timer
    let newKeywords = [];
    do {
      newKeywords = [];
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * keywordsList.length);
        newKeywords.push(keywordsList[randomIndex]);
      }
    } while (newKeywords.some(keyword => currentKeywords.includes(keyword)));
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


  document.addEventListener("click", function() {
    generateKeywords();
    updateCards();
    document.body.classList.remove("timer-ended");
    const display = document.querySelector('#timer');
    startTimer(time, display);
  });

  $('#toggle-settings').click(function() {
    $('#settings-panel').toggleClass('show');
  });