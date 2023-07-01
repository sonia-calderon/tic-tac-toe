const gameBoardDiv = document.querySelectorAll("section.game-board div");
const gamePlayerTurnP = document.querySelector("section.game-player-turn p");
const restartBtn = document.querySelector("#restart");
const restartBtnGameOver = document.querySelector("#restartGameOver");
let gameArray = Array(9).fill(null);

const gameOverResultP = document.querySelector("section.game-result p:nth-child(2)");

// players
const playerX = "X";
const playerO = "O";
let currentPlayer = playerX;

//winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

if(gameOverResultP){
    let params = new URLSearchParams(document.location.search);
    let winner = params.get("winner"); 
    gameOverResultP.innerHTML = winner;
}

if(restartBtnGameOver){
    restartBtnGameOver.addEventListener('click', function(e){
        e.preventDefault();
        window.location.href = './game.html';
    })
} 

//start game
function startGame(){
    gameBoardDiv.forEach(element => {
        //if cells are empty, start the game
        if(element.textContent == ''){
            // player X starts
            gamePlayerTurnP.textContent = playerX + "'s turn!";
            //select cells
            element.addEventListener("click", cellClicked);
        }
    });
} // end of start game

startGame();

function cellClicked(e){
    const targetCell = e.target;

    //can't select a cell if it's occupied
    if(targetCell.textContent == ''){
        
        //array fills in a specific position with the current player value
        gameArray[targetCell.id] = currentPlayer;

        targetCell.textContent = currentPlayer;


        if(gameResult() !== false && gameResult() !== true){
            window.location.href = '../game-result.html?winner=' + currentPlayer;
        }
        
        if(gameResult() === true){
            window.location.href = '../game-over.html';
        }

        //changing player
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
        gamePlayerTurnP.textContent = currentPlayer + "'s turn!";

    }
}

function gameResult(){
    for (const combination of winningCombinations) {
        let [a, b, c] = combination;

        if(gameArray[a] && (gameArray[a] == gameArray[b] && gameArray[a] == gameArray[c])){   
            //return winning combo
            return [a, b, c];
        }
        
        if(gameArray.every(element => element !== null)){
            //game over, no winners
            return true;
        }  
    }
    return false;
}


//restart button
if(restartBtn){
    restartBtn.addEventListener("click", restart);
}

function restart(){
    //player X starts
    gamePlayerTurnP.textContent = playerX + "'s turn!";
    // eliminate all elements from the board
    gameBoardDiv.forEach(element => {
        element.textContent = "";
    });
    //restart array
    gameArray = Array(9).fill(null);

}