    const reviewsContainer = document.getElementById('reviewsContainer');
    const loadMoreBtn = document.getElementById('loadMoreReviews');
    const form = document.getElementById('reviewForm');

    let reviews = []; // все отзывы
    let visibleCount = 6; // сколько показывать изначально
    const loadStep = 2; // сколько показывать при клике
    let currentStarRating = 0; // выбранная звезда

    // Загружаем отзывы из localStorage или используем начальные
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
        reviews = JSON.parse(savedReviews);
    } else {
        // начальные отзывы (можно оставить или удалить)
        reviews = [
        {
            name: "Александр К.",
            text: "Я начал играть в Dota 2 совсем недавно и не знал, с чего начать. Курс «Основы Dota 2» стал для меня настоящим открытием! Наставник объяснил все нюансы игры, и теперь я чувствую себя уверенно на поле боя. Рекомендую всем новичкам!",
            stars: 4
        },
        {
            name: "Мария С.",
            text: "Курс «Продвинутые стратегии» помог мне поднять свой MMR на 1000 пунктов всего за месяц! Я научилась правильно анализировать свои игры и делать выводы. Большое спасибо моему наставнику за поддержку и советы!",
            stars: 5
        },
        {
            name: "Дмитрий П.",
            text: "Я уже играл в Dota 2 несколько лет, но всегда хотел улучшить свои навыки на позиции саппорта. Курс «Мастерство на позиции» оказался именно тем, что мне нужно! Теперь я лучше понимаю свою роль в команде и как взаимодействовать с керри.",
            stars: 5
        },
        {
            name: "Екатерина Л.",
            text: "Командный курс был просто великолепен! Мы с друзьями записались вместе, и это было отличное решение. Мы научились работать как единое целое, а также разработали собственные стратегии для матчей. Теперь мы играем гораздо лучше!",
            stars: 4
        },
        {
            name: "Игорь Т.",
            text: "Индивидуальные занятия с наставником помогли мне разобраться в сложных аспектах игры, которые я не мог понять сам. Я получил много полезных советов и теперь чувствую себя более уверенно в матчах.",
            stars: 5
        },
        {
            name: "Сергей М.",
            text: "Я всегда считал себя средним игроком, но после прохождения курса «Командная игра и тактика» я понял, что могу гораздо больше! Уроки по взаимодействию с командой и разработке стратегий помогли мне не только улучшить свою игру, но и стать лидером в команде.",
            stars: 4
        },
        ];
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }

    const mainReviewsCount = 6; // число "основных" отзывов, не удаляемых

function renderReviews() {
  reviewsContainer.innerHTML = '';

  // Показываем первые 6 (статичные)
  for (let i = 0; i < Math.min(mainReviewsCount, reviews.length); i++) {
    const review = reviews[i];
    const div = document.createElement('div');
    div.className = 'review';

    div.innerHTML = `
      <p class="stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</p>
      <div class="reviews">
        <p>${review.name}</p>
        "${review.text}"
      </div>
    `;
    // Без кнопки удаления
    reviewsContainer.appendChild(div);
  }

  // Остальные отзывы
  for (let i = mainReviewsCount; i < Math.min(visibleCount, reviews.length); i++) {
    const review = reviews[i];
    const div = document.createElement('div');
    div.className = 'review';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.style.marginLeft = '10px';
    deleteBtn.onclick = () => {
      deleteReview(i);
    };

    div.innerHTML = `
      <p class="stars">${'★'.repeat(review.stars)}${'☆'.repeat(5 - review.stars)}</p>
      <div class="reviews">
        <p>${review.name}</p>
        "${review.text}"
      </div>
    `;
    div.appendChild(deleteBtn);
    reviewsContainer.appendChild(div);
  }

  if (visibleCount >= reviews.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'block';
  }
}

function deleteReview(index) {
  reviews.splice(index, 1);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  if (visibleCount > reviews.length) {
    visibleCount = reviews.length;
  }
  renderReviews();
}

renderReviews();

loadMoreBtn.addEventListener('click', () => {
  visibleCount += loadStep;
  renderReviews();
});

function setStar(starIndex) {
  currentStarRating = starIndex + 1;
  for (let i = 0; i <= 4; i++) {
    const star = document.querySelector(`.star${i}`);
    if (i <= starIndex) {
      star.style.color = "yellow"; // или добавьте класс, например, 'active'
    } else {
      star.style.color = ""; // неактивная звезда
    }
  }
}

document.getElementById('reviewForm').onsubmit = function(event) {
  event.preventDefault();
  const nameInput = document.getElementById('name');
  const reviewInput = document.getElementById('reviewText');

  const newReview = {
    name: nameInput.value,
    text: reviewInput.value,
    stars: currentStarRating
  };

  reviews.push(newReview);
  localStorage.setItem('reviews', JSON.stringify(reviews));
  visibleCount = Math.min(4, reviews.length);
  renderReviews();

  nameInput.value = '';
  reviewInput.value = '';
  currentStarRating = 0;
};