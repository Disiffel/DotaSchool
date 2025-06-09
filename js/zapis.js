document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Получение данных из полей
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Простая проверка email с помощью регулярного выражения
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Пожалуйста, введите корректный email.');
        return;
    }

    // Проверка номера телефона (например, только цифры, длина 10-15 символов)
    const phonePattern = /^\d{10,15}$/;
    if (!phonePattern.test(phone)) {
        alert('Пожалуйста, введите корректный номер телефона (только цифры, 10-15 символов).');
        return;
    }

    // Ваш токен и chat ID
    const botToken = '7646796544:AAG2VPfA7aw3rqLowLLCG5NaYpnfNbdhoR0';
    const chatId = '1074140202';

    // Формируем сообщение
    const message = `
<b>Новая заявка:</b>
Имя: ${name}
Почта: ${email}
Телефон: ${phone}
    `;

    // Отправка в Telegram
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
            // Можно очистить форму
            document.getElementById('contactForm').reset();
        } else {
            alert('Ошибка при отправке: ' + data.description);
        }
    })
    .catch(error => {
        alert('Ошибка сети: ' + error);
    });
});