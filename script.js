// ===============================
// TIC TAC TOE V3
// GAME LOGIC
// ===============================


// Game variables

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


let currentPlayer = "X";

let gameActive = false;

let gameMode = "human";

let playerScore = 0;

let computerScore = 0;

let drawScore = 0;



// Get HTML elements

const cells = document.querySelectorAll(".cell");

const startButton = document.querySelector("#startButton");

const restartButton = document.querySelector("#restartButton");

const turnMessage = document.querySelector("#turnMessage");

const humanModeButton = document.querySelector("#humanMode");

const computerModeButton = document.querySelector("#computerMode");

const playerScoreText = document.querySelector("#playerScore");

const computerScoreText = document.querySelector("#computerScore");

const drawScoreText = document.querySelector("#drawScore");




// Winning combinations

const winningPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];




// Choose Human vs Human

humanModeButton.addEventListener(
    "click",
    () => {

        gameMode = "human";

        turnMessage.textContent =
            "Mode: Player vs Player";

    }
);




// Choose Computer

computerModeButton.addEventListener(
    "click",
    () => {

        gameMode = "computer";

        turnMessage.textContent =
            "Mode: Player vs Computer";

    }
);





// Start game

startButton.addEventListener(
    "click",
    startGame
);




function startGame(){

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("winner");

    });

    currentPlayer = "X";

    gameActive = true;

    turnMessage.textContent = "Your turn: X";

}





// Click squares

cells.forEach(cell => {


    cell.addEventListener(
        "click",
        () => {


            const index =
                cell.dataset.index;



            if(
                !gameActive ||
                board[index] !== ""
            ){

                return;

            }



            makeMove(index);


        }
    );


});





function makeMove(index){


    board[index]=currentPlayer;


    cells[index].textContent =
        currentPlayer;



    checkGame();


}





function changeTurn(){

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if(gameMode === "computer" && currentPlayer === "O"){

        turnMessage.textContent = "Computer is thinking...";

        setTimeout(computerMove,600);

    }

    else{

        turnMessage.textContent = "Turn: " + currentPlayer;

    }

}







function checkGame(){


    let winner=null;



    winningPatterns.forEach(pattern=>{


        const a=pattern[0];

        const b=pattern[1];

        const c=pattern[2];



        if(

            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]

        ){

            winner=board[a];


            highlightWinner(pattern);


        }


    });





    if(winner){


        endGame(
            winner + " wins!"
        );


        return;

    }



    if(!board.includes("")){


        endGame(
            "Draw!"
        );


        return;

    }



    changeTurn();


}







function highlightWinner(pattern){

    pattern.forEach(index => {

        cells[index].classList.add("winner");

    });

}







function endGame(message){


    gameActive=false;


    turnMessage.textContent =
        message;



    if(message.includes("X")){

        playerScore++;

        playerScoreText.textContent =
            playerScore;

    }


    else if(message.includes("O")){

        computerScore++;

        computerScoreText.textContent =
            computerScore;

    }


    else{


        drawScore++;

        drawScoreText.textContent =
            drawScore;


    }


}






function computerMove(){

    if(!gameActive) return;

    const emptySquares = [];

    board.forEach((value,index)=>{

        if(value===""){

            emptySquares.push(index);

        }

    });

    if(emptySquares.length===0) return;

    const randomIndex =
        Math.floor(Math.random()*emptySquares.length);

    const move =
        emptySquares[randomIndex];

    makeMove(move);

}

// Restart current match

restartButton.addEventListener(
    "click",
    startGame
);
