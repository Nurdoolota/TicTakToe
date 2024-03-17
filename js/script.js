class TicTacToeGame {
    constructor() {
        this.step = "";
        this.spanWho = document.getElementById('spanWho');
        this.winner = "";
        this.blockItem = document.querySelectorAll('.blockItem');
        this.counter = 0;
        this.winConditions = [
            [0, 1, 2],
            [0, 4, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        this.blockWinner = document.getElementById('blockWinner');
        this.spanWin = document.getElementById('spanWinner');
        this.btnNewGame = document.getElementById('btnNewGame');
        this.blockArea = document.getElementById('blockArea');
        this.btnNewGame.addEventListener('click', () => this.restartGame());
        this.init();
    }

    init() {
        this.who();
        this.blockItem.forEach(item => {
            item.addEventListener('click', () => this.handleItemClick(item));
        });
    }

    who() {
        this.step = this.step === 'circle' ? 'krest' : 'circle';
        this.spanWho.innerText = this.step === 'circle' ? 'Нулики' : 'Крестики';
    }

    handleItemClick(item) {
        if (!item.classList.contains('circle') && !item.classList.contains('krest')) {
            item.classList.add(this.step);
            item.innerText = this.step === 'circle' ? '0' : 'X';
            this.counter++;
            if (this.checkWinner(this.step)) {
                this.endGame(this.step === 'circle' ? 'Нулики' : 'Крестики');
            } else if (this.counter >= 9) {
                this.endGame('Ничья');
            } else {
                this.who();
            }
        }
    }

    checkWinner(player) {
        for (let i = 0; i < this.winConditions.length; i++) {
            const [a, b, c] = this.winConditions[i];
            if (this.blockItem[a].classList.contains(player) &&
                this.blockItem[b].classList.contains(player) &&
                this.blockItem[c].classList.contains(player)) {
                this.highlightWinningLine(a, b, c);
                return true;
            }
        }
        return false;
    }

    highlightWinningLine(a, b, c) {
        this.blockItem[a].classList.add('winColor');
        this.blockItem[b].classList.add('winColor');
        this.blockItem[c].classList.add('winColor');
    }

    endGame(winner) {
        this.blockArea.style.pointerEvents = 'none';
        this.blockWinner.style.display = 'flex';
        this.spanWin.innerText = winner;
    }

    restartGame() {
        document.location.reload();
    }
}

const game = new TicTacToeGame();
