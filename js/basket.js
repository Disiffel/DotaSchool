let итог = 0;
const totalPriceSpan = document.getElementById('totalPrice');

document.addEventListener('DOMContentLoaded', () => {
  const cartContainer = document.getElementById('cartItems');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Инициализация лимитов и счетчиков для товаров
  function initLimitsAndCounts() {
    cart.forEach(item => {
      const itemId = item.id;
      if (!localStorage.getItem(`limit_${itemId}`)) {
        // Предположим, лимит задается где-то на странице или по умолчанию
        // Например, задать лимит 5 для всех товаров по умолчанию
        localStorage.setItem(`limit_${itemId}`, '5');
      }
      if (!localStorage.getItem(`count_${itemId}`)) {
        localStorage.setItem(`count_${itemId}`, '0');
      }
    });
  }

  // Вызовем при загрузке
  initLimitsAndCounts();

  function обновитьКорзину() {
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Корзина пуста</p>';
      totalPriceSpan.innerText = '0';
      return;
    }

    cart.forEach((item, index) => {
      const pricePerItem = parseFloat(item.price);
      const quantity = item.quantity || 1;
      const totalItemPrice = pricePerItem * quantity;
      итог += totalItemPrice;

      const div = document.createElement('div');
      div.className = 'cart-item';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.marginBottom = '10px';
      div.style.justifyContent = 'left';
      div.style.gap = '1%';

      let sizeInfo = '';
      if (item.category === 'одежда' && item.selectedSize) {
        sizeInfo = `Размер: ${item.selectedSize}`;
      }
      div.innerHTML = `
        <img src="${item.imgSrc}" alt="${item.name}" style="width:100px; height:auto; margin-right:1%;" />
        <strong style="margin-left:2%;">${item.name}</strong>
        ${sizeInfo ? `${sizeInfo}` : ''}
        Цена за единицу: ${item.price}₽
        Количество: <span class="quantity">${quantity}</span>
        <button class="decrease" data-index="${index}">-</button>
        <button class="increase" data-index="${index}">+</button>
        Итоговая цена: <span class="item-total">${totalItemPrice.toFixed(2)}</span>₽
        <button class="delete" data-index="${index}" style="margin-left:2%;">Удалить</button>
      `;
      cartContainer.appendChild(div);

      div.querySelector('.delete').onclick = () => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        обновитьКорзину();
      };

      div.querySelector('.increase').onclick = () => {
        const itemId = item.id;        
        const limit = parseInt(localStorage.getItem(`limit_${itemId}`), 10) || 5;


        if (cart[index].quantity < limit) {
          cart[index].quantity = (cart[index].quantity || 1) + 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          обновитьКорзину();
        } else {
          alert('Достигнут лимит по покупке этого товара.');
        }
      };

      div.querySelector('.decrease').onclick = () => {
          if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            обновитьКорзину();
          } else {
            // Если количество 1 - удаляем товар
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            обновитьКорзину();
          }
        };
    });

    totalPriceSpan.innerText = итог.toFixed(2);
  }
  обновитьКорзину();
});

  function buy() {
    const payment = document.getElementById('payment');

    window.onclick = (event) => {
      if (event.target === payment) {
        payment.style.display = 'none';
      }
    };

    payment.style.position = 'fixed';
    payment.style.display = 'block';
  }

  // Функция для проверки номера телефона
  const input = document.getElementById('customerPhone');

  // Маска для номера телефона
  function formatPhoneNumber(value) {
    // Удаляем все символы, кроме цифр
    const digits = value.replace(/\D/g, '');

    // Ограничение по количеству цифр (примерно 11 цифр для российского номера +7)
    const maxDigits = 11;
    const trimmedDigits = digits.substring(0, maxDigits);

    // Формируем форматированный номер
    let formattedNumber = '+7';

    if (trimmedDigits.length > 1) {
      // Первая цифра после +7
      const restDigits = trimmedDigits.substring(1);

      // Добавляем пробелы по маске +7 XXX XXX XX XX
      if (restDigits.length > 0) {
        formattedNumber += ' ' + restDigits.substring(0, 3);
      }
      if (restDigits.length >= 4) {
        formattedNumber += ' ' + restDigits.substring(3, 6);
      }
      if (restDigits.length >= 7) {
        formattedNumber += ' ' + restDigits.substring(6, 8);
      }
      if (restDigits.length >= 9) {
        formattedNumber += ' ' + restDigits.substring(8, 10);
      }
    }

    return formattedNumber;
  }

  input.addEventListener('input', () => {
    const cursorPosition = input.selectionStart;
    const originalValue = input.value;

    const formattedValue = formatPhoneNumber(originalValue);
    input.value = formattedValue;

    // Обновляем позицию курсора
    // (можно усложнить логику, чтобы курсор оставался в правильной позиции)
  });

  // Валидация при потере фокуса
  function validatePhoneNumber() {
    const phonePattern = /^\+7\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
    const value = input.value.trim();
    const errorMsg = document.getElementById('phoneError');

    if (phonePattern.test(value)) {
      errorMsg.style.display = 'none';
      return true;
    } else {
      errorMsg.style.display = 'block';
      return false;
    }
  }

  input.addEventListener('blur', validatePhoneNumber);

  document.getElementById('customerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Получаем значения формы
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const tgID = document.getElementById('TGID').value;

    // Тут можно получить информацию о корзине, например, из переменной или DOM
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cours = JSON.parse(localStorage.getItem('cours')) || [];

    // Ваш токен и Chat ID
    const botToken = '7646796544:AAG2VPfA7aw3rqLowLLCG5NaYpnfNbdhoR0'; // вставьте сюда токен
    const chatId = '1074140202'; // вставьте сюда Chat ID

    // Формируем сообщение
    let message = `
    <b>Новая заявка:</b>
    <b>Имя:</b> ${name}
    <b>Телефон:</b> ${phone}
    <b>Telegram ID:</b> ${tgID}
    <b>Корзина:</b> `;

    let totalSum = 0;
    let sizeInfo = '';

    cart.forEach(item => {
      sizeInfo = `Размер: ${item.selectedSize}`;

    if (item.category === 'одежда' && item.selectedSize) {
      message += `\n• ${item.name} - ${sizeInfo} - ${item.quantity} шт. x ${item.price} руб.`;
      totalSum += item.quantity * item.price;
    } else {
      message += `\n• ${item.name} - ${item.quantity} шт. x ${item.price} руб.`;
      totalSum += item.quantity * item.price;
    };
    });
    cours.forEach(course => {
      message += `\n• ${course.title} - ${course.description} - ${course.cost} руб.`;
      totalSum += course.cost;
    })

  
    message += `\n<b>Итоговая сумма:</b> ${totalSum.toLocaleString()} руб.`

    // Отправляем сообщение
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
        alert('Данные отправлены успешно!');
        localStorage.clear('cart');
        document.getElementById('payment').style.display = 'none';
        location.reload();
      } else {
        alert('Ошибка отправки: ' + data.description);
      }
    })
    .catch(error => {
      alert('Ошибка: ' + error);
    });
  });

    function reloadCourse() {
    const cours = JSON.parse(localStorage.getItem('cours')) || [];
    const courseContainer = document.getElementById('cartCourses');

    courseContainer.innerHTML = ''; // очищаем контейнер перед отображением

    if (cours.length === 0) {
      courseContainer.innerHTML = '<p>Корзина пуста.</p>';
    } else {
      cours.forEach((course, index) => {
        const courseDiv = document.createElement('div');
        courseDiv.innerHTML = `
          <strong>${course.title}</strong>
          ${course.description}
          Цена: ${course.cost}₽
          <button class="delete" data-index="${index}" style="margin-left:2%;">Удалить</button>
        `;
        courseContainer.appendChild(courseDiv);
        итог += parseFloat(course.cost);
      });

      // Назначаем обработчики для кнопок удаления
      document.querySelectorAll('.delete').forEach(btn => {
        btn.onclick = () => {
          const index = parseInt(btn.getAttribute('data-index'));
          const cours = JSON.parse(localStorage.getItem('cours')) || [];
          cours.splice(index, 1); // удаляем выбранный курс
          localStorage.setItem('cours', JSON.stringify(cours));
          reloadCourse(); // повторно обновляем
        };
      });
    }
    totalPriceSpan.innerHTML = итог;
  }

  // Изначально показываем корзину
  window.onload = () => {
    reloadCourse();
  };