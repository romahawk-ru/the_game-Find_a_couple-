import Card from "../js/createcard.js";

function createHeader() {
  const headerContainer = document.getElementById('header');
  const title = document.createElement('h2');
  headerContainer.append(title);
  title.textContent = 'Игра в Пары';
}

function newGame(container, cardCount) {
  cardCount = cardCount;
  let cardsNumberArray = [];
  let cardsArray = [];
  let firstCard = null;
  let secondCard = null;

  for (let i = 1; i <= cardCount; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);

  for (const cardNumber of cardsNumberArray) {
    cardsArray.push(new Card(container, cardNumber, flip));
  }

  function flip(card) {
    if (firstCard != null && secondCard != null) {
      if (firstCard.numer != secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else {
      if (secondCard == null) {
        secondCard = card;
      }
    }

    if (firstCard != null && secondCard != null) {
      if (firstCard.number == secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.success').length == cardsNumberArray.length) {
      const resetBtn = document.createElement('button');
      const btnWrapper = document.createElement('div');
      btnWrapper.classList.add('d-flex', 'align-items-center', 'justify-content-center');
      resetBtn.classList.add('btn', 'btn-primary');
      resetBtn.textContent = 'Сыграть еще';
      btnWrapper.append(resetBtn);
      document.body.append(btnWrapper);

      resetBtn.addEventListener('click', () => {
        container.innerHTML = '';
        let cardsNumberArray = [];
        let cardsArray = [];
        let firstCard = null;
        let secondCard = null;
        newGame(container, cardCount);
        btnWrapper.remove(resetBtn);
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const selectLevelWindow = document.getElementById('select-level');
  const selectLevelModal = document.createElement('div');
  const levelCountForm = document.createElement('form');
  const levelCountLabel = document.createElement('label');
  const levelCountInput = document.createElement('input');
  const startBtn = document.createElement('button');
  const modalTitle = document.createElement('h1');
  const modalText = document.createElement('p');

  modalTitle.textContent = 'Выбери уровень';
  modalText.textContent = 'Введите число пар от 2 до 10';
  startBtn.textContent = 'Начать игру';
  levelCountLabel.textContent = '';

  selectLevelWindow.append(selectLevelModal);
  selectLevelModal.append(modalTitle);
  selectLevelModal.append(modalText);
  selectLevelModal.append(levelCountForm);
  levelCountForm.append(levelCountInput);
  levelCountForm.append(startBtn);

  selectLevelWindow.classList.add('is-active');
  selectLevelModal.classList.add('modal__window');
  modalTitle.classList.add('m-0', 'mb-4');
  levelCountForm.classList.add('row');
  levelCountInput.classList.add('mb-4', 'form-control', 'form-control-lg');
  levelCountInput.setAttribute('placeholder', 'Кол-во карточек по вертикали/горизонтали');
  startBtn.classList.add('btn', 'btn-primary', 'btn-block');

  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const count = levelCountInput.value;
    if (count >= 2 && count <= 10 && count % 2 === 0) {
      selectLevelWindow.classList.remove('is-active');
      createHeader();
      newGame(document.getElementById('game'), count);
    } else {
      selectLevelWindow.classList.remove('is-active');
      createHeader();
      newGame(document.getElementById('game'), 2);
    }
  });
});
