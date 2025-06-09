function openMapIndex() {
  location.href = './html/saitMap.html';
}

function openIndexIndex() {
  location.herf = './index.html';
}

function updateVisitCounter() {
    let visits = localStorage.getItem('visitCounter');
    visits = visits ? parseInt(visits) + 1 : 1;
    localStorage.setItem('visitCounter', visits);
  
    const counter = document.createElement('div');
    counter.style.position = 'fixed';
    counter.style.bottom = '2%';
    counter.style.left = '5%';
    counter.style.color = 'white';
    counter.style.fontSize = '12pt';
    counter.style.width = '10%';
    counter.style.minWidth = '120px';
    counter.textContent = 'Количество посещений: ' + visits;
    document.body.appendChild(counter);
  }

window.addEventListener('DOMContentLoaded', () => {
    updateVisitCounter();
});

function toReviews() {
  window.location.href = ('./html/review.html')
}

const viewBTN = document.querySelector('.view')

viewBTN.addEventListener('click', () => {
  const isActive = viewBTN.classList.toggle('active');
  
  if (isActive) {
    viewBTN.innerText = 'Выключить';
    const body = document.querySelector('body');
    body.style.fontSize = '20px';
  } else {
    viewBTN.innerText = 'Включить';
    const body = document.querySelector('body');
    body.style.fontSize = '32px';
  }
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const courseData = JSON.parse(button.getAttribute('data-course'));

      let cours = JSON.parse(localStorage.getItem('cours')) || [];
      cours.push(courseData);
      localStorage.setItem('cours', JSON.stringify(cours));

      alert(`Курс "${courseData.title}" добавлен в корзину.`);
      обновитьКорзину(); // обновляем отображение корзины
    });
  });