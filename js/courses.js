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