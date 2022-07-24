export  default class Card {
  _open = false
  _success = false
  constructor(container, number, action) {
    this.card = document.createElement('div');
    this.front = document.createElement('div');
    this.back = document.createElement('div');

    this.card.classList.add('card');
    this.front.classList.add('front');
    this.back.classList.add('back');

    this.card.append(this.front);
    this.card.append(this.back);
    this.back.textContent = number;
    this.number = number;

    this.card.addEventListener("click", () => {
      if (this.open == false && this.success == false) {
        this.open = true
        action(this)
      }
    })
    container.append(this.card)
  }

  set open(value) {
    this._open = value
    value ? this.card.classList.add("active") : this.card.classList.remove("active");
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value
    value ? this.card.classList.add("success") : this.card.classList.remove("success");
  }

  get success() {
    return this._success;
  }

}

