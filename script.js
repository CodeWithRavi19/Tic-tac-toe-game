// script.js (updated for computer AI)
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const cells = document.querySelectorAll('.cell');
const winnerMessage = document.getElementById('winnerMessage');

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWin();
    switchPlayer();

    if (gameActive && currentPlayer === 'O') {  // Computer's turn
        setTimeout(computerMove, 500); // Delay for a better user experience
    }
}

function computerMove() {
    let bestMove = findBestMove(board);
    if(bestMove !== null) {
        board[bestMove] = currentPlayer;
        cells[bestMove].textContent = currentPlayer;
        checkWin();
        switchPlayer();
    } else {
        checkWin();
        switchPlayer();
    }
}

function findBestMove(board) {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = currentPlayer; // Try 'O'
            let score = minimax(board, 0, false);
            board[i] = ''; // Undo the move
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a] === 'O' ? 1 : -1; // Computer wins: 1, Player wins: -1
        }
    }

    if (!board.includes('')) {
        return 0; // Draw
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
}


function checkWin() {
    // ... (same as before)
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            declareWinner(board[a]);
            return;
        }
    }

    if (!board.includes('')) {
        declareWinner("It's a draw!");
        return;
    }
}


function declareWinner(winner) {
    gameActive = false;
    winnerMessage.textContent = winner;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winnerMessage.textContent = "";
    cells.forEach(cell => {
        cell.textContent = '';
    });
}

