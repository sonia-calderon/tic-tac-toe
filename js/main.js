const gameBoardP = document.querySelectorAll("section.game-board div p");
const gamePage = document.querySelector("#game");
const gameBoardDiv = document.querySelectorAll("section.game-board div");
const gamePlayerTurnP = document.querySelector("section.game-player-turn p");
const restartBtn = document.querySelector("#restart");

// players
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;

//start game
function startGame(){
    gameBoardDiv.forEach(element => {
        //if cells are empty, start the game
        if(element.textContent == ''){
            // player X starts
            gamePlayerTurnP.textContent = playerX + "'s turn!";
            //select cells
            element.addEventListener("click", cellClicked)
        }
    });
} // end of start game

startGame();

function cellClicked(e){
    const targetCell = e.target;

    //if not empty cell, can't select that cell
    if(targetCell.textContent == ''){
        targetCell.textContent = currentPlayer;
        //changing player
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
        gamePlayerTurnP.textContent = currentPlayer + "'s turn!";
    }
}

//restart button
if(restartBtn){
    restartBtn.addEventListener("click", restart)
}

function restart(){
    //player X starts
    gamePlayerTurnP.textContent = playerX + "'s turn!";
    // eliminate all elements from the board
    gameBoardDiv.forEach(element => {
        element.textContent = "";
    });
}