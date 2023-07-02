const gameBoardDiv = document.querySelectorAll("section.game-board div");
const gamePlayerTurnP = document.querySelector("section.game-player-turn p");
const restartBtn = document.querySelector("#restart");
const gameResultH1 = document.querySelector("#game-result");
let gameArray = Array(9).fill(null);


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

//game result message
if(gameResultH1){
    let params = new URLSearchParams(document.location.search);
    let winner = params.get("winner"); 
    if(winner === 'gameover'){
        gameResultH1.innerHTML = 'GAME OVER';
    }else{
        gameResultH1.innerHTML = winner + " is the winner!!!";
    }
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
} //end of start game

startGame();

//start of cellCliked function
function cellClicked(e){
    const targetCell = e.target;

    //can't select a cell if it's occupied
    if(targetCell.textContent == ''){
        //array fills in a specific position with the current player value
        gameArray[targetCell.id] = currentPlayer;
        targetCell.textContent = currentPlayer;

        //changing player
        currentPlayer = currentPlayer == playerX ? playerO : playerX;
        gamePlayerTurnP.textContent = currentPlayer + "'s turn!";

        //game result
        if(gameResult() !== false){
            if(currentPlayer === 'X'){
                currentPlayer = 'O'
            }else if(currentPlayer === 'O'){
                currentPlayer = 'X'
            }
            window.location.href = './game-over.html?winner=' + currentPlayer;
        }else{
            let gameOver = gameArray.every(element => element !== null);
            if(gameOver){
                window.location.href = './game-over.html?winner=gameover';
            }
        }
    }
} //end of CellClicked function

//start gameResult function
function gameResult(){
    //looping over every possibility
    for (const combination of winningCombinations) {
        let [a, b, c] = combination;

        if(gameArray[a] && (gameArray[a] == gameArray[b] && gameArray[a] == gameArray[c])){   
            //return winning combo
            return [a, b, c];
        }
    }
    return false;
} //end of gameResult function


//restart button
if(restartBtn){
    restartBtn.addEventListener("click", restart);
}

//start restart function
function restart(){
    //player X starts
    gamePlayerTurnP.textContent = playerX + "'s turn!";
    // eliminate all elements from the board
    gameBoardDiv.forEach(element => {
        element.textContent = "";
    });
    //restart array
    gameArray = Array(9).fill(null);
} //end of restart function