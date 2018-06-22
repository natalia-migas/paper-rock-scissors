class Game {
	static get gestures() {
		return {
			'Scissors': 'Paper',
			'Rock': 'Scissors',
			'Paper': 'Rock'
		};
	}

	bindEvents() {
		this.container.querySelector('.btns-wrapper').addEventListener('click', (e) => {
			if (!e.target.matches('button')) {
				return;
			}
			this.player.gesture = e.target.textContent;
			this.duel.execute();
		});
	}

	constructor(container) {
		this.container = document.querySelector(container);
		this.player = new Player();
		this.computer = new Computer();
		this.logWindow = new LogWindow( this.container.querySelector('.log-window') );
		this.duel = new Duel(this.player, this.computer, this.logWindow);
		this.bindEvents();
	}
}

class Player {
	getGesture() {
		const gesture = this.gesture;
		this.gesture = null;
		return gesture;
	}
}

class Computer {
	getGesture() {
		const gestures = Object.keys(Game.gestures);
		return gestures[Math.floor(Math.random() * gestures.length)];
	}
}

class Duel {
	constructor(player, computer, logWindow) {
		Object.assign(this, {player, computer, logWindow});
	}

	getWinner(playerGesture, computerGesture) {
		if (Game.gestures[playerGesture] === computerGesture) {
			return 'User';
		} else if (Game.gestures[computerGesture] === playerGesture) {
			return 'PC';
		}
		return 'Draw';
	}

	execute() {
		const playerGesture = this.player.getGesture();
		const computerGesture = this.computer.getGesture();
		const winner = this.getWinner(playerGesture, computerGesture);
		this.logWindow.log(playerGesture, computerGesture, winner);
		this.logWindow.detectHeight();
		this.logWindow.clearWindow();
	}
}

class LogWindow {
	constructor(logElement) {
		this.logElement = logElement;
	}

	log(playerGesture, computerGesture, winner) {
		this.li = document.createElement('li');
		this.li.textContent = `User: ${playerGesture}, PC: ${computerGesture}.`;
		if(winner !== 'Draw') {
			this.li.textContent += ` ${winner} wins.`;
		}
		else {
			this.li.textContent += ` Draw.`;
		}
		this.logElement.appendChild(this.li);
	}

	detectHeight() {
		this.divHeight = this.logElement.clientHeight;
		return this.divHeight;
	}

	clearWindow() {
		const logLi = document.querySelectorAll('.log-window li');
		this.detectHeight();
		if(this.divHeight > 344) {
			while (this.logElement.firstChild) {
				this.logElement.removeChild(this.logElement.firstChild);
			}
			const clearedInfo = document.createElement('li');
			clearedInfo.textContent = `Log window was cleared`;
			this.logElement.appendChild(clearedInfo);
			this.logElement.appendChild(this.li);
		}
	}
}

new Game('#game');
