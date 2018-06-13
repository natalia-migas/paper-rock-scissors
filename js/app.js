class Duel {
  constructor() {
    this.gesture = [
      "Paper",
      "Rock",
      "Scissors"
    ];
    this.btns = document.querySelectorAll('.btn');
  }
  randomGest() {
    this.randomItem = this.gesture[Math.floor(Math.random()*this.gesture.length)];
    return this.randomItem;
  }
  returnBtnText(btnText) {
    return btnText;
  }
  onClickFn() {
    this.btns.forEach((el) => {
      el.addEventListener('click', () => {
        this.returnBtnText(el.innerHTML);
        this.randomGest();
        this.logWindow = document.querySelector('.log-window');
        if(this.randomItem === el.innerHTML) {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. Draw</div>`;
        } else if (this.randomItem ===      'Paper' && el.innerHTML === 'Rock') {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. PC wins</div>`;
        } else if (this.randomItem ===      'Rock' && el.innerHTML === 'Scissors') {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. PC wins</div>`;
        } else if (this.randomItem ===      'Scissors' && el.innerHTML === 'Paper') {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. PC wins</div>`;
        } else if (this.randomItem ===      'Rock' && el.innerHTML === 'Paper') {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. User wins</div>`;
        } else if (this.randomItem ===      'Scissors' && el.innerHTML === 'Rock') {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. User wins</div>`;
        } else if (this.randomItem ===      'Paper' && el.innerHTML === 'Scissors') {
          this.logWindow.innerHTML+=    `<div>User: ${el.innerHTML}, PC: ${this.randomItem}. User wins</div>`;
        } else {
          this.logWindow.innerHTML+=    `<div>Something went wrong. Try again</div>`
        }
      });
    });
  }
}

class LogWindow extends Duel {
  constructor() {
    super();
  }
  detectHeight() {
    this.logWindow = document.querySelector('.log-window');
    this.divHeight = this.logWindow.clientHeight;
    this.logsDivs = document.querySelectorAll('.log-window div');
    return this.divHeight;
  }
  clearWindow() {
    this.btns.forEach((el) => {
      el.addEventListener('click', () => {
        this.detectHeight();
        if(this.divHeight > 344) {
          while (this.logWindow.firstChild) {
            this.logWindow.removeChild(this.logWindow.firstChild);
          }
          this.logWindow.innerHTML= `Log window was cleared`;
        }
      });
    });
  }
}

const duel = new Duel();
const logWindowHeight = new LogWindow();
duel.onClickFn();
logWindowHeight.clearWindow();
