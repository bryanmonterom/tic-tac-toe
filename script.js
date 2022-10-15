const Gameboard = (row, column, symbol) => {
   
    var board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    const updateBoard = (row, column, symbol) => {
        board[row][column] = symbol;
        populateGrid(board, symbol);
        return board;
    }

  
   
    const returnBoard = () => {
        populateGrid(board)
    };

    const returnGrid = (i, j, symbol,board) => {
        let grid = document.createElement('div');
        grid.setAttribute("row", i);
        grid.setAttribute("column", j);
        grid.id = "b" + i + '' + j;
        grid.textContent = board[i][j];
        grid.classList.add('grid');
        if (grid.textContent == '') {
            grid.addEventListener('click', game.Play)
            return grid;
        }
        grid.classList.add(grid.textContent);
        return grid;
    }

    const returnGridRow = () => {
        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        return gridRow;
    }


    const populateGrid = (board, symbol) => {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            let gridRow = returnGridRow();
            gridContainer.appendChild(gridRow);
            for (let j = 0; j < board[i].length; j++) {
                gridRow.appendChild(returnGrid(i, j, symbol,board));
            }
        }
        return gridContainer;

    }

    const removeListener = () => {
        document.querySelectorAll('.grid').forEach(item => item.removeEventListener('click', game.Play, false))
    }

    const showBtnReplay=()=>{
        document.getElementById('btnReplay').classList.toggle('hidden');
    }

    
    const identifyWinners=(symbol, index, direction)=>{
        if (direction == "diagonalinversa") {

            document.getElementById('b02').classList.add('winner');
            document.getElementById('b11').classList.add('winner');
            document.getElementById('b20').classList.add('winner');
        }
        else if (direction == "diagonal") {
            document.getElementById('b00').classList.add('winner');
            document.getElementById('b11').classList.add('winner');
            document.getElementById('b22').classList.add('winner');
        }
        else if (direction == "vertical") {

            document.getElementById('b0' + index).classList.add('winner');
            document.getElementById('b1' + index).classList.add('winner');
            document.getElementById('b2' + index).classList.add('winner');
        }
        else if (direction == "horizontal"){
            document.getElementById(`b${index}0`).classList.add('winner');
            document.getElementById(`b${index}1`).classList.add('winner');
            document.getElementById(`b${index}2`).classList.add('winner');
        }
    }

    const defineResults = (symbol) => {
        let label = document.getElementsByClassName('results')[0];
        label.innerHTML = `${symbol} Wins the Round`
        removeListener();
        showBtnReplay();
        
    }

    const drawResults = () => {
            let label = document.getElementsByClassName('results')[0];
            label.innerHTML = ` It's a draw`
            removeListener();
            showBtnReplay();
            return;
    }
    return { updateBoard, populateGrid, returnBoard,defineResults,drawResults,identifyWinners }


}

class Player {
    constructor(name, symbol, isPlaying) {
        this.name = name;
        this.symbol = symbol;
        this.isPlaying = isPlaying
    }
}

const PlayGame = () => {

    let playerOne = new Player("Bryan", "X", true);
    let playerTwo = new Player("Juan", "O", false);
    let gameBoard = Gameboard();

    const initializeGame = () => {
        gameBoard.returnBoard();
    }


    const replay = () => {
        gameBoard = null;
        // console.log(gameBoard.reset());
    }
    const Play = (e) => {
        const symbol = playerOne.isPlaying ? playerOne.symbol : playerTwo.symbol
        const row = e.target.getAttribute('row');
        const column = e.target.getAttribute('column');
        const id = e.target.getAttribute('id');
        let board = gameBoard.updateBoard(row, column, symbol);
        let draw = validateDraw(board);
        if(draw){gameBoard.drawResults()}
       let winner = validateWinner(symbol, board);
        if (winner){
            gameBoard.defineResults(symbol);
            return;
        } 
        switchTurns(playerOne, playerTwo);
    }

    const validateWinner = (symbol, board) => {

        if (validateVertical(symbol, board)) {
            return true;
        }
        return false

    }

    const validateVertical = (symbol, board) => {
        for (let index = 0; index < 3; index++) {

            // validate vertical
            if (board[0][index] == symbol && board[1][index] == symbol && board[2][index] == symbol) {
                gameBoard.identifyWinners(symbol, index, 'vertical')
                return true;

            }
            //validate horitontal
            if (board[index][0] == symbol && board[index][1] == symbol && board[index][2] == symbol) {
                gameBoard.identifyWinners(symbol, index, 'horizontal')
                return true;

            }
        }
        //validate diagonals

        if (board[0][0] == symbol && board[1][1] == symbol && board[2][2] == symbol) {
            gameBoard.identifyWinners(symbol, '', 'diagonal')
            return true;

        }
        if (board[0][2] == symbol && board[1][1] == symbol && board[2][0] == symbol) {
            gameBoard.identifyWinners(symbol, '', 'diagonalinversa')
            return true;
        }



        return false;
    }

    const validateDraw = (board) => {
        for (let index = 0; index < 3; index++) {

            for (let j = 0; j < 3; j++) {
               if(board[index][j] == ''){
                return false;
               }
            }

        }
        
        return true;
    }




    const switchTurns = () => {
        if (playerOne.isPlaying) {
            playerOne.isPlaying = false;
            playerTwo.isPlaying = true;
            return
        }
        playerOne.isPlaying = true;
        playerTwo.isPlaying = false;
    }

    return { initializeGame, Play,replay }

}

// // populateGrid();

// console.log(playerOne);
// console.log(playerTwo);
let game = PlayGame();
game.initializeGame();

function restart(){
 game = PlayGame();
game.initializeGame();
document.getElementById('btnReplay').classList.toggle('hidden');
document.getElementsByClassName('results')[0].textContent = '';


}
document.getElementById('btnReplay').addEventListener('click',restart);

