let currentShopCard = null;
const cards = document.querySelectorAll('.shopCard');

document.addEventListener('DOMContentLoaded', () => {
  // Получаем элемент input и все карточки товаров
const input = document.getElementById('categorySearch');
const products = document.querySelectorAll('.shopCard');

// Обработка события ввода
const showMoreBtn1 = document.getElementById('showMoreBtn1');
const showMoreBtn2 = document.getElementById('showMoreBtn2');
const showMoreBtn3 = document.getElementById('showMoreBtn3');
const scrollShopUp = document.querySelector('.scrollShopUp');
const scrollShopDown = document.querySelector('.scrollShopDown');

input.addEventListener('input', () => {
    const searchTerm = input.value.trim().toLowerCase();

    const allCards = Array.from(document.querySelectorAll('.shopCard')); // все карточки
    const matchingCards = [];

    // Находим подходящие карточки
    allCards.forEach(card => {
        const itemName = card.querySelector('.itemName').textContent.trim().toLowerCase();
        if (searchTerm === '' || itemName.includes(searchTerm)) {
            matchingCards.push(card);
        } else {
          card.style.display = 'none';
        }
    });

    // Показываем только первые 9
    matchingCards.forEach((card, index) => {
        if (index < 9) {
            card.style.display = 'grid'; // или 'block' в зависимости от стилей
            scrollShopUp.style.display = 'none';
        } else {
            card.style.display = 'none';
        }
    });

    // Показываем или скрываем кнопку
    if (matchingCards.length > 0) {
        showMoreBtn1.style.display = 'block';
        showMoreBtn1.style.backgroundColor = 'red';
        // Обработка клика по кнопке
        showMoreBtn1.onclick = () => {
            matchingCards.forEach((card, index) => {
                if (index < 9) {
                    card.style.display = 'grid'; // или 'block' в зависимости от стилей
                    scrollShopUp.style.display = 'none';
                } else {
                  card.style.display = 'none';
                }
            });
            showMoreBtn1.style.display = 'block';
            showMoreBtn1.style.backgroundColor = 'red';
            showMoreBtn2.style.backgroundColor = '#434343';
            showMoreBtn3.style.backgroundColor = '#434343';
        };
    } else {
        showMoreBtn1.style.display = 'block';
    }

    // Показываем или скрываем кнопку
    if (matchingCards.length > 9) {
        showMoreBtn2.style.display = 'block';
        showMoreBtn2.style.backgroundColor = '#434343';
        // Обработка клика по кнопке
        showMoreBtn2.onclick = () => {
            matchingCards.forEach((card, index) => {
                if (index < 9) {
                    card.style.display = 'none'; // или 'block' в зависимости от стилей
                    scrollShopUp.style.display = 'none';
                } else {
                  card.style.display = 'grid';
                }
            });
            showMoreBtn2.style.display = 'block';
            showMoreBtn1.style.backgroundColor = '#434343';
            showMoreBtn2.style.backgroundColor = 'red';
            showMoreBtn3.style.backgroundColor = '#434343';
        };
    } else {
        showMoreBtn2.style.display = 'none';
    }

    // Показываем или скрываем кнопку
    if (matchingCards.length > 18) {
        showMoreBtn3.style.display = 'block';
        showMoreBtn1.style.backgroundColor = '#434343';
        showMoreBtn2.style.backgroundColor = '#434343';        
        showMoreBtn3.style.backgroundColor = '#434343';
        // Обработка клика по кнопке
        showMoreBtn3.onclick = () => {
            matchingCards.forEach((card, index) => {
                if (index < 18) {
                  card.style.display = 'none'; // или 'block' в зависимости от стилей
                  scrollShopUp.style.display = 'none';
                } else {
                  card.style.display = 'grid';
                }
            });
            showMoreBtn3.style.display = 'block';
            showMoreBtn1.style.backgroundColor = '#434343';
            showMoreBtn2.style.backgroundColor = '#434343';
            showMoreBtn3.style.backgroundColor = 'red';
        };
    } else {
        showMoreBtn3.style.display = 'none';
    }
});
})

const products = document.querySelectorAll('.shopCard');

function filterByCategory(category) {
    products.forEach(product => {
        const productCategory = product.querySelector('.category').textContent.trim();
        if (category === 'все') {
          for (i = 1; i < 28; i++) {
          if(i < 10) {
            shopCardi = document.querySelector('.shopCard' + i)
            shopCardi.style.display = "grid"
          } else {
            shopCardi = document.querySelector('.shopCard' + i)
            shopCardi.style.display = "none"
          }
        }
        } else if (productCategory === category) {
            product.style.display = 'grid';
        } else {
            product.style.display = 'none';
        }
    });
}

// Предположим, у вас есть кнопки с категориями
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const selectedCategory = button.dataset.category; // Например, data-category="Головной убор"
        filterByCategory(selectedCategory);
    });
});

function initializeLimits() {
  document.querySelectorAll('.shopCard').forEach(card => {
    const id = card.dataset.id;
    const today = new Date().toISOString().slice(0, 10); // текущая дата в формате ГГГГ-ММ-ДД
    const storedDate = localStorage.getItem(`limit_date_${id}`);
    
    if (storedDate !== today) {
      // дата изменилась или лимит ещё не установлен
      const maxCount = Math.floor(Math.random() * 1000) + 1;
      localStorage.setItem(`limit_${id}`, maxCount);
      localStorage.setItem(`count_${id}`, 0);
      localStorage.setItem(`limit_date_${id}`, today);
    } else {
      // лимит уже установлен на сегодня
      // можно его получить, если нужно
      const maxCount = localStorage.getItem(`limit_${id}`);
    }
  });
}
initializeLimits();

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    const clothSize = document.getElementById('clothSize');
    const closeBtn = modal.querySelector('.close-btn');
    const modalTitle = document.getElementById('modalTitle');
    const modalImg = document.getElementById('modalImg');
    const modalCategory = document.getElementById('modalCategory');
    const modalPrice = document.getElementById('modalPrice');
    const modalInfo = document.getElementById('modalInfo');
    const addToCartBtn = modal.querySelector('.buy');
    const sizeOptions = document.getElementById('sizeOptions');

    let selectedSize = null; // выбранный размер
    let currentProduct = {}; // текущий товар

    // Обработчик закрытия модального окна
    closeBtn.onclick = () => {
      modal.style.display = 'none';
    };

    // Открытие модального окна при клике по карточкам
    document.querySelectorAll('.shopCard').forEach(card => {
      card.onclick = () => {
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = card.dataset.price;
        const imgSrc = card.dataset.img;
        const info = card.dataset.info;
        const category = card.querySelector('.category')?.innerText || '';
        currentCategory = card.querySelector('.category')?.innerText || '';
        currentShopCard = card;

        const maxCount = localStorage.getItem(`limit_${id}`);
        document.getElementById('storage').textContent = maxCount;

        modal.addEventListener('click', (event) => {
          if (event.target.matches('.favorite-btn')) {
            if (currentShopCard) {
              toggleFavorite(currentShopCard, event.target);
            }
          }
        });

        currentProductData = {
          id,
          name,
          price,
          imgSrc,
          info,
          category,
        };

        // Заполняем модальное окно
        modalTitle.innerText = name;
        modalImg.src = imgSrc;
        modalCategory.innerText = category;
        modalPrice.innerText = price + '₽';
        modalInfo.innerText = info;

        if(category === 'одежда') {
          modal.style.display = 'flex';
          clothSize.style.display = 'flex';
        } else {
          modal.style.display = 'flex';
          clothSize.style.display = 'none';
        }
      };
    });

    // Выбор размера
    sizeOptions.addEventListener('click', (e) => {
      if (e.target.classList.contains('size-btn')) {
        document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        selectedSize = e.target.dataset.size;
      }
    });

      let currentProductData = {};
    let currentCategory = '';

    // Обработчик добавления в корзину
    addToCartBtn.onclick = () => {
      if (!currentProductData.id) return;

      const id = currentProductData.id;
      const limit = parseInt(localStorage.getItem(`limit_${id}`), 10) || 0;
      let count = parseInt(localStorage.getItem(`count_${id}`), 10) || 0;

      // Проверка лимита
      if (count >= limit) {
        alert('Достигнут лимит по этому товару.');
        return;
      }
      if (currentProduct) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (currentCategory === 'одежда' && !selectedSize) {
          alert('Пожалуйста, выберите размер');
          return;
        }

        const currentProduct = {
          ...currentProductData,
          ...(currentCategory  === 'одежда' ? { selectedSize } : {})
        };

        const existingProductIndex = cart.findIndex(item => item.id === currentProduct.id && item.selectedSize === currentProduct.selectedSize);

        if (existingProductIndex !== -1) {
          // Увеличиваем количество существующего товара
          cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
        } else {
          // Добавляем новый товар
          currentProduct.quantity = 1;
          cart.push(currentProduct);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        // Увеличиваем счетчик добавлений этого товара
        count += 1;
        localStorage.setItem(`count_${id}`, count);

        alert('Товар добавлен в корзину!');
        modal.style.display = 'none';
      }
    };

    // Закрывать модальное окно при клике вне содержимого
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  });

function moveShopPage1() {
  for (i = 1; i < 28; i++) {
    if(i < 10) {
      shopCardi = document.querySelector('.shopCard' + i)
      shopCardi.style.display = "grid"
    } else {
      shopCardi = document.querySelector('.shopCard' + i)
      shopCardi.style.display = "none"
    }
  }
  const shopPage1 = document.querySelector('.button1')
  shopPage1.style.backgroundColor = "red"
  const shopPage2 = document.querySelector('.button2')
  shopPage2.style.backgroundColor = "#434343"
  const shopPage3 = document.querySelector('.button3')
  shopPage3.style.backgroundColor = "#434343"
}

function moveShopPage2() {
  for (i = 1; i < 28; i++) {
    if(i > 9) {
      if(i < 19) {
      shopCardi = document.querySelector('.shopCard' + i)
      shopCardi.style.display = "grid"
      } else {
        shopCardi = document.querySelector('.shopCard' + i)
        shopCardi.style.display = "none"
      }
    } else {
      shopCardi = document.querySelector('.shopCard' + i)
      shopCardi.style.display = "none"
    }
  }
  const shopPage1 = document.querySelector('.button1')
  shopPage1.style.backgroundColor = "#434343"
  const shopPage2 = document.querySelector('.button2')
  shopPage2.style.backgroundColor = "red"
  const shopPage3 = document.querySelector('.button3')
  shopPage3.style.backgroundColor = "#434343"
}

function moveShopPage3() {
  for (i = 1; i < 28; i++) {
    if(i > 18) {
      if(i < 28) {
      shopCardi = document.querySelector('.shopCard' + i)
      shopCardi.style.display = "grid"
      } else {
        shopCardi = document.querySelector('.shopCard' + i)
        shopCardi.style.display = "none"
      }
    } else {
      shopCardi = document.querySelector('.shopCard' + i)
      shopCardi.style.display = "none"
    }
  }
  const shopPage1 = document.querySelector('.button1')
  shopPage1.style.backgroundColor = "#434343"
  const shopPage2 = document.querySelector('.button2')
  shopPage2.style.backgroundColor = "#434343"
  const shopPage3 = document.querySelector('.button3')
  shopPage3.style.backgroundColor = "red"
}

// Загружаем favorites из localStorage или создаем пустой объект
let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

// Получаем контейнер с карточками
const shopContainer = document.querySelector('.shopCardMain');

// Обработчик кликов внутри контейнера
shopContainer.addEventListener('click', (event) => {
  if (event.target.matches('.favorite-btn')) {
    const btn = event.target;
    const card = btn.closest('.shopCard'); // ищем родителя-карточку
    if (card) {
      toggleFavorite(card, btn);
    }
  }
});

// Инициализация карточек при загрузке
function initializeFavorites() {
  document.querySelectorAll('.shopCard').forEach(card => {
    const id = card.dataset.id;
    if (favorites[id]) {
      card.classList.add('favorite');
      const favBtn = card.querySelector('.favorite-btn');
      if (favBtn) favBtn.classList.add('favorite-active');
    } else {
      // Можно оставить пустым, если нужно сбросить все
      card.classList.remove('favorite');
      const favBtn = card.querySelector('.favorite-btn');
      if (favBtn) favBtn.classList.remove('favorite-active');
    }
  });
}

// Вызов функции при загрузке страницы
initializeFavorites();

// Функция для переключения избранного
function toggleFavorite(card, btn) {
  const id = card.dataset.id;

  if (favorites[id]) {
    // Удаляем из избранного
    delete favorites[id];
    card.classList.remove('favorite');
    if (btn) btn.classList.remove('favorite-active');
  } else {
    // Добавляем в избранное
    favorites[id] = true;
    card.classList.add('favorite');
    if (btn) btn.classList.add('favorite-active');
  }

  // Обновляем localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Кнопка для показа только избранных товаров
document.getElementById('showFavoritesBtn').onclick = () => {
  document.querySelectorAll('.shopCard').forEach(card => {
    const id = card.dataset.id;
    if (favorites[id]) {
      card.style.display = 'grid'; // или 'flex' в зависимости от стиля
    } else {
      card.style.display = 'none';
    }
  });
};