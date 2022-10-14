const Gameboard = (row, column, symbol) => {
    var board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];
    const updateBoard = (row, column, symbol) => {
        board[row][column] = symbol;
        populateGrid(board);
    }

    const returnBoard = () => {
        board;
        populateGrid(board)
    };

    const returnGrid = (i,j)=>{
        let grid = document.createElement('div');
        grid.setAttribute("row", i);
        grid.setAttribute("column", j);
        grid.id = i+''+j;
        grid.textContent = board[i][j];
        if(grid.textContent ==''){grid.addEventListener('click', game.Play)}
        grid.classList.add('grid');
        return grid;
    }

    const returnGridRow = ()=>{
        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        return gridRow;
    }
    

    const populateGrid = (board) => {
        const gridContainer = document.querySelector('.grid-container');
        gridContainer.innerHTML = '';
        for (let i = 0; i < board.length; i++) {
            let gridRow = returnGridRow();
             gridContainer.appendChild(gridRow);
            for (let j = 0; j < board[i].length; j++) {
                gridRow.appendChild(returnGrid(i,j));
            }
        }
        return gridContainer;

    }
    return { updateBoard, populateGrid, returnBoard }


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

    const Play = (e) => {
        const symbol = playerOne.isPlaying ? playerOne.symbol : playerTwo.symbol
        const row = e.target.getAttribute('row');
        const column = e.target.getAttribute('column');
        const id = e.target.getAttribute('id');
        let grid = document.getElementById(id);
        gameBoard.updateBoard(row, column, symbol);
        switchTurns(playerOne, playerTwo);
        grid.removeEventListener('click',game.Play,false)
        console.log(id)

    }


    const switchTurns = () => {
        if (playerOne.isPlaying) {
            playerOne.isPlaying = false;
            playerTwo.isPlaying = true;
        } else {
            playerOne.isPlaying = true;
            playerTwo.isPlaying = false;
        }
    }

    return { initializeGame, Play }

}

// // populateGrid();

// console.log(playerOne);
// console.log(playerTwo);
let game = PlayGame();
game.initializeGame();
